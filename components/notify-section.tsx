"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

export function NotifySection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="notify"
      className="px-4 py-32 md:px-8"
      style={{
        backgroundColor: "#050507",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASING }}
        >
          {/* 🔥 Label */}
          <p
            className="mb-3 text-xs font-medium uppercase tracking-widest"
            style={{ color: "#52525b" }}
          >
            Early Access
          </p>

          {/* 🔥 Headline (fixed) */}
          <h2
            className="font-serif text-4xl font-normal tracking-tight md:text-5xl"
            style={{
              color: "#f4f4f5",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Stop guessing.
            <br />
            Start deciding.
          </h2>

          {/* 🔥 Subtext */}
          <p
            className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed"
            style={{ color: "#71717a" }}
          >
            Navis is building a new way to work — where your emails, meetings,
            and workflows turn into clear decisions.
            <br />
            <br />
            Get early access before public release.
          </p>

          {/* 🔥 FORM */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <CheckCircle className="h-8 w-8" style={{ color: "#34d399" }} />
              <p className="text-sm" style={{ color: "#a1a1aa" }}>
                You&apos;re in. We&apos;ll reach out soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-12 flex-1 rounded-full px-5 text-sm outline-none w-full sm:w-auto"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#f4f4f5",
                }}
              />

              <button
                type="submit"
                className="group flex h-12 shrink-0 items-center gap-2 rounded-full px-7 text-sm font-medium transition-all active:scale-[0.97]"
                style={{ backgroundColor: "#f4f4f5", color: "#09090b" }}
              >
                Join waitlist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          {/* 🔥 Trust line */}
          <p className="mt-6 text-xs" style={{ color: "#3f3f46" }}>
            No spam. No noise. Just early access.
          </p>
        </motion.div>
      </div>
    </section>
  );
}