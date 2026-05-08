"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Calendar, Globe, Layers, Target, ArrowRight } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const EASING = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { icon: Calendar, value: "2026", label: "Founded" },
  { icon: MapPin, value: "Bangalore", label: "Headquarters" },
  { icon: Globe, value: "Global", label: "Market focus" },
  { icon: Layers, value: "Product-led", label: "Operating model" },
];

const PRINCIPLES = [
  "Decisions, not summaries",
  "Cited memory on every answer",
  "Auditable execution",
  "Outcome-driven learning",
];

export function About() {
  return (
    <section
      id="company"
      className="px-4 py-24 md:px-8 bg-white border-t border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASING }}
          className="mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            Company
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            NavisLabs builds decision infrastructure.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: EASING, delay: 0.08 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4"
        >
          {/* Mission — large left card */}
          <li className="list-none md:[grid-area:1/1/3/6]">
            <div className="relative h-full min-h-64 rounded-2xl border p-2 md:rounded-3xl md:p-3"
              style={{ borderColor: "var(--border)" }}>
              <GlowingEffect
                blur={0}
                borderWidth={2}
                spread={70}
                glow={false}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div
                className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-8"
                style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
              >
                <div className="w-fit rounded-lg border p-2" style={{ borderColor: "var(--border)" }}>
                  <Target className="h-4 w-4" style={{ color: "var(--text)" }} />
                </div>
                <div className="space-y-3">
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.24em]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Mission
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight leading-snug sm:text-2xl">
                    Build AI that decides — not AI that summarizes.
                  </h3>
                  <p className="text-sm leading-7" style={{ color: "var(--muted-foreground)" }}>
                    Every Navis product surfaces an action with cited memory
                    behind it. Every external action passes a per-channel
                    policy gate and writes a tamper-evident trace. We build
                    decision systems, not chatbots.
                  </p>
                </div>
              </div>
            </div>
          </li>

          {/* Stats — 4 small cards in a 2×2 */}
          {FACTS.map((fact, i) => {
            const Icon = fact.icon;
            const areas = [
              "md:[grid-area:1/6/2/9]",
              "md:[grid-area:1/9/2/13]",
              "md:[grid-area:2/6/3/9]",
              "md:[grid-area:2/9/3/13]",
            ];
            return (
              <li key={fact.label} className={`list-none ${areas[i]}`}>
                <div
                  className="relative h-full min-h-36 rounded-2xl border p-2 md:rounded-3xl md:p-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <GlowingEffect
                    blur={0}
                    borderWidth={2}
                    spread={60}
                    glow={false}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div
                    className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-5"
                    style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
                  >
                    <div className="w-fit rounded-lg border p-2" style={{ borderColor: "var(--border)" }}>
                      <Icon className="h-4 w-4" style={{ color: "var(--text)" }} />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">{fact.value}</p>
                      <p
                        className="mt-0.5 text-xs uppercase tracking-[0.22em]"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {fact.label}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </motion.ul>

        {/* Principles + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASING, delay: 0.14 }}
          className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {PRINCIPLES.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted-strong)",
                  backgroundColor: "rgba(255,255,255,0.72)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 gap-3">
            <Link
              href="mailto:hello@navislabs.in"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-95"
              style={{ backgroundColor: "var(--text)", color: "#f8fafc" }}
            >
              Contact us
            </Link>
            {/* <Link
              href="/products"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border px-5 text-sm font-semibold transition-all duration-200 hover:bg-white active:scale-95"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
              View products <ArrowRight className="h-3.5 w-3.5" />
            </Link> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
