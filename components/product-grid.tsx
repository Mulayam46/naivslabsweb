"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Users, Zap, RefreshCw, Brain, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { productFamily } from "@/lib/site-data";

const EASING = [0.22, 1, 0.36, 1] as const;

// Distinct icons per pillar — keyed by title for both products
const PILLAR_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "Screen at scale": Zap,
  "Keep humans in the loop": Users,
  "Move with consistency": RefreshCw,
  "Understand the work": Brain,
  "Build context memory": Clock,
  "Recommend the next step": Sparkles,
};

export function ProductGrid() {
  return (
    <section id="products" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="max-w-2xl"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--muted)" }}
          >
            Featured products
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            A product family, not a single landing page.
          </h2>
          <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
            Each product solves a concrete problem. Together they tell the story of a company building the AI layer for modern work.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {productFamily.map((product, i) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.85, ease: EASING }}
              className="relative overflow-hidden rounded-[2rem] border p-7 shadow-[0_20px_80px_rgba(15,23,42,0.06)]"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "rgba(255,255,255,0.78)",
              }}
            >
              <div
                className="absolute right-0 top-0 h-44 w-44 rounded-full blur-3xl"
                style={{
                  background:
                    product.slug === "hireai"
                      ? "rgba(29,78,216,0.12)"
                      : "rgba(15,23,42,0.08)",
                }}
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.24em]"
                      style={{ color: "var(--muted)" }}
                    >
                      {product.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      {product.name}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {product.description}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium"
                    style={{
                      borderColor: product.status === "live" ? "rgba(22,163,74,0.25)" : "rgba(217,119,6,0.25)",
                      backgroundColor: product.status === "live" ? "rgba(22,163,74,0.08)" : "rgba(217,119,6,0.08)",
                      color: product.status === "live" ? "#15803d" : "#b45309",
                    }}
                  >
                    {product.status === "live" ? "Live" : "In development"}
                  </span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {product.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "rgba(255,255,255,0.72)",
                      }}
                    >
                      <p className="text-xl font-semibold tracking-tight">{metric.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  {product.pillars.map((pillar) => {
                    const PillarIcon = PILLAR_ICONS[pillar.title] ?? Sparkles;
                    return (
                      <div
                        key={pillar.title}
                        className="flex gap-3 rounded-2xl border p-4"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor:
                            product.slug === "hireai"
                              ? "rgba(15,23,42,0.03)"
                              : "rgba(29,78,216,0.03)",
                        }}
                      >
                        <PillarIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                        <div>
                          <h4 className="text-sm font-semibold tracking-tight">{pillar.title}</h4>
                          <p className="mt-1 text-sm leading-6" style={{ color: "var(--muted)" }}>
                            {pillar.body}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={product.secondaryHref}
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200 hover:bg-white hover:border-[rgba(29,78,216,0.25)]"
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "rgba(255,255,255,0.82)",
                      color: "var(--text)",
                    }}
                  >
                    {product.secondaryCta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <Link
                    href={product.href}
                    target={product.slug === "hireai" ? "_blank" : undefined}
                    rel={product.slug === "hireai" ? "noopener noreferrer" : undefined}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--text)",
                      color: "#f8fafc",
                    }}
                  >
                    {product.cta}
                    {product.slug === "hireai" ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
