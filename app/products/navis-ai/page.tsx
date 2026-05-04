"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Inbox,
  Video,
  Brain,
  CalendarClock,
  BarChart2,
  Mail,
  MessageSquare,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero2 } from "@/components/hero2";
import Image from "next/image";

const EASING = [0.22, 1, 0.36, 1] as const;

// ─── Data ────────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    number: "01",
    tag: "The Hands",
    title: "Autonomous execution — 24/7 in the cloud",
    description:
      "Navis runs continuously in the background. It does not wait for you to open it.",
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.04)",
    border: "rgba(29,78,216,0.15)",
    icon: Inbox,
    features: [
      {
        icon: Mail,
        title: "Gmail Intelligence",
        body: "Reads every incoming email. Categorises by urgency. Drafts replies with full thread context. Flags team conflicts. Surfaces top 20 in your morning briefing.",
      },
      {
        icon: MessageSquare,
        title: "Slack Intelligence",
        body: "Monitors team channels. Detects 3-day stuck threads. Drafts smart replies. Sends daily channel digest. Escalates blockers before you notice them.",
      },
      {
        icon: CalendarClock,
        title: "Smart Calendar",
        body: "\u201cSchedule a call with Rajan about Series A docs\u201d \u2192 reads email history \u2192 finds mutual free slots \u2192 creates invite with AI agenda \u2192 books it.",
      },
      {
        icon: Zap,
        title: "Live Activity Feed",
        body: "\u201c07:42 Drafted reply to investor email. 08:15 Flagged 3 critical messages. 09:00 Blocked 2\u20134pm focus time.\u201d \u2014 makes Navis feel alive.",
      },
    ],
  },
  {
    number: "02",
    tag: "The Eyes",
    title: "Real-time meeting intelligence",
    description:
      "Navis joins every meeting as a silent bot. A macOS overlay panel appears on your screen. This is the feature no competitor has built at this depth.",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.04)",
    border: "rgba(124,58,237,0.15)",
    icon: Video,
    features: [
      {
        icon: Clock,
        title: "Pre-Meeting Brief (T\u221230 min)",
        body: "Who is attending and their background. Last email thread summary. Open action items. 3\u20135 sharp questions to ask.",
      },
      {
        icon: Video,
        title: "Live Copilot (macOS overlay)",
        body: "\u201c20% discount\u201d \u2192 \u20b940K off \u20b92L deal. \u201cThey\u2019ve mentioned pricing 3x \u2014 ask budget.\u201d You should say this\u2026 Action items captured live.",
      },
      {
        icon: CheckCircle2,
        title: "Post-Meeting Pipeline (T+5 min)",
        body: "Full searchable transcript saved. Action items \u2192 Navis tasks. Follow-up email drafted. Goal progress updated.",
      },
    ],
  },
  {
    number: "03",
    tag: "The Brain",
    title: "Reverse prompting — the feature no one else has built",
    description:
      "Every AI tool waits for you to ask it something. Navis asks YOU the questions you should be asking yourself. This is the #1 differentiator.",
    color: "#059669",
    bg: "rgba(5,150,105,0.04)",
    border: "rgba(5,150,105,0.15)",
    icon: Brain,
    features: [
      {
        icon: Brain,
        title: "Behavioral Pattern Engine",
        body: "Tracks meeting hours, email load, focus time, Slack activity \u2014 compares against your stated goals every week.",
      },
      {
        icon: AlertCircle,
        title: "macOS Native Push Notifications",
        body: "Not a dashboard card. A direct alert on your screen. Forces the question.",
      },
      {
        icon: BarChart2,
        title: "Sunday Weekly Digest",
        body: "Week in numbers (meetings vs deep work vs goals) + one action for next week. Sent automatically every Sunday 8pm.",
      },
      {
        icon: Users,
        title: "B2B Team Intelligence",
        body: "\u201cYour team spent 58% of time in meetings. Engineering benchmark: 32%.\u201d Manager dashboard with no individual privacy breach.",
      },
    ],
  },
];

const REVERSE_PROMPTS = [
  {
    prompt:
      "You said reducing meetings was your top priority. Meeting hours went 12 \u2192 14 this week. Was this intentional?",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.05)",
    border: "rgba(220,38,38,0.15)",
  },
  {
    prompt:
      "You spent 8 hours in product reviews, but your Q2 goal is to close 3 enterprise deals. Should we protect more time for sales?",
    color: "#d97706",
    bg: "rgba(217,119,6,0.05)",
    border: "rgba(217,119,6,0.15)",
  },
  {
    prompt:
      "Engineering has been stuck on the auth bug for 5 days. No one has escalated. Do you know what is blocking them?",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.05)",
    border: "rgba(124,58,237,0.15)",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "\u20b9499",
    period: "/month",
    tag: "Individual",
    features: [
      "Gmail + Slack triage",
      "Smart scheduling",
      "Weekly digest",
      "Up to 5 meetings/month via bot",
    ],
    cta: "Join waitlist",
    href: "#waitlist",
    highlight: false,
  },
  {
    name: "Power",
    price: "\u20b92,000",
    period: "/month",
    tag: "Power user",
    features: [
      "Everything in Starter",
      "Live meeting copilot (unlimited)",
      "macOS overlay + push alerts",
      "Full behavioral analytics",
      "Razorpay billing",
    ],
    cta: "Join waitlist",
    href: "#waitlist",
    highlight: true,
  },
  {
    name: "Team",
    price: "\u20b98,000\u201325,000",
    period: "/month",
    tag: "Per org / 5\u201350 seats",
    features: [
      "Everything in Power",
      "Manager team dashboard",
      "Org-level Slack insights",
      "Admin controls + SSO",
      "Dedicated onboarding",
    ],
    cta: "Contact us",
    href: "mailto:hello@navislabs.ai",
    highlight: false,
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect your work", body: "Gmail, Slack, and Google Calendar connect in minutes. Navis starts reading immediately — no manual setup, no tagging.", color: "#1d4ed8" },
  { step: "02", title: "Build context memory", body: "Navis tracks priorities, decisions, and repeated patterns. After 90 days it knows your work patterns better than you do.", color: "#7c3aed" },
  { step: "03", title: "Join every meeting", body: "A silent bot joins via Recall.ai. A macOS overlay shows you what to say in real-time. Action items captured automatically.", color: "#059669" },
  { step: "04", title: "Watch for drift", body: "Behavioral pattern engine compares your actual time allocation against your stated goals every single week.", color: "#d97706" },
  { step: "05", title: "Ask the question", body: "When you drift, Navis pushes a direct notification to your screen. Not a report. A question that forces a decision.", color: "#dc2626" },
  { step: "06", title: "Get sharper over time", body: "The longer you use Navis, the more accurate its recommendations. Switching means starting from zero. That is the moat.", color: "#0891b2" },
];

// ─── Reusable fade-up wrapper ─────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASING, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NavisAIPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <Hero2 />

      {/* ── Three Layers ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-100">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600/70 mb-3">
                Three layers. One operating system for how you work.
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Not a meeting tool.{" "}
                <span className="text-slate-400">Not an email tool.</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-500">
                Navis is the intelligence layer that connects every signal into one loop and then asks you
                the questions you should be asking yourself.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {LAYERS.map((layer, i) => {
              const LayerIcon = layer.icon;
              return (
                <FadeUp key={layer.number} delay={i * 0.08}>
                  <div
                    className="rounded-2xl border p-8 md:p-10"
                    style={{ borderColor: layer.border, backgroundColor: layer.bg }}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                      <div className="shrink-0">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                          style={{ borderColor: layer.border, backgroundColor: `${layer.color}12` }}
                        >
                          <LayerIcon className="h-6 w-6" style={{ color: layer.color }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: layer.color }}>
                            Layer {layer.number}
                          </span>
                          <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold" style={{ borderColor: layer.border, color: layer.color }}>
                            {layer.tag}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{layer.title}</h3>
                        <p className="mt-2 text-base leading-7 text-slate-500">{layer.description}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {layer.features.map((feat) => {
                        const FeatIcon = feat.icon;
                        return (
                          <div
                            key={feat.title}
                            className="rounded-xl border border-slate-200 bg-white p-5"
                          >
                            <div
                              className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${layer.color}12` }}
                            >
                              <FeatIcon className="h-4 w-4" style={{ color: layer.color }} />
                            </div>
                            <h4 className="text-sm font-semibold text-slate-800 mb-1.5">{feat.title}</h4>
                            <p className="text-xs leading-5 text-slate-500">{feat.body}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

            {/* ── Integration Showcase ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600/70 mb-3">
                Works with your stack
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Connects in minutes
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
                Navis integrates with the tools you already use. No migration. No new workflows.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {
             [
  {
    name: "Gmail",
    logo: "https://cdn.simpleicons.org/gmail"
  },
 {
    name: "Slack",
    logo: "https://dl.svgcdn.com/svg/logos/slack.svg"
  },
  {
    name: "Google Calendar",
    logo: "https://cdn.simpleicons.org/googlecalendar"
  },
  {
    name: "Zoom",
    logo: "https://cdn.simpleicons.org/zoom"
  },
  {
    name: "Google Meet",
    logo: "https://cdn.simpleicons.org/googlemeet"
  },
    {
    name: "Microsoft Teams",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg"
  },
  {
    name: "Notion",
    logo: "https://cdn.simpleicons.org/notion"
  },
  {
    name: "Linear",
    logo: "https://cdn.simpleicons.org/linear"
  }
].map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-center p-8 rounded-xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                >
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Reverse Prompting ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <FadeUp>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600/80 mb-3">
                  Reverse prompting
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  The only AI that asks{" "}
                  <span className="text-emerald-600">you</span>{" "}
                  the questions.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-500">
                  Every other tool waits for you to ask it something. Navis watches your patterns and
                  pushes the question directly to your screen — not a dashboard card, a direct alert.
                </p>
                <p className="mt-4 text-base leading-7 text-slate-400">
                  No competitor in the YC W26 batch, no funded AI meeting tool, no enterprise SaaS has
                  reverse prompting at behavioral depth. This is a genuine category-defining feature.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-4">
                {REVERSE_PROMPTS.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: item.border, backgroundColor: item.bg }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <Brain className="h-4 w-4" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: item.color }}>
                          Navis is asking
                        </p>
                        <p className="text-sm leading-6 text-slate-700">{item.prompt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-100">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600/70 mb-3">How it works</p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                One loop. Every signal.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
                Email → Slack → Calendar → Meeting → Reflection → Goal. The full loop, connected.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.06}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 h-full">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: item.color }}>
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      

      
      

      {/* ── Pricing ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600/70 mb-3">Pricing</p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Individual → Team → Enterprise
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
                Gross margin starts at 59% and scales to 75%+ at 1,000 users. Margins improve with scale.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-6 lg:grid-cols-3">
            {PRICING.map((plan, i) => (
              <FadeUp key={plan.name} delay={i * 0.08}>
                <div
                  className="relative flex flex-col rounded-2xl border p-8 h-full"
                  style={{
                    borderColor: plan.highlight ? "rgba(124,58,237,0.4)" : "rgba(15,23,42,0.1)",
                    backgroundColor: plan.highlight ? "rgba(124,58,237,0.04)" : "#fff",
                  }}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Most popular
                    </span>
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{plan.tag}</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-sm text-slate-400">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                        <span className="text-sm text-slate-600">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                    style={{
                      backgroundColor: plan.highlight ? "#7c3aed" : "rgba(15,23,42,0.06)",
                      color: plan.highlight ? "#fff" : "#0f172a",
                    }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-100">
        <FadeUp>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600/70 mb-6">The vision</p>
            <blockquote className="text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Every company in 2026 is building AI that does the work.{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600">
                Navis builds the AI that decides which work matters.
              </span>
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-500">
              In 5 years, every founder, operator, and engineering lead will have a Navis. Not because
              they chose a productivity tool. Because they chose an intelligence layer that made them
              irreversibly better at deciding what matters. The moat is not the product — it is 90 days
              of pattern data that no competitor can replicate.
            </p>
            <p className="mt-4 text-base text-slate-400">
              Someone still has to be in charge. Navis makes that person 10x better at it.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── Waitlist ── */}
      <section
        id="waitlist"
        className="px-4 py-20 md:px-8 border-t border-slate-100 bg-slate-50/60"
      >
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600/70 mb-4">Early access</p>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Be early to Navis AI.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500">
              We are onboarding founders, operators, and engineering leads who want to be part of the
              beta. Live product at n-avis.live. Paying users already on Razorpay.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="mailto:hello@navislabs.ai"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
              >
                Join via email
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://n-avis.live"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 px-7 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900"
              >
                Try live product
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-400 uppercase tracking-[0.22em]">
              n-avis.live · Bangalore · Seed round open
            </p>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </main>
  );
}


















