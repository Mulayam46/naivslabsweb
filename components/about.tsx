"use client";

import { motion } from "framer-motion";

const EASING = [0.22, 1, 0.36, 1] as const;

const COMPANY_FACTS = [
  { value: "2026", label: "Founded" },
  { value: "Bangalore", label: "Headquarters" },
  { value: "Global", label: "Market focus" },
  { value: "Multi-product", label: "AI platform" },
];

export function About() {
  return (
    <section
      id="about"
      className="px-4 py-32 md:px-8"
      style={{ backgroundColor: "#09090b" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASING }}
          >
            <p
              className="mb-3 text-xs font-medium uppercase tracking-widest"
              style={{ color: "#52525b" }}
            >
              About
            </p>

            <h2
              className="font-serif text-4xl font-normal tracking-tight md:text-5xl"
              style={{
                color: "#f4f4f5",
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              NavisLabs.
            </h2>

            {/* 🔥 Core positioning */}
            <p
              className="mt-6 max-w-lg text-base font-light leading-relaxed"
              style={{ color: "#a1a1aa" }}
            >
              NavisLabs builds AI that tells you what to do next.
              We connect signals across your work — emails, meetings, and workflows — 
              and turn them into clear, actionable decisions.
            </p>

            {/* 🔥 Product clarity */}
            <p
              className="mt-4 max-w-lg text-base font-light leading-relaxed"
              style={{ color: "#71717a" }}
            >
              Navis AI is currently in development — a decision intelligence system 
              that observes your work, builds memory over time, and guides your next move.
              We are building the intelligence layer for modern work.
            </p>

            {/* 🔥 Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.linkedin.com/company/navis-ai/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#a1a1aa",
                }}
              >
                LinkedIn
              </a>

              <a
                href="mailto:hello@navislabs.ai"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#a1a1aa",
                }}
              >
                Contact us
              </a>
            </div>
          </motion.div>

          {/* Right — company facts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.9, ease: EASING }}
            className="self-start"
          >
            <div
              className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              {COMPANY_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1.5 p-8"
                  style={{ backgroundColor: "#09090b" }}
                >
                  <span
                    className="font-serif text-2xl font-normal"
                    style={{
                      color: "#f4f4f5",
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    {fact.value}
                  </span>

                  <span className="text-xs" style={{ color: "#52525b" }}>
                    {fact.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 🔥 Updated specialties */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Decision Intelligence",
                "AI Systems",
                "Context Memory",
                "Agentic Workflows",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#52525b",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}