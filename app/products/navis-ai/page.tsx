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

import Image from "next/image";
import { Hero3 } from "./hero3";

const EASING = [0.22, 1, 0.36, 1] as const;

// ─── Data ────────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    number: "01",
    tag: "The Pipeline",
    title: "Sources to Memory, in one pass",
    description:
      "Navis plugs into Gmail, Slack, and Calendar. Every signal becomes a structured event with extracted entities, writes to one of four memory types, and can trigger a Decision Skill — automatically.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
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
        body: "Drives the urgency window for skills — CFO-named deals trigger Deal Recovery; Friday investor sync triggers Investor Prep with prep window mapped.",
      },
      {
        icon: Zap,
        title: "Structured event types",
        body: "customer_deal_risk · investor_followup · team_unblock · meeting_prep · doc_update — typed events with entities, memory writes, and skill triggers.",
      },
    ],
  },
  {
    number: "02",
    tag: "The Brain",
    title: "Four memory types · cited per answer",
    description:
      "Episodic, Semantic, State, and Decision memory. Every recommendation lands with the exact memory citations behind it. People are derived from your team roster + active decisions, not editorial.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
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
        body: "Every State rule traces back to the Decision Memory entry that produced it. \"Direct calls beat email at late stage\" → learned from outcome dm_001.",
      },
    ],
  },
  {
    number: "03",
    tag: "The Hands",
    title: "Decisions, governance, audit trace",
    description:
      "Navis ranks every open decision, gates external actions through per-channel policies, executes through real connectors, and writes a tamper-evident trace to the Audit Log on every step.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
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
        body: "Owner + delegates per decision. Multi-actor traces capture teammate acknowledgements. Delegate via chat — \"Ask Priya to handle data room\" — fully audited.",
      },
    ],
  },
];

const REVERSE_PROMPTS = [
  {
    prompt:
      "Rank 1 · Deal Recovery · Call Arjun before the CFO window closes. Close probability moves 34% → 66% with a direct call. Behavior modifier: +12% (your fast-actor pattern).",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
  {
    prompt:
      "Rank 2 · Investor Prep · Prepare Sequoia brief. Friday sync in 24h, 4 data room items unassigned. Owner-assigned data rooms close 41% faster (learned from dm_002).",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
  {
    prompt:
      "Rank 3 · Team Ops · Reply to Priya in #founder-priorities. 4 unanswered messages, 6h silent on your side. Naming owners now unblocks parallel work for 3 teammates.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
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
      "Company Brain · 4 memory types",
      "Decision Stack · top 3 ranked",
      "Ask Navis chat · same engine",
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
      "Decision Skills · versioned + evolving",
      "Behavior model · personalised modifiers",
      "Decision Trace · audit chain per decision",
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
      "Light team layer · owner + delegates",
      "Multi-actor traces + delegate-via-chat",
      "Audit Log · tamper-evident, exportable",
      "Decision API · v1 endpoints",
    ],
    cta: "Contact us",
    href: "mailto:hello@navislabs.in",
    highlight: false,
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect your work", body: "Gmail, Slack, and Google Calendar connect in minutes. Navis starts reading immediately — no manual setup, no tagging.", color: "#06b6d4" },
  { step: "02", title: "Build the Company Brain", body: "Every signal becomes a typed event with extracted entities, written to one of four memory types — Episodic, Semantic, State, Decision.", color: "#a78bfa" },
  { step: "03", title: "Trigger Decision Skills", body: "When a pattern matches a skill — Deal Recovery, Investor Prep, Onboarding Risk — Navis surfaces the next decision with cited memory.", color: "#34d399" },
  { step: "04", title: "Rank the stack", body: "Multi-decision priority engine scores every open decision by impact, behavior modifier, downstream effects, and conflicts.", color: "#fbbf24" },
  { step: "05", title: "Execute with governance", body: "Per-channel action policies (auto / confirm / approval / blocked) gate every external action. You see one screen, one next move.", color: "#f87171" },
  { step: "06", title: "Audit, learn, evolve", body: "Every action emits a tamper-evident trace. Outcomes feed Decision Memory, update behavior model, and produce operating rules.", color: "#2dd4bf" },
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
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#03081e" }}>
      <Navbar />

      {/* ── Hero ── */}
      <Hero3 />

      {/* ── Three Layers ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-800">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-14 max-w-2xl">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400 mb-3">
                Three layers. One decision system.
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Not a chatbot.{" "}
                <span className="text-slate-500">Not a dashboard. Not a productivity tool.</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Navis is the decision infrastructure layer for modern teams.
                It reads your work, structures it into a Company Brain, ranks
                every open decision by impact, and executes with per-channel
                action policies and a tamper-evident audit trace.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {LAYERS.map((layer, i) => {
              const LayerIcon = layer.icon;
              return (
                <FadeUp key={layer.number} delay={i * 0.08}>
                  <div
                    className="rounded-2xl border p-8 md:p-10 backdrop-blur-sm"
                    style={{ borderColor: layer.border, backgroundColor: layer.bg }}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                      <div className="shrink-0">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                          style={{ borderColor: layer.border, backgroundColor: `${layer.color}15` }}
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
                        <h3 className="text-2xl font-semibold tracking-tight text-white">{layer.title}</h3>
                        <p className="mt-2 text-base leading-7 text-slate-300">{layer.description}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {layer.features.map((feat) => {
                        const FeatIcon = feat.icon;
                        return (
                          <div
                            key={feat.title}
                            className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 backdrop-blur-sm"
                          >
                            <div
                              className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${layer.color}15` }}
                            >
                              <FeatIcon className="h-4 w-4" style={{ color: layer.color }} />
                            </div>
                            <h4 className="text-sm font-semibold text-white mb-1.5">{feat.title}</h4>
                            <p className="text-xs leading-5 text-slate-400">{feat.body}</p>
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
      <section className="px-4 py-20 md:px-8 border-t border-slate-800 bg-slate-900/20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400 mb-3">
                Works with your stack
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Reads where work happens
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Sources connect in minutes. No migration, no new inbox, no manual tagging.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
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
                  className="flex items-center justify-center p-8 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
                >
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    width={120}
                    height={40}
                    className="h-8 w-auto brightness-100 invert-0"
                  />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Reverse Prompting ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-800 bg-slate-900/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <FadeUp>
              <div>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 mb-3">
                  Decision Stack
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                  The AI that decides{" "}
                  <span className="text-emerald-400">what matters now</span>.
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Most AI tools wait for you to ask. Navis ranks the top open
                  decisions across your company — by impact, urgency window,
                  behavior modifier, downstream effects, and conflict — and
                  shows one screen with one next move.
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                  Each rank is grounded in cited memory and tied to a Decision
                  Skill. The Behavior layer applies your personalised modifier
                  on top.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-4">
                {REVERSE_PROMPTS.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-6 backdrop-blur-sm"
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
                        <p className="text-sm leading-6 text-slate-300">{item.prompt}</p>
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
      <section className="px-4 py-20 md:px-8 border-t border-slate-800">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400 mb-3">How it works</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                From signals to decisions.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Sources → Ingestion → Memory → Context → Decision → Action → Outcome → Learning. The canonical pipeline, fully traced and governed.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.06}>
                <div className="rounded-2xl border border-slate-700 bg-slate-800/30 p-6 h-full backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: item.color }}>
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      
      {/* ── Pricing ── */}
      <section className="px-4 py-20 md:px-8 border-t border-slate-800 bg-slate-900/20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400 mb-3">Pricing</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Individual · Team · Enterprise
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Private beta. Pricing finalised at public launch — early-access users get founding rates.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-6 lg:grid-cols-3">
            {PRICING.map((plan, i) => (
              <FadeUp key={plan.name} delay={i * 0.08}>
                <div
                  className="relative flex flex-col rounded-2xl border p-8 h-full backdrop-blur-sm"
                  style={{
                    borderColor: plan.highlight ? "rgba(167,139,250,0.4)" : "rgba(51,65,85,0.5)",
                    backgroundColor: plan.highlight ? "rgba(167,139,250,0.1)" : "rgba(30,41,59,0.3)",
                  }}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Most popular
                    </span>
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{plan.tag}</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-sm text-slate-400">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                        <span className="text-sm text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                    style={{
                      backgroundColor: plan.highlight ? "#a78bfa" : "rgba(51,65,85,0.5)",
                      color: plan.highlight ? "#03081e" : "#e2e8f0",
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
      <section className="px-4 py-20 md:px-8 border-t border-slate-800">
        <FadeUp>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400 mb-6">The vision</p>
            <blockquote className="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Navis doesn&apos;t summarize your work.{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                It decides what matters — and executes.
              </span>
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Every company is building AI that does the work. Navis builds the
              AI that decides which work matters — cited, traced, and sharper
              with every outcome. The moat is Decision Memory: every approve
              and ignore makes the next recommendation smarter.
            </p>
            <p className="mt-4 text-sm text-slate-400 sm:text-base">
              Someone still has to be in charge. Navis makes that person 10× better at it.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── Waitlist ── */}
      <section
        id="waitlist"
        className="px-4 py-20 md:px-8 border-t border-slate-800 bg-slate-900/20"
      >
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400 mb-4">Early access</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Join early access.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Onboarding founders, operators, and engineering leads who want a
              decision system — not another inbox. Private beta · limited seats.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="mailto:hello@navislabs.in"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
              >
                Join via email
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-7 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-slate-700/50 hover:text-white"
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