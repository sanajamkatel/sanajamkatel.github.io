# skAi — Chatbot Overview

Everything about the skAi Ops Assistant: what it does, exactly how it works
under the hood, and what's left before it's ready for anything beyond a
local dev demo.

---

## 1. What it is

skAi is a chat widget embedded in the Admin Portal that lets the ops team
perform account actions — look someone up, check transactions, void a
payment, lock down fraud — by typing a plain-English request instead of
navigating forms across multiple pages.

**Core design:** Claude classifies intent, the app executes it. Claude never
touches AWS or user data directly — it only reads the message and returns a
structured decision (which action, which entity). Every actual read/write
goes through this app's own existing Flask routes, the same ones the rest
of the Admin Portal UI uses.

---

## 2. System architecture

```
 Browser (React)                    Flask backend
 BulkActionsWidget.jsx  ──POST──▶   /api/ops-assistant   ──▶  Anthropic API
                                    (opsAssistant.py)          (Claude Haiku,
                        ◀──JSON──   returns {action, reply,    classification
                                     entityId, entityType,      only)
                                     personName, ...}
        │
        │  Once an action + entity is known, the widget calls the
        │  SAME Flask routes the rest of the Admin Portal UI uses —
        │  it does not go back through Claude to execute anything.
        ▼
 Flask backend (views.py + admin/*)  ──▶  AeroPay AWS Admin API (real data)
        │
        │  After a write action succeeds, one more call:
        ▼
 Slack webhook (audit notification)
```

Three separate systems, three separate jobs:

- **Anthropic API** — language understanding only ("what does this message mean").
- **AeroPay AWS Admin API** — the actual source of truth for users, merchants,
  transactions. Every read and write goes through this app's existing
  Flask/admin layer, not a new path.
- **Slack** — a one-way audit trail. Never read from, only posted to, and
  only after a write already succeeded.

---

## 3. How the classification call actually works

**File:** `src/backend/admin/opsAssistant.py`, function `classify_intent()`.
**Model:** `claude-haiku-4-5-20251001` — fast/cheap, good enough for
classification, not used for anything requiring deep reasoning.

Flow for every message the user sends:

1. **Sanitize** (`sanitize_input`) — truncates to 500 chars, strips `{`/`}`
   and known prompt-injection phrasing ("ignore previous instructions",
   "respond only with") before it ever reaches Claude.
2. **Pre-classification keyword gate** (`message_contains_high_risk_terms`) —
   checks the raw message against `HIGH_RISK_TERMS` (a hardcoded word list:
   "lockdown", "void", "reputation", "vip", "verify merchant", etc.). If it
   matches and the session isn't authorized, the request is rejected
   **before Claude is even called** — deliberate defense-in-depth,
   independent of whatever Claude would have classified the message as.
3. **Forced tool use** — the request is sent with `tool_choice: {"type":
"tool", "name": "classify_ops_intent"}`, which forces Claude to respond
   only via a fixed schema (never free text). The schema's `action` field is
   an enum of every supported action, plus optional fields: `entityId`,
   `entityType`, `personName`, `newPhoneNumber`, `repUserId`,
   `repMerchantId`.
4. **System prompt** — a long, explicit rule list covering identity ("who
   created you"), classification precedence, and entity-extraction rules
   per action. Conversation history (last 8 turns) is included so
   follow-ups like "what user is that" can resolve against what was
   already discussed — but only genuine backward references; a message
   carrying its own fresh ID always routes to a real lookup instead (fixed
   this session, see §7).
5. **Post-classification normalization** — Claude's `action` string is
   normalized (`decline_reason` → `decline reason`, case folded, etc.) and
   validated against `ALLOWED_ACTIONS`; anything unrecognized falls back to
   `"unknown"`.
6. **Post-classification authorization gate** — if the normalized action is
   in `HIGH_RISK_ACTIONS` and the session isn't authorized, the route
   returns `action: "unauthorized"` instead of executing anything.

Only after both gates pass does the Flask route (`POST /api/ops-assistant`)
return the classification to the frontend.

### Two-layer authorization, why it matters

`HIGH_RISK_TERMS` is a raw keyword check on the user's own text — it can't
be fooled by Claude misclassifying something. `HIGH_RISK_ACTIONS` is the
same protection based on Claude's actual classification, as a second check.
Together, a message never reaches a real write unless _both_ the words used
and the resolved action say it's safe to proceed. This matters because the
frontend also has its own deterministic regex fallbacks (see the
merchant-specific reputation note below) that can override a
misclassification — those fallbacks only ever change _routing_, never
bypass this server-side gate, because the keyword check runs independently
before classification.

### Authorization rule itself

```python
is_authorized = (ENV != 'prod') or (user_email in AUTHORIZED_EMAILS)
```

In any non-prod environment, everyone is authorized (so dev/staging testing
isn't blocked). In prod, only emails in `AUTHORIZED_EMAILS` (`views.py`)
can perform write actions — read-only actions (lookups, transaction search)
aren't gated at all.

### skAi's own environment gate (added this session)

Separately from the write-action authorization above, skAi as a whole is
now restricted to only run in the `dev` environment:

- **Backend:** `/api/ops-assistant` returns `403` for any request where
  `ENV != 'dev'` — checked before any classification happens.
- **Frontend:** `app.jsx` fetches `/api/environment` on mount (a tiny,
  unauthenticated, side-effect-free endpoint that just returns `{env: ENV}`)
  and only renders `<BulkActionsWidget />` if that confirms `dev`. Starts
  `false` and fails closed — if the fetch fails for any reason, the widget
  simply never appears, rather than defaulting to visible.

Previously skAi had no environment restriction at all — the widget rendered
and read-only actions worked on every environment including staging and
prod; only prod's _write_ actions were gated to specific emails.

---

## 4. Frontend ↔ backend flow

**File:** `src/static/js/components/layout/BulkActionsWidget.jsx`
(~3,500 lines) — `handleSend()` is the entry point for every message.

1. User types a message → appended to local `messages` state immediately.
2. `POST /api/ops-assistant` with `{message, history}` → returns the
   classification.
3. **Deterministic overrides run on top of the classification**, not
   instead of it:
   - `parseIdFromQuery` / `parseStructuredIdentifier` — regex-based
     ID/email/phone extraction, used to fill in
     `effectiveId`/`effectiveScopeType` even if Claude didn't extract one.
   - `parseMerchantReputationQuery` — if the message unambiguously matches
     `user <id> ... merchant <id> ... vip`, forces
     `action = 'merchant_reputation'` regardless of what Claude said (see
     below for why this exists).
   - If the `/api/ops-assistant` call fails outright, `parseAction()` (a
     plain keyword matcher) is the last-resort fallback so the widget
     degrades gracefully instead of going fully dead.
4. Once `effectiveAction` + `effectiveId`/`effectiveScopeType` (or
   `personName`, or the two-entity `repUserId`/`repMerchantId` pair) are
   resolved, one handler block per action fetches whatever data is needed
   to show a confirmation card, or asks a follow-up question if a required
   ID is missing. As of this session, a resolved user/merchant scope also
   triggers a profile lookup (name resolution) alongside any transaction
   search, so "pull up user X" always answers with an identity, not just a
   transaction count.
5. **Write actions always require an explicit UI confirmation step** — a
   picker, then a Confirm/Cancel pair — before any `POST`/`PATCH`/`DELETE`
   call fires. No action mutates data on the classification response alone.
6. On success: the relevant Flask route stamps an audit trail (`changedBy`,
   `changedAt` from the session) onto the response, the widget renders a
   green success card with that trail, and (for write actions) fires a
   `POST /api/notifySlack...` call as a fire-and-forget side effect.

### Why the picker disables the "current" option

Early versions let you click either option in a Verified/Unverified (or
Standard/VIP/Blocked) picker with no indication of which one was already
active. Clicking the _current_ status still fired a real write and produced
a "status updated" audit card even though nothing changed — confusing and
misleading. Every status-picker in the widget now disables and labels
whichever button matches the entity's current state, so only an actual
change is clickable.

### Why merchant-specific reputation needed special handling

Every other action targets exactly one entity (a user, a merchant, a
transaction). "Set user 1234 to VIP for merchant 5678" needs _two_ IDs in
the same message — a first for this system. Relying on Claude alone to
reliably parse a brand-new two-entity phrasing risked silent
misclassification, so `opsAssistant.py` extracts `repUserId`/`repMerchantId`
as dedicated schema fields, **and** the frontend has a deterministic regex
fallback (`parseMerchantReputationQuery`) that force-routes to this action
whenever the message unambiguously contains `user <id>` + `merchant <id>` +
a VIP/reputation keyword — even overriding an "unknown" classification.
This can't be used to bypass authorization, since the keyword pre-check
runs independently before any of this.

---

## 5. Every capability

**Read-only** (no data mutation):

| Action                  | What it does                                                                                                                                                                               | Endpoints                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| User/name/email lookup  | Finds a user by name, ID, email, or phone. Full-name search auto-retries with just the first word if the exact match comes back empty. Resolves and shows the actual name, not just an ID. | `GET /api/users`                        |
| Merchant lookup         | Finds a merchant by ID or name.                                                                                                                                                            | `GET /api/merchants`                    |
| Bare-number auto-detect | A lone number with no "user"/"merchant" keyword is checked as both a User ID and Merchant ID in parallel.                                                                                  | `GET /api/users` + `GET /api/merchants` |
| Show transactions       | Lists a user's or merchant's transactions, paginated.                                                                                                                                      | `POST /api/transactionSearch`           |
| Decline history         | Lists a user's declined transactions.                                                                                                                                                      | `POST /api/transactionSearch`           |
| Decline reason          | Looks up why one transaction declined (ACH return code + explanation).                                                                                                                     | `GET /api/returnDetails`                |
| Risk queue              | Lists fraud-flagged transactions, optionally scoped to a merchant.                                                                                                                         | `POST /api/fraud/transactionSearch`     |

**Write** (modifies data — all require authorization + explicit confirm):

| Action                             | What it does                                                                                            | Endpoint                   | Method                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------- |
| Reputation                         | Changes a user's **global** reputation level.                                                           | `/api/userReputationLevel` | `POST`                             |
| Merchant-specific reputation (VIP) | Changes a user's reputation **at one specific merchant** (Standard/VIP/Blocked) — needs two IDs.        | `/api/merchantReputation`  | `POST`                             |
| Update phone                       | Updates a user's phone number. Validates format, no-ops if unchanged.                                   | `/api/user`                | `PATCH`                            |
| Verify merchant                    | Toggles a merchant's verified/unverified status.                                                        | `/api/merchant`            | `POST`                             |
| Void (single or bulk)              | Voids one or all pending transactions for a user.                                                       | `/api/voidTransaction`     | `GET` (pre-existing backend quirk) |
| Fraud lockdown                     | Compound action: blocks reputation → voids all pending → deletes bank accounts → disables bank linking. | 4 endpoints in sequence    | mixed                              |

Side-effect only (no app data touched, Slack notification only):
`POST /api/notifySlackVoid`, `/api/notifySlackPhoneUpdate`,
`/api/notifySlackMerchantVerify`, `/api/notifySlackMerchantReputation`.

---

## 6. Write actions — full code trace

Each write action's complete path: frontend confirm handler → Flask route →
backend module → the actual AWS Admin API call.

### 1. Reputation (global)

**Frontend:** `handleConfirmReputation` (`BulkActionsWidget.jsx:1668`) fires
when you pick a level from the picker card:

```js
apiFetch("/api/userReputationLevel", {
  method: "POST",
  body: JSON.stringify({ userId, reputationLevel: level.level }),
});
```

**Flask:** `set_reputation_level` (`views.py:986`) reads `userId`/
`reputationLevel` from the JSON body, calls
`reputation.set_user_reputation_level(...)`, then stamps `changedBy`/
`changedAt` from the session onto the response before returning it.

**AWS call:** `reputation.py:64` — `POST {AWS_BASE}/admin/reputationLevelForUser`
with body `{userId, reputationLevel, adminUser}`. Checks `x.ok` and returns
an explicit failure if AWS responds non-2xx instead of silently reporting
success.

### 2. Merchant-specific reputation (VIP)

**Frontend:** `handleConfirmMerchantReputation` (`:1802`) — the two-ID case.
Body shape: `{ merchantId, userReputations: [{ userId, reputation }] }`
(array, even for one user).

**Flask:** `post_merchant_reputation` (`views.py:1058`) →
`reputation.post_merchant_reputation(...)`.

**AWS call:** `reputation.py:114` — `POST {AWS_BASE}/admin/merchantReputation`.

Same-origin fire-and-forget follow-up: `POST /api/notifySlackMerchantReputation`
right after, wrapped in `.catch(() => {})` so a Slack failure never rolls
back or blocks the UI update.

### 3. Update phone

**Frontend:** `handleConfirmUpdatePhone` (`:1864`). Validates client-side
first (`isValidPhoneNumber`) and no-ops with a friendly message if the new
number matches the current one — no network call at all in that case:

```js
apiFetch("/api/user", {
  method: "PATCH",
  body: JSON.stringify({
    userId,
    aeroPassUserUuid,
    email,
    first_name,
    last_name,
    phone_number,
  }),
});
```

Sends `email`/name fields alongside the phone — the AWS endpoint requires
them, not just the phone field alone.

**Flask:** `update_user` (`views.py:772`) → `adminUsers.update_user(...)`.

**AWS call:** `adminUsers.py:90` — `PATCH {AWS_BASE}/admin/user`.

### 4. Verify merchant

**Frontend:** `handleConfirmMerchantVerify` (`:1735`) → `POST /api/merchant`
with `{ merchantId, isVerified }`.

**Flask:** `update_merchant` (`views.py:354`) is heavily overloaded — it
handles seven different optional merchant-update concerns in one endpoint
(tips, transaction limits, email config, details/fees, verification, bank
account). Verification is just one branch. The widget only ever sends
`isVerified`, so the other branches no-op.

**AWS call:** `merchantFlask/merchant.py:39` —
`POST {AWS_BASE}/config/verifyMerchant` (different sub-path from `/admin/*`
— this one lives under `/config/`).

### 5. Void (single or bulk)

**Frontend, single:** `handleVoidOne` (`:1513`) →
`apiFetch('/api/voidTransaction?transactionId=${id}')` — a **GET**, per a
pre-existing backend quirk (void was built as a GET on the AWS side, so the
Flask route stayed GET to match instead of translating it).

**Frontend, bulk:** `handleVoidAll` (`:1536`) loops the same call per
transaction.

**Flask:** `void_transaction` (`views.py:1278`) branches on how many
`transactionId` params came in — one ID calls `transactions.void_transaction`
directly; multiple IDs go through `_void_transactions_parallel`, which
fires them concurrently via `httpx` instead of sequential `requests` calls.

**AWS call:** `transactions.py:61` —
`GET {AWS_BASE}/voidTransaction?transactionId=...&adminUser=...`.

If the request came from skAi (`source=skAi` query param) and succeeds, the
Flask route itself calls `opsAssistant.notify_slack_void(...)`
server-side — the only write action where Slack notification happens in
the backend route rather than as a second frontend fetch.

### 6. Fraud lockdown (the compound one)

**No single backend endpoint** — orchestrated entirely client-side as a
4-step state machine in `runFraudLockdown` (`BulkActionsWidget.jsx`, ~line
2069 onward), with a `lockdownSteps` array driving a live progress card:

| Step | Call                                                                         | Notes                                                                                                                      |
| ---- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 0    | `POST /api/userReputationLevel` `{reputationLevel: 'blocked'}`               | Same route as #1, hardcoded value                                                                                          |
| 1    | `GET /api/voidTransaction?transactionId=...` in a loop over all pending txns | Same route as #5, sequential, with a `cancelLockdownRef` checked every iteration so "Stop lockdown" can interrupt mid-loop |
| 1b   | `POST /api/notifySlackVoid` once, batched                                    | One consolidated Slack card for the whole batch, not one per voided transaction                                            |
| 2    | `DELETE /api/userBankAccount?userId=...&bankAccountId=...` per bank account  | Skipped entirely if the user has none                                                                                      |
| 3    | `POST /api/bankLinkConfiguration` `{allowBankLink: false}`                   | Always runs last                                                                                                           |

Each step is wrapped in its own `try/catch` that marks that step `'error'`
and **continues to the next step anyway** — a failed void doesn't block
disabling bank linking. There's no backend transaction/rollback; it's
genuinely just four sequential HTTP calls from the browser.

---

## 7. Recent fixes (this branch)

- **skAi is now dev-only.** See §3 for the mechanism.
- **User/merchant lookup bug fixed.** Asking "pull up user X" or "who's
  merchant X" used to fall through to a bare transaction search with no
  identity info — a zero-transaction account looked like it didn't exist.
  Root cause: the profile-card resolution path only fired when the entity
  scope (userId/merchantId) was still ambiguous; once the message itself
  contained the word "user"/"merchant" next to the ID, scope resolved
  immediately and skipped straight to a plain transaction search. Fixed by
  running the transaction search and a profile lookup in parallel and
  weaving the resolved name into the reply either way.
- **Classification bug fixed.** `user_lookup` is meant only for backward
  references ("who is that", "who does this belong to") with no ID of its
  own. A message carrying a fresh ID (e.g. "who's merchant 2133") was
  sometimes pattern-matched into `user_lookup` anyway, which requires a
  transaction ID from history and has none — it got stuck echoing Claude's
  raw reply text instead of resolving anything. Tightened the system prompt
  so a message with its own ID always routes to `show_transactions`
  instead.
- **Credential loading moved to `.env`** (gitignored) via `python-dotenv`,
  instead of being hardcoded directly in source (see §8 for current status
  — they're temporarily back in source for local testing as of this doc).

---

## 8. Known gaps / what's left before this is production-ready

### Credentials & secrets (highest priority)

- **As of this doc, the Anthropic API key, Slack webhook, and local-dev AWS
  credentials are hardcoded back into source** (`views.py`,
  `opsAssistant.py`, `apiToken.py`, all marked `# DO NOT COMMIT`) for local
  testing convenience. **These must be stripped before any commit that
  could reach a shared branch** — `.env` already covers all three for
  local use without hardcoding anything.
- No shared, org-owned Anthropic API key exists yet — it's currently a
  personal key. Needs to move to AWS Secrets Manager (e.g.
  `dev/anthropicKey`) the same way `apiToken.py` already does for AeroPay
  API credentials via `apSecrets.get_secret()`.
- Same for the Slack webhook — currently a personal/test channel, not a
  real team-visible one (`dev/slackWebhook` or similar).
- `LOCAL_DEV_CREDENTIALS` (`admin`/`Password!1234`) and the SAML bypass in
  `views.py`'s `index()` route are real, if low-risk, hardcoded auth
  bypasses that only fire when `ENV` is `dev`/`local`/`mac` — worth
  confirming this can never accidentally resolve true on a real deployed
  environment, since the same `dev` value is also used by the shared
  deployed dev stage, not just literal local machines.

### PII & data handling

- **User messages go to a third-party LLM (Anthropic) as-is.** Names, phone
  numbers, emails typed into the chat are sent for classification with no
  redaction step. Before this touches real customer data at scale, worth
  confirming Anthropic's data processing terms (retention, training
  opt-out) match AeroPay's compliance requirements — this is a fintech
  handling PII and payment data, not a generic internal tool.
- **No PII scrubbing/redaction** on the message before it's sent to Claude.
  The sanitizer only strips prompt-injection phrasing and truncates length
  — it doesn't remove or mask anything sensitive.
- **Conversation history (last 8 turns) lives client-side only** — not
  persisted anywhere for audit or compliance review. If "what did the ops
  team ask the bot about this user" ever needs to be answerable after the
  fact, there's currently no record beyond the Slack write-audit trail.
- **Audit trail only covers writes**, not reads. Every account lookup a
  team member does through skAi is currently unlogged beyond app-level
  request logs.

### Security hardening

- **No rate limiting** on `/api/ops-assistant` — a single authenticated
  session could hammer the Anthropic API (cost) or the AWS Admin API
  (abuse) with no throttle.
- **`HIGH_RISK_TERMS` is a hardcoded keyword list.** It's the first line of
  defense against a write action slipping through, but it's static — new
  phrasing for existing risky actions could miss it entirely. Worth
  periodic review as new actions get added.
- **No frontend test coverage** for `BulkActionsWidget.jsx` (~3,500 lines) —
  everything there has been verified by manual testing only. Backend
  classification and Slack notification logic do have unit test coverage
  (`src/backend/tests/test_opsAssistant.py`).
- **`reputation.py`'s AWS calls didn't check HTTP status** before this was
  caught and fixed — `set_user_reputation_level` and
  `post_merchant_reputation` now correctly treat a non-2xx AWS response as
  a failure instead of silently reporting a rejected write as a success.

### Design decisions worth knowing (not gaps, just context)

- **Audit trail on every write** — `changedBy` + `changedAt` (UTC,
  human-formatted) gets stamped onto the Flask response for every write
  route, sourced from `session.get('session_username')`.
- **`.catch(() => null)` on secondary fetches** — several handlers fetch
  two things in parallel where one is optional context for display. A
  failure on the optional one shouldn't block the primary action.
- **Errors surfaced from the backend, not genericized** — catch blocks show
  the backend's real message when available, so a genuine "not found"
  reads differently from a genuine server error.
- **No `localStorage` position persistence for the widget's floating
  button** — it always starts at its default position on reload, by
  request.

### Feature ideas (lower priority, functionality only)

- Bank account health check (flag R02/R04-risk accounts per user).
- Date range filtering on transaction/decline searches.
- Batch status changes (verify/reputation across a list, not one at a
  time).
- Extend the merchant-specific reputation pattern to other per-merchant
  flags if more turn out to exist beyond Standard/VIP/Blocked.
- Move from the direct Anthropic API to AWS Bedrock — same model family,
  but auth becomes IAM-based instead of an API key, and usage shows up in
  existing AWS billing/CloudTrail. Bigger lift: swaps the `anthropic` SDK
  call for `boto3`'s `bedrock-runtime`, needs the model confirmed
  available in-region, and an IAM policy scoped to `bedrock:InvokeModel`.

---

## 9. Slack notifications

All four write-action alerts share one visual convention — a consistent
header emoji for brand recognition in the channel, color-coded per outcome
(green for a positive/verified change, red/pink for a negative one). Each
includes who made the change (`session_username`), the entity affected, and
the new value.

Currently posts to a single hardcoded webhook URL — the "shared webhook"
gap described in §8.

---

## 10. File map

| File                                                                | Role                                                                                                                                                                       |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/static/js/components/layout/BulkActionsWidget.jsx`             | The entire chat UI, all client-side routing/handler logic, all action cards.                                                                                               |
| `src/backend/admin/opsAssistant.py`                                 | Claude classification (`classify_intent`), the system prompt, all `notify_slack_*` functions, `ALLOWED_ACTIONS`/`HIGH_RISK_*` gating.                                      |
| `src/backend/views.py`                                              | Flask routes — `/api/ops-assistant` (classification proxy), `/api/environment` (dev-gate check), plus every action's actual read/write route and its audit-trail stamping. |
| `src/backend/admin/reputation.py`                                   | AWS calls for global and per-merchant reputation.                                                                                                                          |
| `src/backend/admin/adminUsers.py`, `src/backend/merchantFlask/*.py` | AWS calls for users, merchants, tokens — shared with the rest of the Admin Portal, not skAi-specific.                                                                      |
| `src/backend/tests/test_opsAssistant.py`                            | Unit tests for classification, sanitization, and Slack notifications.                                                                                                      |
| `src/static/public/css/popUps.css`                                  | All `.bulkWidget*` styling.                                                                                                                                                |
| `.env` / `.env.example`                                             | Local credential loading (gitignored / template).                                                                                                                          |
