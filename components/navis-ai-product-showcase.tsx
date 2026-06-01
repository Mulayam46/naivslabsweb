"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Calendar,
  Database,
  Cpu,
  ShieldAlert,
  FileCheck,
  Play,
  ArrowRight,
  TrendingUp,
  Brain,
  History,
  Scale,
  Sparkles
} from "lucide-react";
import AnimatedBadge from "./ui/animated-badge";

const EASING = [0.22, 1, 0.36, 1] as const;

type SignalId = "arjun-deal" | "investor-prep" | "onboarding-stall";

interface MemoryCitation {
  type: string;
  source: string;
  detail: string;
}

interface SignalData {
  id: SignalId;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
  source: string;
  title: string;
  preview: string;
  rawSignal: string;
  memories: MemoryCitation[];
  score: {
    impact: number;
    behavior: number;
    conflict: number;
    final: number;
  };
  policy: {
    mode: "Confirm" | "Requires Approval" | "Auto-Execute";
    color: string;
    desc: string;
  };
  action: string;
  logs: string[];
}

const SIGNALS: SignalData[] = [
  {
    id: "arjun-deal",
    icon: Mail,
    iconColor: "#ef4444",
    iconBg: "rgba(239, 68, 68, 0.1)",
    source: "Gmail (Direct Contract Thread)",
    title: "CFO Contract Signature Gap",
    preview: "CFO needs call by Friday to finalize Acme contract...",
    rawSignal: "Received email from arjun@acme.com: 'We are ready to move forward, but our CFO needs a brief alignment call by Friday afternoon to sign off on the custom pricing terms.'",
    memories: [
      {
        type: "State Memory",
        source: "dm_024 (Loop Won)",
        detail: "Late-stage pricing hurdles resolved 40% faster via direct founder calls compared to email replies."
      },
      {
        type: "Behavioral Profile",
        source: "user_pattern",
        detail: "Founder pattern: highly responsive to pricing blocks (+12% speed modifier)."
      }
    ],
    score: {
      impact: 82,
      behavior: 12,
      conflict: 0,
      final: 94
    },
    policy: {
      mode: "Confirm",
      color: "#38bdf8",
      desc: "Requires a 1-tap confirmation in Slack before drafting calendar invite."
    },
    action: "Send Slack confirmation to user & draft calendar invitation to Arjun.",
    logs: [
      "14:22:01 - RAW_SIGNAL_DETECTED: Gmail thread #acme-cfo-pricing",
      "14:22:02 - PARSING: Identified urgency window: < 48 hours",
      "14:22:02 - MEMORY_SCAN: Retrieved dm_024 (pricing call impact)",
      "14:22:03 - DECISION_SCORE: Calculated priority 94/100 (Impact 82 + Behavior 12)",
      "14:22:03 - POLICY_CHECK: Matches gate 'confirm_external_comms'",
      "14:22:04 - DRAFT_GENERATED: Prepared Slack approval block and draft invite"
    ]
  },
  {
    id: "investor-prep",
    icon: Calendar,
    iconColor: "#f59e0b",
    iconBg: "rgba(245, 158, 11, 0.1)",
    source: "Google Calendar & Notion",
    title: "Sequoia Briefing Sync Prep",
    preview: "Board meeting in 24 hours. 4 data room docs unassigned...",
    rawSignal: "Calendar Event: 'Friday Sequoia Follow-up Sync' starts in 24 hours. Notion Data Room audit: 4 key financial documents are marked as unassigned/in-progress.",
    memories: [
      {
        type: "Episodic Memory",
        source: "dm_021 (Board Slip)",
        detail: "Investor syncs with unassigned data room assets experience an average follow-up slip of 3.2 days."
      },
      {
        type: "Decision Memory",
        source: "dm_026 (Closed)",
        detail: "Delegating data-room asset ownership to a single leader improves closure rate by 41%."
      }
    ],
    score: {
      impact: 61,
      behavior: 5,
      conflict: 2,
      final: 64
    },
    policy: {
      mode: "Requires Approval",
      color: "#a78bfa",
      desc: "Requires manual user signoff on the generated brief before distribution to board."
    },
    action: "Draft Sequoia brief and generate Notion task delegation recommendations for Priya.",
    logs: [
      "14:23:10 - RAW_SIGNAL_DETECTED: Calendar trigger 'Sequoia Sync' in 24h",
      "14:23:11 - KNOWLEDGE_GRAPH: Scanned Notion workspace 'Data Room Audit'",
      "14:23:12 - MEMORY_SCAN: Loaded board slip incident (dm_021)",
      "14:23:12 - DECISION_SCORE: Calculated priority 64/100 (Impact 61 + Behavior 5 - Conflict 2)",
      "14:23:13 - POLICY_CHECK: Matches gate 'board_brief_approval'",
      "14:23:14 - DRAFT_GENERATED: Compiled board briefing markdown and assignment checklist"
    ]
  },
  {
    id: "onboarding-stall",
    icon: MessageSquare,
    iconColor: "#10b981",
    iconBg: "rgba(16, 185, 129, 0.1)",
    source: "Slack & Db Log",
    title: "Silent User Drop-off Flag",
    preview: "Helix user Meera hasn't logged in for 5 days post-signup...",
    rawSignal: "Db webhook: User 'meera@helix.io' signed up 5 days ago, completed setup, but has logged 0 API calls or dashboard sessions since. Slack alert in #onboarding.",
    memories: [
      {
        type: "Semantic Memory",
        source: "dm_025 (Active)",
        detail: "A manager-led 15-minute sync on day 5 catches silent onboarding stalls early, saving 80% of dropping trials."
      }
    ],
    score: {
      impact: 44,
      behavior: 0,
      conflict: 0,
      final: 44
    },
    policy: {
      mode: "Auto-Execute",
      color: "#10b981",
      desc: "Pre-approved automation: System will execute calendar dispatch and email trigger automatically."
    },
    action: "Trigger Zoom schedule link email to Meera and alert workspace owner.",
    logs: [
      "14:24:45 - RAW_SIGNAL_DETECTED: Db webhook inactive_user_day_5",
      "14:24:46 - CONTEXT_SCAN: Retreived user account status 'Helix Inc.'",
      "14:24:46 - MEMORY_SCAN: Found retention rule in dm_025",
      "14:24:47 - DECISION_SCORE: Calculated priority 44/100",
      "14:24:47 - POLICY_CHECK: Passed policy auto_engagement_allowlist",
      "14:24:48 - DISPATCHED: Auto-sent check-in email to meera@helix.io"
    ]
  }
];

export function NavisAIProductShowcase() {
  const [activeSignal, setActiveSignal] = useState<SignalData>(SIGNALS[0]);
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setSimulationStep((prev) => {
          if (prev >= 4) {
            setIsSimulating(false);
            clearInterval(interval);
            return 4;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  const handleSelectSignal = (signal: SignalData) => {
    setActiveSignal(signal);
    setSimulationStep(0);
    setIsSimulating(false);
  };

  const startSimulation = () => {
    setSimulationStep(0);
    setIsSimulating(true);
  };

  const getStepStatusClass = (step: number) => {
    if (simulationStep > step) return "border-emerald-500 bg-emerald-500/10 text-emerald-400";
    if (simulationStep === step) return "border-cyan-400 bg-cyan-400/20 text-cyan-300 animate-pulse";
    return "border-slate-800 bg-slate-900/30 text-slate-500";
  };

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32" style={{ backgroundColor: "#03081e" }}>
      {/* Background radial overlays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 right-1/4 h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 left-1/4 h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-6">
            <AnimatedBadge text="Interactive Showcase" color="#22d3ee" href="#" />
          </div>
          <h2
            className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}
          >
            The Decision Engine <span className="italic text-slate-400">in Action.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Select a raw business signal below to trace how Navis processes events, extracts memory citations, scores priority, and safety-gates actions.
          </p>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column: Signal Selection */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
              // Select Incoming Signal
            </p>
            {SIGNALS.map((signal) => {
              const Icon = signal.icon;
              const isSelected = activeSignal.id === signal.id;
              return (
                <button
                  key={signal.id}
                  onClick={() => handleSelectSignal(signal)}
                  className={`flex flex-col items-start text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "border-cyan-500/40 bg-slate-900/60 shadow-lg shadow-cyan-500/5"
                      : "border-slate-800 bg-slate-900/20 hover:border-slate-700/60"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: signal.iconBg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: signal.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 truncate">
                        {signal.source}
                      </p>
                      <h4 className="text-sm font-semibold text-white truncate">
                        {signal.title}
                      </h4>
                    </div>
                    {isSelected && (
                      <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400 line-clamp-2">
                    {signal.preview}
                  </p>
                </button>
              );
            })}

            {/* Run Button */}
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className={`mt-4 flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isSimulating
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/10 active:scale-[0.98]"
              }`}
            >
              <Play className="h-4 w-4 fill-current" />
              {isSimulating ? "Simulating Pipeline..." : "Execute Decision Simulation"}
            </button>
          </div>

          {/* Right Column: Dynamic Simulator */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md md:p-8">
              
              {/* Simulation Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-5 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-cyan-400" />
                    Decision Trace Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Internal workflow tracking for <span className="text-cyan-400 font-semibold">{activeSignal.title}</span>
                  </p>
                </div>
                
                {/* Score badge */}
                <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950 px-4 py-2">
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-400">Score priority:</span>
                  <span className="font-mono text-sm font-bold text-white">
                    {simulationStep >= 2 ? `${activeSignal.score.final}/100` : "--"}
                  </span>
                </div>
              </div>

              {/* Simulation Content Body */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Timeline / Progress list */}
                <div className="md:col-span-5 flex flex-col gap-6 relative">
                  {/* Connecting vertical line */}
                  <div className="absolute left-[17px] top-4 bottom-4 w-px bg-slate-800" />

                  {/* Step 1: Ingestion */}
                  <div className="flex gap-4">
                    <div className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${getStepStatusClass(0)}`}>
                      01
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-white">Ingestion & Parsing</h5>
                      <p className="text-[11px] text-slate-500 mt-1">Clean and analyze raw incoming event signals.</p>
                    </div>
                  </div>

                  {/* Step 2: Memory Retrieval */}
                  <div className="flex gap-4">
                    <div className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${getStepStatusClass(1)}`}>
                      02
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-white">Memory Citations</h5>
                      <p className="text-[11px] text-slate-500 mt-1">Scan episodic, semantic, and state data rules.</p>
                    </div>
                  </div>

                  {/* Step 3: Priority Scoring */}
                  <div className="flex gap-4">
                    <div className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${getStepStatusClass(2)}`}>
                      03
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-white">Priority Scoring</h5>
                      <p className="text-[11px] text-slate-500 mt-1">Weight parameters with behavior modifiers.</p>
                    </div>
                  </div>

                  {/* Step 4: Policy Verification */}
                  <div className="flex gap-4">
                    <div className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${getStepStatusClass(3)}`}>
                      04
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-white">Policy Verification</h5>
                      <p className="text-[11px] text-slate-500 mt-1">Apply strict, per-channel execution gates.</p>
                    </div>
                  </div>
                </div>

                {/* Simulation Output Area */}
                <div className="md:col-span-7 flex flex-col justify-between rounded-2xl bg-slate-950 p-5 min-h-[300px] border border-slate-900">
                  <AnimatePresence mode="wait">
                    {simulationStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                          <Database className="h-4.5 w-4.5" />
                          Parsed Webhook Object
                        </div>
                        <div className="font-mono text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                          {activeSignal.rawSignal}
                        </div>
                      </motion.div>
                    )}

                    {simulationStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 text-violet-400 font-mono text-[10px] uppercase tracking-widest">
                          <Brain className="h-4.5 w-4.5" />
                          Retrieved Memory Citations
                        </div>
                        <div className="space-y-3">
                          {activeSignal.memories.map((mem, idx) => (
                            <div key={idx} className="border border-slate-800 bg-slate-900/40 rounded-xl p-4">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-violet-400 uppercase tracking-wider">{mem.type}</span>
                                <span className="font-mono text-[10px] text-slate-500">{mem.source}</span>
                              </div>
                              <p className="text-xs text-slate-300 mt-2 leading-relaxed">&ldquo;{mem.detail}&rdquo;</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {simulationStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
                          <Scale className="h-4.5 w-4.5" />
                          Weight Calculations
                        </div>
                        <div className="space-y-3 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                            <span className="text-slate-400">Predicted Impact</span>
                            <span className="text-white">+{activeSignal.score.impact}%</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                            <span className="text-slate-400">Behavior Modifier</span>
                            <span className="text-emerald-400">+{activeSignal.score.behavior}%</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                            <span className="text-slate-400">Downstream Conflict</span>
                            <span className="text-red-400">-{activeSignal.score.conflict}%</span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-white font-bold">Final Priority Score</span>
                            <span className="text-cyan-400 font-bold">{activeSignal.score.final}/100</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {simulationStep >= 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-widest">
                          <ShieldAlert className="h-4.5 w-4.5" />
                          Policy Engine Enforcement
                        </div>
                        
                        <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                              style={{
                                color: "#000",
                                backgroundColor: activeSignal.policy.color
                              }}
                            >
                              {activeSignal.policy.mode}
                            </span>
                            <span className="text-xs text-white font-semibold">Active Policy Channel Gate</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {activeSignal.policy.desc}
                          </p>
                        </div>

                        {simulationStep === 4 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-4 space-y-2 mt-2"
                          >
                            <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                              <FileCheck className="h-4.5 w-4.5" />
                              Audit Log Generated
                            </div>
                            <p className="text-xs text-slate-300 font-mono leading-relaxed">
                              Successfully generated recommendation trace: &quot;{activeSignal.action}&quot;
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Interactive Terminal log strip */}
                  <div className="mt-6 border-t border-slate-900 pt-4 flex flex-col gap-1.5 font-mono text-[10px] text-slate-500">
                    <div className="flex items-center justify-between text-slate-400 font-semibold mb-1">
                      <span>Live Engine Output Log</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Online
                      </span>
                    </div>
                    <div className="max-h-20 overflow-y-auto space-y-1">
                      {activeSignal.logs.slice(0, simulationStep + 1).map((log, idx) => (
                        <div key={idx} className="truncate">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
