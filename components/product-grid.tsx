"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  ExternalLink,
  Users,
  Zap,
  RefreshCw,
  Brain,
  Clock,
  Sparkles,
  CheckCircle2,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { productFamily } from "@/lib/site-data";
import { NoiseBackground } from "@/components/ui/noise-background";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const EASING = [0.22, 1, 0.36, 1] as const;

const PILLAR_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  "Screen at scale": Zap,
  "Keep humans in the loop": Users,
  "Move with consistency": RefreshCw,
  "Understand the work": Brain,
  "Build context memory": Clock,
  "Recommend the next step": Sparkles,
};

const PRODUCT_THEMES = {
  hireai: {
    gradientColors: [
      "rgb(29, 78, 216)",
      "rgb(99, 102, 241)",
      "rgb(14, 165, 233)",
    ],
    accentHex: "#1d4ed8",
    pillarsAccent: "rgba(29,78,216,0.06)",
    pillarsIconColor: "#1d4ed8",
    borderGradient:
      "h-32 w-32 bg-[conic-gradient(from_0deg,#1d4ed8,#6366f1,#0ea5e9,#1d4ed8)] opacity-100",
    metricBg: "rgba(29,78,216,0.05)",
    metricBorder: "rgba(29,78,216,0.12)",
  },
  "navis-ai": {
    gradientColors: [
      "rgb(109, 40, 217)",
      "rgb(168, 85, 247)",
      "rgb(236, 72, 153)",
    ],
    accentHex: "#7c3aed",
    pillarsAccent: "rgba(109,40,217,0.06)",
    pillarsIconColor: "#7c3aed",
    borderGradient:
      "h-32 w-32 bg-[conic-gradient(from_0deg,#6d28d9,#a855f7,#ec4899,#6d28d9)] opacity-100",
    metricBg: "rgba(109,40,217,0.05)",
    metricBorder: "rgba(109,40,217,0.12)",
  },
};

export function ProductGrid() {
  return (
    <section id="products" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Featured products
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            A product family, not a single landing page.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-500">
            Each product solves a concrete problem. Together they tell the story
            of a company building the AI layer for modern work.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {productFamily.map((product, i) => {
            const theme =
              PRODUCT_THEMES[product.slug as keyof typeof PRODUCT_THEMES];
            const isLive = product.status === "live";

            return (
              <motion.article
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.85, ease: EASING }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* ── Animated noise banner ── */}
                <NoiseBackground
                  containerClassName="rounded-none rounded-t-3xl h-36 w-full"
                  className="flex h-full items-end pb-5 pl-6"
                  gradientColors={theme.gradientColors}
                  noiseIntensity={0.18}
                  speed={0.06}
                >
                  <div className="flex items-center gap-3">
                    {/* Status badge */}
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                      style={{
                        borderColor: isLive
                          ? "rgba(134,239,172,0.4)"
                          : "rgba(253,230,138,0.4)",
                        backgroundColor: isLive
                          ? "rgba(22,163,74,0.18)"
                          : "rgba(217,119,6,0.18)",
                        color: isLive ? "#bbf7d0" : "#fde68a",
                      }}
                    >
                      {isLive ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Timer className="h-3 w-3" />
                      )}
                      {isLive ? "Live" : "In development"}
                    </span>

                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                      {product.eyebrow}
                    </span>
                  </div>
                </NoiseBackground>

                {/* ── Card body ── */}
                <div className="flex flex-1 flex-col p-7">
                  {/* Product name with PointerHighlight */}
                  <div className="text-2xl font-semibold tracking-tight text-slate-900">
                    <PointerHighlight
                      rectangleClassName="border-slate-300 bg-slate-50 leading-loose"
                      pointerClassName="h-3 w-3"
                      containerClassName="inline-block"
                    >
                      <span
                        className="relative z-10"
                        style={{ color: theme.accentHex }}
                      >
                        {product.name}
                      </span>
                    </PointerHighlight>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {product.description}
                  </p>

                  {/* ── Metrics row ── */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {product.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border p-3 text-center"
                        style={{
                          borderColor: theme.metricBorder,
                          backgroundColor: theme.metricBg,
                        }}
                      >
                        <p
                          className="text-base font-bold tracking-tight"
                          style={{ color: theme.accentHex }}
                        >
                          {metric.value}
                        </p>
                        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* ── Pillars ── */}
                  <div className="mt-6 space-y-2.5">
                    {product.pillars.map((pillar) => {
                      const PillarIcon =
                        PILLAR_ICONS[pillar.title] ?? Sparkles;
                      return (
                        <div
                          key={pillar.title}
                          className="flex gap-3 rounded-2xl border border-slate-100 p-4 transition-colors duration-150 hover:border-slate-200 hover:bg-slate-50/60"
                          style={{ backgroundColor: theme.pillarsAccent }}
                        >
                          <div
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                            style={{
                              backgroundColor: `${theme.accentHex}18`,
                            }}
                          >
                            <PillarIcon
                              className="h-3.5 w-3.5"
                              style={{ color: theme.pillarsIconColor }}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
                              {pillar.title}
                            </h4>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {pillar.body}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── CTAs ── */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Primary — moving border */}
                    <MovingBorderButton
                      as={Link}
                      href={product.href}
                      target={
                        product.slug === "hireai" ? "_blank" : undefined
                      }
                      rel={
                        product.slug === "hireai"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      borderRadius="2rem"
                      duration={3500}
                      containerClassName="h-11 w-auto shrink-0"
                      borderClassName={theme.borderGradient}
                      className="group/btn inline-flex gap-2 px-6 text-sm font-semibold text-white bg-[#0a0a0a] border-transparent"
                    >
                      {product.cta}
                      {product.slug === "hireai" ? (
                        <ExternalLink className="h-4 w-4" />
                      ) : (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                      )}
                    </MovingBorderButton>

                    {/* Secondary — ghost */}
                    <Link
                      href={product.secondaryHref}
                      className="group/sec inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                    >
                      {product.secondaryCta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/sec:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
