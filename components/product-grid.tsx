"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Users } from "lucide-react";
import Link from "next/link";

const EASING = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
  {
    icon: <Users className="h-7 w-7" style={{ color: "#f4f4f5" }} />,
    name: "HireAI",
    tagline: "Hiring · Live",
    description:
      "AI-powered hiring system that screens candidates, analyzes resumes, and surfaces the best matches — so your team focuses only on high-signal conversations.",
    href: "https://navishire.com",
    cta: "Open HireAI",
    status: "live" as const,
  },
  {
    icon: <BrainCircuit className="h-7 w-7" style={{ color: "#f4f4f5" }} />,
    name: "Navis AI",
    tagline: "Decision Intelligence · Coming Soon",
    description:
      "Navis observes your emails, meetings, and workflows — and tells you what to do next. It turns scattered signals into clear decisions.",
    href: "#notify",
    cta: "Join waitlist",
    status: "coming-soon" as const,
  },
];

const STATUS_CONFIG = {
  live: {
    label: "Live",
    style: {
      backgroundColor: "rgba(16,185,129,0.1)",
      color: "#34d399",
      border: "1px solid rgba(16,185,129,0.2)",
    },
  },
  "coming-soon": {
    label: "Coming Soon",
    style: {
      backgroundColor: "rgba(161,161,170,0.07)",
      color: "#71717a",
      border: "1px solid rgba(161,161,170,0.15)",
    },
  },
};

export function ProductGrid() {
  return (
    <section
      id="products"
      className="px-4 py-32 md:px-8"
      style={{ backgroundColor: "#09090b" }}
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="mb-16"
        >
          <p
            className="mb-3 text-xs font-medium uppercase tracking-widest"
            style={{ color: "#52525b" }}
          >
            Products
          </p>

          <h2
            className="font-serif text-4xl font-normal tracking-tight md:text-5xl"
            style={{
              color: "#f4f4f5",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            What we ship.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: EASING }}
              className="group flex flex-col justify-between rounded-2xl p-8"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <div>
                {/* Icon + Status */}
                <div className="mb-8 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                    }}
                  >
                    {product.icon}
                  </div>

                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={STATUS_CONFIG[product.status].style}
                  >
                    {STATUS_CONFIG[product.status].label}
                  </span>
                </div>

                {/* Tagline */}
                <p
                  className="mb-1.5 text-xs uppercase tracking-widest"
                  style={{ color: "#52525b" }}
                >
                  {product.tagline}
                </p>

                {/* Name */}
                <h3
                  className="mb-4 font-serif text-2xl font-normal"
                  style={{
                    color: "#f4f4f5",
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "#71717a" }}
                >
                  {product.description}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  href={product.href}
                  target={product.status === "live" ? "_blank" : undefined}
                  rel={
                    product.status === "live"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: "#a1a1aa" }}
                >
                  {product.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}