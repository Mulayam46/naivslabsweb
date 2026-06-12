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
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1500);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}</span>;
}

/* ════════ SCENE 1 · THE DARK ════════ */

function SceneDark() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6">
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

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="max-w-[1020px] lg:ml-[4%]">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="font-heading text-[3.2rem] font-semibold leading-[0.97] tracking-[-0.045em] text-ink sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8.2rem]"
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
            className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center lg:ml-[2%]"
          >
            <p className="max-w-[440px] text-[15.5px] leading-[1.7] text-ink-2">
              Navis turns fragmented signals across email, meetings, Slack,
              and calendars into organizational understanding — so important
              work doesn&apos;t quietly slip.
            </p>
            <span className="hidden h-px w-16 bg-line-strong sm:block" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-3">
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

const EVIDENCE = [
  ["EMAIL", "you → your lead investor · “sending the updated deck this week” · 6d ago"],
  ["CALENDAR", "Partner meeting · Thursday 11:00"],
  ["PATTERN", "threads quiet >7 days before a partner meeting rarely recover"],
];

function TheObject({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, span(0.06, 0.13), [0, 0, 1, 1]);
  const y = useTransform(p, span(0.06, 0.13), [90, 90, 0, 0]);
  const rotate = useTransform(p, span(0.06, 0.16), [2.5, 2.5, 0, 0]);
  const halo = useTransform(p, span(0.55, 0.78), [0.12, 0.12, 0.55, 0.55]);
  const backPlane = useTransform(p, span(0.06, 0.16), [26, 26, 14, 14]);

  return (
    <motion.div style={{ opacity, y, rotate }} className="relative w-full max-w-[620px]">
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
      <div className="relative rounded-[20px] bg-[rgba(13,20,36,0.78)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_50px_120px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.09] backdrop-blur-md">
        <div className="flex items-center justify-between px-7 pt-5 font-mono text-[10px] tracking-[0.14em] text-ink-3 md:px-9">
          <span>FOUNDER DAILY BRIEF</span>
          <span>07:14</span>
        </div>

        <div className="px-7 pb-3 pt-7 md:px-9">
          <Beat p={p} at={[0.16, 0.21]}>
            <p className="text-[13.5px] text-ink-3">Good morning, Abhishek.</p>
          </Beat>
          <Beat p={p} at={[0.22, 0.27]}>
            <p className="mt-1.5 font-heading text-[23px] font-semibold tracking-[-0.02em] text-ink sm:text-[27px]">
              Three things need you today.
            </p>
          </Beat>
        </div>

        <div className="px-7 pb-2 md:px-9">
          <Beat p={p} at={[0.3, 0.36]}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-heading text-[18px] font-medium tracking-[-0.015em] text-ink sm:text-[21px]">
                Your investor follow-up is slipping.
              </p>
              <span className="shrink-0 font-mono text-[9.5px] font-semibold tracking-[0.14em] text-critical">
                SLIPPING
              </span>
            </div>
          </Beat>

          <div className="mt-5 space-y-2.5">
            {EVIDENCE.map(([k, v], i) => {
              const at: [number, number] = [0.4 + i * 0.06, 0.45 + i * 0.06];
              return (
                <Beat key={k} p={p} at={at}>
                  <div className="flex items-baseline gap-4 rounded-md bg-white/[0.025] px-4 py-2.5">
                    <span className="w-[4.4rem] shrink-0 font-mono text-[9px] font-semibold tracking-[0.14em] text-accent/80">
                      {k}
                    </span>
                    <span className="font-mono text-[11px] leading-[1.65] text-ink-2">
                      {v}
                    </span>
                  </div>
                </Beat>
              );
            })}
          </div>

          <Beat p={p} at={[0.6, 0.66]}>
            <p className="mt-5 text-[14.5px] font-medium text-accent-ink">
              → Send the update today. Navis has the draft ready.
            </p>
          </Beat>
        </div>

        <div className="px-7 pb-6 pt-5 md:px-9">
          {["Hiring is blocked on you.", "Acme's renewal risk is increasing."].map(
            (t, i) => (
              <Beat key={t} p={p} at={[0.7 + i * 0.05, 0.75 + i * 0.05]}>
                <p className="border-t border-white/[0.05] py-3 text-[14.5px] text-ink-2">
                  {t}
                </p>
              </Beat>
            ),
          )}
        </div>

        <Beat p={p} at={[0.84, 0.9]}>
          <div className="rounded-b-[20px] border-t border-white/[0.05] px-7 py-4 md:px-9">
            <p className="font-mono text-[11px] tracking-[0.08em] text-ink-3">
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
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 pt-10">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="relative hidden h-40 lg:block">
            <Caption p={p} at={[0.14, 0.19, 0.27, 0.32]} text="It noticed." />
            <Caption p={p} at={[0.37, 0.42, 0.54, 0.59]} text="It checked." />
            <Caption p={p} at={[0.6, 0.65, 0.78, 0.83]} text="It knows why." />
            <Caption p={p} at={[0.84, 0.89, 0.97, 1]} text="Quietly." />
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <Beat p={p} at={[0.1, 0.15]} className="mb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
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
    <div className="w-full max-w-[620px] rounded-[20px] bg-[rgba(13,20,36,0.78)] p-8 ring-1 ring-white/[0.09]">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">FOUNDER DAILY BRIEF · 07:14</p>
      <p className="mt-5 text-[13.5px] text-ink-3">Good morning, Abhishek.</p>
      <p className="mt-1.5 font-heading text-[23px] font-semibold text-ink">Three things need you today.</p>
      <p className="mt-5 font-heading text-[18px] font-medium text-ink">Your investor follow-up is slipping.</p>
      <div className="mt-4 space-y-2">
        {EVIDENCE.map(([k, v]) => (
          <p key={k} className="font-mono text-[11px] text-ink-2">
            <span className="text-accent/80">{k}</span> · {v}
          </p>
        ))}
      </div>
      <p className="mt-4 text-[14.5px] font-medium text-accent-ink">→ Send the update today.</p>
      <p className="mt-6 font-mono text-[11px] text-ink-3">
        214 SIGNALS REVIEWED · <span className="text-ink">ONLY 3 NEEDED YOU</span>
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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2"
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
