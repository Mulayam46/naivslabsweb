"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Ambient hero film. Muted, looping, decorative — no sound, no controls.

   Masked away from the centre so the headline stays clean and revealed
   around the edges. The clip is high-contrast black and white and
   carries no text of its own, so it needs no blur to sit behind copy. */

export const FILM_SRC = "/future.mp4";

const HERO_MASK = [
  "radial-gradient(ellipse 56% 50% at 50% 44%, transparent 14%, rgba(0,0,0,0.55) 58%, #000 100%)",
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 78%, transparent 100%)",
].join(", ");

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** The clip is 16 MB. Don't spend that on decoration over a slow link. */
function networkAllowsHeavyMedia(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  return !["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "");
}

export function HeroFilm() {
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);
  const holder = useRef<HTMLDivElement>(null);

  /* Fetch only once the hero is on screen and the connection allows it.
     setState fires in the observer callback, never in the effect body. */
  useEffect(() => {
    if (reduce || !holder.current) return;
    const el = holder.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && networkAllowsHeavyMedia()) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={holder} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {load && (
        <video
          src={FILM_SRC}
          className="h-full w-full object-cover"
          style={{
            opacity: 0.5,
            filter: "contrast(0.92) brightness(1.06)",
            transform: "scale(1.04)",
            maskImage: HERO_MASK,
            WebkitMaskImage: HERO_MASK,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}
    </div>
  );
}
