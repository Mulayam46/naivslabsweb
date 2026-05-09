"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, CheckCircle2, Sparkles, X } from "lucide-react";
import type { GlobeMarker } from "@/components/ui/3d-globe";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      setShowSuccessModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
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
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASING }}
          /* Card — same style as demo: white bg, ring, overflow-hidden so globe clips */
          className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10 shadow-black/10 min-h-[400px]"
        >
          {/* ── Left: content ── */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:max-w-[55%]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Early access
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl md:text-5xl">
              Join early access.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Founders, operators, and engineering leads are running their week
              on Navis. Private beta — limited seats — founding rates locked in.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 flex items-center gap-3"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <p className="text-sm font-medium text-slate-700">
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
                  className="h-12 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition-shadow focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={loading}
                  suppressHydrationWarning
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-slate-900 ring-inset transition-all duration-200 hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
              <p className="mt-3 text-xs font-medium text-red-500">
                {error}
              </p>
            )}

            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-400">
              No spam. Just product updates · hello@navislabs.in
            </p>
          </div>

          {/* ── Right: Globe ── */}
          <div className="pointer-events-none absolute bottom-0 right-0 z-0 size-[320px] translate-x-1/3 translate-y-1/3 opacity-60 sm:size-[420px] sm:opacity-90 md:size-[580px] md:translate-x-1/4 md:translate-y-1/4 md:opacity-100">
            {showGlobe ? (
              <Globe3D
                className="h-full w-full"
                markers={GLOBE_MARKERS}
                config={{
                  atmosphereColor: "#4da6ff",
                  atmosphereIntensity: 20,
                  bumpScale: 5,
                  autoRotateSpeed: 0.25,
                }}
              />
            ) : (
              <div
                className="h-full w-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(77,166,255,0.38), rgba(59,130,246,0.18) 35%, rgba(15,23,42,0.08) 62%, transparent 72%)",
                  filter: "blur(6px)",
                }}
              />
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-success-title"
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white p-7 text-center shadow-[0_24px_80px_rgba(15,23,42,0.24)]"
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASING }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(96,165,250,0.30),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(168,85,247,0.22),transparent_34%),linear-gradient(135deg,rgba(240,249,255,0.94),rgba(255,255,255,0.96)_48%,rgba(245,243,255,0.9))]" />
              <motion.button
                type="button"
                aria-label="Close success message"
                onClick={() => setShowSuccessModal(false)}
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm transition hover:text-slate-900"
                whileTap={{ scale: 0.94 }}
              >
                <X className="h-4 w-4" />
              </motion.button>

              <div className="relative z-10">
                <motion.div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 via-sky-400 to-violet-500 text-white shadow-[0_16px_40px_rgba(59,130,246,0.35)]"
                  initial={{ scale: 0.5, rotate: -14 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, duration: 0.55, ease: EASING }}
                >
                  <BadgeCheck className="h-10 w-10" />
                </motion.div>

                <motion.div
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.35 }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Early access unlocked
                </motion.div>

                <motion.h3
                  id="waitlist-success-title"
                  className="mt-5 text-4xl font-black tracking-tight text-slate-950"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                >
                  You Are In
                </motion.h3>

                <motion.p
                  className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.4 }}
                >
                  Thanks for joining Navis early access. We saved your spot
                  and will reach out with the next beta wave.
                </motion.p>

                <motion.button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white shadow-[0_16px_32px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  Perfect
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
