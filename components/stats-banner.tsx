"use client";

import { motion } from "framer-motion";

const EASING = [0.22, 1, 0.36, 1] as const;

const INSIGHTS = [
  {
    stat: "Built as a company platform",
    context: "The site is designed to grow with new products, not just one launch.",
  },
  {
    stat: "Two clear product paths",
    context: "HireAI is live, and Navis AI defines the next layer of the brand.",
  },
  {
    stat: "Cleaner decision making",
    context: "The product story centers on useful outcomes instead of generic AI claims.",
  },
  {
    stat: "Premium, but practical",
    context: "The visual system aims to feel calm, direct, and easy to extend.",
  },
];

export function StatsBanner() {
  return (
    <section
      className="px-4 py-6 md:px-8 md:py-8"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "rgba(255,255,255,0.52)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {INSIGHTS.map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: EASING }}
              className="rounded-2xl border p-5"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "rgba(255,255,255,0.72)",
              }}
            >
              <p className="text-sm font-semibold tracking-tight text-[color:var(--text)]">
                {item.stat}
              </p>
              <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                {item.context}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
