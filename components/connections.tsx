"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Hash, CalendarDays, Video, FileText, Check, Plug, ShieldCheck } from "lucide-react";
import { AnimatedBeam, Circle, Icons } from '@/components/uilayouts/animated-beam';
import ElectricBorder from './ElectricBorder';

const EASING = [0.22, 1, 0.36, 1] as const;

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

function AnimatedConnections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gmailRef = useRef<HTMLDivElement>(null);
  const slackRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const notionRef = useRef<HTMLDivElement>(null);
  const meetingsRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);
  const memoryRef = useRef<HTMLDivElement>(null);

  return (
    <ElectricBorder
      color="#06b6d4"
      speed={1.2}
      chaos={0.15}
      thickness={2}
      style={{ borderRadius: 20 }}
    >
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-[18px] border border-slate-700/50 bg-slate-800/30 p-8 backdrop-blur-sm lg:p-10"
        ref={containerRef}
      >
        <div className="flex h-full w-full flex-col items-stretch justify-between gap-12">
          {/* Top row - Gmail and Notion */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={gmailRef} className="border-red-500/30 bg-red-500/10 p-4">
              <Mail className="h-7 w-7 text-red-400" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-red-400 whitespace-nowrap">Gmail</span>
            </Circle>
            <Circle ref={notionRef} className="border-amber-500/30 bg-amber-500/10 p-4">
              <FileText className="h-7 w-7 text-amber-400" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-amber-400 whitespace-nowrap">Notion</span>
            </Circle>
          </div>

          {/* Middle row - Slack, Brain, Meetings */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={slackRef} className="border-purple-500/30 bg-purple-500/10 p-4">
              <Hash className="h-7 w-7 text-purple-400" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-purple-400 whitespace-nowrap">Slack</span>
            </Circle>
            
            {/* Center - Company Brain */}
            <Circle ref={brainRef} className="h-32 w-32 border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 p-5">
              <div className="flex flex-col items-center gap-2">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">AI</span>
                </div>
                <span className="text-xs font-bold text-cyan-300 whitespace-nowrap">Company Brain</span>
              </div>
            </Circle>
            
            <Circle ref={meetingsRef} className="border-emerald-500/30 bg-emerald-500/10 p-4">
              <Video className="h-7 w-7 text-emerald-400" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-emerald-400 whitespace-nowrap">Meetings</span>
            </Circle>
          </div>

          {/* Bottom row - Calendar and Memory */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={calendarRef} className="border-blue-500/30 bg-blue-500/10 p-4">
              <CalendarDays className="h-7 w-7 text-blue-400" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-blue-400 whitespace-nowrap">Calendar</span>
            </Circle>
            <Circle ref={memoryRef} className="border-indigo-500/30 bg-indigo-500/10 p-4">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-indigo-300">Mem</span>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-indigo-400 whitespace-nowrap">Memory</span>
            </Circle>
          </div>
        </div>

        {/* Animated Beams - Connections flowing to the brain */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={gmailRef}
          toRef={brainRef}
          curvature={-50}
          endYOffset={-10}
          gradientStartColor="#ea4335"
          gradientStopColor="#38bdf8"
          dotted
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={slackRef}
          toRef={brainRef}
          curvature={-30}
          gradientStartColor="#4a154b"
          gradientStopColor="#a78bfa"
          dotted
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={calendarRef}
          toRef={brainRef}
          curvature={30}
          endYOffset={10}
          gradientStartColor="#1d4ed8"
          gradientStopColor="#60a5fa"
          dotted
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meetingsRef}
          toRef={brainRef}
          curvature={50}
          endYOffset={-5}
          gradientStartColor="#059669"
          gradientStopColor="#34d399"
          dotted
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={notionRef}
          toRef={brainRef}
          curvature={-40}
          endYOffset={5}
          gradientStartColor="#f59e0b"
          gradientStopColor="#fbbf24"
          dotted
        />
        
        {/* Memory flow out of brain */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={brainRef}
          toRef={memoryRef}
          curvature={20}
          reverse
          gradientStartColor="#8b5cf6"
          gradientStopColor="#c084fc"
          dotted
        />
      </div>
    </ElectricBorder>
  );
}

export function Connections() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-slate-800/50 px-4 py-24 md:px-8 md:py-32"
      style={{ backgroundColor: "#03081e" }}
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
              <div className="h-px w-10 bg-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                Connections
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[0.95]">
              Connect the sources
              <br />
              <span className="text-slate-400">that feed your</span>
              <br />
              Company Brain.
            </h2>
          </div>
          <div className="lg:pl-8">
            <p className="text-base leading-7 text-slate-300 max-w-md sm:text-lg sm:leading-8">
              Navis reads work knowledge, structures it into memory, ranks the
              next decision, prepares the draft, and asks for approval before
              any external action. Tokens stored encrypted. Revocable any time.
            </p>

            {/* Onboarding steps */}
            <div className="mt-8 flex flex-wrap items-center gap-0">
              {ONBOARDING.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black ${
                        i < 4
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        i < 4 ? "text-slate-200" : "text-slate-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < ONBOARDING.length - 1 && (
                    <span className="mx-2 text-slate-600">›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Main grid: animated beam left, permission right ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left — Animated connections visualization - full width */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EASING, delay: 0.1 }}
            className="w-full"
          >
            <AnimatedConnections />
          </motion.div>

          {/* Right — Permission model */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASING, delay: 0.25 }}
              className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm h-full"
            >
              <div className="mb-5 flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <p className="text-sm font-bold text-white">Permission model</p>
              </div>

              <div className="flex flex-col gap-0 divide-y divide-slate-700/50">
                {PERMISSION_STEPS.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: EASING }}
                    className="flex gap-4 py-3"
                  >
                    <span className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 pt-0.5">
                      {step.label}
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">{step.desc}</p>
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