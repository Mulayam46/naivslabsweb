"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EASING = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.13, duration: 1.1, ease: EASING },
  }),
};

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16"
      style={{ backgroundColor: "#09090b" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="h-[45rem] w-[45rem] rounded-full blur-[150px]"
          style={{ backgroundColor: "rgba(100,100,110,0.12)" }}
        />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">

        {/* 🔥 Status badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(255,255,255,0.025)",
            color: "#71717a",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#52525b" }}
          />
          NavisLabs — Building in public
        </motion.div>

        {/* 🔥 HEADLINE (fixed) */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif font-normal leading-[1.07] tracking-tight"
          style={{
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            color: "#f4f4f5",
            fontFamily: "var(--font-playfair), Georgia, serif",
          }}
        >
          Navis tells you
          <br className="hidden sm:block" />
          <span style={{ color: "#3f3f46" }}>what to do next.</span>
        </motion.h1>

        {/* 🔥 SUBTEXT */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 max-w-2xl text-lg font-light leading-relaxed md:text-xl"
          style={{ color: "#71717a" }}
        >
          It watches your emails, meetings, and workflows — 
          and turns them into clear decisions.
        </motion.p>

        {/* 🔥 CTA */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="#products"
            className="group flex h-12 items-center gap-2 rounded-full px-8 text-sm font-medium transition-all active:scale-[0.97]"
            style={{ backgroundColor: "#f4f4f5", color: "#09090b" }}
          >
            See Navis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="#notify"
            className="flex h-12 items-center rounded-full px-8 text-sm font-medium transition-all active:scale-[0.97]"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#71717a",
            }}
          >
            Join waitlist
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px"
          style={{
            background: "linear-gradient(to bottom, #3f3f46, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}