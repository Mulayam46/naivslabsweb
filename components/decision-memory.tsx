"use client";

import Image from "next/image";
import { motion, useInView, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, BookOpen, Layers } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

const LEARNINGS = [
  {
    skill: "Deal Recovery",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ede9fe",
    quote: "Direct founder call beats email at late stage with deadline pressure.",
    impact: "+82%",
    positive: true,
  },
  {
    skill: "Investor Prep",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#e0f2fe",
    quote: "Naming an owner reduces investor data room slippage by ~40%.",
    impact: "+61%",
    positive: true,
  },
  {
    skill: "Onboarding Risk",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    quote: "Manager-led 15-min unblock on day 5 catches silent stalls early.",
    impact: "+44%",
    positive: true,
  },
];

export function DecisionMemory() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-4 py-24 md:px-8 md:py-32"
    >
      {/* Very faint grid lines — Slashy-style structural texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* ── Top: oversized label + headline side by side ── */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          {/* Left — big rotated label + headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASING }}
          >
            {/* Eyebrow with a long rule */}
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-slate-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400">
                Decision Memory
              </span>
            </div>

            <h2 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl xl:text-7xl leading-[0.95]">
              Every choice.
              <br />
              <span className="text-slate-300">Every outcome.</span>
              <br />
              Every lesson.
            </h2>
          </motion.div>

          {/* Right — description + 3 stat counters */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASING, delay: 0.1 }}
            className="flex flex-col gap-8 lg:pl-12"
          >
            <p className="text-base leading-8 text-slate-500 max-w-sm">
              Every entry is a choice your company made, what actually happened,
              and the learning that updates the next recommendation. This is what
              makes Navis smarter every week.
            </p>

            {/* Stat row */}
            <div className="flex gap-8 border-t border-slate-100 pt-8">
              {[
                { icon: Layers, value: 27, prefix: "", suffix: "", label: "Decisions logged", color: "#7c3aed" },
                { icon: BookOpen, value: 9, prefix: "", suffix: "", label: "Learnings stored", color: "#0ea5e9" },
                { icon: TrendingUp, value: 34, prefix: "+", suffix: "%", label: "Avg. impact", color: "#059669" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: EASING }}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-3xl font-black tracking-tight" style={{ color: s.color }}>
                      <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </span>
                    <span className="text-xs text-slate-400 leading-tight">{s.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Main: screenshot left, learnings right ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">

          {/* Screenshot — full bleed, no card border, just shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: EASING, delay: 0.12 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-200 ring-1 ring-slate-100"
          >
            {/* Floating pill */}
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm ring-1 ring-slate-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              <span className="text-[11px] font-semibold text-slate-700">Live · 27 decisions tracked</span>
            </div>

            <Image
              src="/decisionnavis.png"
              alt="Navis Decision Memory — decisions, outcomes, and learnings"
              width={1400}
              height={1000}
              className="w-full object-cover object-top"
              priority
            />

            {/* Bottom fade into white */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white to-transparent" />
          </motion.div>

          {/* Right — learning cards stacked */}
          <div className="flex flex-col gap-4">
            {/* Header label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400"
            >
              Learnings stored back
            </motion.p>

            {LEARNINGS.map((l, i) => (
              <motion.div
                key={l.skill}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.22 + i * 0.1, duration: 0.7, ease: EASING }}
                className="group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderColor: l.border, backgroundColor: l.bg }}
              >
                {/* Accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                  style={{ backgroundColor: l.color }}
                />

                <div className="flex items-start justify-between gap-3 pl-3">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ color: l.color, backgroundColor: `${l.color}18` }}
                      >
                        {l.skill}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;{l.quote}&rdquo;
                    </p>
                  </div>

                  {/* Impact badge */}
                  <div
                    className="shrink-0 rounded-xl px-3 py-2 text-center"
                    style={{ backgroundColor: l.positive ? "#dcfce7" : "#fee2e2" }}
                  >
                    <p
                      className="text-lg font-black leading-none"
                      style={{ color: l.positive ? "#16a34a" : "#dc2626" }}
                    >
                      {l.impact}
                    </p>
                    <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide" style={{ color: l.positive ? "#16a34a" : "#dc2626" }}>
                      impact
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bottom CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.6, ease: EASING }}
              className="mt-2 rounded-2xl border border-slate-100 bg-slate-50 p-5"
            >
              <p className="text-xs font-semibold text-slate-700">Gets smarter every week</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Each observed outcome trains the next recommendation. No manual tuning required.
              </p>
              {/* Mini progress bars */}
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { label: "Deal Recovery", pct: 92, color: "#7c3aed" },
                  { label: "Investor Prep", pct: 84, color: "#0ea5e9" },
                  { label: "Onboarding Risk", pct: 78, color: "#f59e0b" },
                ].map((bar, i) => (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-[10px] text-slate-400">{bar.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${bar.pct}%` } : {}}
                        transition={{ delay: 0.6 + i * 0.08, duration: 0.9, ease: EASING }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: bar.color }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[10px] font-semibold text-slate-500">{bar.pct}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
