// "use client";

// import Image from "next/image";
// import { motion, useInView, useScroll, useTransform } from "motion/react";
// import { useRef } from "react";
// import { Mail, Hash, CalendarDays, Video, Tag, RefreshCw, Zap } from "lucide-react";

// const EASING = [0.22, 1, 0.36, 1] as const;

// /* ── Ticker items ── */
// const TICKER = [
//   "Gmail · 12 signals",
//   "Slack · 8 signals",
//   "Calendar · 3 signals",
//   "Episodic memory",
//   "Semantic memory",
//   "State memory",
//   "Decision memory",
//   "Skills triggered · 3",
//   "Audit trace · live",
//   "Self-improving routing",
// ];

// /* ── Signal cards that float around the image ── */
// const SIGNALS = [
//   {
//     icon: Mail,
//     color: "#ea4335",
//     bg: "#fff1f0",
//     border: "#fecaca",
//     label: "Gmail",
//     text: "CFO needs a call tomorrow to finalize.",
//     tag: "RAW",
//     tagColor: "#94a3b8",
//     pos: "top-6 -left-6 lg:-left-16",
//     delay: 0.3,
//     from: { x: -30, y: -10 },
//   },
//   {
//     icon: Hash,
//     color: "#4a154b",
//     bg: "#fdf4ff",
//     border: "#e9d5ff",
//     label: "Slack · #founder-priorities",
//     text: "Can we decide who owns the remaining data room items today?",
//     tag: "IMPORTANT",
//     tagColor: "#7c3aed",
//     pos: "top-6 -right-6 lg:-right-16",
//     delay: 0.45,
//     from: { x: 30, y: -10 },
//   },
//   {
//     icon: CalendarDays,
//     color: "#1d4ed8",
//     bg: "#eff6ff",
//     border: "#bfdbfe",
//     label: "Calendar",
//     text: "Series A sync · 7 days out · 4 items unassigned",
//     tag: "STRUCTURED",
//     tagColor: "#1d4ed8",
//     pos: "bottom-24 -left-6 lg:-left-16",
//     delay: 0.55,
//     from: { x: -30, y: 10 },
//   },
//   {
//     icon: Hash,
//     color: "#059669",
//     bg: "#f0fdf4",
//     border: "#a7f3d0",
//     label: "Slack · #onboarding",
//     text: "Meera no product login for 5 days — onboarding stall flagged.",
//     tag: "ROUTED",
//     tagColor: "#059669",
//     pos: "bottom-24 -right-6 lg:-right-16",
//     delay: 0.65,
//     from: { x: 30, y: 10 },
//   },
// ];

// /* ── Three feature rows below ── */
// const FEATURES = [
//   {
//     icon: Tag,
//     color: "#7c3aed",
//     bg: "#f5f3ff",
//     title: "Label behavior",
//     body: "Each label controls notification, auto-archive, reminder, and whether it feeds the decision engine.",
//     labels: ["Important 2", "Customer 0", "Investor 1", "Noise 0"],
//     activeIdx: 0,
//   },
//   {
//     icon: RefreshCw,
//     color: "#0ea5e9",
//     bg: "#f0f9ff",
//     title: "Feedback loop",
//     body: "Move a signal to another label and Navis stores the reason as a training example — similar signals route correctly next time.",
//     labels: ["Train label", "Feeds decision", "Auto-route"],
//     activeIdx: 1,
//   },
//   {
//     icon: Zap,
//     color: "#059669",
//     bg: "#f0fdf4",
//     title: "Decision engine",
//     body: "Structured events feed memory and can trigger a Decision Skill — automatically, without you lifting a finger.",
//     labels: ["Deal Recovery 92%", "Investor Prep 84%", "Onboarding 78%"],
//     activeIdx: 2,
//   },
// ];

// /* ── Infinite ticker ── */
// function Ticker() {
//   const items = [...TICKER, ...TICKER];
//   return (
//     <div className="relative overflow-hidden border-y border-slate-100 bg-slate-50 py-3">
//       <motion.div
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
//         className="flex w-max gap-0"
//       >
//         {items.map((t, i) => (
//           <span key={i} className="flex items-center gap-3 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
//             {t}
//             <span className="h-1 w-1 rounded-full bg-slate-300" />
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// /* ── Floating signal card ── */
// function SignalCard({ s }: { s: (typeof SIGNALS)[0] }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });
//   const Icon = s.icon;

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: s.from.x, y: s.from.y }}
//       animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
//       transition={{ delay: s.delay, duration: 0.8, ease: EASING }}
//       className={`absolute z-10 hidden w-52 rounded-2xl border p-3 shadow-xl backdrop-blur-sm md:block ${s.pos}`}
//       style={{ borderColor: s.border, backgroundColor: s.bg }}
//     >
//       <div className="mb-2 flex items-center gap-2">
//         <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${s.color}18` }}>
//           <Icon className="h-3 w-3" style={{ color: s.color }} />
//         </div>
//         <span className="truncate text-[10px] font-semibold text-slate-600">{s.label}</span>
//       </div>
//       <p className="mb-2.5 text-[11px] leading-relaxed text-slate-500 line-clamp-2">{s.text}</p>
//       <span
//         className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
//         style={{ color: s.tagColor, backgroundColor: `${s.tagColor}18` }}
//       >
//         {s.tag}
//       </span>
//     </motion.div>
//   );
// }

// export function IncomingKnowledge() {
//   const sectionRef = useRef(null);
//   const inView = useInView(sectionRef, { once: true, margin: "-80px" });

//   const imageRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
//   const clipPath = useTransform(
//     scrollYProgress,
//     [0, 0.35, 0.65],
//     [
//       "inset(12% 8% 12% 8% round 24px)",
//       "inset(0% 0% 0% 0% round 16px)",
//       "inset(0% 0% 0% 0% round 16px)",
//     ]
//   );
//   const scale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1]);

//   return (
//     <section ref={sectionRef} className="overflow-hidden bg-white">

//       {/* ── 1. Header ── */}
//       <div className="px-4 pt-24 pb-12 md:px-8 md:pt-32">
//         <div className="mx-auto max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.9, ease: EASING }}
//             className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end"
//           >
//             {/* Left */}
//             <div>
//               <div className="mb-5 flex items-center gap-3">
//                 <span className="relative flex h-2.5 w-2.5">
//                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
//                   <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
//                 </span>
//                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
//                   Incoming Knowledge · Live
//                 </span>
//               </div>
//               <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[0.95]">
//                 Raw signals.
//                 <br />
//                 <span className="text-slate-300">Auditable</span>
//                 <br />
//                 decisions.
//               </h2>
//             </div>

//             {/* Right */}
//             <div className="lg:pl-8">
//               <p className="text-base leading-7 text-slate-500 max-w-md sm:text-lg sm:leading-8">
//                 Sources → Ingestion → Memory → Skills → Decisions → Team. Every
//                 email, Slack message, and calendar event becomes a typed event,
//                 writes to memory, and routes through the Decision Engine.
//               </p>

//               {/* Source count row */}
//               <div className="mt-8 flex flex-wrap gap-3">
//                 {[
//                   { icon: Mail, label: "Gmail", n: 12, color: "#ea4335" },
//                   { icon: Hash, label: "Slack", n: 8, color: "#4a154b" },
//                   { icon: CalendarDays, label: "Calendar", n: 3, color: "#1d4ed8" },
//                   { icon: Video, label: "Meetings", n: "soon", color: "#94a3b8" },
//                 ].map((src, i) => {
//                   const Icon = src.icon;
//                   return (
//                     <motion.div
//                       key={src.label}
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={inView ? { opacity: 1, y: 0 } : {}}
//                       transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASING }}
//                       className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3.5 py-2"
//                     >
//                       <Icon className="h-3.5 w-3.5" style={{ color: src.color }} />
//                       <span className="text-xs font-semibold text-slate-700">{src.label}</span>
//                       {src.n !== null && (
//                         <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500 shadow-sm ring-1 ring-slate-100">
//                           {src.n}
//                         </span>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* ── 2. Ticker ── */}
//       <Ticker />

//       {/* ── 3. Scroll-reveal image with floating cards ── */}
//       <div className="px-4 py-16 md:px-8 md:py-20">
//         <div className="mx-auto max-w-5xl">
//           <div ref={imageRef} className="relative">
//             {/* Floating signal cards */}
//             {SIGNALS.map((s) => (
//               <SignalCard key={s.label} s={s} />
//             ))}

//             {/* Scroll-clipped image */}
//             <motion.div style={{ clipPath, scale }} className="overflow-hidden rounded-2xl shadow-2xl shadow-slate-200 ring-1 ring-slate-100">
//               <Image
//                 src="/incomingnavis.jpeg"
//                 alt="Navis Incoming Knowledge interface"
//                 width={1400}
//                 height={1000}
//                 className="w-full object-cover object-top"
//                 sizes="(max-width: 1280px) 100vw, 80vw"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ── 4. Feature row — full-width horizontal ── */}
//       <div className="border-t border-slate-100 px-4 pb-24 md:px-8 md:pb-32">
//         <div className="mx-auto max-w-7xl">
//           <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
//             {FEATURES.map((f, i) => {
//               const Icon = f.icon;
//               return (
//                 <motion.div
//                   key={f.title}
//                   initial={{ opacity: 0, y: 16 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-40px" }}
//                   transition={{ delay: i * 0.1, duration: 0.7, ease: EASING }}
//                   className="group px-0 py-10 md:px-10 md:py-12 first:pl-0 last:pr-0"
//                 >
//                   {/* Number + icon */}
//                   <div className="mb-6 flex items-center justify-between">
//                     <span className="text-6xl font-black text-slate-50 select-none leading-none">
//                       0{i + 1}
//                     </span>
//                     <div
//                       className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
//                       style={{ backgroundColor: f.bg }}
//                     >
//                       <Icon className="h-5 w-5" style={{ color: f.color }} />
//                     </div>
//                   </div>

//                   <h3 className="mb-2 text-lg font-bold text-slate-900">{f.title}</h3>
//                   <p className="mb-5 text-sm leading-relaxed text-slate-500">{f.body}</p>

//                   {/* Tag pills */}
//                   <div className="flex flex-wrap gap-1.5">
//                     {f.labels.map((l, li) => (
//                       <span
//                         key={l}
//                         className="rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors"
//                         style={
//                           li === f.activeIdx
//                             ? { backgroundColor: f.color, color: "#fff" }
//                             : { backgroundColor: "#f1f5f9", color: "#64748b" }
//                         }
//                       >
//                         {l}
//                       </span>
//                     ))}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

































// "use client";

// import Image from "next/image";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   animate,
// } from "motion/react";
// import { useEffect, useRef, useState } from "react";
// import {
//   Mail,
//   Hash,
//   CalendarDays,
//   Video,
//   Tag,
//   RefreshCw,
//   Zap,
//   ArrowRight,
// } from "lucide-react";

// // ----------------------------------------------------------------------------
// // Shared tokens (same world as DecisionMemory)
// // ----------------------------------------------------------------------------
// const EASE = [0.22, 1, 0.36, 1] as const;
// const INK = "#0B0B0F";
// const PAPER = "#EFEAD8";
// const LIME = "#D4FF3A";
// const VIOLET = "#6D5DF6";

// // ----------------------------------------------------------------------------
// // Counter
// // ----------------------------------------------------------------------------
// function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const inView = useInView(ref, { once: true });
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     if (!inView) return;
//     const c = animate(0, to, {
//       duration: 1.6,
//       ease: EASE,
//       onUpdate: (v) => setN(Math.round(v)),
//     });
//     return c.stop;
//   }, [inView, to]);
//   return (
//     <span ref={ref} className="tabular-nums">
//       {n}
//       {suffix}
//     </span>
//   );
// }

// // ----------------------------------------------------------------------------
// // Data
// // ----------------------------------------------------------------------------
// const SOURCES = [
//   { icon: Mail,         label: "Gmail",    n: 12,     color: "#ea4335" },
//   { icon: Hash,         label: "Slack",    n: 8,      color: "#4a154b" },
//   { icon: CalendarDays, label: "Calendar", n: 3,      color: "#1d4ed8" },
//   { icon: Video,        label: "Meetings", n: "soon", color: "#94a3b8" },
// ];

// const TICKER = [
//   "Gmail / 12 signals",
//   "Slack / 8 signals",
//   "Calendar / 3 signals",
//   "Episodic memory",
//   "Semantic memory",
//   "State memory",
//   "Decision memory",
//   "Skills triggered / 3",
//   "Audit trace / live",
//   "Self-improving routing",
// ];

// const PIPELINE = [
//   {
//     step: "01",
//     title: "Source",
//     body: "Gmail / Slack / Calendar / Meetings",
//     sample: "CFO needs a call tomorrow to finalize.",
//     tag: "RAW",
//   },
//   {
//     step: "02",
//     title: "Ingest",
//     body: "Parsed, deduped, attributed",
//     sample: "from=cfo@acme.com  thread=#23a1",
//     tag: "PARSED",
//   },
//   {
//     step: "03",
//     title: "Type",
//     body: "Classified into typed events",
//     sample: "type=deadline.urgent  conf=0.94",
//     tag: "TYPED",
//   },
//   {
//     step: "04",
//     title: "Memory",
//     body: "Writes to episodic + semantic stores",
//     sample: "wrote: memory/episodic/0271",
//     tag: "STORED",
//   },
//   {
//     step: "05",
//     title: "Skill",
//     body: "Routes to a Decision Skill",
//     sample: "skill=DealRecovery  fired",
//     tag: "FIRED",
//   },
// ];

// const ANNOTATIONS = [
//   {
//     num: "01",
//     title: "Inbox stream",
//     body: "Every raw signal lands with full provenance: source, thread, attribution, timestamp.",
//     pos: { top: "16%", left: "8%" },
//     target: { top: "30%", left: "26%" },
//   },
//   {
//     num: "02",
//     title: "Type classifier",
//     body: "An event is tagged with a typed schema and a confidence score before it touches memory.",
//     pos: { top: "8%", left: "62%" },
//     target: { top: "22%", left: "55%" },
//   },
//   {
//     num: "03",
//     title: "Decision route",
//     body: "Typed events route to a Skill. The Skill writes back to memory after it observes an outcome.",
//     pos: { top: "62%", left: "60%" },
//     target: { top: "72%", left: "48%" },
//   },
// ];

// const FEATURES = [
//   {
//     icon: Tag,
//     n: "01",
//     title: "Label behavior, defined",
//     body: "Each label controls notification, auto-archive, reminder, and whether it feeds the decision engine. No hidden defaults.",
//     chips: ["Important", "Customer", "Investor", "Noise"],
//     activeIdx: 0,
//   },
//   {
//     icon: RefreshCw,
//     n: "02",
//     title: "Feedback loop, automatic",
//     body: "Move a signal to another label and Navis stores the reason as a training example. Similar signals route correctly next time.",
//     chips: ["Train label", "Feeds decision", "Auto-route"],
//     activeIdx: 1,
//   },
//   {
//     icon: Zap,
//     n: "03",
//     title: "Decision engine, on",
//     body: "Structured events feed memory and can trigger a Decision Skill automatically, without you lifting a finger.",
//     chips: ["Deal Recovery 92%", "Investor Prep 84%", "Onboarding 78%"],
//     activeIdx: 2,
//   },
// ];

// // ----------------------------------------------------------------------------
// // Marquee ticker (dark band, horizontal — visually distinct from DecisionMemory)
// // ----------------------------------------------------------------------------
// function Ticker() {
//   const items = [...TICKER, ...TICKER];
//   return (
//     <div
//       className="relative overflow-hidden border-y"
//       style={{
//         backgroundColor: INK,
//         borderColor: "rgba(255,255,255,0.08)",
//       }}
//     >
//       <motion.div
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
//         className="flex w-max items-center gap-0 py-3.5"
//       >
//         {items.map((t, i) => (
//           <span
//             key={i}
//             className="flex items-center gap-4 whitespace-nowrap px-6 font-mono text-[11px] uppercase tracking-[0.22em]"
//             style={{ color: "rgba(255,255,255,0.65)" }}
//           >
//             {t}
//             <span
//               className="inline-block h-1 w-1 rounded-full"
//               style={{ backgroundColor: LIME, opacity: i % 3 === 0 ? 1 : 0.25 }}
//             />
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// // ----------------------------------------------------------------------------
// // Horizontal pipeline (the new centerpiece — different layout DNA)
// // ----------------------------------------------------------------------------
// function Pipeline() {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <div ref={ref} className="relative">
//       {/* Background ruled track */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute left-0 right-0 top-1/2 -z-0 h-px"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right, rgba(11,11,15,0.15) 50%, transparent 0%)",
//           backgroundSize: "8px 1px",
//           backgroundRepeat: "repeat-x",
//         }}
//       />

//       {/* Flowing dot */}
//       {inView && (
//         <motion.span
//           aria-hidden
//           className="absolute top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full"
//           style={{ backgroundColor: LIME, boxShadow: `0 0 12px ${LIME}` }}
//           initial={{ left: "0%" }}
//           animate={{ left: ["0%", "100%"] }}
//           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
//         />
//       )}

//       <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5 md:gap-4">
//         {PIPELINE.map((p, i) => (
//           <motion.div
//             key={p.step}
//             initial={{ opacity: 0, y: 18 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: EASE }}
//             className="relative flex flex-col"
//           >
//             {/* Top label row */}
//             <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-black/45">
//               <span>{p.step}</span>
//               {i < PIPELINE.length - 1 && (
//                 <ArrowRight size={12} className="hidden md:block opacity-50" />
//               )}
//             </div>

//             {/* Card */}
//             <div
//               className="rounded-2xl border bg-white p-4 transition-transform duration-300 hover:-translate-y-0.5"
//               style={{ borderColor: "rgba(11,11,15,0.1)" }}
//             >
//               <div
//                 className="text-[20px] leading-none tracking-[-0.02em]"
//                 style={{ fontFamily: "ui-serif, Georgia, serif" }}
//               >
//                 {p.title}
//               </div>
//               <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
//                 {p.body}
//               </div>

//               {/* Sample */}
//               <div
//                 className="mt-4 rounded-lg px-2.5 py-2 font-mono text-[10.5px] leading-snug"
//                 style={{
//                   backgroundColor: i === 4 ? INK : "rgba(11,11,15,0.04)",
//                   color: i === 4 ? LIME : "rgba(11,11,15,0.7)",
//                 }}
//               >
//                 {p.sample}
//               </div>

//               {/* Tag */}
//               <div className="mt-3 flex items-center justify-between">
//                 <span
//                   className="rounded-full px-2 py-0.5 font-mono text-[9px] tracking-[0.18em]"
//                   style={{
//                     backgroundColor: i === 4 ? LIME : "rgba(11,11,15,0.08)",
//                     color: INK,
//                   }}
//                 >
//                   {p.tag}
//                 </span>
//                 {i === 4 && (
//                   <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-black/45">
//                     <span
//                       className="inline-block h-1.5 w-1.5 rounded-full"
//                       style={{ backgroundColor: LIME }}
//                     />
//                     live
//                   </span>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ----------------------------------------------------------------------------
// // Main
// // ----------------------------------------------------------------------------
// export function IncomingKnowledge() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const inView = useInView(sectionRef, { once: true, margin: "-80px" });

//   const imageWrapRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: imageWrapRef,
//     offset: ["start end", "end start"],
//   });
//   const imageScale = useTransform(scrollYProgress, [0, 0.4], [0.94, 1]);
//   const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden"
//       style={{ backgroundColor: PAPER, color: INK }}
//     >
//       {/* Ambient blob — same palette as DecisionMemory, opposite corner for variety */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -left-40 -top-32 h-[480px] w-[480px] rounded-full"
//         style={{
//           background:
//             "radial-gradient(closest-side, rgba(212,255,58,0.32), transparent 70%)",
//         }}
//       />

//       {/* ========================================================== */}
//       {/* 1. HEADER                                                   */}
//       {/* ========================================================== */}
//       <div className="relative px-4 pb-14 pt-24 md:px-8 md:pt-32">
//         <div className="mx-auto max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.7, ease: EASE }}
//             className="mb-10 flex flex-wrap items-center gap-3"
//           >
//             <span
//               className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
//               style={{ color: INK }}
//             >
//               <span className="relative inline-flex h-1.5 w-1.5">
//                 <span
//                   className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
//                   style={{ backgroundColor: VIOLET }}
//                 />
//                 <span
//                   className="relative inline-flex h-1.5 w-1.5 rounded-full"
//                   style={{ backgroundColor: VIOLET }}
//                 />
//               </span>
//               Chapter 03 / Incoming Knowledge
//             </span>
//             <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
//               From raw to routed
//             </span>
//           </motion.div>

//           {/* Headline + lede + source pills */}
//           <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
//             <motion.h2
//               initial={{ opacity: 0, y: 24 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.9, ease: EASE }}
//               className="lg:col-span-7 text-[44px] leading-[0.96] tracking-[-0.03em] sm:text-6xl lg:text-[88px]"
//               style={{
//                 fontFamily: "ui-serif, Georgia, 'Times New Roman', serif",
//               }}
//             >
//               Raw signals.{" "}
//               <span className="italic text-black/40">Routed.</span>
//               <br />
//               <span className="relative inline-block">
//                 Auditable
//                 <motion.span
//                   aria-hidden
//                   initial={{ scaleX: 0, originX: 0 }}
//                   animate={inView ? { scaleX: 1 } : {}}
//                   transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
//                   className="absolute -bottom-1 left-0 h-[8px] w-full"
//                   style={{ backgroundColor: LIME }}
//                 />
//               </span>{" "}
//               <span className="italic">decisions.</span>
//             </motion.h2>

//             <motion.div
//               initial={{ opacity: 0, y: 24 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
//               className="lg:col-span-5 flex flex-col justify-end gap-6"
//             >
//               <p className="max-w-md text-[15px] leading-[1.7] text-black/65">
//                 Every email, Slack message, and calendar event becomes a typed
//                 event, writes to memory, and routes through the Decision
//                 Engine. Provenance attached. Nothing handwaved.
//               </p>

//               {/* Counter row — different layout vs DecisionMemory (single row, divided) */}
//               <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//                 {SOURCES.map((src, i) => {
//                   const Icon = src.icon;
//                   return (
//                     <motion.div
//                       key={src.label}
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={inView ? { opacity: 1, y: 0 } : {}}
//                       transition={{
//                         delay: 0.2 + i * 0.07,
//                         duration: 0.5,
//                         ease: EASE,
//                       }}
//                       className="rounded-2xl border border-black/10 bg-white p-3"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Icon
//                           size={13}
//                           style={{ color: src.color }}
//                           className="shrink-0"
//                         />
//                         <span
//                           className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55"
//                         >
//                           {src.label}
//                         </span>
//                       </div>
//                       <div
//                         className="mt-1.5 text-2xl leading-none tracking-[-0.02em]"
//                         style={{ fontFamily: "ui-serif, Georgia, serif" }}
//                       >
//                         {typeof src.n === "number" ? (
//                           <Counter to={src.n} />
//                         ) : (
//                           <span className="text-black/35">{src.n}</span>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ========================================================== */}
//       {/* 2. DARK TICKER (visual breaker)                             */}
//       {/* ========================================================== */}
//       <Ticker />

//       {/* ========================================================== */}
//       {/* 3. HORIZONTAL PIPELINE                                      */}
//       {/* ========================================================== */}
//       <div className="px-4 py-20 md:px-8 md:py-24">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-black/15 pb-4">
//             <div
//               className="text-[28px] leading-none tracking-[-0.02em] sm:text-4xl"
//               style={{ fontFamily: "ui-serif, Georgia, serif" }}
//             >
//               The pipeline,{" "}
//               <span className="italic text-black/40">end to end.</span>
//             </div>
//             <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/45">
//               Sources / Ingest / Type / Memory / Skill
//             </span>
//           </div>

//           <Pipeline />
//         </div>
//       </div>

//       {/* ========================================================== */}
//       {/* 4. TECHNICAL BLUEPRINT IMAGE with NUMBERED CALLOUTS         */}
//       {/* ========================================================== */}
//       <div className="px-4 pb-24 md:px-8 md:pb-32">
//         <div className="mx-auto max-w-6xl">
//           <div className="mb-4 flex items-end justify-between border-b border-black/15 pb-3">
//             <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/55">
//               Blueprint 03 / Incoming Knowledge interface
//             </div>
//             <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-black/45">
//               <span>03 annotations</span>
//               <span
//                 className="inline-block h-1 w-1 rounded-full"
//                 style={{ backgroundColor: INK, opacity: 0.3 }}
//               />
//               <span style={{ color: VIOLET }}>live view</span>
//             </div>
//           </div>

//           {/* Image wrapper */}
//           <motion.div
//             ref={imageWrapRef}
//             style={{ scale: imageScale, y: imageY }}
//             className="relative overflow-hidden rounded-[28px] border border-black/15 bg-white"
//           >
//             <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
//               <Image
//                 src="/incomingnavis.jpeg"
//                 alt="Navis Incoming Knowledge interface"
//                 fill
//                 className="object-cover object-top"
//                 sizes="(max-width: 1280px) 100vw, 1100px"
//               />

//               {/* Numbered annotation pins */}
//               {ANNOTATIONS.map((a, i) => (
//                 <div key={a.num} className="hidden md:block">
//                   {/* dashed connector */}
//                   <motion.svg
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
//                     className="pointer-events-none absolute inset-0 h-full w-full"
//                   >
//                     <line
//                       x1={a.pos.left}
//                       y1={a.pos.top}
//                       x2={a.target.left}
//                       y2={a.target.top}
//                       stroke={INK}
//                       strokeWidth="1"
//                       strokeDasharray="3 3"
//                       opacity="0.5"
//                     />
//                   </motion.svg>

//                   {/* target dot on the image */}
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{
//                       delay: 0.4 + i * 0.15,
//                       duration: 0.5,
//                       ease: EASE,
//                     }}
//                     aria-hidden
//                     className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
//                     style={{
//                       left: a.target.left,
//                       top: a.target.top,
//                       backgroundColor: LIME,
//                       boxShadow: `0 0 0 4px rgba(11,11,15,0.9)`,
//                     }}
//                   />

//                   {/* numeric pin */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 6 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{
//                       delay: 0.45 + i * 0.15,
//                       duration: 0.6,
//                       ease: EASE,
//                     }}
//                     className="absolute -translate-x-1/2 -translate-y-1/2"
//                     style={{ left: a.pos.left, top: a.pos.top }}
//                   >
//                     <span
//                       className="inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-medium tabular-nums"
//                       style={{
//                         backgroundColor: INK,
//                         color: LIME,
//                         boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
//                       }}
//                     >
//                       {a.num}
//                     </span>
//                   </motion.div>
//                 </div>
//               ))}

//               {/* Corner crops */}
//               <span
//                 aria-hidden
//                 className="absolute left-3 top-3 h-3 w-3 border-l border-t"
//                 style={{ borderColor: "rgba(255,255,255,0.7)" }}
//               />
//               <span
//                 aria-hidden
//                 className="absolute right-3 top-3 h-3 w-3 border-r border-t"
//                 style={{ borderColor: "rgba(255,255,255,0.7)" }}
//               />
//               <span
//                 aria-hidden
//                 className="absolute bottom-3 left-3 h-3 w-3 border-b border-l"
//                 style={{ borderColor: "rgba(255,255,255,0.7)" }}
//               />
//               <span
//                 aria-hidden
//                 className="absolute bottom-3 right-3 h-3 w-3 border-b border-r"
//                 style={{ borderColor: "rgba(255,255,255,0.7)" }}
//               />
//             </div>
//           </motion.div>

//           {/* Annotation legend (below image) */}
//           <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
//             {ANNOTATIONS.map((a, i) => (
//               <motion.div
//                 key={a.num}
//                 initial={{ opacity: 0, y: 12 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   delay: 0.15 + i * 0.08,
//                   duration: 0.6,
//                   ease: EASE,
//                 }}
//                 className="flex gap-4 border-t-2 pt-4"
//                 style={{ borderColor: INK }}
//               >
//                 <span
//                   className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px]"
//                   style={{ backgroundColor: INK, color: LIME }}
//                 >
//                   {a.num}
//                 </span>
//                 <div>
//                   <div
//                     className="text-[18px] leading-tight tracking-[-0.01em]"
//                     style={{ fontFamily: "ui-serif, Georgia, serif" }}
//                   >
//                     {a.title}
//                   </div>
//                   <p className="mt-1.5 text-[13px] leading-[1.55] text-black/60">
//                     {a.body}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ========================================================== */}
//       {/* 5. SPEC-SHEET FEATURE ROWS (horizontal stack, not columns)  */}
//       {/* ========================================================== */}
//       <div
//         className="border-t px-4 pb-24 md:px-8 md:pb-32"
//         style={{ borderColor: "rgba(11,11,15,0.15)" }}
//       >
//         <div className="mx-auto max-w-7xl pt-16 md:pt-20">
//           <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
//             <div
//               className="text-[28px] leading-none tracking-[-0.02em] sm:text-4xl"
//               style={{ fontFamily: "ui-serif, Georgia, serif" }}
//             >
//               How signals{" "}
//               <span className="italic text-black/40">become decisions.</span>
//             </div>
//             <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/45">
//               Spec sheet / 03 rows
//             </span>
//           </div>

//           <div>
//             {FEATURES.map((f, i) => {
//               const Icon = f.icon;
//               return (
//                 <motion.div
//                   key={f.title}
//                   initial={{ opacity: 0, y: 14 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-40px" }}
//                   transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
//                   className="group grid grid-cols-1 items-start gap-6 border-b py-10 md:grid-cols-[88px_1fr_1.1fr_auto] md:gap-10 md:py-12"
//                   style={{ borderColor: "rgba(11,11,15,0.12)" }}
//                 >
//                   {/* big serif number */}
//                   <div
//                     className="text-[64px] leading-[0.85] tracking-[-0.04em] text-black/25 transition-colors duration-300 group-hover:text-black"
//                     style={{ fontFamily: "ui-serif, Georgia, serif" }}
//                   >
//                     {f.n}
//                   </div>

//                   {/* title + body */}
//                   <div className="md:max-w-[26rem]">
//                     <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-black/65">
//                       <Icon size={11} />
//                       {f.title.split(",")[0]}
//                     </div>
//                     <h3
//                       className="text-[24px] leading-tight tracking-[-0.02em] sm:text-[28px]"
//                       style={{ fontFamily: "ui-serif, Georgia, serif" }}
//                     >
//                       {f.title}
//                     </h3>
//                     <p className="mt-3 text-[14px] leading-[1.65] text-black/60">
//                       {f.body}
//                     </p>
//                   </div>

//                   {/* chip cluster (right) */}
//                   <div className="flex flex-wrap gap-1.5">
//                     {f.chips.map((c, ci) => (
//                       <span
//                         key={c}
//                         className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
//                         style={
//                           ci === f.activeIdx
//                             ? { backgroundColor: INK, color: LIME }
//                             : {
//                                 backgroundColor: "rgba(11,11,15,0.05)",
//                                 color: "rgba(11,11,15,0.6)",
//                                 border: "1px solid rgba(11,11,15,0.1)",
//                               }
//                         }
//                       >
//                         {c}
//                       </span>
//                     ))}
//                   </div>

//                   {/* hover arrow */}
//                   <div className="flex items-start justify-end">
//                     <span
//                       className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-black group-hover:rotate-[-45deg]"
//                       style={{
//                         backgroundColor: LIME,
//                         color: INK,
//                       }}
//                     >
//                       <ArrowRight
//                         size={16}
//                         className="transition-colors duration-300 group-hover:text-[#D4FF3A]"
//                       />
//                     </span>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default IncomingKnowledge;
























"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Hash,
  CalendarDays,
  Video,
  Tag,
  RefreshCw,
  Zap,
  ArrowRight,
} from "lucide-react";
import AnimatedBadge from "./ui/animated-badge";

// ----------------------------------------------------------------------------
// Shared tokens (dark theme)
// ----------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const;
const INK = "#0B0B0F";
const PAPER = "#03081e"; // Dark background
const LIME = "#06b6d4";
const VIOLET = "#8b5cf6";
const CYAN = "#06b6d4";

// ----------------------------------------------------------------------------
// Counter
// ----------------------------------------------------------------------------
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return c.stop;
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

// ----------------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------------
const SOURCES = [
  { icon: Mail, label: "Gmail", n: 12, color: "#ea4335" },
  { icon: Hash, label: "Slack", n: 8, color: "#4a154b" },
  { icon: CalendarDays, label: "Calendar", n: 3, color: "#3b82f6" },
  { icon: Video, label: "Meetings", n: "soon", color: "#64748b" },
];

const TICKER = [
  "Gmail / 12 signals",
  "Slack / 8 signals",
  "Calendar / 3 signals",
  "Episodic memory",
  "Semantic memory",
  "State memory",
  "Decision memory",
  "Skills triggered / 3",
  "Audit trace / live",
  "Self-improving routing",
];

const PIPELINE = [
  {
    step: "01",
    title: "Source",
    body: "Gmail / Slack / Calendar / Meetings",
    sample: "CFO needs a call tomorrow to finalize.",
    tag: "RAW",
  },
  {
    step: "02",
    title: "Ingest",
    body: "Parsed, deduped, attributed",
    sample: "from=cfo@acme.com  thread=#23a1",
    tag: "PARSED",
  },
  {
    step: "03",
    title: "Type",
    body: "Classified into typed events",
    sample: "type=deadline.urgent  conf=0.94",
    tag: "TYPED",
  },
  {
    step: "04",
    title: "Memory",
    body: "Writes to episodic + semantic stores",
    sample: "wrote: memory/episodic/0271",
    tag: "STORED",
  },
  {
    step: "05",
    title: "Skill",
    body: "Routes to a Decision Skill",
    sample: "skill=DealRecovery  fired",
    tag: "FIRED",
  },
];

const ANNOTATIONS = [
  {
    num: "01",
    title: "Inbox stream",
    body: "Every raw signal lands with full provenance: source, thread, attribution, timestamp.",
    pos: { top: "16%", left: "8%" },
    target: { top: "30%", left: "26%" },
  },
  {
    num: "02",
    title: "Type classifier",
    body: "An event is tagged with a typed schema and a confidence score before it touches memory.",
    pos: { top: "8%", left: "62%" },
    target: { top: "22%", left: "55%" },
  },
  {
    num: "03",
    title: "Decision route",
    body: "Typed events route to a Skill. The Skill writes back to memory after it observes an outcome.",
    pos: { top: "62%", left: "60%" },
    target: { top: "72%", left: "48%" },
  },
];

const FEATURES = [
  {
    icon: Tag,
    n: "01",
    title: "Label behavior, defined",
    body: "Each label controls notification, auto-archive, reminder, and whether it feeds the decision engine. No hidden defaults.",
    chips: ["Important", "Customer", "Investor", "Noise"],
    activeIdx: 0,
  },
  {
    icon: RefreshCw,
    n: "02",
    title: "Feedback loop, automatic",
    body: "Move a signal to another label and Navis stores the reason as a training example. Similar signals route correctly next time.",
    chips: ["Train label", "Feeds decision", "Auto-route"],
    activeIdx: 1,
  },
  {
    icon: Zap,
    n: "03",
    title: "Decision engine, on",
    body: "Structured events feed memory and can trigger a Decision Skill automatically, without you lifting a finger.",
    chips: ["Deal Recovery 92%", "Investor Prep 84%", "Onboarding 78%"],
    activeIdx: 2,
  },
];

// ----------------------------------------------------------------------------
// Marquee ticker (dark band)
// ----------------------------------------------------------------------------
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        backgroundColor: "#03081e",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-0 py-3.5"
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-4 whitespace-nowrap px-6 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400"
          >
            {t}
            <span
              className="inline-block h-1 w-1 rounded-full"
              style={{ backgroundColor: LIME, opacity: i % 3 === 0 ? 1 : 0.25 }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Horizontal pipeline
// ----------------------------------------------------------------------------
function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* Background ruled track */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 -z-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 50%, transparent 0%)",
          backgroundSize: "8px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Flowing dot */}
      {inView && (
        <motion.span
          aria-hidden
          className="absolute top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: LIME, boxShadow: `0 0 12px ${LIME}` }}
          initial={{ left: "0%" }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5 md:gap-4">
        {PIPELINE.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: EASE }}
            className="relative flex flex-col"
          >
            {/* Top label row */}
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <span>{p.step}</span>
              {i < PIPELINE.length - 1 && (
                <ArrowRight size={12} className="hidden md:block opacity-50" />
              )}
            </div>

            {/* Card */}
            <div
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-transform duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <div
                className="text-[20px] leading-none tracking-[-0.02em] text-white"
                style={{ fontFamily: "ui-serif, Georgia, serif" }}
              >
                {p.title}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                {p.body}
              </div>

              {/* Sample */}
              <div
                className="mt-4 rounded-lg px-2.5 py-2 font-mono text-[10.5px] leading-snug"
                style={{
                  backgroundColor: i === 4 ? LIME : "rgba(255,255,255,0.05)",
                  color: i === 4 ? INK : "rgba(255,255,255,0.7)",
                }}
              >
                {p.sample}
              </div>

              {/* Tag */}
              <div className="mt-3 flex items-center justify-between">
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[9px] tracking-[0.18em]"
                  style={{
                    backgroundColor: i === 4 ? LIME : "rgba(255,255,255,0.1)",
                    color: i === 4 ? INK : "rgba(255,255,255,0.6)",
                  }}
                >
                  {p.tag}
                </span>
                {i === 4 && (
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: LIME }}
                    />
                    live
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------
export function IncomingKnowledge() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [0.94, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: PAPER, color: "white" }}
    >
      {/* Ambient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,255,58,0.15), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.1), transparent 70%)",
        }}
      />

      {/* ========================================================== */}
      {/* 1. HEADER                                                   */}
      {/* ========================================================== */}
      <div className="relative px-4 pb-14 pt-24 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-10 flex flex-wrap items-center gap-3"
          >
            {/* <span
              className="inline-flex items-center gap-2 rounded-full border border-slate-700  px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 backdrop-blur-sm"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: VIOLET }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: VIOLET }}
                />
              </span>
              Chapter 03 / Incoming Knowledge
            </span> */}
             <AnimatedBadge
                      text="Chapter 01 / Incoming Knowledge"
                      color="#22d3ee"
                      href="#"
                    />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              From raw to routed
            </span>
          </motion.div>

          {/* Headline + lede + source pills */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-7 text-[44px] leading-[0.96] tracking-[-0.03em] sm:text-6xl lg:text-[88px] text-white"
              style={{
                fontFamily: "ui-serif, Georgia, 'Times New Roman', serif",
              }}
            >
              Raw signals.{" "}
              <span className="italic text-slate-400">Routed.</span>
              <br />
              <span className="relative inline-block">
                Auditable
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
                  className="absolute -bottom-1 left-0 h-[8px] w-full"
                  style={{ backgroundColor: LIME }}
                />
              </span>{" "}
              <span className="italic text-slate-400">decisions.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="lg:col-span-5 flex flex-col justify-end gap-6"
            >
              <p className="max-w-md text-[15px] leading-[1.7] text-slate-300">
                Every email, Slack message, and calendar event becomes a typed
                event, writes to memory, and routes through the Decision
                Engine. Provenance attached. Nothing handwaved.
              </p>

              {/* Counter row */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SOURCES.map((src, i) => {
                  const Icon = src.icon;
                  return (
                    <motion.div
                      key={src.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        delay: 0.2 + i * 0.07,
                        duration: 0.5,
                        ease: EASE,
                      }}
                      className="rounded-2xl border border-slate-800 bg-slate-900/50 p-3 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          size={13}
                          style={{ color: src.color }}
                          className="shrink-0"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                          {src.label}
                        </span>
                      </div>
                      <div
                        className="mt-1.5 text-2xl leading-none tracking-[-0.02em] text-white"
                        style={{ fontFamily: "ui-serif, Georgia, serif" }}
                      >
                        {typeof src.n === "number" ? (
                          <Counter to={src.n} />
                        ) : (
                          <span className="text-slate-500">{src.n}</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. DARK TICKER */}
      {/* ========================================================== */}
      <Ticker />

      {/* ========================================================== */}
      {/* 3. HORIZONTAL PIPELINE */}
      {/* ========================================================== */}
      {/* <div className="px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-slate-800 pb-4">
            <div
              className="text-[28px] leading-none tracking-[-0.02em] text-white sm:text-4xl"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              The pipeline,{" "}
              <span className="italic text-slate-400">end to end.</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Sources / Ingest / Type / Memory / Skill
            </span>
          </div>

          <Pipeline />
        </div>
      </div> */}

      {/* ========================================================== */}
      {/* 4. TECHNICAL BLUEPRINT IMAGE */}
      {/* ========================================================== */}
      <div className="px-4 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-end justify-between border-b border-slate-800 pb-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Blueprint 03 / Incoming Knowledge interface
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <span>03 annotations</span>
              <span className="inline-block h-1 w-1 rounded-full bg-slate-600" />
              <span style={{ color: VIOLET }}>live view</span>
            </div>
          </div>

          {/* Image wrapper */}
          <motion.div
            ref={imageWrapRef}
            style={{ scale: imageScale, y: imageY }}
            className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/30"
          >
            <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
              <Image
                src="/incomingnavis.jpeg"
                alt="Navis Incoming Knowledge interface"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1100px"
              />

              {/* Numbered annotation pins */}
              {ANNOTATIONS.map((a, i) => (
                <div key={a.num} className="hidden md:block">
                  <motion.svg
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <line
                      x1={a.pos.left}
                      y1={a.pos.top}
                      x2={a.target.left}
                      y2={a.target.top}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  </motion.svg>

                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + i * 0.15,
                      duration: 0.5,
                      ease: EASE,
                    }}
                    aria-hidden
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: a.target.left,
                      top: a.target.top,
                      backgroundColor: LIME,
                      boxShadow: `0 0 0 4px rgba(11,11,15,0.9)`,
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.45 + i * 0.15,
                      duration: 0.6,
                      ease: EASE,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: a.pos.left, top: a.pos.top }}
                  >
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-medium tabular-nums"
                      style={{
                        backgroundColor: INK,
                        color: LIME,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                      }}
                    >
                      {a.num}
                    </span>
                  </motion.div>
                </div>
              ))}

              {/* Corner crops */}
              <span
                aria-hidden
                className="absolute left-3 top-3 h-3 w-3 border-l border-t border-white/30"
              />
              <span
                aria-hidden
                className="absolute right-3 top-3 h-3 w-3 border-r border-t border-white/30"
              />
              <span
                aria-hidden
                className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/30"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/30"
              />
            </div>
          </motion.div>

          {/* Annotation legend */}
          {/* <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ANNOTATIONS.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.6,
                  ease: EASE,
                }}
                className="flex gap-4 border-t-2 pt-4 border-slate-800"
              >
                <span
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px]"
                  style={{ backgroundColor: INK, color: LIME }}
                >
                  {a.num}
                </span>
                <div>
                  <div
                    className="text-[18px] leading-tight tracking-[-0.01em] text-white"
                    style={{ fontFamily: "ui-serif, Georgia, serif" }}
                  >
                    {a.title}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-400">
                    {a.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div> */}
        </div>
      </div>

      {/* ========================================================== */}
      {/* 5. SPEC-SHEET FEATURE ROWS */}
      {/* ========================================================== */}
      <div
        className="border-t border-slate-800 px-4 pb-24 md:px-8 md:pb-32"
      >
        <div className="mx-auto max-w-7xl pt-16 md:pt-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <div
              className="text-[28px] leading-none tracking-[-0.02em] text-white sm:text-4xl"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              How signals{" "}
              <span className="italic text-slate-400">become decisions.</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Spec sheet / 03 rows
            </span>
          </div>

          <div>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
                  className="group grid grid-cols-1 items-start gap-6 border-b border-slate-800 py-10 md:grid-cols-[88px_1fr_1.1fr_auto] md:gap-10 md:py-12"
                >
                  <div
                    className="text-[64px] leading-[0.85] tracking-[-0.04em] text-slate-700 transition-colors duration-300 group-hover:text-slate-400"
                    style={{ fontFamily: "ui-serif, Georgia, serif" }}
                  >
                    {f.n}
                  </div>

                  <div className="md:max-w-[26rem]">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 backdrop-blur-sm">
                      <Icon size={11} />
                      {f.title.split(",")[0]}
                    </div>
                    <h3
                      className="text-[24px] leading-tight tracking-[-0.02em] text-white sm:text-[28px]"
                      style={{ fontFamily: "ui-serif, Georgia, serif" }}
                    >
                      {f.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-slate-400">
                      {f.body}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {f.chips.map((c, ci) => (
                      <span
                        key={c}
                        className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                        style={
                          ci === f.activeIdx
                            ? { backgroundColor: LIME, color: INK }
                            : {
                                backgroundColor: "rgba(255,255,255,0.05)",
                                color: "rgba(255,255,255,0.5)",
                                border: "1px solid rgba(255,255,255,0.1)",
                              }
                        }
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-start justify-end">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-white group-hover:rotate-[-45deg]"
                      style={{
                        backgroundColor: LIME,
                        color: INK,
                      }}
                    >
                      <ArrowRight size={16} />
                    </span>
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

export default IncomingKnowledge;