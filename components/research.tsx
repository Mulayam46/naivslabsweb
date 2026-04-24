"use client";

import { motion } from "framer-motion";

const EASING = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    number: "01",
    title: "Understands your work",
    body: "Navis connects your emails, meetings, and workflows to understand what you're actually working on.",
  },
  {
    number: "02",
    title: "Builds real context",
    body: "It tracks your priorities, conversations, and decisions — not just isolated tasks or messages.",
  },
  {
    number: "03",
    title: "Tells you what to do next",
    body: "Instead of dashboards or summaries, Navis surfaces clear actions so you can focus on what actually matters.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="research"
      className="px-4 py-32 md:px-8"
      style={{
        backgroundColor: "#050507",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="mb-20 max-w-2xl"
        >
          <p
            className="mb-3 text-xs font-medium uppercase tracking-widest"
            style={{ color: "#52525b" }}
          >
            Navis AI
          </p>

          <h2
            className="font-serif text-4xl font-normal tracking-tight md:text-5xl"
            style={{
              color: "#f4f4f5",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            What Navis does.
          </h2>

          <p
            className="mt-6 text-base font-light leading-relaxed"
            style={{ color: "#71717a" }}
          >
            Most tools show you more information. Navis helps you decide what to do next.
          </p>
        </motion.div>

        {/* Features */}
        <div className="flex flex-col">
          {FEATURES.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.9, ease: EASING }}
              className="grid gap-6 py-10 md:grid-cols-[80px_1fr]"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {/* Number */}
              <span
                className="font-mono text-xs"
                style={{ color: "#3f3f46", paddingTop: "2px" }}
              >
                {item.number}
              </span>

              {/* Content */}
              <div>
                <h3
                  className="font-serif text-lg font-normal leading-snug"
                  style={{
                    color: "#e4e4e7",
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="mt-2 text-sm font-light leading-relaxed"
                  style={{ color: "#71717a" }}
                >
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}