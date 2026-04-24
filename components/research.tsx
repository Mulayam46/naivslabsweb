"use client";

import { motion } from "framer-motion";
import { companyPillars } from "@/lib/site-data";

const EASING = [0.22, 1, 0.36, 1] as const;

const FLOW = [
  {
    number: "01",
    title: "Capture the signal",
    body: "Bring together the work inputs that matter so the product can understand the organization instead of just one workflow.",
  },
  {
    number: "02",
    title: "Turn it into product behavior",
    body: "Each product is designed around a specific outcome, with UX that reduces work instead of adding new dashboards.",
  },
  {
    number: "03",
    title: "Scale the platform",
    body: "The structure leaves room for more products, more pages, and more capabilities without changing the brand direction.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="platform"
      className="px-4 py-24 md:px-8"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "rgba(255,255,255,0.58)",
      }}
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
            Platform thinking
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built to become a product company, not a splash page.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
            The experience is organized around how a real AI company grows: a clear brand, distinct products, shared principles, and room for expansion.
          </p>

          <div className="mt-8 grid gap-4">
            {companyPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border p-5"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.74)",
                }}
              >
                <h3 className="text-sm font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col">
          {FLOW.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: EASING }}
              className="grid gap-5 py-8 md:grid-cols-[84px_1fr]"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span className="pt-1 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
                {item.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
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
