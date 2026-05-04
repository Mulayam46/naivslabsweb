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
    tag: "The Pipeline",
    title: "Sources to Memory, in one pass",
    description:
      "Navis plugs into Gmail, Slack, and Calendar. Every signal becomes a structured event with extracted entities, writes to one of four memory types, and can trigger a Decision Skill — automatically.",
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.04)",
    border: "rgba(29,78,216,0.15)",
    icon: Inbox,
    features: [
      {
        icon: Mail,
        title: "Gmail",
        body: "Reads important threads, reply gaps, and customer messages. Feeds Episodic + Semantic + State memory. Powers Deal Recovery and Investor Prep skills.",
      },
      {
        icon: MessageSquare,
        title: "Slack",
        body: "Detects ownership gaps, blockers, and team escalations. Routes \"waiting on you\" signals into the light team layer so the right teammate is unblocked.",
      },
      {
        icon: CalendarClock,
        title: "Calendar",
        body: "Drives the urgency window for skills \u2014 CFO-named deals trigger Deal Recovery; Friday investor sync triggers Investor Prep with prep window mapped.",
      },
      {
        icon: Zap,
        title: "Structured event types",
        body: "customer_deal_risk \u00b7 investor_followup \u00b7 team_unblock \u00b7 meeting_prep \u00b7 doc_update \u2014 typed events with entities, memory writes, and skill triggers.",
      },
    ],
  },
  {
    number: "02",
    tag: "The Brain",
    title: "Four memory types · cited per answer",
    description:
      "Episodic, Semantic, State, and Decision memory. Every recommendation lands with the exact memory citations behind it. People are derived from your team roster + active decisions, not editorial.",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.04)",
    border: "rgba(124,58,237,0.15)",
    icon: Brain,
    features: [
      {
        icon: Brain,
        title: "Memory feeds Decision Skills",
        body: "Each Decision Skill declares which memory types it consumes. Deal Recovery uses all four; Investor Prep uses all four; Onboarding Risk uses three.",
      },
      {
        icon: BarChart2,
        title: "Behavior model",
        body: "Reads memory + outcomes to model your response patterns and per-stakeholder profiles. Adds a personalised modifier to every recommendation.",
      },
      {
        icon: CheckCircle2,
        title: "Operating rules with provenance",
        body: "Every State rule traces back to the Decision Memory entry that produced it. \"Direct calls beat email at late stage\" \u2192 learned from outcome dm_001.",
      },
    ],
  },
  {
    number: "03",
    tag: "The Hands",
    title: "Decisions, governance, audit trace",
    description:
      "Navis ranks every open decision, gates external actions through per-channel policies, executes through real connectors, and writes a tamper-evident trace to the Audit Log on every step.",
    color: "#059669",
    bg: "rgba(5,150,105,0.04)",
    border: "rgba(5,150,105,0.15)",
    icon: Inbox,
    features: [
      {
        icon: Inbox,
        title: "Multi-decision priority engine",
        body: "Decisions are scored by predicted impact, behavior modifier, downstream effects, and conflict with other open work. One screen, one next move.",
      },
      {
        icon: AlertCircle,
        title: "Per-channel action policies",
        body: "Auto · Confirm · Require approval · Blocked. Reply email = confirm. Cold email = approval. Schedule meeting = auto. Editable per workspace.",
      },
      {
        icon: CheckCircle2,
        title: "Decision Trace + Audit Log",
        body: "Every decision emits a 6–7 step trace: trigger → memory → reasoning → simulation → decision → execution → outcome. Stored immutable; exposed via /api/v1/decisions/{id}/trace.",
      },
      {
        icon: Users,
        title: "Light team layer",
        body: "Owner + delegates per decision. Multi-actor traces capture teammate acknowledgements. Delegate via chat \u2014 \"Ask Priya to handle data room\" \u2014 fully audited.",
      },
    ],
  },
];

const REVERSE_PROMPTS = [
  {
    prompt:
      "Rank 1 \u00b7 Deal Recovery \u00b7 Call Arjun before the CFO window closes. Close probability moves 34% \u2192 66% with a direct call. Behavior modifier: +12% (your fast-actor pattern).",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.05)",
    border: "rgba(220,38,38,0.15)",
  },
  {
    prompt:
      "Rank 2 \u00b7 Investor Prep \u00b7 Prepare Sequoia brief. Friday sync in 24h, 4 data room items unassigned. Owner-assigned data rooms close 41% faster (learned from dm_002).",
    color: "#d97706",
    bg: "rgba(217,119,6,0.05)",
    border: "rgba(217,119,6,0.15)",
  },
  {
    prompt:
      "Rank 3 \u00b7 Team Ops \u00b7 Reply to Priya in #founder-priorities. 4 unanswered messages, 6h silent on your side. Naming owners now unblocks parallel work for 3 teammates.",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.05)",
    border: "rgba(124,58,237,0.15)",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "TBD",
    period: "",
    tag: "Individual",
    features: [
      "Gmail + Slack + Calendar connectors",
      "Company Brain \u00b7 4 memory types",
      "Decision Stack \u00b7 top 3 ranked",
      "Ask Navis chat \u00b7 same engine",
    ],
    cta: "Join waitlist",
    href: "#waitlist",
    highlight: false,
  },
  {
    name: "Power",
    price: "TBD",
    period: "",
    tag: "Power user",
    features: [
      "Everything in Starter",
      "Decision Skills \u00b7 versioned + evolving",
      "Behavior model \u00b7 personalised modifiers",
      "Decision Trace \u00b7 audit chain per decision",
      "Per-channel action policies",
    ],
    cta: "Join waitlist",
    href: "#waitlist",
    highlight: true,
  },
  {
    name: "Team",
    price: "TBD",
    period: "",
    tag: "Per workspace",
    features: [
      "Everything in Power",
      "Light team layer \u00b7 owner + delegates",
      "Multi-actor traces + delegate-via-chat",
      "Audit Log \u00b7 tamper-evident, exportable",
      "Decision API \u00b7 v1 endpoints",
    ],
    cta: "Contact us",
    href: "mailto:hello@navislabs.ai",
    highlight: false,
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect your work", body: "Gmail, Slack, and Google Calendar connect in minutes. Navis starts reading immediately — no manual setup, no tagging.", color: "#1d4ed8" },
  { step: "02", title: "Build the Company Brain", body: "Every signal becomes a typed event with extracted entities, written to one of four memory types — Episodic, Semantic, State, Decision.", color: "#7c3aed" },
  { step: "03", title: "Trigger Decision Skills", body: "When a pattern matches a skill — Deal Recovery, Investor Prep, Onboarding Risk — Navis surfaces the next decision with cited memory.", color: "#059669" },
  { step: "04", title: "Rank the stack", body: "Multi-decision priority engine scores every open decision by impact, behavior modifier, downstream effects, and conflicts.", color: "#d97706" },
  { step: "05", title: "Execute with governance", body: "Per-channel action policies (auto / confirm / approval / blocked) gate every external action. You see one screen, one next move.", color: "#dc2626" },
  { step: "06", title: "Audit, learn, evolve", body: "Every action emits a tamper-evident trace. Outcomes feed Decision Memory, update behavior model, and produce operating rules.", color: "#0891b2" },
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
                Three layers. One decision system.
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Not a chatbot.{" "}
                <span className="text-slate-400">Not a dashboard.</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-500">
                Navis is decision infrastructure. It reads your work, structures it into a Company Brain,
                ranks every open decision, and executes with full governance and audit trace.
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
                  Decision Stack
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  The AI that ranks{" "}
                  <span className="text-emerald-600">every decision</span>{" "}
                  in your week.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-500">
                  Most AI tools wait for you to ask. Navis ranks the top open decisions across your
                  company — by impact, behavior modifier, downstream effects, and conflict — and shows
                  you one screen with one next move.
                </p>
                <p className="mt-4 text-base leading-7 text-slate-400">
                  Each ranking is grounded in cited memory and tied to a Decision Skill. Behavior model
                  applies your personalised modifier on top.
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
                          Navis is ranking
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
                One pipeline. One brain.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
                Sources → Ingestion → Memory → Context → Decision → UI. The canonical pipeline,
                fully traced and governed.
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
                In private beta. Pricing finalised at public launch — early-access users get founding rates.
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
              In 5 years, every founder, operator, and engineering lead will run their week on a Navis.
              Not because they picked a productivity tool — because they picked a decision system that
              cited its memory, traced every action, and got sharper with every outcome. The moat is
              the Decision Memory: every approve and ignore makes the next recommendation smarter.
            </p>
            <p className="mt-4 text-base text-slate-400">
              Someone still has to be in charge. Navis makes that person 10× better at it.
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
              We are onboarding founders, operators, and engineering leads who want a decision system,
              not another inbox. Private beta — limited seats.
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
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 px-7 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900"
              >
                Back to home
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-400 uppercase tracking-[0.22em]">
              Private beta · Bangalore · Built on the Decision API
            </p>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </main>
  );
}


















