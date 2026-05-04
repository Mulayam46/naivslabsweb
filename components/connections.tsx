"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Hash, CalendarDays, Video, FileText, Check, Plug, ShieldCheck } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

const SOURCES = [
  {
    icon: Mail,
    name: "Gmail",
    color: "#ea4335",
    bg: "#fff1f0",
    border: "#fecaca",
    state: "connected" as const,
    what: "Reads important threads, reply gaps, customer messages, and follow-ups.",
    contributed: "Customer commitments, buying intent, investor follow-ups, and reply silence.",
    caps: ["Read threads", "Draft replies", "Detect silence"],
  },
  {
    icon: Hash,
    name: "Slack",
    color: "#4a154b",
    bg: "#fdf4ff",
    border: "#e9d5ff",
    state: "connected" as const,
    what: "Finds blockers, decisions, team requests, and project drift.",
    contributed: "Team decisions, ownership gaps, escalations, and unblock patterns.",
    caps: ["Read channels", "Detect blockers", "Track mentions"],
  },
  {
    icon: CalendarDays,
    name: "Calendar",
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#bfdbfe",
    state: "connected" as const,
    what: "Understands deadlines, meeting load, prep windows, and schedule conflicts.",
    contributed: "Deadlines, prep windows, decision timing, and overloaded days.",
    caps: ["Read events", "Detect conflicts", "Prep windows"],
  },
  {
    icon: Video,
    name: "Meetings",
    color: "#059669",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    state: "available" as const,
    what: "Will turn calls into memory, action items, and decision evidence.",
    contributed: "Meeting facts, objections, next steps, and commitments.",
    caps: ["Import transcripts", "Extract action items", "Store commitments"],
  },
  {
    icon: FileText,
    name: "Notion",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    state: "available" as const,
    what: "Indexes specs, investor materials, and project docs for grounding.",
    contributed: "Project state, doc updates, written decisions, and structured plans.",
    caps: ["Read pages", "Track updates", "Extract structure"],
  },
];

const PERMISSION_STEPS = [
  { label: "Read", desc: "Navis reads context from connected work tools." },
  { label: "Structure", desc: "Raw emails, meetings, and messages become events." },
  { label: "Recommend", desc: "Only high-signal context reaches the decision engine." },
  { label: "Prepare", desc: "Drafts, briefs, and calendar moves are prepared privately." },
  { label: "Approve", desc: "User approval is required before any external action." },
];

const ONBOARDING = [
  "Create workspace",
  "Connect Google",
  "Add Slack",
  "Choose AI labels",
  "Approve actions",
];

function SourceRow({ s, index }: { s: (typeof SOURCES)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = s.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASING }}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 transition-shadow duration-300 hover:shadow-md"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
          >
            <Icon className="h-4 w-4" style={{ color: s.color }} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{s.name}</p>
            <p className="text-xs text-slate-400">{s.what}</p>
          </div>
        </div>
        {s.state === "connected" ? (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
            <Check className="h-3 w-3" />
            Connected
          </span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
            <Plug className="h-3 w-3" />
            Available
          </span>
        )}
      </div>

      {/* Knowledge contributed */}
      <div
        className="rounded-xl border-l-2 bg-slate-50 px-3.5 py-2.5"
        style={{ borderColor: s.color }}
      >
        <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
          Knowledge contributed
        </p>
        <p className="text-xs leading-relaxed text-slate-600">{s.contributed}</p>
      </div>

      {/* Capability pills */}
      <div className="flex flex-wrap gap-1.5">
        {s.caps.map((c) => (
          <span
            key={c}
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={{ backgroundColor: s.bg, color: s.color }}
          >
            {c}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Connections() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="border-t border-slate-100 bg-[#fafafa] px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASING }}
          className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-slate-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Connections
              </span>
            </div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl leading-[0.95]">
              Connect the sources
              <br />
              <span className="text-slate-300">that feed your</span>
              <br />
              Company Brain.
            </h2>
          </div>
          <div className="lg:pl-8">
            <p className="text-lg leading-8 text-slate-500 max-w-md">
              Navis reads work knowledge, structures it into memory, recommends
              next actions, prepares drafts, and asks for approval before any
              external action.
            </p>

            {/* Onboarding steps */}
            <div className="mt-8 flex flex-wrap items-center gap-0">
              {ONBOARDING.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black ${
                        i < 3
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        i < 3 ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < ONBOARDING.length - 1 && (
                    <span className="mx-2 text-slate-200">›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Main grid: sources left, screenshot + permission right ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">

          {/* Left — source rows */}
          <div className="flex flex-col gap-3">
            {SOURCES.map((s, i) => (
              <SourceRow key={s.name} s={s} index={i} />
            ))}
          </div>

          {/* Right — screenshot + permission model */}
          <div className="flex flex-col gap-5">

            {/* Screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: EASING, delay: 0.15 }}
              className="overflow-hidden rounded-2xl shadow-xl shadow-slate-200 ring-1 ring-slate-100"
            >
              <Image
                src="/connectnavis.png"
                alt="Navis Connections — connect sources to your Company Brain"
                width={880}
                height={660}
                className="w-full object-cover object-top"
                priority
              />
            </motion.div>

            {/* Permission model card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASING, delay: 0.25 }}
              className="rounded-2xl border border-slate-100 bg-white p-6"
            >
              <div className="mb-5 flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-bold text-slate-900">Permission model</p>
              </div>

              <div className="flex flex-col gap-0 divide-y divide-slate-50">
                {PERMISSION_STEPS.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: EASING }}
                    className="flex gap-4 py-3"
                  >
                    <span className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pt-0.5">
                      {step.label}
                    </span>
                    <p className="text-xs leading-relaxed text-slate-600">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
