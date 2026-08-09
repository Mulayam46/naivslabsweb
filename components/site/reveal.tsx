"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════════════════════
   The only scroll animation on the site.

   Animates opacity, translateY, blur and scale — nothing else.
   No colour transitions, no rotation, no scroll-pinned scenes.
   Under prefers-reduced-motion it renders a plain div.
═══════════════════════════════════════════════════════════ */

export function Reveal({
  children,
  delay = 0,
  y = 16,
  blur = true,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y, filter: blur ? "blur(6px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Page-load reveal for above-the-fold content — plays immediately, not on scroll. */
export function Enter({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-driven settle for the product shot.
 *
 * The dashboard starts slightly small, low and tilted back, then resolves
 * into place as it scrolls up — so it reads as rising out of the hero
 * rather than appearing as a separate block. Bound to scroll position,
 * not a timer, so it tracks the user rather than playing at them.
 */
export function ScrollSettle({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "start 0.32"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0.55, 1]);

  if (reduce) return <div ref={ref}>{children}</div>;

  return (
    <div ref={ref} style={{ perspective: 1600 }}>
      <motion.div style={{ scale, y, rotateX, opacity, transformOrigin: "50% 0%" }}>
        {children}
      </motion.div>
    </div>
  );
}
