"use client";

import { motion } from "framer-motion";

const EASING = [0.22, 1, 0.36, 1] as const;

const INSIGHTS = [
  {
    stat: "Most work isn't hard.",
    context: "It's deciding what actually matters.",
  },
  {
    stat: "Tools give you more information.",
    context: "They don’t help you decide.",
  },
  {
    stat: "You stay busy all day.",
    context: "But progress still feels unclear.",
  },
  {
    stat: "No system today",
    context: "tells you what to do next.",
  },
];

export function StatsBanner() {
  return (
    <section
      className="px-4 py-16 md:px-8"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        backgroundColor: "#050507",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {INSIGHTS.map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.8, ease: EASING }}
              className="flex flex-col gap-2"
            >
              <span
                className="font-serif text-2xl font-normal md:text-3xl"
                style={{
                  color: "#f4f4f5",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                {item.stat}
              </span>

              <span
                className="text-xs font-light leading-relaxed"
                style={{ color: "#52525b" }}
              >
                {item.context}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}