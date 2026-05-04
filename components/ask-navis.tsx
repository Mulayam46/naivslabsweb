"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationControls, AnimatePresence } from "motion/react";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";

const EASING = [0.22, 1, 0.36, 1] as const;

// Annotation steps — each one positions a cursor + tooltip over a feature
const STEPS = [
  {
    id: "next-decision",
    cursor: { x: "14%", y: "13%" },
    tooltip: { side: "right" as const },
    label: "Next decision",
    body: "Navis ranks every open decision by impact and behavior. You see one screen, one next move.",
    color: "#1d4ed8",
  },
  {
    id: "ask-navis",
    cursor: { x: "38%", y: "28%" },
    tooltip: { side: "right" as const },
    label: "Question or command",
    body: "Same engine. Ask why Arjun is the priority, or just say \"call Arjun\" — Navis routes both through the Decision Engine.",
    color: "#7c3aed",
  },
  {
    id: "company-brain",
    cursor: { x: "82%", y: "62%" },
    tooltip: { side: "left" as const },
    label: "Company Brain",
    body: "Episodic, Semantic, State, and Decision memory — all cited per answer with the exact event behind it.",
    color: "#059669",
  },
  {
    id: "decision-skills",
    cursor: { x: "14%", y: "72%" },
    tooltip: { side: "right" as const },
    label: "Policy + audit trace",
    body: "Every executed action passes a per-channel policy gate and writes a tamper-evident trace to the Audit Log.",
    color: "#d97706",
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
          <div className="w-52 rounded-xl border border-white/60 bg-white/90 p-3.5 shadow-xl shadow-black/10 backdrop-blur-md">
            {/* Accent bar */}
            <div
              className="mb-2 h-0.5 w-8 rounded-full"
              style={{ backgroundColor: step.color }}
            />
            <p className="text-xs font-semibold text-slate-900">{step.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
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
    <section className="relative overflow-hidden bg-[#f9fafb] px-4 py-24 md:px-8 md:py-32">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/3 h-[500px] w-[700px] rounded-full blur-[140px] opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse, #7c3aed, #1d4ed8, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[500px] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse, #0ea5e9, #059669, transparent)" }}
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-violet-500">
              Command Center · Ask Navis
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              You can click. Or you can just{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600">
                tell Navis.
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
              Same engine. Ask a question — Navis answers from your Company
              Brain with citations. Give a command — Navis routes it through
              the Decision Engine, honors your action policies, and writes
              every step to the Audit Log.
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
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
            >
              Join the waitlist
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
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/8 md:rounded-3xl">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <div className="mx-auto flex h-6 w-56 items-center justify-center rounded-md bg-white/80 border border-slate-200 px-3">
                <span className="text-[11px] text-slate-400 tracking-tight">app.navislabs.ai</span>
              </div>
            </div>

            {/* Screenshot + cursor layer */}
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/asknavis.png"
                alt="Navis AI — Ask Navis interface"
                fill
                className="object-cover object-top"
                priority
              />

              {/* Dark overlay so tooltips pop */}
              <div className="absolute inset-0 bg-slate-900/5" />

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
                className="group flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-white hover:shadow-sm"
              >
                <motion.span
                  className="block h-1.5 rounded-full transition-all duration-300"
                  animate={{
                    width: activeStep === i ? 24 : 6,
                    backgroundColor:
                      activeStep === i ? step.color : "#cbd5e1",
                  }}
                  transition={{ duration: 0.35, ease: EASING }}
                />
                <span
                  className="text-xs font-medium transition-colors duration-200"
                  style={{ color: activeStep === i ? step.color : "#94a3b8" }}
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
