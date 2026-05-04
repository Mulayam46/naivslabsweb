"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

const NAV = [
  {
    heading: "Product",
    links: [
      { label: "Navis AI", href: "/products/navis-ai", ext: false },
      { label: "HireAI", href: "/products/hireai", ext: false },
      { label: "How it works", href: "/products/navis-ai#platform", ext: false },
      { label: "Pricing", href: "/products/navis-ai#waitlist", ext: false },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Company Brain", href: "/products/navis-ai", ext: false },
      { label: "Decision Memory", href: "/products/navis-ai", ext: false },
      { label: "Action Policies", href: "/products/navis-ai", ext: false },
      { label: "Audit Trace", href: "/products/navis-ai", ext: false },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company", ext: false },
      { label: "Contact", href: "mailto:hello@navislabs.in", ext: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/navis-ai/", ext: true },
      { label: "GitHub", href: "https://github.com/navis-labs", ext: true },
    ],
  },
];

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="relative overflow-hidden bg-[#05080f]">
      {/* Ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[140px] opacity-25"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.55) 0%, rgba(124,58,237,0.35) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[300px] w-[500px] rounded-full blur-[120px] opacity-15"
          style={{ backgroundColor: "#0ea5e9" }}
        />
      </div>

      {/* ── Pre-footer CTA band ── */}
      <div className="relative border-b border-white/10 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASING }}
            className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
          >
            <div className="max-w-xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-violet-300/80">
                Early access · Private beta
              </p>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl leading-[0.95]">
                Decide what matters.
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-violet-400 to-pink-300">
                  Execute with control.
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#notify"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-slate-900 transition-all duration-200 hover:bg-slate-100 active:scale-[0.98]"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/products/navis-ai"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
              >
                Learn more
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="relative px-4 pt-16 pb-0 md:px-8 md:pt-20">
        <div className="mx-auto max-w-7xl">

          {/* Top row: brand + nav */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASING, delay: 0.05 }}
              className="col-span-2 md:col-span-1"
            >
              <span className="text-xl font-black tracking-tight text-white">NavisLabs</span>
              <p className="mt-3 max-w-xs text-sm leading-7 text-white/65">
                Decision infrastructure for modern teams. AI Chief of Staff,
                Company Brain, and Decision Intelligence — built for high-stakes work.
              </p>
              <a
                href="mailto:hello@navislabs.in"
                className="mt-5 inline-block text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                hello@navislabs.in
              </a>
              <div className="mt-6 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                  Bangalore · Global
                </span>
              </div>
            </motion.div>

            {/* Nav columns */}
            {NAV.map((col, ci) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASING, delay: 0.1 + ci * 0.07 }}
              >
                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.ext ? "_blank" : undefined}
                        rel={link.ext ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-1 text-sm text-white/80 transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                        {link.ext && (
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Giant wordmark ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: EASING, delay: 0.3 }}
            className="mt-16 overflow-hidden"
            aria-hidden
          >
            <p
              className="select-none whitespace-nowrap bg-clip-text font-black leading-none tracking-tighter text-transparent"
              style={{
                fontSize: "clamp(40px, 14vw, 180px)",
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              NAVISLABS
            </p>
          </motion.div>

          {/* ── Bottom bar ── */}
          <div className="flex flex-col gap-3 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] font-medium text-white/55">
              © 2026 NavisLabs · All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
              {["AI Chief of Staff", "Company Brain", "Decision Memory", "Audit Trace"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
