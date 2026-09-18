export type TechStackRow = { layer: string; technology: string; purpose: string };
export type CapabilityRow = { capability: string; description: string };
export type TitledPoint = { title?: string; text: string };

export type CaseStudy = {
  role: string;
  whatItIs: string;
  coreProblem: string;
  designPrinciple: string;
  techStack: TechStackRow[];
  architectureDiagram: string;
  executionLifecycle: TitledPoint[];
  safetyArchitecture: TitledPoint[];
  readCapabilities: CapabilityRow[];
  writeCapabilities: CapabilityRow[];
  sideEffectNote: string;
  keyDecisions: TitledPoint[];
  knownGaps: string[];
  futureRoadmap: TitledPoint[];
};

export type ProjectEntry = {
  id: number;
  slug: string;
  title: string;
  bullets: string[];
  images: string[];
  technologies: string[];
  category: string;
  github?: string;
  featured: boolean;
  period: string;
  demo?: string;
  writeup?: string;
  hasDetailPage?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: ProjectEntry[] = [
  {
    id: 6,
    slug: 'skai',
    title: 'skAi | AI Ops Assistant (Admin Chatbot)',
    bullets: [
      'Built a Claude-powered chat assistant embedded in the Aeropay Admin Portal that lets ops perform account actions — lookups, phone updates, VIP/reputation changes, fraud lockdowns — via plain-English requests instead of multi-page forms.',
      'Designed a two-gate authorization system: a hardcoded high-risk keyword check runs before classification and a second check runs after, so a write action never executes unless both the raw message and Claude\'s resolved action agree it\'s safe.',
      'Orchestrated a 4-step fraud lockdown state machine (block reputation → void pending transactions → remove bank accounts → disable bank linking) with a live progress card and mid-run cancellation.',
      'Every write action stamps an audit trail and fires a Slack notification; the widget fails closed via a dev-only environment gate so it never renders outside local/dev.'
    ],
    images: [
      process.env.PUBLIC_URL + '/skai/chatbot-conversation.png',
      process.env.PUBLIC_URL + '/skai/lockdown.png',
      process.env.PUBLIC_URL + '/skai/declined-history.png',
      process.env.PUBLIC_URL + '/skai/update-phone.png',
      process.env.PUBLIC_URL + '/skai/slack-alert.png',
      process.env.PUBLIC_URL + '/skai/live-demo.mov',
      process.env.PUBLIC_URL + '/aeropay-swe-intern/SkyeAgentDemo.mov'
    ],
    technologies: ['Claude API', 'Python', 'Flask', 'React', 'REST APIs', 'Slack API', 'AWS'],
    category: 'ai',
    writeup: process.env.PUBLIC_URL + '/skai/skai-briefing.html',
    featured: true,
    period: 'Summer 2026',
    hasDetailPage: true,
    caseStudy: {
      role: 'Software Engineering Intern (Capstone Project)',
      whatItIs: 'An AI assistant embedded as a chat widget in every page of the company\'s internal Admin Portal, letting the ops team perform account actions — fraud lockdown, voiding transactions, reputation/VIP changes, phone updates, user/merchant lookups — by typing a plain-English request instead of navigating forms across multiple pages.',
      coreProblem: 'Eliminating multi-step admin click friction during time-sensitive fraud operations, without giving an LLM direct execution access to production data or credentials.',
      designPrinciple: '"Claude classifies intent, the app executes it." The model never touches AWS, user data, or performs a write itself — it returns a structured decision (which action, which entity), and this app\'s own existing Flask routes perform the actual read/write, the same routes the rest of the Admin Portal UI already uses.',
      techStack: [
        { layer: 'Frontend', technology: 'React, JavaScript', purpose: 'Chat widget (BulkActionsWidget.jsx, ~3,500 lines) mounted globally in app.jsx — message history, deterministic parsing fallbacks, confirmation/picker cards, live multi-step progress UI' },
        { layer: 'Backend Framework', technology: 'Python, Flask', purpose: 'REST routing, classification proxy, payload validation, audit-trail stamping, all pre-existing admin read/write routes' },
        { layer: 'Identity & Access', technology: 'JumpCloud SSO (SAML)', purpose: 'Protects the Admin Portal as a whole (inherited, not skAi-specific); skAi adds its own additional gates on top' },
        { layer: 'AI Inference', technology: 'Anthropic API — Claude Haiku (claude-haiku-4-5-20251001)', purpose: 'Low-latency intent classification & entity extraction only, via forced tool-use. Called directly today; migrating to AWS Bedrock is a planned future step, not yet done' },
        { layer: 'Internal Infrastructure', technology: 'AeroPay AWS Admin API', purpose: 'The single source of truth for users, merchants, transactions. All reads/writes go through this app\'s existing admin/* and merchantFlask/* modules — no separate database layer' },
        { layer: 'Auditing & Telemetry', technology: 'Slack webhook', purpose: 'Fire-and-forget notification after a write succeeds, includes who made the change and what changed. Currently a single hardcoded webhook (personal/test channel) — moving to a shared team channel is open work' }
      ],
      architectureDiagram: `[ User types message in React widget ]
            │
            ▼
[ Flask: POST /api/ops-assistant ]
            │
  (1) Sanitize input + pre-classification keyword gate
            │
            ▼
[ Anthropic API — Claude Haiku, forced tool-use ]
            │
  (2) Returns structured classification (action + entity fields) — never free text
            │
            ▼
[ Flask: normalize + validate action, second authorization gate ]
            │
  (3) Widget layers deterministic regex fallbacks on top of the classification,
      then renders a confirmation/picker card
            │
            ▼
[ User clicks Confirm ] ──► [ Flask route for that action ] ──► [ AeroPay AWS Admin API ]
                                        │
                              (4) Audit trail stamped (changedBy/changedAt)
                                        │
                                        ▼
                              [ Slack webhook: fire-and-forget notification ]`,
      executionLifecycle: [
        { title: 'Frontend request', text: 'the widget POSTs the user\'s message and last-8-turn history to /api/ops-assistant.' },
        { title: 'Sanitize + pre-classification keyword gate', text: 'the message is truncated/stripped of injection phrasing, then checked against a hardcoded high-risk keyword list before it ever reaches Claude — a write attempt from an unauthorized session is rejected at this point regardless of what Claude would classify it as.' },
        { title: 'Forced tool-use classification', text: 'Claude is called with tool_choice forcing a fixed schema — it can only return {action, entityId, entityType, personName, ...}, never free text or arbitrary code.' },
        { title: 'Post-classification checks', text: 'the action string is normalized/validated against an allow-list, and a second authorization gate checks the resolved action against a high-risk-action list — a message only reaches a real write if both the raw keywords and the resolved action pass.' },
        { title: 'Deterministic overrides + confirmation', text: 'the frontend layers regex-based ID extraction and a couple of purpose-built overrides (e.g. forcing merchant-specific-reputation routing when a message unambiguously names two entity IDs) on top of Claude\'s output, then always requires an explicit Confirm/Cancel step before any mutating call fires.' },
        { title: 'Execution + audit', text: 'on confirm, the relevant existing Flask route performs the write against the AWS Admin API, stamps changedBy/changedAt from the session onto the response, and fires a Slack webhook notification as a side effect.' }
      ],
      safetyArchitecture: [
        { title: 'Inherited identity guardrail', text: 'the whole Admin Portal (and by extension skAi) sits behind JumpCloud SSO/SAML — unauthenticated clients can\'t reach the app at all.' },
        { title: 'Input sanitization + pre-classification keyword gate', text: 'messages are length-capped and stripped of known prompt-injection phrasing, then checked against a raw keyword list before Claude is invoked — this check can\'t be fooled by a misclassification because it never depends on Claude\'s output.' },
        { title: 'Forced tool-use output', text: 'the Anthropic call uses tool_choice to force a single fixed schema response — Claude structurally cannot return arbitrary text, code, or an out-of-schema action.' },
        { title: 'Post-classification authorization gate', text: 'a second, independent check runs against the resolved action (not the raw text) before anything executes — two layers have to agree before a write is allowed through.' },
        { title: 'Decoupled execution layer', text: 'Claude has no AWS credentials and no API access of any kind — it can only describe intent; this app\'s pre-existing Flask/admin modules perform the actual read or write.' },
        { title: 'Human-in-the-loop confirmation', text: 'every write action (lockdown, void, reputation change, phone/merchant update) requires an explicit picker + Confirm/Cancel step in the UI — nothing mutates on the classification response alone. Status pickers additionally disable whichever option matches the entity\'s current state, so a click can\'t silently no-op into a misleading "updated" audit card.' },
        { title: 'Environment gate', text: 'skAi is currently restricted to run only in the dev environment — both server-side (403 if ENV != \'dev\') and client-side (the widget only renders after confirming dev via a dedicated endpoint, failing closed if that check fails for any reason).' },
        { title: 'Prod write allow-list', text: 'separately, in a production environment, write actions are further restricted to a specific set of authorized emails; read-only lookups are not gated.' }
      ],
      readCapabilities: [
        { capability: 'User/name/email lookup', description: 'Finds a user by name, ID, email, or phone; retries full-name search on just the first word if an exact match misses' },
        { capability: 'Merchant lookup', description: 'Finds a merchant by ID or name' },
        { capability: 'Bare-number auto-detect', description: 'A lone number with no "user"/"merchant" keyword is checked as both a User ID and Merchant ID in parallel' },
        { capability: 'Show transactions', description: 'Lists a user\'s or merchant\'s transactions, paginated' },
        { capability: 'Decline history', description: 'Lists a user\'s declined transactions' },
        { capability: 'Decline reason', description: 'Looks up why a specific transaction declined (ACH return code + explanation)' },
        { capability: 'Risk queue', description: 'Lists fraud-flagged transactions, optionally scoped to a merchant' }
      ],
      writeCapabilities: [
        { capability: 'Reputation', description: 'Changes a user\'s global reputation level' },
        { capability: 'Merchant-specific reputation (VIP)', description: 'Changes a user\'s reputation at one specific merchant (Standard/VIP/Blocked) — the one action needing two entity IDs in a single message, handled with a dedicated schema field plus a deterministic regex fallback' },
        { capability: 'Update phone', description: 'Updates a user\'s phone number; validates format client-side and no-ops if unchanged' },
        { capability: 'Verify merchant', description: 'Toggles a merchant\'s verified/unverified status' },
        { capability: 'Void (single or bulk)', description: 'Voids one or all pending transactions for a user' },
        { capability: 'Fraud lockdown (compound action)', description: 'Orchestrated 4-step sequence: block reputation → void all pending transactions → delete bank accounts → disable bank linking. Runs as a client-side state machine with a live per-step progress card and a manual "Stop lockdown" interrupt; each step fails independently without blocking the rest' }
      ],
      sideEffectNote: 'Slack notifications fire after void, phone update, merchant verify, and merchant reputation changes — one-way, audit only, never read from.',
      keyDecisions: [
        { title: 'Two-layer, independent authorization', text: 'a raw-text keyword gate and a resolved-action gate both have to pass, so a deterministic frontend override can change routing but can never bypass the server-side write gate.' },
        { title: 'Context via short rolling history, not persistent threads', text: 'the last 8 conversation turns are sent with each request so follow-ups like "what user is that" resolve correctly, but this history lives client-side only and isn\'t persisted for audit purposes (a known gap).' },
        { title: 'Audit trail on every write', text: 'changedBy/changedAt is stamped from the session onto every write response and surfaced in the UI, specifically because "who changed this and when" wasn\'t visible before this feature.' },
        { title: 'Fail-closed environment gating', text: 'the widget defaults to not rendering if its environment check fails for any reason, rather than defaulting to visible.' }
      ],
      knownGaps: [
        'Read actions aren\'t audited, only writes — an ops lookup through skAi currently leaves no trail beyond generic app request logs.',
        'No PII redaction before a message reaches the Anthropic API — names, phone numbers, and emails typed into the chat are sent as-is for classification.',
        'No rate limiting on the classification endpoint.',
        'Secrets are per-developer, not shared — the Anthropic key and Slack webhook currently fall back to hardcoded local-dev values rather than a shared AWS Secrets Manager secret (the mechanism already exists elsewhere in the codebase via apSecrets.get_secret(), just not wired up here yet).',
        'No frontend test coverage for the widget itself — backend classification and Slack notification logic do have unit tests.'
      ],
      futureRoadmap: [
        { title: 'Shared secrets', text: 'move the Anthropic API key and Slack webhook into AWS Secrets Manager, matching the pattern already used for AeroPay API credentials.' },
        { title: 'AWS Bedrock migration', text: 'swap the direct Anthropic API call for boto3\'s bedrock-runtime, moving auth to IAM and usage into existing AWS billing/CloudTrail.' },
        { title: 'Role-Based Access Control', text: 'map JumpCloud directory groups to action execution rights in the Flask middleware (e.g., restrict lockdown to a Fraud_Team group).' },
        { title: 'Read auditing, PII handling review, and rate limiting', text: 'to close the known gaps before any production rollout.' }
      ]
    }
  },
  {
    id: 5,
    slug: 'care-equity',
    title: 'Care Equity | Full-Stack Healthcare Bias Tracker',
    bullets: [
      'Code2040 Hackathon — Engineered a full-stack Next.js and Node.js application to surface maternal healthcare inequities.',
      'Built responsive hospital discovery tool, interactive data visualizations (Recharts), and anonymous reporting system.',
      'Designed REST API with Express and MongoDB; implemented same-origin API proxy for cross-browser and mobile compatibility.',
      'Deployed on Vercel (Frontend) and Render (Backend) with environment-based routing and keep-awake strategies for high availability.'
    ],
    images: [
      `${process.env.PUBLIC_URL || ''}/care-equity/1.png`,
      `${process.env.PUBLIC_URL || ''}/care-equity/2.png`,
      `${process.env.PUBLIC_URL || ''}/care-equity/3.png`,
      `${process.env.PUBLIC_URL || ''}/care-equity/4.png`
    ],
    technologies: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Recharts', 'REST API', 'Vercel', 'Render'],
    category: 'web',
    github: 'https://github.com/sanajamkatel/Care-Equity',
    demo: 'https://care-equity.vercel.app/',
    featured: true,
    period: 'Feb 2026'
  },
  {
    id: 1,
    slug: 'predictive-maintenance',
    title: 'Predictive Maintenance System',
    bullets: [
      'Developed ML-powered predictive maintenance system achieving 96% accuracy (Random Forest on 876K sensor readings).',
      'Engineered 30+ temporal features from 4 raw sensors, improving baseline accuracy from 75% to 96%.',
      'Implemented SMOTE for class imbalance and cost-sensitive learning; achieved 95% recall with 4% false alarm rate.',
      'Built Flask REST API with O(1) prediction complexity (<1ms response) and Streamlit dashboard with real-time fleet analytics.'
    ],
    images: [
      process.env.PUBLIC_URL + '/PredictiveMaintenanceSystem/1.png',
      process.env.PUBLIC_URL + '/PredictiveMaintenanceSystem/2.png',
      process.env.PUBLIC_URL + '/PredictiveMaintenanceSystem/3.png'
    ],
    technologies: ['Python', 'scikit-learn', 'Flask', 'Streamlit', 'Random Forest', 'SMOTE', 'Data Analytics', 'REST API', 'Kaggle Dataset'],
    category: 'ai',
    github: 'https://github.com/sanajamkatel/Predictive-Maintenance-System',
    demo: 'https://sanajamkatel.github.io/Predictive-Maintenance-System/',
    featured: true,
    period: 'Sep 2025'
  },
  {
    id: 2,
    slug: 'medical-recommendation',
    title: 'Medical Recommendation System',
    bullets: [
      'Developed healthcare system predicting diseases from symptoms using SVC, Random Forest, and Gradient Boosting.',
      'Built and deployed RESTful APIs with Flask for backend processing.',
      'Designed responsive web interface with AI-powered symptom matching and Google Search API for up-to-date treatment suggestions.'
    ],
    images: [
      process.env.PUBLIC_URL + '/projects/ML/careconnect%20cover.png',
      process.env.PUBLIC_URL + '/projects/ML/careconnect-1st.png',
      process.env.PUBLIC_URL + '/projects/ML/careconnect1st.png',
      process.env.PUBLIC_URL + '/projects/ML/careconnect%20cover1.png'
    ],
    technologies: ['Python', 'Machine Learning', 'Flask', 'SVC', 'Random Forest', 'Gradient Boosting', 'Google Search API', 'RESTful APIs'],
    category: 'ai',
    github: 'https://github.com/sanajamkatel/End-to-End-Medical-Recommendation-System',
    featured: true,
    period: 'Jan 2025 - Feb 2025'
  },
  {
    id: 3,
    slug: 'twitter-clone',
    title: 'Twitter Clone',
    bullets: [
      'Developed full-stack Twitter clone with user authentication, tweet posting, and following/unfollowing (React, Vite, Node.js, Express, MongoDB, Cloudinary).',
      'Designed and implemented RESTful APIs for secure authentication, profile management, and data storage.',
      'Utilized JWT for token-based auth, bcrypt for password encryption, and custom middleware for efficient routing.'
    ],
    images: [
      process.env.PUBLIC_URL + '/projects/twitter/cover.png',
      process.env.PUBLIC_URL + '/projects/twitter/dashboard.png',
      process.env.PUBLIC_URL + '/projects/twitter/posts.png'
    ],
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT', 'bcrypt', 'RESTful APIs'],
    category: 'web',
    github: 'https://github.com/sanajamkatel/twitter-clone',
    featured: true,
    period: 'May 2024 - Dec 2024'
  },
  {
    id: 4,
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe Game',
    bullets: [
      'Developed two Tic-Tac-Toe implementations: C++ console (OOP, 2D array, input validation, win detection) and C++ web server with HTML frontend.',
      'Web server: C++ backend with HTTP API endpoints; HTML/CSS/JS frontend with glass-morphism design, animations, score tracking, and mobile-responsive layout.'
    ],
    images: [
      process.env.PUBLIC_URL + '/ttt/1.png'
    ],
    technologies: ['C++', 'HTML', 'CSS', 'JavaScript', 'RESTful API', 'Object-Oriented Programming', 'Makefile', 'cpp-httplib'],
    category: 'fun',
    github: 'https://github.com/sanajamkatel/TicTacToe-CPP',
    demo: 'https://tictactoe-cpp.onrender.com/',
    featured: true,
    period: 'Aug 2025'
  }
];
