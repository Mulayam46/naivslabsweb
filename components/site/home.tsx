"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { EASE, SystemBar, Footer } from "./chrome";

/* WAAPI rule: every scroll-linked range spans [0,1] explicitly. */
const span = (a: number, b: number): number[] => [0, a, b, 1];
/* Window: fade in at [a,b], out at [c,d]. */
const win = (a: number, b: number, c: number, d: number): number[] => [0, a, b, c, d, 1];


/* Count-up on first viewport entry — IO + rAF, no library. */


function CountUp({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduce) {
      const raf0 = requestAnimationFrame(() => setV(to));
      return () => cancelAnimationFrame(raf0);
    }
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1500);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(node);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, reduce]);
  return <span ref={ref}>{v}</span>;
}

/* ════════ SCENE 1 · THE DARK ════════ */

function SceneDark() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-screen items-center px-4 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 700px at 70% -10%, rgba(10,17,36,0.9), transparent 60%)",
        }}
      />
      <svg
        viewBox="0 0 1440 900"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {[
          "M -50 240 C 360 200, 700 320, 1500 260",
          "M -50 560 C 420 600, 900 480, 1500 580",
          "M -50 760 C 500 700, 980 820, 1500 740",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(176,183,195,0.07)"
            strokeWidth="1"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: "easeOut", delay: 0.4 + i * 0.3 }}
          />
        ))}
      </svg>

      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden">
        <div className="max-w-[1020px] lg:ml-[4%]">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="font-heading text-[2.4rem] font-semibold leading-[0.97] tracking-[-0.04em] text-ink min-[380px]:text-[2.9rem] sm:text-[4.4rem] md:text-[6.0rem] lg:text-[7.4rem] xl:text-[8.2rem]"
          >
            Your company
            <br />
            is trying to tell
            <br />
            you <span className="text-ink-3">something.</span>
          </motion.h1>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center lg:ml-[2%]"
          >
            <p className="max-w-[440px] text-[14.5px] leading-[1.7] text-ink-2 sm:text-[15.5px]">
              Navis turns fragmented signals across email, meetings, Slack,
              and calendars into organizational understanding — so important
              work doesn&apos;t quietly slip.
            </p>
            <span className="hidden h-px w-12 shrink-0 bg-line-strong sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 sm:text-[10.5px] sm:tracking-[0.22em]">
              Scroll to listen · Built by NavisLabs
            </span>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="mt-14 lg:ml-[2%]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
              Connects to
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {["Gmail", "Google Calendar", "Google Meet", "Google Docs", "Google Drive", "Slack"].map((t) => (
                <span key={t} className="rounded-md bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink-2 ring-1 ring-white/[0.08]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════ SCENE 2 · FIRST LIGHT — the object ════════ */

function Beat({
  p,
  at,
  children,
  className,
}: {
  p: MotionValue<number>;
  at: [number, number];
  children: React.ReactNode;
  className?: string;
}) {
  const opacity = useTransform(p, span(at[0], at[1]), [0, 0, 1, 1]);
  const y = useTransform(p, span(at[0], at[1]), [12, 12, 0, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

function Caption({
  p,
  at,
  text,
}: {
  p: MotionValue<number>;
  at: [number, number, number, number];
  text: string;
}) {
  const opacity = useTransform(p, win(...at), [0, 0, 1, 1, 0, 0]);
  const y = useTransform(p, win(...at), [16, 16, 0, 0, -16, -16]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute font-heading text-[1.9rem] font-semibold tracking-[-0.025em] text-ink sm:text-[2.6rem]"
    >
      {text}
    </motion.p>
  );
}

type BriefItem = {
  badge: string;
  badgeColor: string;
  title: string;
  lines: string[];          // pain → consequence, human language
  action: string;
};

const ITEMS: BriefItem[] = [
  {
    badge: "SLIPPING",
    badgeColor: "var(--critical)",
    title: "Your investor follow-up is slipping.",
    lines: [
      "You promised an updated deck. The partner meeting is Thursday.",
      "No follow-up happened.",
    ],
    action: "Send the update today.",
  },
  {
    badge: "BLOCKED",
    badgeColor: "var(--risk)",
    title: "Backend hiring is blocked on you.",
    lines: ["Two candidates are waiting on your review.", "Last action: 12 days ago."],
    action: "Resume review: 8 minutes.",
  },
  {
    badge: "AT RISK",
    badgeColor: "var(--accent)",
    title: "Acme\u2019s renewal is going quiet.",
    lines: ["No reply in 18 days.", "Renewal is in 34 days."],
    action: "Check in today.",
  },
];

/* Layer B — reasoning in human verbs, item 1 only */
const WHY: [string, string][] = [
  ["SAW", "Email promise: \u201cSending the deck Friday\u201d"],
  ["NOTICED", "No reply for 9 days"],
  ["UNDERSTOOD", "Partner meeting is Thursday"],
  ["INFERRED", "These relationships go cold fast"],
  ["DECISION", "High priority"],
];

/* Layer C — the quiet system trace, discovered last */
const TRACE: [string, string][] = [
  ["L1 SIGNALS", "214 events ingested"],
  ["L2 MEMORY", "847 entities updated"],
  ["L3 REASONING", "Priority analysis complete"],
  ["L4 DECISION", "3 actions surfaced"],
];

function ItemBlock({ item }: { item: BriefItem }) {
  return (
    <div className="border-t border-white/[0.05] py-4 first:border-t-0">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-heading text-[16px] font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[18px]">
          {item.title}
        </p>
        <span
          className="shrink-0 font-mono text-[8.5px] font-semibold tracking-[0.14em]"
          style={{ color: item.badgeColor }}
        >
          {item.badge}
        </span>
      </div>
      {item.lines.map((l) => (
        <p key={l} className="mt-1 text-[12.5px] leading-[1.6] text-ink-2 sm:text-[13px]">
          {l}
        </p>
      ))}
      <p className="mt-2 text-[13px] font-medium text-accent-ink sm:text-[13.5px]">
        → {item.action}
      </p>
    </div>
  );
}

function WhyBlock() {
  return (
    <div className="mt-3 rounded-md bg-white/[0.02] px-4 py-3">
      <p className="font-mono text-[8.5px] tracking-[0.16em] text-ink-3/70">
        WHY NAVIS SURFACED THIS
      </p>
      <div className="mt-2">
        {WHY.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5.4rem_1fr] items-baseline gap-3 py-[2.5px]">
            <span className="font-mono text-[9px] font-semibold tracking-[0.1em] text-ink-2/75">
              {k}
            </span>
            <span className="text-[11.5px] leading-[1.55] text-ink-3">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TraceBlock() {
  return (
    <div className="mx-6 mb-3 rounded-md bg-white/[0.015] px-4 py-2.5 ring-1 ring-white/[0.04] md:mx-8">
      <p className="font-mono text-[8px] tracking-[0.18em] text-ink-3/50">SIGNAL TRACE</p>
      <div className="mt-1.5 grid grid-cols-2 gap-x-6 gap-y-[3px] sm:grid-cols-4">
        {TRACE.map(([k, v]) => (
          <div key={k}>
            <p className="font-mono text-[8px] font-semibold tracking-[0.08em] text-ink-3/60">{k}</p>
            <p className="mt-[1px] font-mono text-[9px] leading-[1.4] text-ink-3/80">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TheObject({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, span(0.06, 0.13), [0, 0, 1, 1]);
  const y = useTransform(p, span(0.06, 0.13), [90, 90, 0, 0]);
  const rotate = useTransform(p, span(0.06, 0.16), [2.5, 2.5, 0, 0]);
  const halo = useTransform(p, span(0.4, 0.75), [0.12, 0.12, 0.55, 0.55]);
  const backPlane = useTransform(p, span(0.06, 0.16), [26, 26, 14, 14]);

  return (
    <motion.div style={{ opacity, y, rotate }} className="relative w-full max-w-full sm:max-w-[560px] md:max-w-[620px]">
      <motion.div
        className="pointer-events-none absolute -inset-16"
        style={{
          opacity: halo,
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(91,140,255,0.16), transparent 65%)",
        }}
      />
      <motion.div
        style={{ y: backPlane }}
        className="absolute inset-x-5 top-0 h-full rounded-[22px] bg-[rgba(16,24,40,0.38)] ring-1 ring-white/[0.04]"
      />
      <div className="relative rounded-[20px] bg-[rgba(13,20,36,0.82)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_50px_120px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.09] backdrop-blur-md">
        <div className="flex items-center justify-between px-6 pt-4 font-mono text-[9.5px] tracking-[0.14em] text-ink-3 md:px-8">
          <span>FOUNDER DAILY BRIEF</span>
          <span>07:14</span>
        </div>

        {/* LAYER A — 3-second understanding */}
        <div className="px-6 pb-1 pt-4 md:px-8">
          <Beat p={p} at={[0.15, 0.19]}>
            <p className="text-[12.5px] text-ink-3">Good morning, Abhishek.</p>
          </Beat>
          <Beat p={p} at={[0.19, 0.23]}>
            <p className="mt-0.5 font-heading text-[19px] font-semibold tracking-[-0.02em] text-ink sm:text-[21px]">
              Three things need you today.
            </p>
          </Beat>
        </div>

        <div className="px-6 pb-2 pt-2 md:px-8">
          <Beat p={p} at={[0.26, 0.32]}>
            <ItemBlock item={ITEMS[0]} />
          </Beat>

          {/* LAYER B — 10-second understanding */}
          <Beat p={p} at={[0.39, 0.46]}>
            <WhyBlock />
          </Beat>

          <div className="mt-2">
            <Beat p={p} at={[0.53, 0.59]}>
              <ItemBlock item={ITEMS[1]} />
            </Beat>
            <Beat p={p} at={[0.64, 0.7]}>
              <ItemBlock item={ITEMS[2]} />
            </Beat>
          </div>
        </div>

        {/* LAYER C — 30-second conviction */}
        <Beat p={p} at={[0.77, 0.83]}>
          <TraceBlock />
        </Beat>

        <Beat p={p} at={[0.88, 0.93]}>
          <div className="rounded-b-[20px] border-t border-white/[0.05] px-6 py-3.5 md:px-8">
            <p className="font-mono text-[10.5px] tracking-[0.08em] text-ink-3">
              <CountUp to={214} /> SIGNALS REVIEWED ·{" "}
              <span className="font-semibold text-ink">ONLY 3 NEEDED YOU</span>
            </p>
          </div>
        </Beat>
      </div>
    </motion.div>
  );
}

function SceneFirstLight() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <section className="flex justify-center px-6 py-24">
        <StaticObject />
      </section>
    );
  }

  return (
    <section id="product" ref={ref} className="relative h-[460vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 pt-10 sm:px-6">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 lg:gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="relative hidden h-40 lg:block">
            <Caption p={p} at={[0.26, 0.31, 0.35, 0.39]} text="It noticed." />
            <Caption p={p} at={[0.4, 0.45, 0.49, 0.53]} text="It knows why." />
            <Caption p={p} at={[0.55, 0.6, 0.7, 0.74]} text="It checked." />
            <Caption p={p} at={[0.78, 0.83, 0.96, 1]} text="Quietly." />
          </div>
          <div className="flex w-full flex-col items-center lg:items-start">
            <Beat p={p} at={[0.1, 0.15]} className="mb-4 sm:mb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 sm:text-[11px] sm:tracking-[0.2em]">
                What matters today?
              </p>
            </Beat>
            <TheObject p={p} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticObject() {
  return (
    <div className="w-full max-w-[620px] rounded-[20px] bg-[rgba(13,20,36,0.78)] p-7 ring-1 ring-white/[0.09]">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">FOUNDER DAILY BRIEF · 07:14</p>
      <p className="mt-4 text-[12.5px] text-ink-3">Good morning, Abhishek.</p>
      <p className="mt-0.5 font-heading text-[19px] font-semibold text-ink">Three things need you today.</p>
      <div className="mt-3">
        <ItemBlock item={ITEMS[0]} />
        <WhyBlock />
        <div className="mt-2">
          <ItemBlock item={ITEMS[1]} />
          <ItemBlock item={ITEMS[2]} />
        </div>
      </div>
      <div className="-mx-3 mt-4"><TraceBlock /></div>
      <p className="mt-4 border-t border-white/[0.05] pt-3.5 font-mono text-[10.5px] text-ink-3">
        214 SIGNALS REVIEWED · <span className="font-semibold text-ink">ONLY 3 NEEDED YOU</span>
      </p>
    </div>
  );
}

/* ════════ SCENE 3 · WHERE LIGHT ISN'T ════════ */

const SLIPS = ["Investor follow-up fades.", "Hiring stalls.", "A customer cools.", "Commitments disappear."];

function SceneSlips() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.75", "start 0.2"] });
  const slipX = useTransform(p, [0, 0.5, 1], [0, 0, 70]);
  const slipOp = useTransform(p, [0, 0.5, 1], [1, 1, 0.15]);

  return (
    <section ref={ref} className="px-6 py-40 md:py-56">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="lg:ml-[4%]">
            <h2 className="font-heading text-[3rem] font-semibold leading-[0.98] tracking-[-0.04em] text-ink sm:text-[4.6rem] md:text-[5.4rem]">
              Nothing breaks.
            </h2>
            <motion.h2
              style={reduce ? undefined : { x: slipX, opacity: slipOp }}
              className="font-heading text-[3rem] font-semibold leading-[1.15] tracking-[-0.04em] text-ink-3 sm:text-[4.6rem] md:text-[5.4rem]"
            >
              It slips.
            </motion.h2>
          </div>
          <div className="lg:mb-3 lg:mr-[2%]">
            {SLIPS.map((line, i) => (
              <motion.p
                key={line}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 0.55 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.12 }}
                className="py-2.5 font-heading text-[19px] font-medium tracking-[-0.015em] text-ink sm:text-[23px]"
              >
                {line}
              </motion.p>
            ))}
            <p className="mt-7 max-w-[330px] text-[14.5px] leading-[1.7] text-ink-3">
              Failure is where the light isn&apos;t — and by the time it&apos;s
              visible, it&apos;s expensive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ════════ SCENE 3.5 · WHAT NAVIS IS NOT ════════ */

const COMPARE = [
  ["Search finds what you ask for.", "Navis tells you what matters."],
  ["Assistants wait.", "Navis watches continuously."],
  ["Dashboards show reports.", "Navis models reality."],
];

function SceneDifference() {
  const reduce = useReducedMotion();
  return (
    <section className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[680px] lg:ml-[4%]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
            Why this is different
          </p>
          <h2 className="mt-6 font-heading text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[3rem]">
            Companies already have information.
            <br />
            <span className="text-ink-3">They lack organizational intelligence.</span>
          </h2>
        </div>
        <div className="mt-16 max-w-[920px] lg:ml-[4%]">
          {COMPARE.map(([a, b], i) => (
            <motion.div
              key={b}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="grid items-baseline gap-2 border-t border-line py-7 last:border-b sm:grid-cols-2 sm:gap-8"
            >
              <span className="text-[17px] leading-snug tracking-[-0.01em] text-ink-3 sm:text-[21px]">{a}</span>
              <span className="font-heading text-[17px] font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[21px]">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════ SCENE 4 · THE SPREAD — constellation ════════ */

const NODES: { label: string; x: number; y: number }[] = [
  { label: "Reality", x: 500, y: 300 },
  { label: "Signals", x: 392, y: 232 },
  { label: "Organizational State", x: 620, y: 224 },
  { label: "Understanding", x: 300, y: 330 },
  { label: "Reasoning", x: 704, y: 332 },
  { label: "Decisions", x: 384, y: 432 },
  { label: "Actions", x: 632, y: 440 },
  { label: "Outcomes", x: 212, y: 218 },
  { label: "Learning", x: 796, y: 216 },
  { label: "Intelligence", x: 168, y: 432 },
  { label: "Adaptive Organization", x: 824, y: 446 },
];

function Node({
  p,
  i,
  total,
  node,
}: {
  p: MotionValue<number>;
  i: number;
  total: number;
  node: (typeof NODES)[number];
}) {
  const w = 0.78 / total;
  const a = 0.12 + i * w;
  const opacity = useTransform(p, span(a, a + w), [0, 0, 1, 1]);
  const accent = i >= total - 2;
  return (
    <motion.g style={{ opacity }}>
      {i > 0 && (
        <line
          x1={NODES[Math.max(0, i - 2 + (i % 2))].x}
          y1={NODES[Math.max(0, i - 2 + (i % 2))].y}
          x2={node.x}
          y2={node.y}
          stroke={accent ? "rgba(91,140,255,0.5)" : "rgba(176,183,195,0.18)"}
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      )}
      <circle
        cx={node.x}
        cy={node.y}
        r={accent ? 5 : 3.5}
        fill={accent ? "#5b8cff" : "#b0b7c3"}
        opacity={accent ? 1 : 0.7}
      />
      <text
        x={node.x}
        y={node.y - 14}
        textAnchor="middle"
        fontSize={accent ? 15 : 13}
        fontFamily="var(--font-geist-sans), sans-serif"
        fontWeight="600"
        fill={accent ? "#7ca4ff" : "#f8fafc"}
        opacity={accent ? 1 : 0.85}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

function SceneSpread() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const index = useTransform(p, (v) => String(Math.min(100, Math.round(v * 100))).padStart(3, "0"));
  const coreHalo = useTransform(p, [0, 1], [0.15, 0.6]);
  const titleOp = useTransform(p, span(0.02, 0.08), [0, 0, 1, 1]);

  if (reduce) {
    return (
      <section className="px-6 py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">The trajectory</p>
          <h2 className="mt-6 font-heading text-[2.4rem] font-semibold text-ink">
            Today, a brief. <span className="text-ink-3">Tomorrow, organizational intelligence.</span>
          </h2>
          <p className="mt-8 max-w-[700px] text-[17px] leading-[1.8] text-ink-2">
            {NODES.map((n) => n.label).join(" → ")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[520vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <motion.div style={{ opacity: titleOp }} className="px-6 pt-24 text-center md:pt-28">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
            The trajectory
          </p>
          <h2 className="mx-auto mt-4 max-w-[800px] font-heading text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.5rem]">
            Today, a brief.{" "}
            <span className="text-ink-3">Tomorrow, the intelligence layer.</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1100px] flex-1">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-full max-w-[560px] -translate-x-1/2 -translate-y-1/2 sm:h-[420px]"
            style={{
              opacity: coreHalo,
              background:
                "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(91,140,255,0.18), transparent 70%)",
            }}
          />
          <svg viewBox="0 0 1000 600" className="h-full w-full" role="img">
            <circle cx="500" cy="300" r="6" fill="#5b8cff" />
            {NODES.map((n, i) =>
              i === 0 ? null : <Node key={n.label} p={p} i={i} total={NODES.length} node={n} />,
            )}
          </svg>
        </div>

        <div className="px-6 pb-12">
          <div className="mx-auto flex max-w-[1280px] items-end justify-between font-mono text-[10.5px] tracking-[0.14em] text-ink-3">
            <p>
              ORG-INTELLIGENCE INDEX{" "}
              <motion.span className="ml-2 text-[22px] font-semibold tracking-[0.04em] text-ink">
                {index}
              </motion.span>
            </p>
            <p className="hidden text-right sm:block">
              EVERY CYCLE MAKES THE MODEL SHARPER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ════════ QUESTIONS MARQUEE ════════ */

const QUESTIONS = [
  "What's the status of this investor conversation?",
  "Which hiring process has been stalled the longest?",
  "What commitments are overdue this week?",
  "What did we decide about pricing in the last meeting?",
  "Which customer relationship is quietly deteriorating?",
  "What requires the founder's attention today?",
  "What context did we lose when that person left?",
  "What was the last thing we promised this customer?",
];

function QuestionsMarquee() {
  return (
    <section className="overflow-hidden border-y border-line py-14">
      <p className="px-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
        Questions founders won&apos;t have to ask
      </p>
      <div className="marquee-track mt-7 flex w-max gap-4">
        {[...QUESTIONS, ...QUESTIONS].map((q, i) => (
          <span key={i} className="whitespace-nowrap rounded-md bg-white/[0.03] px-5 py-2.5 font-mono text-[12px] text-ink-2 ring-1 ring-white/[0.07]">
            {q}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ════════ SCENE 5 · INVITATION ════════ */

function SceneInvitation() {
  return (
    <section id="access" className="flex min-h-[80vh] items-center px-6 py-32">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="max-w-[760px] lg:ml-[4%]">
          <h2 className="font-heading text-[2.6rem] font-semibold leading-[1.0] tracking-[-0.035em] text-ink sm:text-[3.8rem] md:text-[4.4rem]">
            Hear what your company
            <br />
            <span className="text-ink-3">is telling you.</span>
          </h2>
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href="/request-access"
              className="cta-pulse inline-flex h-12 cursor-pointer items-center justify-center rounded-md bg-accent px-7 text-[14px] font-medium text-[#04060f] transition-colors hover:bg-accent-ink"
            >
              Request access →
            </a>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
              Reviewed personally · 48-hour response
            </span>
          </div>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.16em] leading-[2.2] text-ink-3">
            Private beta · founder-led startups
            <br />
            Google Workspace + Slack · human-in-the-loop · auditable
          </p>
          <p className="mt-6 text-[13px] text-ink-3">
            Built from conversations with 30+ founders. Currently in private beta.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ════════ THE FILM ════════ */

export function Home() {
  return (
    <main className="bg-bg text-ink">
      <SystemBar />
      <SceneDark />
      <SceneFirstLight />
      <SceneSlips />
      <SceneDifference />
      <SceneSpread />
      <QuestionsMarquee />
      <SceneInvitation />
      <Footer />
    </main>
  );
}
