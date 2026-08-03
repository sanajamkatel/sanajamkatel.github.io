export type WorkImage = { src: string; alt: string; type: string };

export type DeepDivePoint = { label?: string; text: string };

export type DeepDiveSection = {
  title: string;
  problem: string;
  diagram?: string;
  points: DeepDivePoint[];
  result: string;
};

export type WorkEntry = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  technologies: string[];
  achievements: string[];
  images: WorkImage[];
  video?: string;
  link: string | null;
  toBeDone?: string[];
  deepDive?: DeepDiveSection[];
};

export const workExperience: WorkEntry[] = [
  {
    id: 'aeropay-swe-intern',
    title: 'Software Engineer Intern',
    company: 'Aeropay',
    location: 'Chicago, IL',
    period: 'Jun 2026 - Aug 2026',
    type: 'internship',
    description: 'Reduced internal operational workflow response times by ~90% by building a generative AI agent into the Enterprise Operations Platform; also redesigned banking microservices to enable dual-rail ACH and Real-Time Payment (RTP) processing with 100% path parity across APIs.',
    technologies: ['Python', 'Claude API', 'AWS Bedrock', 'React', 'Flask', 'REST APIs', 'Express.js', 'PostgreSQL', 'Slack API', 'OpenAPI', 'Docker'],
    achievements: [
      'Embedded a generative AI agent (Claude API) into the Enterprise Operations Platform to automate risk mitigations, transaction voiding, and account suspensions via secure REST endpoints—condensing multi-step manual workflows and cutting response times by ~90%.',
      'Implemented permission gates, confirmation dialogs, and real-time event-driven Slack and database audit logging, achieving 100% data traceability for administrative actions.',
      'Redesigned banking microservices to support concurrent ACH and Real-Time Payment (RTP) capabilities using routing tables and authoring OpenAPI specs to achieve 100% read/write path parity.',
      'Resolved complex backend edge cases across microservices—redesigning configuration update logic, fixing search pagination defects, and resolving 500 server crashes in production.'
    ],
    images: [
      { src: 'https://sanajamkatel.github.io/aeropay-swe-intern/SkyeAgentDemo.mov', alt: 'Skye AI Agent Demo', type: 'Video' },
      { src: 'https://sanajamkatel.github.io/aeropay-swe-intern/ODFIMOdal.mov', alt: 'ODFI Config Modal Demo', type: 'Video' }
    ],
    link: null,
    deepDive: [
      {
        title: 'Generative AI Operations Agent & Orchestration Engine',
        problem: 'Operations, Fraud, and Compliance teams had to manually navigate multiple internal dashboards, verify identity data, and make separate API calls to void transactions or suspend accounts. Each high-risk ticket took 10–15 minutes of manual context-switching.',
        points: [
          { label: 'Ingestion Layer', text: 'Built a UI entry point connected to an Express.js API Gateway.' },
          { label: 'LLM Orchestration Layer', text: 'Integrated Claude API via AWS Bedrock using tool-calling (function calling).' },
          { label: 'Execution Pipeline', text: 'The agent parses natural language intent, extracts structured JSON arguments (e.g., user_id, transaction_id, action_type), validates payload schema against OpenAPI definitions, and securely routes the payload to existing REST endpoints.' }
        ],
        result: 'Replaced multi-step manual steps with a single intent-driven action, cutting response times by ~90%.'
      },
      {
        title: 'Human-in-the-Loop Confirmation & Event-Driven Audit Engine',
        problem: 'Giving an AI agent direct write access to financial endpoints introduces production risk (accidental account bans or incorrect transaction voids). Additionally, compliance rules require strict audit trails for administrative actions.',
        points: [
          { label: 'State Machine & Permission Gates', text: 'Implemented a two-phase commit UI pattern ("Show-Before-Execute"). The AI agent proposes an action payload, which is displayed in a confirmation dialog requiring manual operator approval.' },
          { label: 'Event-Driven Audit Pipeline', text: 'Once executed, the API gateway publishes an asynchronous audit payload. An event worker writes the log to a PostgreSQL audit table while simultaneously dispatching a structured webhook payload to internal Slack channels.' }
        ],
        result: 'Maintained 100% data traceability and prevented unauthorized or accidental production mutations.'
      },
      {
        title: 'Multi-Rail Banking Microservice Architecture (ACH + RTP)',
        problem: 'The existing banking service was strictly coupled to ACH payment flows. Introducing Real-Time Payments (RTP) created race conditions and schema conflicts across payment status updates.',
        points: [
          { label: 'Capability Routing Tables', text: 'Redesigned the microservice using a strategy pattern. Incoming transaction requests check a dynamic routing table to evaluate bank support for ACH vs. RTP rails based on settlement speed, limits, and fee structures.' },
          { label: 'API Contract Normalization', text: 'Authored updated OpenAPI (Swagger) specifications to enforce identical payload structures for both payment paths, unifying status codes and webhook responses.' }
        ],
        result: 'Achieved 100% read/write path parity across banking rails, allowing smooth fallback between ACH and instant RTP processing.'
      },
      {
        title: 'Production Edge Case Resolution & Service Stability',
        problem: 'Microservices experienced transient 500 errors caused by key-value ambiguity in config updates, unhandled search pagination bounds, and ambiguous auth error handling.',
        points: [
          { label: 'Key Presence vs. Value Truthiness', text: 'Fixed a subtle bug in JSON config parsing where missing keys were incorrectly evaluated as null/cleared values, preventing unintended overwrite of production configuration variables.' },
          { label: 'Pagination Bounds Safety', text: 'Added defensive validation bounds to pagination limits and offsets across database query layers, preventing uncaught memory leaks and crash loops.' }
        ],
        result: 'Eliminated 500 server crashes in production and improved diagnostic clarity for downstream developers.'
      },
      {
        title: 'Self-Serve ODFI Bank Routing Configuration Modal',
        problem: 'Before this existed, routing which bank account a merchant\'s ACH/RTP payments settle through required someone to manually insert rows into the database. This modal makes that self-serve for ops: pick a bank (ODFI), enter routing/account numbers, optionally enable RTP and a separate ACH subledger, save.',
        diagram: `┌─────────────────────────────┐
│  ODFIConfigModal.jsx (React) │  ← merchantDetails passed in as a prop from the
│  client-side validation      │     parent merchant page (this modal doesn't fetch
│  + form state                │     the initial data itself, just renders it)
└──────────────┬────────────────┘
               │ POST /api/merchant/{id}/odfi
               │ POST /api/merchant/{id}/subledger   (fired together via Promise.all)
               ▼
┌─────────────────────────────┐
│  Flask admin proxy           │  adminMerchant.py:
│  (ap-admin-portal backend)   │  update_merchant_odfi() / update_merchant_subledger()
└──────────────┬────────────────┘
               │ POST {core-api}/admin/merchant/{id}/odfi
               │ POST {core-api}/admin/merchant/{id}/subledger
               ▼
┌─────────────────────────────┐
│  Core Payments API           │  ap-pay-api — dispatches by odfi_short_name +
│  (separate repo, ap-pay-api) │  payment_type (BANK_CAPABILITIES pattern)
└──────────────┬────────────────┘
               ▼
┌─────────────────────────────┐
│  Database                    │  merchant bank account row + GenericSupplementalContent
│                               │  (key-value overrides: subledger accounts, billing account)
└─────────────────────────────┘`,
        points: [
          { label: 'Two independent write paths, not one', text: 'The save button fires two separate POST requests in parallel (Promise.all) — one for the core ODFI/bank-account record (odfiPayload), one for the subledger config (RTP account, ACH account, billing override) (subledgerPayload). They\'re deliberately split because they\'re conceptually different things at the API layer: the ODFI endpoint owns "which bank does this merchant\'s money move through," the subledger endpoint owns "which sub-accounts track that money once it\'s there." Splitting them means a subledger-only change doesn\'t need to touch the core bank account record and vice versa.' },
          { label: 'ABA routing-number checksum (validateAba)', text: 'Real bank routing numbers follow a 3-7-1 weighted-digit checksum divisible by 10. This runs client-side before submit so a typo\'d routing number gets caught instantly instead of round-tripping to the API to fail.' },
          { label: 'Conditional field locking (rtpLocked, achLocked)', text: 'RTP is only offered for CRB/MVB, ACH subledger only for CRB. Picking a different default bank auto-disables and clears those fields (handleDefaultOdfiChange) so the form can\'t hold an invalid combination (e.g., ACH subledger data for a bank that doesn\'t support it).' },
          { label: 'Required-field gate', text: 'If ACH is toggled on, the account number becomes mandatory before you\'re even allowed to hit confirm.' },
          { label: 'Why "isDirty" exists', text: 'The save button is disabled unless something actually changed (isDirty, comparing every field\'s live state against its initial value derived from merchantDetails). Prevents accidental no-op saves and gives ops a visual signal that they\'ve actually modified something before they can submit.' },
          { label: 'After a successful save', text: 'The response isn\'t just used to close the modal — setMerchantDetails(...) immediately patches the parent\'s local state with the new routing number, account number, and subledger attributes, so the merchant summary view updates instantly without needing a full page refetch.' }
        ],
        result: 'Turned a manual, DB-insert-only workflow into a validated, self-serve modal for ops — with two independent write paths, client-side checksum and field-locking validation, dirty-state gating, and instant parent-state sync after save.'
      }
    ]
  },
  {
    id: 'aeropay',
    title: 'DevOps Engineer Intern',
    company: 'Aeropay',
    location: 'Chicago, IL',
    period: 'Jun 2025 - Aug 2025',
    type: 'internship',
    description: 'Reduced documentation search time from 30 minutes to 30 seconds by building a full-stack internal documentation site; also created CLI tool documentation with auto-generated updates. Served 30+ engineers daily with GitHub Pages, CI/CD, and AWS S3 + CloudFront with JumpCloud SSO.',
    technologies: ['Docusaurus', 'MDX', 'GitHub Actions', 'AWS S3', 'CloudFront', 'IAM', 'TypeScript', 'OCLIF', 'JumpCloud SSO'],
    achievements: [
      'Reduced documentation search time from 30 minutes to 30 seconds by building a full-stack internal documentation site using Docusaurus (MDX, custom charts, integrated search), serving 30+ engineers daily and hosted on GitHub Pages with automated CI/CD via GitHub Actions; also tested the site using AWS S3 + CloudFront with JumpCloud SSO access controls.',
      'Created a documentation site for a CLI tool (used for automating login, role-based access, and token generation for AWS and databases) that auto-generates and updates files using OCLIF\'s markdown generator and GitHub Actions.'
    ],
    images: [
      { src: process.env.PUBLIC_URL + '/aeropay/screenshot.png', alt: 'Documentation Site', type: 'Website' },
      { src: process.env.PUBLIC_URL + '/aeropay/aeropay1.png', alt: 'Interns', type: 'Team' },
      { src: process.env.PUBLIC_URL + '/aeropay/2.png', alt: 'Build a Bear', type: 'Event' },
      { src: process.env.PUBLIC_URL + '/aeropay/IMG_9274.jpg', alt: 'Service Day', type: 'Event' },
      { src: process.env.PUBLIC_URL + '/aeropay/IMG_5240 2.png', alt: 'First Day', type: 'Team' }
    ],
    link: null
  },
  {
    id: 'argonne',
    title: 'High Performance Computing Bootcamp Participant',
    company: 'Argonne National Laboratory',
    location: 'Lemont, IL',
    period: 'August 2025',
    type: 'bootcamp',
    description: 'Participated in an intensive bootcamp focused on supercomputing systems and their applications in high-performance computing.',
    technologies: ['Large Language Models (LLM)', 'Retrieval-Augmented Generation (RAG)', 'LangChain', 'Gemini', 'Data Visualization', 'Machine Learning', 'AI for Scientific Computing'],
    achievements: [
      'Gained hands-on exposure to supercomputing systems like Aurora and their applications in HPC',
      'Participated in workshops on data visualization, machine learning, and AI for scientific computing',
      'Collaborated on a team project to build an interactive HPC chatbot, using both RAG-based and non-RAG approaches with LangChain and Gemini'
    ],
    images: [
      { src: process.env.PUBLIC_URL + '/argonne/IMG_8658 2.jpg', alt: 'Argonne Bootcamp', type: 'Bootcamp' },
      { src: process.env.PUBLIC_URL + '/argonne/1.png', alt: 'Aurora Systems', type: 'System' },
      { src: process.env.PUBLIC_URL + '/argonne/2.png', alt: 'Supercomputing Session', type: 'Learning' },
      { src: process.env.PUBLIC_URL + '/argonne/3.png', alt: 'HPC Workshop', type: 'Workshop' },
      { src: process.env.PUBLIC_URL + '/argonne/4.png', alt: 'Advanced HPC', type: 'Advanced' }
    ],
    link: null
  }
];
