"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASING = [0.22, 1, 0.36, 1] as const;

const COMPANY_FACTS = [
  { value: "2026", label: "Founded" },
  { value: "Bangalore", label: "Headquarters" },
  { value: "Global", label: "Market focus" },
  { value: "Product-led", label: "Operating model" },
];

const PRINCIPLES = [
  "Clear product boundaries",
  "Useful AI over vague AI",
  "A platform that can expand",
  "A premium public brand",
];

export function About() {
  return (
    <section
      id="company"
      className="px-4 py-24 md:px-8"
      style={{ backgroundColor: "rgba(246,242,234,0.9)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASING }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--muted)" }}
          >
            Company
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            NavisLabs is the company behind the products.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
            We are building a family of AI products that help teams hire better,
            understand context faster, and move toward the right next action.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="mailto:hello@navislabs.ai"
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-95"
              style={{
                backgroundColor: "var(--text)",
                color: "#f8fafc",
              }}
            >
              Contact us
            </Link>
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold transition-all duration-200 hover:bg-white hover:border-[rgba(29,78,216,0.25)] active:scale-95"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
              View products
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.85, ease: EASING }}
        >
          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "rgba(15,23,42,0.06)",
            }}
          >
            {COMPANY_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1.5 p-6 sm:p-8"
                style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
              >
                <span className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">
                  {fact.value}
                </span>
                <span className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
                  {fact.label}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-[2rem] border p-6"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "rgba(255,255,255,0.74)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
              Mission
            </p>
            <p className="mt-3 text-lg leading-8">
              Build AI products that remove uncertainty from work and give teams a clearer path forward.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
