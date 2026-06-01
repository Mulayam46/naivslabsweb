"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Zap, Circle } from "lucide-react";
import AnimatedBadge from "./ui/animated-badge";

// ----------------------------------------------------------------------------
// Tokens (dark theme)
// ----------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const;
const INK = "#0B0B0F";
const PAPER = "#03081e"; // Dark background
const LIME = "#06b6d4";
const VIOLET = "#8b5cf6";
const CYAN = "#06b6d4";

// ----------------------------------------------------------------------------
// Counter
// ----------------------------------------------------------------------------
function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return c.stop;
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

// ----------------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------------
const FEED = [
  { id: "027", t: "2m", action: "Founder call", target: "Acme Inc.", out: "Recovered" },
  { id: "026", t: "11m", action: "Data room owner", target: "Northbeam", out: "Closed" },
  { id: "025", t: "34m", action: "Day-5 unblock", target: "Helix", out: "Active" },
  { id: "024", t: "1h", action: "Pricing nudge", target: "Loop", out: "Won" },
  { id: "023", t: "2h", action: "Reroute signal", target: "Mast", out: "Saved" },
  { id: "022", t: "3h", action: "Founder call", target: "Vela", out: "Recovered" },
  { id: "021", t: "5h", action: "Owner named", target: "Pier 9", out: "Closed" },
  { id: "020", t: "6h", action: "Day-5 unblock", target: "Quill", out: "Active" },
];

const LEARNINGS = [
  { id: "01", skill: "Deal Recovery", quote: "Direct founder call beats email at late stage with deadline pressure.", impact: 82, n: 47 },
  { id: "02", skill: "Investor Prep", quote: "Naming a single owner reduces data-room slippage by roughly 40%.", impact: 61, n: 33 },
  { id: "03", skill: "Onboarding Risk", quote: "Manager-led 15-min unblock on day 5 catches silent stalls early.", impact: 44, n: 21 },
  { id: "04", skill: "Churn Prevention", quote: "Proactive executive outreach on dropping usage scores prevents early churn.", impact: 38, n: 18 },
];

// ----------------------------------------------------------------------------
// Reusable: marquee ticker row that scrolls infinitely upward
// ----------------------------------------------------------------------------
function LiveTicker() {
  const list = [...FEED, ...FEED];
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex flex-col"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {list.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/75"
          >
            <span className="text-white/35">#{row.id}</span>
            <span className="truncate">
              <span className="text-white">{row.action}</span>
              <span className="text-white/35"> on </span>
              <span className="text-white/90">{row.target}</span>
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[9px] tracking-[0.16em]"
              style={{
                color: INK,
                backgroundColor:
                  row.out === "Active" ? "#fff" : LIME,
              }}
            >
              {row.out}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Reusable: SVG loop diagram — Decision -> Outcome -> Learning -> Decision
// ----------------------------------------------------------------------------
function LoopDiagram() {
  return (
    <svg viewBox="0 0 420 160" className="h-full w-full">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={LIME} />
        </marker>
      </defs>

      {/* node: decision */}
      <g>
        <rect x="6" y="56" width="110" height="48" rx="6" fill={INK} />
        <text x="61" y="80" textAnchor="middle" fill={LIME} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2">
          DECISION
        </text>
        <text x="61" y="94" textAnchor="middle" fill="#fff" fontFamily="ui-serif, Georgia, serif" fontSize="11" fontStyle="italic">
          founder call
        </text>
      </g>

      {/* node: outcome */}
      <g>
        <rect x="155" y="20" width="110" height="48" rx="6" fill="#1e293b" stroke={LIME} strokeWidth="1.5" />
        <text x="210" y="44" textAnchor="middle" fill={LIME} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2">
          OUTCOME
        </text>
        <text x="210" y="58" textAnchor="middle" fill="#fff" fontFamily="ui-serif, Georgia, serif" fontSize="11" fontStyle="italic">
          deal recovered
        </text>
      </g>

      {/* node: learning */}
      <g>
        <rect x="304" y="92" width="110" height="48" rx="6" fill={LIME} />
        <text x="359" y="116" textAnchor="middle" fill={INK} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2">
          LEARNING
        </text>
        <text x="359" y="130" textAnchor="middle" fill={INK} fontFamily="ui-serif, Georgia, serif" fontSize="11" fontStyle="italic">
          +82% impact
        </text>
      </g>

      {/* dashed paths */}
      <motion.path
        d="M 116 70 C 140 50, 145 30, 155 36"
        stroke={LIME}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        markerEnd="url(#arrow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.path
        d="M 265 50 C 285 65, 290 95, 304 108"
        stroke={LIME}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        markerEnd="url(#arrow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
      />
      <motion.path
        d="M 304 122 C 220 150, 90 145, 60 110"
        stroke={LIME}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        markerEnd="url(#arrow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.55 }}
      />
    </svg>
  );
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------
export function DecisionMemory() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbitY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32"
      style={{ backgroundColor: PAPER, color: "white" }}
    >
      {/* Floating orbit ornament */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
        style={{
          y: orbitY,
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.15), transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full"
        style={{
          y: orbitY,
          background:
            "radial-gradient(closest-side, rgba(212,255,58,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ------------------------------------------------------- */}
        {/* Eyebrow strip                                            */}
        {/* ------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
          {/* <span
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 backdrop-blur-sm"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: VIOLET }}
            />
            Chapter 04 / Decision Memory
          </span> */}
          <AnimatedBadge
            text="Chapter 02 / Decision Memory"
            color="#22d3ee"
            href="#"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            The compounding moat
          </span>
        </motion.div>

        {/* ------------------------------------------------------- */}
        {/* Headline + lede                                          */}
        {/* ------------------------------------------------------- */}
        <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-8 text-[44px] leading-[0.96] tracking-[-0.03em] sm:text-6xl lg:text-[92px] text-white"
            style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}
          >
            Every decision.{" "}
            <span className="italic text-slate-400">Every outcome.</span>
            <br />
            <span className="relative inline-block">
              Stored.
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-3 w-full -z-0"
                style={{ backgroundColor: LIME }}
              />
              <span className="relative">.</span>
            </span>{" "}
            <span className="italic text-slate-400">Learned.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-end gap-6"
          >
            <p className="max-w-sm text-[15px] leading-[1.7] text-slate-400">
              A living ledger of choices, results, and the rules that update
              your next recommendation. No tuning. No tickets. Just compounding
              judgment.
            </p>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-white" />
              Live since week 01
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* BENTO GRID                                               */}
        {/* ------------------------------------------------------- */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {/* Tile A — loop diagram + headline counter (large) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="col-span-12 md:col-span-8 row-span-2 group relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/50 p-7 backdrop-blur-sm md:p-9"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <span>// the loop</span>
              <span className="inline-flex items-center gap-1.5">
                <Zap size={11} className="opacity-60" />
                self-updating
              </span>
            </div>

            <div
              className="mt-4 text-[34px] leading-[1] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              Decisions teach
              <br />
              the next decision.
            </div>

            <div className="mt-7 h-[180px] w-full">
              <LoopDiagram />
            </div>

            <div className="mt-2 flex items-end justify-between border-t border-slate-800 pt-4">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-5xl tracking-[-0.04em] text-white"
                  style={{ fontFamily: "ui-serif, Georgia, serif" }}
                >
                  <Counter to={27} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  decisions logged
                </span>
              </div>
              <ArrowUpRight
                size={20}
                className="text-slate-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>
          </motion.div>

          {/* Tile B — impact mega number (lime) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="col-span-12 md:col-span-4 relative overflow-hidden rounded-[28px] p-7 md:p-8"
            style={{ backgroundColor: LIME, color: INK }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/55">
              avg. impact
            </div>
            <div
              className="mt-4 text-[88px] leading-[0.9] tracking-[-0.05em] sm:text-[112px]"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              <Counter to={34} prefix="+" suffix="%" />
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-black/65">
              <Sparkles size={11} />
              compounding · week over week
            </div>

            {/* sparkline */}
            <svg viewBox="0 0 200 40" className="mt-6 w-full">
              <motion.path
                d="M 0 30 L 20 28 L 40 25 L 60 27 L 80 22 L 100 18 L 120 20 L 140 14 L 160 12 L 180 8 L 200 4"
                fill="none"
                stroke={INK}
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              />
            </svg>
          </motion.div>

          {/* Tile C — learnings stat (small) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="col-span-6 md:col-span-4 relative rounded-[28px] border border-slate-800 bg-slate-900/50 p-7 backdrop-blur-sm"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              learnings stored
            </div>
            <div
              className="mt-3 text-[80px] leading-[0.9] tracking-[-0.04em] text-white"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              <Counter to={9} />
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              across 3 skills
            </div>
          </motion.div>

          {/* Tile D — live feed (dark) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
            className="col-span-12 md:col-span-8 row-span-2 relative overflow-hidden rounded-[28px]"
            style={{ backgroundColor: INK, color: "#fff" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: LIME }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: LIME }}
                  />
                </span>
                Live ledger
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                feed / 027
              </div>
            </div>
            <div className="h-[420px]">
              <LiveTicker />
            </div>
          </motion.div>

          {/* Tile E — featured pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="col-span-6 md:col-span-4 relative overflow-hidden rounded-[28px] p-7"
            style={{ backgroundColor: "#1e293b", color: "#fff" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
              featured learning
            </div>
            <div
              className="mt-4 text-[22px] leading-[1.25] text-white"
              style={{ fontFamily: "ui-serif, Georgia, serif", fontStyle: "italic" }}
            >
              {"Direct founder call beats email at late stage when a deadline is pinned."}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-700 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Deal recovery / n=47
              </span>
              <span
                className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.1em]"
                style={{ backgroundColor: LIME, color: INK }}
              >
                +82%
              </span>
            </div>
          </motion.div>

          {/* Tile F — learning cards */}
          {LEARNINGS.map((l, i) => (
            <motion.article
              key={l.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: 0.36 + i * 0.08,
              }}
              className="col-span-12 md:col-span-4 group relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/50 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
            >
              {/* big id watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-6 select-none text-[140px] leading-none tracking-[-0.06em] text-white/[0.03]"
                style={{ fontFamily: "ui-serif, Georgia, serif" }}
              >
                {l.id}
              </span>

              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                <span>{l.id} / {l.skill}</span>
                <span>n={l.n}</span>
              </div>

              <p
                className="mt-5 text-[19px] leading-[1.35] text-white/85"
                style={{ fontFamily: "ui-serif, Georgia, serif" }}
              >
                {'"' + l.quote + '"'}
              </p>

              <div className="mt-6 flex items-end justify-between border-t border-slate-800 pt-4">
                <div>
                  <div
                    className="text-3xl tracking-[-0.03em] text-white"
                    style={{ fontFamily: "ui-serif, Georgia, serif" }}
                  >
                    +{l.impact}%
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">
                    impact lift
                  </div>
                </div>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-white"
                  style={{ backgroundColor: LIME, color: INK }}
                >
                  <ArrowUpRight
                    size={16}
                    className="transition-colors duration-300 group-hover:text-slate-900"
                  />
                </span>
              </div>
            </motion.article>
          ))}

          {/* Tile G — Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="col-span-12 relative overflow-hidden rounded-[28px] p-8 md:p-10"
            style={{ backgroundColor: INK, color: "#fff" }}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  rev. 027 / shipped this week
                </div>
                <div
                  className="mt-3 text-[34px] leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl"
                  style={{ fontFamily: "ui-serif, Georgia, serif" }}
                >
                  Sharper every week.{" "}
                  <span style={{ color: LIME }} className="italic">
                    Automatically.
                  </span>
                </div>
                <p className="mt-3 max-w-md text-[14px] leading-[1.65] text-white/55">
                  Each observed outcome trains the next recommendation. No
                  manual tuning. No retraining cycles. Just the company getting
                  smarter while you sleep.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                {[
                  { label: "Deal Recovery", pct: 92 },
                  { label: "Investor Prep", pct: 84 },
                  { label: "Onboarding Risk", pct: 78 },
                ].map((b, i) => (
                  <div
                    key={b.label}
                    className="grid grid-cols-[140px_1fr_44px] items-center gap-4"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
                      {b.label}
                    </span>
                    <div className="relative h-[6px] overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${b.pct}%` } : {}}
                        transition={{
                          delay: 0.7 + i * 0.08,
                          duration: 1.1,
                          ease: EASE,
                        }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: i === 0 ? LIME : "#fff",
                          opacity: i === 0 ? 1 : 0.85,
                        }}
                      />
                    </div>
                    <span className="text-right font-mono text-[11px] tabular-nums text-white/85">
                      {b.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DecisionMemory;