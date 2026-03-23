window.IAIDocs = {
  siteName: "IAI Documentation",
  siteUrl: "https://docs.iai.one",
  pages: [
    {
      id: "home",
      title: "IAI Documentation",
      shortTitle: "Overview",
      path: "/",
      category: "Overview",
      description: "The central knowledge hub for IAI workflows, communication, architecture, and deployment.",
      keywords: [
        "iai",
        "docs",
        "overview",
        "system overview",
        "quick links",
        "flow builder",
        "mail layer",
        "api reference"
      ]
    },
    {
      id: "getting-started",
      title: "Getting Started",
      shortTitle: "Getting Started",
      path: "/getting-started/",
      category: "Overview",
      description: "Start building and running your first IAI Flow in five minutes.",
      keywords: [
        "start",
        "first flow",
        "create flow",
        "run flow",
        "account",
        "execution",
        "output"
      ]
    },
    {
      id: "architecture",
      title: "Architecture",
      shortTitle: "Architecture",
      path: "/architecture/",
      category: "Overview",
      description: "The four-layer architecture: Platform API, Builder, Runtime, and Node System.",
      keywords: [
        "layers",
        "runtime",
        "builder",
        "database",
        "d1",
        "data flow"
      ]
    },
    {
      id: "flow",
      title: "Flow System",
      shortTitle: "Flow",
      path: "/flow/",
      category: "Systems",
      description: "How IAI Flow defines nodes, edges, execution, and visual builder behavior.",
      keywords: [
        "flow",
        "nodes",
        "edges",
        "builder",
        "execution",
        "condition",
        "http"
      ]
    },
    {
      id: "app",
      title: "App Surface",
      shortTitle: "App",
      path: "/app/",
      category: "Systems",
      description: "The operator workspace for dashboards, review, workflow control, and human-in-the-loop actions.",
      keywords: [
        "app",
        "operator workspace",
        "dashboard",
        "human review",
        "control surface",
        "mission control"
      ]
    },
    {
      id: "mail",
      title: "Mail System",
      shortTitle: "Mail",
      path: "/mail/",
      category: "Systems",
      description: "The communication layer for transactional mail, notifications, and alerts.",
      keywords: [
        "mail",
        "email",
        "transactional",
        "notification",
        "alert",
        "api"
      ]
    },
    {
      id: "api",
      title: "API Reference",
      shortTitle: "API",
      path: "/api/",
      category: "Systems",
      description: "Base URL, auth model, endpoints, and response contracts for the IAI platform.",
      keywords: [
        "api",
        "flows",
        "executions",
        "mail send",
        "session",
        "token"
      ]
    },
    {
      id: "security",
      title: "Security",
      shortTitle: "Security",
      path: "/security/",
      category: "Platform",
      description: "Security principles, Cloudflare stack, CSP model, and privacy defaults.",
      keywords: [
        "security",
        "privacy",
        "csp",
        "no tracking",
        "workers",
        "d1",
        "kv"
      ]
    },
    {
      id: "deployment",
      title: "Deployment",
      shortTitle: "Deployment",
      path: "/deployment/",
      category: "Platform",
      description: "Install, migrate, run locally, and deploy IAI services with Wrangler and Cloudflare.",
      keywords: [
        "deploy",
        "wrangler",
        "cloudflare",
        "d1 create",
        "migrate",
        "local"
      ]
    },
    {
      id: "sdk",
      title: "SDK",
      shortTitle: "SDK",
      path: "/sdk/",
      category: "Systems",
      description: "Future-ready SDK direction for JavaScript, REST client helpers, and CLI support.",
      keywords: [
        "sdk",
        "javascript",
        "rest client",
        "cli",
        "future"
      ]
    },
    {
      id: "use-cases",
      title: "Use Cases",
      shortTitle: "Use Cases",
      path: "/use-cases/",
      category: "Systems",
      description: "Reference scenarios across automation, business operations, and AI systems.",
      keywords: [
        "automation",
        "business",
        "crm",
        "notification",
        "prompt flow",
        "decision engine"
      ]
    },
    {
      id: "ecosystem",
      title: "Ecosystem",
      shortTitle: "Ecosystem",
      path: "/ecosystem/",
      category: "Overview",
      description: "How home.iai.one, app.iai.one, flow.iai.one, mail.iai.one, and docs.iai.one connect.",
      keywords: [
        "ecosystem",
        "home",
        "app",
        "flow",
        "mail",
        "docs",
        "system map"
      ]
    },
    {
      id: "faq",
      title: "FAQ",
      shortTitle: "FAQ",
      path: "/faq/",
      category: "Platform",
      description: "Answers to the most common questions about flows, pricing, and security.",
      keywords: [
        "faq",
        "free",
        "security",
        "build flow",
        "questions"
      ]
    },
    {
      id: "changelog",
      title: "Changelog",
      shortTitle: "Changelog",
      path: "/changelog/",
      category: "Platform",
      description: "Version milestones from MVP to builder upgrades and the future AI layer.",
      keywords: [
        "changelog",
        "version",
        "mvp",
        "builder upgrade",
        "ai layer"
      ]
    }
  ],
  nav: [
    {
      title: "Overview",
      pageIds: ["home", "getting-started", "architecture", "ecosystem"]
    },
    {
      title: "Systems",
      pageIds: ["app", "flow", "mail", "api", "sdk", "use-cases"]
    },
    {
      title: "Platform",
      pageIds: ["security", "deployment", "faq", "changelog"]
    }
  ],
  ecosystemLinks: [
    {
      label: "home.iai.one",
      href: "https://home.iai.one",
      description: "Vision and core infrastructure surface."
    },
    {
      label: "app.iai.one",
      href: "https://app.iai.one",
      description: "Operator workspace and human-facing control surface."
    },
    {
      label: "flow.iai.one",
      href: "https://flow.iai.one",
      description: "Workflow builder and runtime engine."
    },
    {
      label: "mail.iai.one",
      href: "https://mail.iai.one",
      description: "Communication and notification layer."
    },
    {
      label: "api.iai.one",
      href: "https://api.iai.one",
      description: "Platform API gateway and service surface."
    }
  ]
};
