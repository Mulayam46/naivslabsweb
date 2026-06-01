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
        className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400 sm:text-xs"
      >
        Decision Intelligence · Company Brain
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: EASING }}
        className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        Your AI Chief of Staff for{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          high-stakes decisions.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.8, ease: EASING }}
        className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
      >
        Navis turns scattered company data into ranked decisions, executes them
        through real connectors, and learns from every outcome — with full
        audit trace and per-channel action policies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.7, ease: EASING }}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <Link
          href="#notify"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
        >
          <span>See today&apos;s decision</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/products/navis-ai"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-7 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-slate-700/50 hover:text-white active:scale-[0.98]"
        >
          How Navis works
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
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Episodic · Semantic · State · Decision memory
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          Decision Trace · tamper-evident
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
          Auto · Confirm · Approval · Blocked
        </span>
      </motion.div>
    </div>
  );
}

export function Hero3() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "#03081e" }}
    >
      {/* Background radial glows - updated for dark theme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-60 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[96px]"
          style={{
            background: "radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full blur-[72px]"
          style={{ backgroundColor: "#06b6d4", opacity: 0.05 }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full blur-[72px]"
          style={{ backgroundColor: "#8b5cf6", opacity: 0.05 }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full blur-[80px]"
          style={{ backgroundColor: "#ec4899", opacity: 0.03 }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <ContainerScroll titleComponent={<HeroTitle />}>
        <NavisMockup />
      </ContainerScroll>
    </div>
  );
}

export default Hero3;