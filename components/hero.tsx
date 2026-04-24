"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { companyStats, productFamily } from "@/lib/site-data";

const EASING = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: EASING },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-24 md:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(29,78,216,0.12), transparent 26%), radial-gradient(circle at 80% 20%, rgba(15,23,42,0.05), transparent 24%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 pb-20 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-12">
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.28em]"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "rgba(255,255,255,0.65)",
              color: "var(--muted-strong)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            NavisLabs is building a multi-product AI company
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            AI products for hiring, context, and the next decision.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-balance"
            style={{ color: "var(--muted)" }}
          >
            NavisLabs builds focused products that help teams hire with more
            signal and work with more clarity. HireAI is live, and Navis AI is
            becoming the decision layer for modern organizations.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/products"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: "var(--text)",
                color: "#f8fafc",
              }}
            >
              Explore products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#notify"
              className="inline-flex h-12 items-center justify-center rounded-full border px-7 text-sm font-semibold transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                backgroundColor: "rgba(255,255,255,0.6)",
              }}
            >
              Join the waitlist
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {companyStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border p-4 backdrop-blur-sm"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.66)",
                }}
              >
                <div className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">
                  {item.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASING, delay: 0.12 }}
          className="relative"
        >
          <div
            className="absolute -inset-6 rounded-[2rem] blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(29,78,216,0.14), rgba(255,255,255,0))",
            }}
          />
          <div
            className="relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "rgba(255,255,255,0.82)",
            }}
          >
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border)" }}>
              <div>
                <p className="text-xs uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
                  Product family
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">
                  Two products. One company.
                </h2>
              </div>
              <span
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: "rgba(29,78,216,0.16)",
                  backgroundColor: "rgba(29,78,216,0.08)",
                  color: "var(--accent)",
                }}
              >
                Live and shipping
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {productFamily.map((product) => (
                <div
                  key={product.slug}
                  className="rounded-[1.35rem] border p-5"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor:
                      product.slug === "hireai"
                        ? "rgba(15, 23, 42, 0.04)"
                        : "rgba(29, 78, 216, 0.04)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
                        {product.eyebrow}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight">
                        {product.name}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-6" style={{ color: "var(--muted)" }}>
                        {product.blurb}
                      </p>
                    </div>
                    <span
                      className="rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "rgba(255,255,255,0.8)",
                        color: "var(--muted-strong)",
                      }}
                    >
                      {product.slug === "hireai" ? "Live" : "Build"}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-sm font-medium">
                    <Link href={product.secondaryHref} className="text-[color:var(--text)] hover:opacity-70">
                      {product.secondaryCta}
                    </Link>
                    <span style={{ color: "var(--muted)" }}>•</span>
                    <Link
                      href={product.href}
                      target={product.slug === "hireai" ? "_blank" : undefined}
                      rel={product.slug === "hireai" ? "noopener noreferrer" : undefined}
                      className="text-[color:var(--muted-strong)] hover:opacity-70"
                    >
                      {product.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
