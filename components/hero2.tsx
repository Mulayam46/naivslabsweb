"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const EASING = [0.22, 1, 0.36, 1] as const;

// ── Product screenshot rendered inside ContainerScroll ──
function NavisMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0d1117]">
      <Image
        src="/navisai.png"
        alt="Navis AI product interface"
        fill
        className="object-cover object-top"
        priority
      />
    </div>
  );
}

// ── Hero title passed to ContainerScroll ──
function HeroTitle() {
  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING }}
        className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600/70"
      >
        Navis AI · In development
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: EASING }}
        className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
      >
        Your AI chief of staff.{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600">
          One next decision.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.8, ease: EASING }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500"
      >
        Navis reads your Gmail, Slack, and calendar, structures it into a
        Company Brain across four memory types, and surfaces the single most
        important decision right now — with full audit trace + governance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.7, ease: EASING }}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <Link
          href="#notify"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]"
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/products/navis-ai"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 px-7 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:text-slate-900 active:scale-[0.98]"
        >
          Learn more
        </Link>
      </motion.div>

      {/* Architecture proof strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
      >
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          4 memory types · cited per answer
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Decision Trace · tamper-evident audit
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          Per-channel action policies
        </span>
      </motion.div>
    </div>
  );
}

export function Hero2() {
  return (
    <div
      className="relative overflow-hidden bg-white"
    >
      {/* Background radial glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-60 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[140px] opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(29,78,216,0.5) 0%, rgba(109,40,217,0.3) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full blur-[100px] opacity-8"
          style={{ backgroundColor: "#0ea5e9" }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full blur-[100px] opacity-8"
          style={{ backgroundColor: "#7c3aed" }}
        />
      </div>

      <ContainerScroll titleComponent={<HeroTitle />}>
        <NavisMockup />
      </ContainerScroll>
    </div>
  );
}
