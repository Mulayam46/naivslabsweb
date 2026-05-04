export type ProductStatus = "live" | "build";

export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  status: ProductStatus;
  blurb: string;
  description: string;
  href: string;
  cta: string;
  secondaryHref: string;
  secondaryCta: string;
  metrics: { value: string; label: string }[];
  pillars: { title: string; body: string }[];
};

export const companyStats = [
  { value: "2", label: "Core products" },
  { value: "Decision", label: "intelligence focus" },
  { value: "Bangalore", label: "HQ" },
  { value: "Global", label: "Market" },
];

export const productFamily: Product[] = [
  {
    slug: "hireai",
    name: "HireAI",
    eyebrow: "Live product",
    status: "live",
    blurb: "AI hiring workflows for teams that want signal over noise.",
    description:
      "HireAI screens candidates, reads resumes at scale, and routes only the strongest matches into the hiring process. It helps teams move faster without losing judgment.",
    href: "https://hire-ai-voice-agent.vercel.app/",
    cta: "Open HireAI",
    secondaryHref: "/products/hireai",
    secondaryCta: "View product page",
    metrics: [
      { value: "Faster", label: "shortlisting" },
      { value: "Higher", label: "signal interviews" },
      { value: "Cleaner", label: "hiring pipelines" },
    ],
    pillars: [
      {
        title: "Screen at scale",
        body: "Read large applicant pools quickly and surface the most relevant profiles without extra manual review.",
      },
      {
        title: "Keep humans in the loop",
        body: "Route only strong matches to hiring teams so people focus on decisions, not repetitive triage.",
      },
      {
        title: "Move with consistency",
        body: "Create a hiring system that is repeatable across roles, teams, and search volume.",
      },
    ],
  },
  {
    slug: "navis-ai",
    name: "Navis AI",
    eyebrow: "In development",
    status: "build",
    blurb: "Decision intelligence for Gmail, Slack, and Calendar.",
    description:
      "Navis AI reads your work, structures it into a Company Brain across four memory types, ranks every open decision by impact and behavior, and executes through real connectors with full audit trace + governance.",
    href: "#notify",
    cta: "Join waitlist",
    secondaryHref: "/products/navis-ai",
    secondaryCta: "View product page",
    metrics: [
      { value: "4 types", label: "of memory" },
      { value: "3 skills", label: "shipped" },
      { value: "Audit", label: "on every action" },
    ],
    pillars: [
      {
        title: "Company Brain · 4 memory types",
        body: "Episodic, Semantic, State, and Decision memory. Every recommendation lands with the exact memory citations behind it.",
      },
      {
        title: "Decision Skills · versioned + evolving",
        body: "Reusable skills with v1 → v2 → v3 evolution. Each skill declares which memory types it consumes and learns from outcomes.",
      },
      {
        title: "Audit + governance · per-channel policies",
        body: "Auto · confirm · require approval · blocked. Tamper-evident trace per decision. Every action is exposed via the Decision API.",
      },
    ],
  },
];

export const companyPillars = [
  {
    title: "Decision-first AI",
    body: "We build systems that decide, not chatbots that summarise. Every product surfaces an action with cited memory behind it.",
  },
  {
    title: "Trace + governance, by default",
    body: "Every external action passes a per-channel policy gate and writes a tamper-evident trace. AI is only safe when it is auditable.",
  },
  {
    title: "Expandable platform",
    body: "The site and the company are structured so new products can be added without redesigning the brand from scratch.",
  },
];
