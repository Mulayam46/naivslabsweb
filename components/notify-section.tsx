"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

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
                  className="h-12 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition-shadow focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={loading}
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
            <Globe3D
              className="h-full w-full"
              markers={GLOBE_MARKERS}
              config={{
                atmosphereColor: "#4da6ff",
                atmosphereIntensity: 20,
                bumpScale: 5,
                autoRotateSpeed: 0.3,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
