"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Brain,
  Clock,
  MessageSquare,
  Calendar,
  Mail,
  ShieldCheck,
  Zap,
  Layers,
  Cpu
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const EASING = [0.22, 1, 0.36, 1] as const;

export function NavisProduct() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "navis-ai-hero-cta" })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not join waitlist");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#03081e] text-slate-200 overflow-hidden">
      {/* Gradient nebula background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,right,_#2dd4bf_0%,#0c4a6e_70%)] opacity-30" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,left,_#a78bfa_0%,#0c4a6e_70%)] opacity-30" />

      {/* Subtle animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Central card with glow */}
      <div className="relative z-10 w-full max-w-4xl mx-auto p-8 md:p-12 bg-slate-950/70 border border-slate-800 rounded-2xl backdrop-blur-md shadow-2xl">
        <GlowingEffect
          blur={0}
          borderWidth={1.5}
          spread={80}
          glow={true}
          proximity={64}
          inactiveZone={0.01}
          disabled={false}
        />
        <div className="relative space-y-8 text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASING }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Navis AI – <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400">Coming Soon</span>
          </motion.h1>

          {/* Tagline with typing effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-slate-300"
          >
            The Decision Layer that unifies your stack – Slack, Gmail, Calendar, CRM – into a single, actionable brain.
          </motion.p>

          {/* Feature icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mt-6"
          >
            <div className="flex flex-col items-center">
              <Brain className="h-8 w-8 text-cyan-400" />
              <span className="mt-2 text-xs text-slate-400">Unified Brain</span>
            </div>
            <div className="flex flex-col items-center">
              <Layers className="h-8 w-8 text-purple-400" />
              <span className="mt-2 text-xs text-slate-400">Impact Stack</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
              <span className="mt-2 text-xs text-slate-400">Governed Policies</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-8 w-8 text-yellow-400" />
              <span className="mt-2 text-xs text-slate-400">Realtime Action</span>
            </div>
          </motion.div>

          {/* Waitlist form */}
          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 mt-8"
              >
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                <p className="text-sm font-medium text-white">You’re on the list. We’ll email you soon.</p>
                <p className="text-xs text-slate-400">{email}</p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col items-center mt-8 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    className="h-10 w-72 rounded-lg border border-slate-700 bg-slate-800/50 px-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin" />
                      Signing up…
                    </span>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                {error && (
                  <p className="text-xs text-red-400 font-medium">{error}</p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
