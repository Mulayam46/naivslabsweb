"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  Inbox, Brain, Zap, Target,
  ArrowRight, Check,
} from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    n: "01",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    darkColor: "#38bdf8",
    title: "Connect your signals",
    subtitle: "Gmail · Slack · Calendar · Meetings",
    body: "Navis plugs into the tools you already use. No migration, no new inbox. It reads the stream silently and starts building context from day one.",
    checks: ["Gmail & Slack connected in < 2 min", "Calendar read access only", "Zero data stored on-device"],
    visual: <SignalVisual />,
  },
  {
    n: "02",
    color: "#7c3aed",
    bg: "#f5f3ff",
    darkColor: "#a78bfa",
    title: "Build the Company Brain",
    subtitle: "Episodic · Semantic · State · Decision memory",
    body: "Every email thread, meeting, and Slack message is parsed into structured memory. Navis knows who matters, what's at risk, and what was decided last week.",
    checks: ["4 memory types, always in sync", "Cites the memory it used", "Gets sharper every week"],
    visual: <BrainVisual />,
  },
  {
    n: "03",
    color: "#059669",
    bg: "#f0fdf4",
    darkColor: "#34d399",
    title: "Trigger Decision Skills",
    subtitle: "Deal Recovery · Investor Prep · Onboarding Risk",
    body: "When a pattern matches a skill, Navis acts — drafts the follow-up, flags the risk, books the meeting. You approve. It learns from the outcome.",
    checks: ["Skills fire automatically", "Human approval before action", "Outcome feeds next decision"],
    visual: <SkillVisual />,
  },
  {
    n: "04",
    color: "#f59e0b",
    bg: "#fffbeb",
    darkColor: "#fbbf24",
    title: "Surface the next action",
    subtitle: "Today · Ask Navis · Weekly digest",
    body: "Every morning: one screen, one next action. Every Sunday: a digest that tells you what changed, what you missed, and what to do differently next week.",
    checks: ["Next decision on wake", "Weekly digest every Sunday 8pm", "NPS 60 · benchmark is 40"],
    visual: <ActionVisual />,
  },
];

/* ── Mini visuals ── */
function SignalVisual() {
  const sources = [
    { label: "Gmail", color: "#ea4335", n: 12 },
    { label: "Slack", color: "#4a154b", n: 8 },
    { label: "Calendar", color: "#1d4ed8", n: 3 },
    { label: "Meetings", color: "#059669", n: "live" },
  ];
  return (
    <div className="flex flex-col gap-2">
      {sources.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASING }}
          className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-2.5 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-sm font-semibold text-slate-700">{s.label}</span>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
            {s.n}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function BrainVisual() {
  const types = [
    { label: "Episodic", desc: "What happened", color: "#7c3aed", w: "85%" },
    { label: "Semantic", desc: "What it means", color: "#0ea5e9", w: "72%" },
    { label: "State", desc: "What's active now", color: "#059669", w: "91%" },
    { label: "Decision", desc: "What was chosen", color: "#f59e0b", w: "64%" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {types.map((t, i) => (
        <motion.div
          key={t.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.09, duration: 0.5 }}
          className="space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">{t.label}</span>
            <span className="text-[10px] text-slate-400">{t.desc}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: t.w }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.09, duration: 0.9, ease: EASING }}
              className="h-full rounded-full"
              style={{ backgroundColor: t.color }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SkillVisual() {
  const skills = [
    { label: "Deal Recovery", pct: 92, color: "#7c3aed", fired: true },
    { label: "Investor Prep", pct: 84, color: "#0ea5e9", fired: false },
    { label: "Onboarding Risk", pct: 78, color: "#f59e0b", fired: true },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {skills.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: EASING }}
          className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-slate-700">{s.label}</span>
            {s.fired && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">
                Fired
              </span>
            )}
          </div>
          <span className="text-sm font-black" style={{ color: s.color }}>{s.pct}%</span>
        </motion.div>
      ))}
    </div>
  );
}

function ActionVisual() {
  return (
    <div className="flex flex-col gap-2.5">
      {[
        { time: "8:02 AM", text: "Call Arjun before CFO window closes", urgent: true },
        { time: "Sunday 8PM", text: "Weekly digest ready — 3 decisions this week", urgent: false },
        { time: "Live", text: "NPS 60 · 43 beta users · 70% WAU", urgent: false },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: EASING }}
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
            item.urgent ? "border-amber-200 bg-amber-50" : "border-slate-100 bg-white"
          } shadow-sm`}
        >
          <span className={`mt-0.5 text-[10px] font-bold shrink-0 ${item.urgent ? "text-amber-500" : "text-slate-400"}`}>
            {item.time}
          </span>
          <span className="text-xs font-semibold text-slate-700 leading-relaxed">{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Step panel ── */
function StepPanel({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASING, delay: index * 0.05 }}
      className="group relative grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl md:grid-cols-2"
    >
      {/* Left — content */}
      <div className="flex flex-col justify-between p-8 md:p-10">
        {/* Step number */}
        <div className="mb-8 flex items-center gap-4">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black"
            style={{ backgroundColor: step.bg, color: step.color }}
          >
            {step.n}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
            {step.subtitle}
          </span>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="mb-4 text-3xl font-black tracking-tight text-slate-900 leading-tight">
            {step.title}
          </h3>
          <p className="text-sm leading-7 text-slate-500">{step.body}</p>
        </div>

        {/* Checks */}
        <ul className="mt-8 flex flex-col gap-2.5">
          {step.checks.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: EASING }}
              className="flex items-center gap-2.5 text-sm text-slate-600"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: step.bg }}
              >
                <Check className="h-3 w-3" style={{ color: step.color }} />
              </span>
              {c}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right — visual panel */}
      <div
        className="flex items-center justify-center p-8 md:p-10"
        style={{ backgroundColor: step.bg }}
      >
        {/* Big faded number */}
        <div className="relative w-full">
          <span
            className="pointer-events-none absolute -top-6 right-0 select-none text-[120px] font-black leading-none opacity-[0.07]"
            style={{ color: step.color }}
          >
            {step.n}
          </span>
          <div className="relative z-10">
            {step.visual}
          </div>
        </div>
      </div>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: step.color }}
      />
    </motion.div>
  );
}

/* ── Section header with scroll progress bar ── */
function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASING }}
      className="mb-16"
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="h-px w-12 bg-slate-200" />
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400">
          How it works
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end">
        <h2 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl leading-[0.95]">
          Four steps.
          <br />
          <span className="text-slate-300">One brain.</span>
        </h2>
        <p className="text-lg leading-8 text-slate-500 max-w-md lg:pl-8">
          Navis doesn't replace your tools — it sits above them, reads everything,
          and turns scattered signals into a single clear next action.
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-24 md:px-8 md:py-32"
    >
      {/* Scroll progress bar — top of section */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-slate-100">
        <motion.div
          className="h-full bg-linear-to-r from-sky-400 via-violet-500 to-amber-400"
          style={{ width: progressWidth }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader />

        {/* Step grid — 2 columns on large screens */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {STEPS.map((step, i) => (
            <StepPanel key={step.n} step={step} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASING }}
          className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <p className="text-lg font-bold text-slate-900">Ready to see it in action?</p>
            {/* <p className="mt-1 text-sm text-slate-500">43 beta users · ₹0 marketing · NPS 60</p> */}
          </div>
          <a
            href="#notify"
            className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]"
          >
            Join the waitlist
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
