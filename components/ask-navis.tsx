"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationControls, AnimatePresence } from "motion/react";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedBadge from "./ui/animated-badge";

const EASING = [0.22, 1, 0.36, 1] as const;

// Annotation steps — each one positions a cursor + tooltip over a feature
const STEPS = [
  {
    id: "next-decision",
    cursor: { x: "14%", y: "13%" },
    tooltip: { side: "right" as const },
    label: "Today's #1 decision",
    body: "Navis ranks every open decision by impact, urgency window, and your behavior pattern. One screen. One next move.",
    color: "#38bdf8", // cyan-400
  },
  {
    id: "ask-navis",
    cursor: { x: "38%", y: "28%" },
    tooltip: { side: "right" as const },
    label: "Question or command",
    body: "Same engine answers questions and executes commands. Both honor your action policies and write to the Audit Log.",
    color: "#a78bfa", // violet-400
  },
  {
    id: "company-brain",
    cursor: { x: "82%", y: "62%" },
    tooltip: { side: "left" as const },
    label: "Cited from memory",
    body: "Every answer cites the exact memory: which email, which meeting, which past decision. Episodic · Semantic · State · Decision.",
    color: "#34d399", // emerald-400
  },
  {
    id: "decision-skills",
    cursor: { x: "14%", y: "72%" },
    tooltip: { side: "right" as const },
    label: "Policy + audit trace",
    body: "Every executed action passes a per-channel policy gate and writes a tamper-evident trace to the Audit Log.",
    color: "#fbbf24", // amber-400
  },
];

const STEP_DURATION = 2800; // ms per step

function AnimatedCursor({
  x,
  y,
  active,
}: {
  x: string;
  y: string;
  active: boolean;
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={`${x}-${y}`}
          className="pointer-events-none absolute z-30"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: EASING }}
        >
          {/* Ripple ring */}
          <motion.span
            className="absolute -inset-3 rounded-full border border-white/40"
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", repeat: Infinity, repeatDelay: 0.4 }}
          />
          {/* Cursor icon */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-lg shadow-black/20 ring-1 ring-black/10">
            <MousePointer2 className="h-3.5 w-3.5 text-slate-800" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Tooltip({
  step,
  active,
}: {
  step: (typeof STEPS)[number];
  active: boolean;
}) {
  const isLeft = step.tooltip.side === "left";
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={step.id}
          className="pointer-events-none absolute z-40"
          style={{
            left: step.cursor.x,
            top: step.cursor.y,
            // offset tooltip so it doesn't overlap the cursor
            transform: isLeft
              ? "translate(calc(-100% - 36px), -50%)"
              : "translate(36px, -50%)",
          }}
          initial={{ opacity: 0, x: isLeft ? 8 : -8, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: isLeft ? 8 : -8, scale: 0.95 }}
          transition={{ duration: 0.4, ease: EASING, delay: 0.15 }}
        >
          <div className="w-52 rounded-xl border border-white/20 bg-slate-900/95 p-3.5 shadow-xl shadow-black/30 backdrop-blur-md">
            {/* Accent bar */}
            <div
              className="mb-2 h-0.5 w-8 rounded-full"
              style={{ backgroundColor: step.color }}
            />
            <p className="text-xs font-semibold text-white">{step.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {step.body}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AskNavis() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle through steps
  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32" style={{ backgroundColor: "#03081e" }}>
      {/* Background blobs with adjusted opacity for dark background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/3 h-[500px] w-[700px] rounded-full blur-[96px]"
          style={{ background: "radial-gradient(ellipse, #a78bfa, #38bdf8, transparent)", opacity: 0.12 }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[500px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(ellipse, #34d399, #fbbf24, transparent)", opacity: 0.08 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ── Header row ── */}
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASING }}
            className="max-w-xl"
          >
            {/* <div className="mb-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 backdrop-blur-sm">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "#8b5cf6" }}
                />
                Command Center / Ask Navis
              </span>
            </div> */}
            <AnimatedBadge
              text="Command Center / Ask Navis"
              color="#22d3ee"
              href="#"
            />
            <h2
              className="text-[44px] leading-[0.96] tracking-[-0.03em] sm:text-6xl lg:text-[80px] text-white"
              style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}
            >
              Ask a question.{" "}
              <span className="italic text-slate-400">Or give a command.</span>
            </h2>
            <p className="mt-8 max-w-lg text-[15px] leading-[1.7] text-slate-400">
              Same engine. Ask &ldquo;why is Arjun the priority?&rdquo; — Navis
              answers from memory with citations. Say &ldquo;call Arjun&rdquo; —
              Navis routes through the Decision Engine, honors your action
              policies, and writes every step to the Audit Log.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASING, delay: 0.1 }}
          >
            <Link
              href="#notify"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-blue-600 hover:shadow-xl active:scale-[0.98]"
            >
              <span>Join the waitlist</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* ── Main interactive showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASING }}
          className="relative"
        >
          {/* Outer frame */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 shadow-2xl shadow-black/30 backdrop-blur-sm md:rounded-3xl">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800/30 px-5 py-3.5 backdrop-blur-sm">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <div className="mx-auto flex h-6 w-56 items-center justify-center rounded-md bg-slate-800/50 border border-slate-700 px-3">
                <span className="text-[11px] text-slate-400 tracking-tight">app.navislabs.in</span>
              </div>
            </div>

            {/* Screenshot + cursor layer */}
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/ask.jpeg"
                alt="Navis AI — Ask Navis interface"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 80vw"
              />

              {/* Subtle dark overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/20" />

              {/* Animated cursors */}
              {STEPS.map((step, i) => (
                <AnimatedCursor
                  key={step.id}
                  x={step.cursor.x}
                  y={step.cursor.y}
                  active={activeStep === i}
                />
              ))}

              {/* Tooltips */}
              {STEPS.map((step, i) => (
                <Tooltip key={step.id} step={step} active={activeStep === i} />
              ))}
            </div>
          </div>

          {/* ── Step indicator dots ── */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                suppressHydrationWarning
                className="group flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-slate-800/50 hover:shadow-sm"
              >
                <motion.span
                  className="block h-1.5 rounded-full transition-all duration-300"
                  animate={{
                    width: activeStep === i ? 24 : 6,
                    backgroundColor:
                      activeStep === i ? step.color : "#334155",
                  }}
                  transition={{ duration: 0.35, ease: EASING }}
                />
                <span
                  className="text-xs font-medium transition-colors duration-200"
                  style={{ color: activeStep === i ? step.color : "#64748b" }}
                >
                  {step.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}























