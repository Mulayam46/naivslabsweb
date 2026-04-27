"use client";

import { motion } from "framer-motion";
import { Zap, Users, Target, ShieldCheck } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

const INSIGHTS = [
  {
    icon: Zap,
    stat: "Ship hiring decisions faster",
    context: "HireAI screens large applicant pools instantly, so your team focuses on the strongest matches.",
  },
  {
    icon: Users,
    stat: "Two products, one mission",
    context: "HireAI is live today. Navis AI is the decision layer arriving next — built on the same platform.",
  },
  {
    icon: Target,
    stat: "Signal over noise, every time",
    context: "Every product is designed around a concrete outcome. No generic dashboards, no vague AI claims.",
  },
  {
    icon: ShieldCheck,
    stat: "Built for teams that don't cut corners",
    context: "Product-led from day one. Humans stay in the loop — AI handles the volume, your team makes the call.",
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
          {INSIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: EASING }}
                className="rounded-2xl border p-5 transition-all duration-200 hover:shadow-sm hover:border-[rgba(29,78,216,0.2)] hover:bg-white"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.72)",
                }}
              >
                <div
                  className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(29,78,216,0.08)" }}
                >
                  <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
                </div>
                <p className="text-sm font-semibold tracking-tight text-[color:var(--text)]">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                  {item.context}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
