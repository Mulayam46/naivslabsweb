"use client";

import { motion } from "motion/react";
import { Target, Lightbulb } from "lucide-react";
import AnimatedBadge from "./ui/animated-badge";
import { GlowingEffect } from "./ui/glowing-effect";

const EASING = [0.22, 1, 0.36, 1] as const;

export function MissionVision() {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32" style={{ backgroundColor: "#03081e" }}>
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 h-[500px] w-[700px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.08), transparent)", opacity: 1 }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.08), transparent)", opacity: 1 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASING }}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex justify-center mb-6">
               <AnimatedBadge text="Our Core Identity" color="#22d3ee" href="#" />
            </div>
            <h2
              className="text-[44px] leading-[0.96] tracking-[-0.03em] sm:text-5xl lg:text-[64px] text-white"
              style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}
            >
              Why we exist. <span className="italic text-slate-400">Where we're going.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASING, delay: 0.1 }}
            className="relative h-full rounded-[28px] border border-slate-700/50 p-2 md:p-3"
          >
            <GlowingEffect blur={0} borderWidth={2} spread={60} glow={false} proximity={64} inactiveZone={0.01} disabled={false} />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] p-8 md:p-10" style={{ backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(12px)" }}>
              <div>
                <div className="mb-6 w-fit rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Target className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Our Mission
                </h3>
                <p className="mb-6 text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
                  To build the decision infrastructure for the modern enterprise.
                </p>
                <p className="text-[15px] leading-relaxed text-slate-400">
                  We engineer AI that doesn't just summarize data, but actively decides, executes, and learns. We transition AI from a passive assistant into an active operating system with absolute safety and tamper-evident auditability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASING, delay: 0.2 }}
            className="relative h-full rounded-[28px] border border-slate-700/50 p-2 md:p-3"
          >
            <GlowingEffect blur={0} borderWidth={2} spread={60} glow={false} proximity={64} inactiveZone={0.01} disabled={false} />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] p-8 md:p-10" style={{ backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(12px)" }}>
              <div>
                <div className="mb-6 w-fit rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <Lightbulb className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-purple-400">
                  Our Vision
                </h3>
                <p className="mb-6 text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
                  A future where organizations operate at machine speed.
                </p>
                <p className="text-[15px] leading-relaxed text-slate-400">
                  We envision a world where companies are powered by a compounding institutional memory that turns every past outcome into the optimal next move. Human leaders are completely freed from operational noise.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
