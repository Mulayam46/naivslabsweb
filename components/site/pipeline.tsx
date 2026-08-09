"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { Plug, Layers, Sparkles, UserCheck } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   The one scroll animation on the site.

   Four steps advance as the section passes through the viewport: a
   rail fills, and each step lifts from muted to active. That is the
   whole effect — no parallax, no particles, no pinned scene.

   Under prefers-reduced-motion it renders the same four steps fully
   resolved, with no scroll binding at all.
═══════════════════════════════════════════════════════════ */

const STEPS = [
  [Plug, "Connect", "Read-only access to the systems you already run."],
  [Layers, "Understand", "One live model of people, projects, decisions and commitments."],
  [Sparkles, "Recommend", "What was promised, measured against what happened."],
  [UserCheck, "Approve", "A person decides. Nothing acts on its own."],
] as const;

const ICON = { strokeWidth: 1.75, "aria-hidden": true, className: "icon-ui" } as const;

function Step({
  index,
  progress,
  reduce,
  Icon,
  title,
  body,
}: {
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
  Icon: (typeof STEPS)[number][0];
  title: string;
  body: string;
}) {
  /* Each step owns a quarter of the scroll range. Hooks stay
     unconditional — reduced motion drops the style, not the hook. */
  const from = index / STEPS.length;
  const to = from + 1 / STEPS.length;

  const opacity = useTransform(progress, [from - 0.12, from + 0.02, to + 0.3], [0.35, 1, 1]);
  const borderColor = useTransform(
    progress,
    [from - 0.12, from + 0.02],
    ["var(--border)", "var(--accent)"],
  );

  return (
    <motion.li
      style={reduce ? undefined : { opacity }}
      className="grid grid-cols-[2.75rem_1fr] items-start gap-5 pb-10 sm:gap-7"
    >
      <motion.span
        style={reduce ? undefined : { borderColor }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-accent"
      >
        <Icon {...ICON} />
      </motion.span>
      <div className="pt-2">
        <h3 className="t-section text-text">{title}</h3>
        <p className="t-body mt-1.5 max-w-[46ch] text-text-2">{body}</p>
      </div>
    </motion.li>
  );
}

export function Pipeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  /* The rail fills with scroll — the only scroll-linked value on the page. */
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto max-w-[760px]">
      {/* Rail */}
      <span
        aria-hidden
        className="absolute bottom-10 left-[1.375rem] top-6 w-px bg-border"
      />
      {!reduce && (
        <motion.span
          aria-hidden
          style={{ scaleY: railScale, originY: 0 }}
          className="absolute bottom-10 left-[1.375rem] top-6 w-px bg-accent"
        />
      )}

      <ol className="relative">
        {STEPS.map(([Icon, title, body], i) => (
          <Step
            key={title}
            index={i}
            progress={scrollYProgress}
            reduce={Boolean(reduce)}
            Icon={Icon}
            title={title}
            body={body}
          />
        ))}
      </ol>
    </div>
  );
}
