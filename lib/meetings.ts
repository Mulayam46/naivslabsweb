/* ═══════════════════════════════════════════════════════════
   Meetings — the "Let's Talk" dialog.

   Calendly owns the calendar, availability, timezones, the booking
   form, confirmation and emails. Everything here is NavisLabs shell.

   Required in .env.local — NEXT_PUBLIC_* must be read as static
   property accesses so Next inlines them at build time:

     NEXT_PUBLIC_CALENDLY_EXPLORE          → Investor Conversation
     NEXT_PUBLIC_CALENDLY_DESIGN_PARTNER   → Become a Design Partner
     NEXT_PUBLIC_CALENDLY_ENTERPRISE       → Enterprise Evaluation

   A missing variable is reported to the console and the card opens an
   email fallback. There is deliberately no substitute URL: silently
   booking someone into the wrong meeting is worse than not booking.
═══════════════════════════════════════════════════════════ */

export type FounderId = "abhishek" | "mulayam";

export type Founder = {
  id: FounderId;
  name: string;
  role: string;
  initials: string;
  /** Served from public/ — the path is the URL, with no /public prefix. */
  photo: string;
};

export const FOUNDERS: Record<FounderId, Founder> = {
  abhishek: {
    id: "abhishek",
    name: "Abhishek Meena",
    role: "Founder & CEO",
    initials: "AM",
    photo: "/abhishek.png",
  },
  mulayam: {
    id: "mulayam",
    name: "Mulayam Kumar",
    role: "Co-founder",
    initials: "MK",
    photo: "/Mulayam.jpeg",
  },
};

export const FOUNDER_LIST: Founder[] = [FOUNDERS.abhishek, FOUNDERS.mulayam];

/** Reads a required Calendly URL. Reports rather than substituting. */
/* These values are inlined into the client bundle at build time and end
   up both in an iframe src and in an href, so a typo or a bad deploy
   config would ship an off-site link under our own booking UI. Validate
   the scheme and host here rather than trusting the environment: a bad
   value degrades to the mailto fallback instead of navigating away. */
function calendlyUrl(name: string, value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) {
    console.error(
      `[NavisLabs] Missing ${name}. That meeting cannot be booked until it is set in .env.local and the app is rebuilt.`,
    );
    return null;
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    console.error(`[NavisLabs] ${name} is not a valid URL: ${raw}`);
    return null;
  }

  if (url.protocol !== "https:" || url.hostname !== "calendly.com") {
    console.error(
      `[NavisLabs] ${name} must be an https://calendly.com URL. Got: ${url.origin}`,
    );
    return null;
  }

  return url.toString();
}

export type Meeting = {
  id: string;
  title: string;
  minutes: number;
  scheduling: string;
  confirmation: string;
  description: string;
  action: string;
  hosts: FounderId[];
  url: string | null;
};

export const MEETINGS: Meeting[] = [
  {
    id: "explore",
    title: "Explore NavisLabs",
    minutes: 30,
    scheduling: "Round robin",
    confirmation: "Requires confirmation",
    description: "See NavisLabs on your own organization.",
    action: "Book demo",
    hosts: ["abhishek", "mulayam"],
    url: calendlyUrl(
      "NEXT_PUBLIC_CALENDLY_EXPLORE",
      process.env.NEXT_PUBLIC_CALENDLY_EXPLORE,
    ),
  },
  {
    id: "design-partner",
    title: "Design Partner",
    minutes: 45,
    scheduling: "Collective",
    confirmation: "Requires confirmation",
    description: "Shape the first production release with us.",
    action: "Apply",
    hosts: ["abhishek"],
    url: calendlyUrl(
      "NEXT_PUBLIC_CALENDLY_DESIGN_PARTNER",
      process.env.NEXT_PUBLIC_CALENDLY_DESIGN_PARTNER,
    ),
  },
  {
    id: "investor",
    title: "Investor Conversation",
    minutes: 30,
    scheduling: "Collective",
    confirmation: "Requires confirmation",
    description:
      "For founders, investors and strategic partners interested in NavisLabs.",
    action: "Schedule",
    hosts: ["abhishek", "mulayam"],
    url: calendlyUrl(
      "NEXT_PUBLIC_CALENDLY_ENTERPRISE",
      process.env.NEXT_PUBLIC_CALENDLY_ENTERPRISE,
    ),
  },
];

/* ── Founder story ────────────────────────────────────────
   Trust is built before anyone clicks a CTA, so this lives on the
   homepage as well as in the dialog. One source, two surfaces. */

export const FOUNDER_TAGLINE = "Building NavisLabs together since 2025.";

export const FOUNDER_SUMMARY =
  "We've been building together since 2025, after meeting during an engineering internship where Mulayam was Abhishek's senior engineer. What began as solving internal workflow problems became NavisLabs — Organizational Intelligence Infrastructure for AI-native organizations.";

export const FOUNDER_NOTE: string[] = [
  "Hi, thanks for being here.",
  "We're Abhishek and Mulayam, founders of NavisLabs.",
  "We met in early 2025 during an engineering internship, where Mulayam was Abhishek's senior engineer. After working together, we realized organizations lose valuable knowledge because decisions, conversations and commitments are spread across dozens of tools.",
  "We started NavisLabs to solve that problem.",
  "Today we're building Organizational Intelligence Infrastructure that continuously understands how organizations operate and helps both people and AI agents make better decisions.",
  "If you're exploring AI inside your company, we'd love to learn how you think about the future of work.",
];

export const CONTACT_EMAIL = "hello@navislabs.in";
