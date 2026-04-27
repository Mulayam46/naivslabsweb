"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

export function NotifySection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Future: await api call here
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="notify"
      className="px-4 py-24 md:px-8"
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "rgba(255,255,255,0.58)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASING }}
          className="rounded-[2rem] border p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.06)] md:p-12"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--muted)" }}
          >
            Early access
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Be early to the NavisLabs product stack.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
            Get updates on HireAI, Navis AI, and the public launch of the broader company ecosystem.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <CheckCircle2 className="h-8 w-8" style={{ color: "var(--accent)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--muted-strong)" }}>
                You&apos;re on the list. We&apos;ll reach out soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={loading}
                className="h-12 flex-1 rounded-full border px-5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[rgba(29,78,216,0.35)] focus:border-[var(--accent)] disabled:opacity-60"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.92)",
                  color: "var(--text)",
                }}
              />

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--text)",
                  color: "#f8fafc",
                }}
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Joining...
                  </>
                ) : (
                  <>
                    Join waitlist
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-5 text-xs uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
            No spam. Just product updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
