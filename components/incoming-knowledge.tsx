"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Mail, Hash, CalendarDays, Video, Tag, RefreshCw, Zap } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

/* ── Ticker items ── */
const TICKER = [
  "Gmail · 12 signals",
  "Slack · 8 signals",
  "Calendar · 3 signals",
  "Episodic memory",
  "Semantic memory",
  "State memory",
  "Decision memory",
  "Skills triggered · 3",
  "Audit trace · live",
  "Self-improving routing",
];

/* ── Signal cards that float around the image ── */
const SIGNALS = [
  {
    icon: Mail,
    color: "#ea4335",
    bg: "#fff1f0",
    border: "#fecaca",
    label: "Gmail",
    text: "CFO needs a call tomorrow to finalize.",
    tag: "RAW",
    tagColor: "#94a3b8",
    pos: "top-6 -left-6 lg:-left-16",
    delay: 0.3,
    from: { x: -30, y: -10 },
  },
  {
    icon: Hash,
    color: "#4a154b",
    bg: "#fdf4ff",
    border: "#e9d5ff",
    label: "Slack · #founder-priorities",
    text: "Can we decide who owns the remaining data room items today?",
    tag: "IMPORTANT",
    tagColor: "#7c3aed",
    pos: "top-6 -right-6 lg:-right-16",
    delay: 0.45,
    from: { x: 30, y: -10 },
  },
  {
    icon: CalendarDays,
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#bfdbfe",
    label: "Calendar",
    text: "Series A sync · 7 days out · 4 items unassigned",
    tag: "STRUCTURED",
    tagColor: "#1d4ed8",
    pos: "bottom-24 -left-6 lg:-left-16",
    delay: 0.55,
    from: { x: -30, y: 10 },
  },
  {
    icon: Hash,
    color: "#059669",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    label: "Slack · #onboarding",
    text: "Meera no product login for 5 days — onboarding stall flagged.",
    tag: "ROUTED",
    tagColor: "#059669",
    pos: "bottom-24 -right-6 lg:-right-16",
    delay: 0.65,
    from: { x: 30, y: 10 },
  },
];

/* ── Three feature rows below ── */
const FEATURES = [
  {
    icon: Tag,
    color: "#7c3aed",
    bg: "#f5f3ff",
    title: "Label behavior",
    body: "Each label controls notification, auto-archive, reminder, and whether it feeds the decision engine.",
    labels: ["Important 2", "Customer 0", "Investor 1", "Noise 0"],
    activeIdx: 0,
  },
  {
    icon: RefreshCw,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    title: "Feedback loop",
    body: "Move a signal to another label and Navis stores the reason as a training example — similar signals route correctly next time.",
    labels: ["Train label", "Feeds decision", "Auto-route"],
    activeIdx: 1,
  },
  {
    icon: Zap,
    color: "#059669",
    bg: "#f0fdf4",
    title: "Decision engine",
    body: "Structured events feed memory and can trigger a Decision Skill — automatically, without you lifting a finger.",
    labels: ["Deal Recovery 92%", "Investor Prep 84%", "Onboarding 78%"],
    activeIdx: 2,
  },
];

/* ── Infinite ticker ── */
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-slate-100 bg-slate-50 py-3">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-0"
      >
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
            {t}
            <span className="h-1 w-1 rounded-full bg-slate-300" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Floating signal card ── */
function SignalCard({ s }: { s: (typeof SIGNALS)[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = s.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: s.from.x, y: s.from.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ delay: s.delay, duration: 0.8, ease: EASING }}
      className={`absolute z-10 hidden w-52 rounded-2xl border p-3 shadow-xl backdrop-blur-sm md:block ${s.pos}`}
      style={{ borderColor: s.border, backgroundColor: s.bg }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${s.color}18` }}>
          <Icon className="h-3 w-3" style={{ color: s.color }} />
        </div>
        <span className="truncate text-[10px] font-semibold text-slate-600">{s.label}</span>
      </div>
      <p className="mb-2.5 text-[11px] leading-relaxed text-slate-500 line-clamp-2">{s.text}</p>
      <span
        className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
        style={{ color: s.tagColor, backgroundColor: `${s.tagColor}18` }}
      >
        {s.tag}
      </span>
    </motion.div>
  );
}

export function IncomingKnowledge() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65],
    [
      "inset(12% 8% 12% 8% round 24px)",
      "inset(0% 0% 0% 0% round 16px)",
      "inset(0% 0% 0% 0% round 16px)",
    ]
  );
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white">

      {/* ── 1. Header ── */}
      <div className="px-4 pt-24 pb-12 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASING }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end"
          >
            {/* Left */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                  Incoming Knowledge · Live
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[0.95]">
                Raw signals.
                <br />
                <span className="text-slate-300">Auditable</span>
                <br />
                decisions.
              </h2>
            </div>

            {/* Right */}
            <div className="lg:pl-8">
              <p className="text-base leading-7 text-slate-500 max-w-md sm:text-lg sm:leading-8">
                Sources → Ingestion → Memory → Skills → Decisions → Team. Every
                email, Slack message, and calendar event becomes a typed event,
                writes to memory, and routes through the Decision Engine.
              </p>

              {/* Source count row */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: Mail, label: "Gmail", n: 12, color: "#ea4335" },
                  { icon: Hash, label: "Slack", n: 8, color: "#4a154b" },
                  { icon: CalendarDays, label: "Calendar", n: 3, color: "#1d4ed8" },
                  { icon: Video, label: "Meetings", n: "soon", color: "#94a3b8" },
                ].map((src, i) => {
                  const Icon = src.icon;
                  return (
                    <motion.div
                      key={src.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASING }}
                      className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3.5 py-2"
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: src.color }} />
                      <span className="text-xs font-semibold text-slate-700">{src.label}</span>
                      {src.n !== null && (
                        <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500 shadow-sm ring-1 ring-slate-100">
                          {src.n}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. Ticker ── */}
      <Ticker />

      {/* ── 3. Scroll-reveal image with floating cards ── */}
      <div className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div ref={imageRef} className="relative">
            {/* Floating signal cards */}
            {SIGNALS.map((s) => (
              <SignalCard key={s.label} s={s} />
            ))}

            {/* Scroll-clipped image */}
            <motion.div style={{ clipPath, scale }} className="overflow-hidden rounded-2xl shadow-2xl shadow-slate-200 ring-1 ring-slate-100">
              <Image
                src="/incomingnavis.jpeg"
                alt="Navis Incoming Knowledge interface"
                width={1400}
                height={1000}
                className="w-full object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 80vw"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 4. Feature row — full-width horizontal ── */}
      <div className="border-t border-slate-100 px-4 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: EASING }}
                  className="group px-0 py-10 md:px-10 md:py-12 first:pl-0 last:pr-0"
                >
                  {/* Number + icon */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-6xl font-black text-slate-50 select-none leading-none">
                      0{i + 1}
                    </span>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: f.bg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: f.color }} />
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-500">{f.body}</p>

                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {f.labels.map((l, li) => (
                      <span
                        key={l}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors"
                        style={
                          li === f.activeIdx
                            ? { backgroundColor: f.color, color: "#fff" }
                            : { backgroundColor: "#f1f5f9", color: "#64748b" }
                        }
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
