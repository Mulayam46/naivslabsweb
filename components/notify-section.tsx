"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { GlobeMarker } from "@/components/ui/3d-globe";
import Earth from "./globe";

const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((mod) => mod.Globe3D),
  { ssr: false }
);

const EASING = [0.22, 1, 0.36, 1] as const;

const GLOBE_MARKERS: GlobeMarker[] = [
  { lat: 40.7128,  lng: -74.006,   src: "https://assets.aceternity.com/avatars/1.webp",  label: "New York"      },
  { lat: 51.5074,  lng: -0.1278,   src: "https://assets.aceternity.com/avatars/2.webp",  label: "London"        },
  { lat: 35.6762,  lng: 139.6503,  src: "https://assets.aceternity.com/avatars/3.webp",  label: "Tokyo"         },
  { lat: -33.8688, lng: 151.2093,  src: "https://assets.aceternity.com/avatars/4.webp",  label: "Sydney"        },
  { lat: 48.8566,  lng: 2.3522,    src: "https://assets.aceternity.com/avatars/5.webp",  label: "Paris"         },
  { lat: 12.9716,  lng: 77.5946,   src: "https://assets.aceternity.com/avatars/6.webp",  label: "Bangalore"     },
  { lat: 55.7558,  lng: 37.6173,   src: "https://assets.aceternity.com/avatars/7.webp",  label: "Moscow"        },
  { lat: -22.9068, lng: -43.1729,  src: "https://assets.aceternity.com/avatars/8.webp",  label: "Rio de Janeiro"},
  { lat: 31.2304,  lng: 121.4737,  src: "https://assets.aceternity.com/avatars/9.webp",  label: "Shanghai"      },
  { lat: 25.2048,  lng: 55.2708,   src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai"         },
  { lat: 1.3521,   lng: 103.8198,  src: "https://assets.aceternity.com/avatars/11.webp", label: "Singapore"     },
  { lat: 37.5665,  lng: 126.978,   src: "https://assets.aceternity.com/avatars/12.webp", label: "Seoul"         },
  { lat: 28.6139,  lng: 77.209,    src: "https://assets.aceternity.com/avatars/13.webp", label: "New Delhi"     },
];

export function NotifySection() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)"
    );
    const update = () => setShowGlobe(!mediaQuery.matches);
    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-notify" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not join waitlist");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="notify"
      className="relative px-4 py-24 md:px-8"
      style={{
        borderTop: "1px solid rgba(51,65,85,0.5)",
        backgroundColor: "#03081e",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASING }}
          className="relative rounded-2xl border border-slate-700 bg-slate-800/30 backdrop-blur-sm shadow-xl"
          style={{ overflow: "visible" }}
        >
          {/* ── Left: content ── */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:max-w-[55%]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
              Early access
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
              Join early access.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Founders, operators, and engineering leads are running their week
              on Navis. Private beta — limited seats — founding rates locked in.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 flex items-center gap-3"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <p className="text-sm font-medium text-slate-300">
                  You&apos;re on the list. We&apos;ll reach out soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={loading}
                  suppressHydrationWarning
                  className="h-12 flex-1 rounded-full border border-slate-700 bg-slate-900/50 px-5 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={loading}
                  suppressHydrationWarning
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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

            {error && (
              <p className="mt-3 text-xs font-medium text-red-400">
                {error}
              </p>
            )}

            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-500">
              No spam. Just product updates · hello@navislabs.in
            </p>
          </div>

          {/* ── Right: Globe ── */}
          <div className="pointer-events-none absolute right-0 top-[-1/2] z-0 -translate-y-1/2">
            <div className="relative h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] lg:h-[700px] lg:w-[700px]">
              <Earth />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}