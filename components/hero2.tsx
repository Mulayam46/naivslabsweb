"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import PhotonBeam from "@/components/ui/photon-beam";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const EASING = [0.22, 1, 0.36, 1] as const;

// ── Product screenshot rendered inside ContainerScroll ──
function NavisMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0d1117]mt-20">
      <Image
        src="/navisai.png"
        alt="Navis AI Dashboard"
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
    <div className="relative z-10 text-center">
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: EASING }}
        className="mx-auto max-w-4xl text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-7xl leading-tight sm:leading-tight md:leading-[1.1]"
      >
        We build AI that{" "}
        <span className="inline-flex animate-text-gradient bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-[200%_auto] bg-clip-text font-bold text-transparent drop-shadow-[0_0_25px_rgba(167,139,250,0.3)] pb-2">
          decides, not summarizes.
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.8, ease: EASING }}
        className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
      >
        NavisLabs builds decision infrastructure for modern teams — AI that
        reads your work, ranks what matters, executes with governance, and
        learns from every outcome.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.7, ease: EASING }}
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        <Link
          href="/products/navis-ai"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:bg-slate-100 hover:shadow-xl active:scale-[0.98]"
        >
          <span>See Navis AI</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <RainbowButton asChild variant="outline" className="h-12 px-8 rounded-full text-sm text-white">
          <Link href="#notify" className="gap-2">
            Join the waitlist
            <Zap className="h-4 w-4" />
          </Link>
        </RainbowButton>
      </motion.div>

      {/* Company proof strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
      >
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Founded 2025 · Bangalore
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          Decision infrastructure · not another chatbot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
          Private beta · limited seats
        </span>
      </motion.div>
    </div>
  );
}

export function Hero2() {
  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Photon Beam Background */}
      <div className="absolute inset-0 z-0 w-full">
        <PhotonBeam
          colorBg="#020617"
          colorLine="#1e293b"
          colorSignal="#06b6d4"
          colorSignal2="#3b82f6"
          colorSignal3="#8b5cf6"
          lineCount={100}
          spreadHeight={35}
          signalCount={120}
          speedGlobal={0.35}
          trailLength={3.5}
          bloomStrength={4.5}
          bloomRadius={0.7}
        />
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80" />

      {/* Animated glow orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-40 right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[100px] animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      {/* ContainerScroll wraps both the title and the mockup */}
      <div className="relative z-10">
        <ContainerScroll titleComponent={<HeroTitle />}>
          <NavisMockup />
        </ContainerScroll>
      </div>
    </div>
  );
}