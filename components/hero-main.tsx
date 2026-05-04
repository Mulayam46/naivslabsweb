"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Zap, Brain, Users } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

// ── Live activity feed items ──────────────────────────────────────────────────
const FEED = [
  {
    icon: Zap,
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.08)",
    product: "HireAI",
    action: "Shortlisted 12 candidates",
    time: "2s ago",
    img: "/navisai.png",
  },
  {
    icon: Brain,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    product: "Navis AI",
    action: "Flagged 3 critical emails",
    time: "14s ago",
    img: "/navisai2.png",
  },
  {
    icon: Users,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    product: "HireAI",
    action: "Routed top match to hiring team",
    time: "41s ago",
    img: "/navisai3.png",
  },
  {
    icon: Brain,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    product: "Navis AI",
    action: "Joined standup · captured 4 action items",
    time: "1m ago",
    img: "/navisai4.png",
  },
  {
    icon: Zap,
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.08)",
    product: "HireAI",
    action: "Screened 38 resumes in 9 seconds",
    time: "3m ago",
    img: "/navisai5.png",
  },
  {
    icon: Brain,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    product: "Navis AI",
    action: "Pushed reverse prompt to founder",
    time: "5m ago",
    img: "/navisai.png",
  },
  {
    icon: Users,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    product: "HireAI",
    action: "Eliminated 91% of noise from pipeline",
    time: "8m ago",
    img: "/navisai2.png",
  },
  {
    icon: Brain,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    product: "Navis AI",
    action: "Drafted follow-up email post-meeting",
    time: "11m ago",
    img: "/navisai3.png",
  },
];

// ── Animated list feed card ───────────────────────────────────────────────────
function FeedCard({ item }: { item: (typeof FEED)[number] }) {
  const Icon = item.icon;
  return (
    <div className="flex w-full items-center gap-3 rounded-2xl border border-black/6 bg-white px-4 py-3 shadow-sm">
      {/* Product screenshot thumbnail */}
      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-black/6">
        <Image
          src={item.img}
          alt={item.product}
          fill
          className="object-cover object-top"
          sizes="64px"
        />
      </div>

      {/* Icon + text */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <div
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: item.bg }}
          >
            <Icon className="h-3 w-3" style={{ color: item.color }} />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: item.color }}
          >
            {item.product}
          </span>
        </div>
        <p className="truncate text-sm font-medium text-slate-800">
          {item.action}
        </p>
      </div>

      {/* Time */}
      <span className="shrink-0 text-[10px] text-slate-400">{item.time}</span>
    </div>
  );
}

// ── Word-by-word headline animation ──────────────────────────────────────────
const HEADLINE = ["We", "build", "AI", "that", "works", "while", "you", "think."];

function AnimatedHeadline() {
  return (
    <h1 className="text-left text-[clamp(3rem,7vw,6rem)] font-bold leading-none tracking-tight text-slate-900">
      {HEADLINE.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1 + i * 0.09, duration: 0.7, ease: EASING }}
          className="mr-[0.22em] inline-block"
          style={
            word === "AI"
              ? {
                  background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }
              : undefined
          }
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// ── Stat counter ──────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

// ── Product chips ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    name: "HireAI",
    status: "Live",
    dot: "bg-emerald-400",
    color: "#1d4ed8",
    href: "/products/hireai",
  },
  {
    name: "Navis AI",
    status: "Beta",
    dot: "bg-violet-400",
    color: "#7c3aed",
    href: "/products/navis-ai",
  },
];

// ── Main export ───────────────────────────────────────────────────────────────
export function HeroMain() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white pt-16">
      {/* Subtle dot grid inherited from globals — no extra bg needed */}

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 gap-0 px-6 md:px-8 lg:grid-cols-[1fr_420px]">

        {/* ── LEFT: editorial copy ── */}
        <div className="flex flex-col justify-center py-20 pr-0 lg:pr-16">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASING }}
            className="mb-8 flex items-center gap-3"
          >
            <Image
              src="/navis-logo.png"
              alt="NavisLabs"
              width={22}
              height={22}
              className="rounded-md border border-black/8 bg-white shadow-sm"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              NavisLabs · Bangalore
            </span>
          </motion.div>

          {/* Animated headline */}
          <AnimatedHeadline />

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: EASING }}
            className="mt-8 max-w-md text-lg leading-8 text-slate-500"
          >
            NavisLabs builds a family of AI products that remove uncertainty
            from hiring and decision-making — so teams act on signal, not noise.
          </motion.p>

          {/* Product chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease: EASING }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {PRODUCTS.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-black/15 hover:bg-white hover:shadow-md"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                {p.name}
                <span className="text-[10px] font-normal text-slate-400">
                  {p.status}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:text-slate-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.18, duration: 0.7, ease: EASING }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#products"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]"
            >
              Explore products
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/#company"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white/60 px-7 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-slate-900 active:scale-[0.98]"
            >
              About us
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-14 flex flex-wrap gap-8 border-t border-black/8 pt-8"
          >
            {[
              { label: "Products shipped", to: 2, suffix: "" },
              { label: "Beta users", to: 43, suffix: "+" },
              { label: "Weekly active rate", to: 70, suffix: "%" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-3xl font-bold tabular-nums text-slate-900">
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: continuous scroll ticker ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1.0, ease: EASING }}
          className="relative hidden lg:flex lg:flex-col lg:justify-center lg:py-20"
        >
          {/* Section label */}
          <div className="mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Live activity
            </span>
          </div>

          {/* Continuous scroll container */}
          <div className="relative h-[520px] w-full overflow-hidden">
            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t from-white to-transparent" />

            {/* Scrolling track — duplicated for seamless loop */}
            <div className="animate-feed-scroll flex flex-col gap-3">
              {[...FEED, ...FEED].map((item, i) => (
                <FeedCard key={i} item={item} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom edge fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-white" />
    </section>
  );
}
