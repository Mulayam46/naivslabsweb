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
  { value: "1", label: "Platform vision" },
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
    blurb: "Decision intelligence for emails, meetings, and workflows.",
    description:
      "Navis AI connects signals across work, builds memory over time, and turns scattered inputs into a clear next action. It is the intelligence layer for modern teams.",
    href: "#notify",
    cta: "Join waitlist",
    secondaryHref: "/products/navis-ai",
    secondaryCta: "View product page",
    metrics: [
      { value: "Memory", label: "over time" },
      { value: "Context", label: "across work" },
      { value: "Decisions", label: "not dashboards" },
    ],
    pillars: [
      {
        title: "Understand the work",
        body: "Connect meetings, messages, and workflow signals into one coherent picture of what is happening.",
      },
      {
        title: "Build context memory",
        body: "Track priorities, decisions, and repeated patterns so the system gets sharper the longer it is used.",
      },
      {
        title: "Recommend the next step",
        body: "Surface what matters most instead of another summary, chart, or inbox full of noise.",
      },
    ],
  },
];

export const companyPillars = [
  {
    title: "Product-first AI",
    body: "We build concrete products, not abstract demos. Every release should feel useful on its own.",
  },
  {
    title: "Operational clarity",
    body: "Our systems are designed to reduce friction and help teams act faster with more confidence.",
  },
  {
    title: "Expandable platform",
    body: "The site and the company are structured so new products can be added without redesigning the brand from scratch.",
  },
];
