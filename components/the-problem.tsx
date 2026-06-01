// "use client";

// import { motion, useInView } from "motion/react";
// import { useRef } from "react";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// const EASING = [0.22, 1, 0.36, 1] as const;

// const PROBLEMS = [
//     {
//         id: "01",
//         headline: "Decisions made from memory and gut feel",
//         body: "Your team makes 50+ decisions a week. Almost none have a written rationale. When they go wrong, no one knows why.",
//         stat: "97%",
//         statLabel: "leave no record",
//         color: "#f87171",
//         area: "md:[grid-area:1/1/2/7]",
//     },
//     {
//         id: "02",
//         headline: "Context lives in someone's inbox",
//         body: "The CFO email, the Slack thread, the calendar conflict — scattered across tools. No one has the full picture when it matters.",
//         stat: "3–6h",
//         statLabel: "to gather context",
//         color: "#fbbf24",
//         area: "md:[grid-area:1/7/2/13]",
//     },
//     {
//         id: "03",
//         headline: "No audit trail. No learning loop.",
//         body: "When a deal is lost or a hire goes wrong, there's no trace of what was decided or why. The same mistake repeats next quarter.",
//         stat: "68%",
//         statLabel: "repeat the same mistake",
//         color: "#a78bfa",
//         area: "md:[grid-area:2/1/3/5]",
//     },
//     {
//         id: "04",
//         headline: "You find out after the window closes",
//         body: "The signal existed — in Gmail, in Slack, in the calendar. But no one ranked it, no one acted. The opportunity was already gone.",
//         stat: "$240k",
//         statLabel: "avg deal lost per miss",
//         color: "#f87171",
//         area: "md:[grid-area:2/5/3/9]",
//     },
//     {
//         id: "05",
//         headline: "AI tools that wait to be asked",
//         body: "Every AI tool today is reactive. You ask, it answers. But the decisions that matter most are the ones you didn't know to ask about.",
//         stat: "0",
//         statLabel: "proactive ranked decisions",
//         color: "#94a3b8",
//         area: "md:[grid-area:2/9/3/13]",
//     },
// ];

// export function TheProblem() {
//     const ref = useRef<HTMLElement>(null);
//     const inView = useInView(ref, { once: true, margin: "-80px" });

//     return (
//         <section
//             ref={ref}
//             className="relative border-t border-slate-800/60"
//             style={{ backgroundColor: "#020617" }}
//         >
//             <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">

//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.7, ease: EASING }}
//                     className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
//                 >
//                     <div>
//                         <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">
//                             The problem
//                         </p>
//                         <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.1]">
//                             Your team is deciding{" "}
//                             <span className="text-slate-500">in the dark.</span>
//                         </h2>
//                     </div>
//                     <p className="max-w-sm text-[14px] leading-relaxed text-slate-500 md:text-right">
//                         Five problems. One infrastructure gap.
//                         <br />
//                         NavisLabs closes all of them.
//                     </p>
//                 </motion.div>

//                 {/* Bento grid */}
//                 <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4">
//                     {PROBLEMS.map((p, i) => (
//                         <motion.li
//                             key={p.id}
//                             initial={{ opacity: 0, y: 16 }}
//                             animate={inView ? { opacity: 1, y: 0 } : {}}
//                             transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: EASING }}
//                             className={`list-none ${p.area}`}
//                         >
//                             <div
//                                 className="group relative flex h-full min-h-52 flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/30 p-7 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/50"
//                             >
//                                 {/* Top — id + headline */}
//                                 <div>
//                                     <div className="mb-4 flex items-center gap-3">
//                                         <span
//                                             className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]"
//                                             style={{ color: p.color }}
//                                         >
//                                             {p.id}
//                                         </span>
//                                         <div
//                                             className="h-px flex-1"
//                                             style={{ backgroundColor: `${p.color}25` }}
//                                         />
//                                     </div>
//                                     <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-white">
//                                         {p.headline}
//                                     </h3>
//                                     <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
//                                         {p.body}
//                                     </p>
//                                 </div>

//                                 {/* Bottom — stat */}
//                                 <div className="mt-6 flex items-end justify-between">
//                                     <div>
//                                         <div
//                                             className="text-[36px] font-bold leading-none tracking-tight"
//                                             style={{
//                                                 fontFamily: "ui-serif, Georgia, serif",
//                                                 color: p.color,
//                                             }}
//                                         >
//                                             {p.stat}
//                                         </div>
//                                         <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
//                                             {p.statLabel}
//                                         </div>
//                                     </div>

//                                     {/* Subtle corner accent */}
//                                     <div
//                                         className="h-8 w-8 rounded-full opacity-20"
//                                         style={{ backgroundColor: p.color, filter: "blur(12px)" }}
//                                     />
//                                 </div>

//                                 {/* Hover glow */}
//                                 <div
//                                     className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
//                                     style={{ backgroundColor: p.color }}
//                                 />
//                             </div>
//                         </motion.li>
//                     ))}
//                 </ul>

//                 {/* Footer CTA */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={inView ? { opacity: 1 } : {}}
//                     transition={{ delay: 0.7, duration: 0.6 }}
//                     className="mt-10 flex flex-col gap-3 border-t border-slate-800/60 pt-8 sm:flex-row sm:items-center sm:justify-between"
//                 >
//                     <p className="text-[13px] text-slate-600">
//                         NavisLabs builds the decision infrastructure that closes every one of these gaps.
//                     </p>
//                     <Link
//                         href="/products/navis-ai"
//                         className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-500 transition-colors hover:text-cyan-400"
//                     >
//                         See how Navis solves this
//                         <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
//                     </Link>
//                 </motion.div>

//             </div>
//         </section>
//     );
// }

// export default TheProblem;













"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, Inbox, RotateCcw, CalendarX, Bot, TrendingUp, Shield, Zap } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

const PROBLEMS = [
    {
        id: "01",
        headline: "Decisions made from memory and gut feel",
        body: "Your team makes 50+ decisions a week. Almost none have a written rationale. When they go wrong, no one knows why.",
        stat: "97%",
        statLabel: "leave no record",
        color: "#f87171",
        icon: AlertCircle,
        gradient: "from-red-500/20 to-red-500/5",
        solution: "Every decision gets a written rationale automatically.",
    },
    {
        id: "02",
        headline: "Context lives in someone's inbox",
        body: "The CFO email, the Slack thread, the calendar conflict — scattered across tools. No one has the full picture when it matters.",
        stat: "3–6h",
        statLabel: "to gather context",
        color: "#fbbf24",
        icon: Inbox,
        gradient: "from-amber-500/20 to-amber-500/5",
        solution: "Unified context from every channel, instantly accessible.",
    },
    {
        id: "03",
        headline: "No audit trail. No learning loop.",
        body: "When a deal is lost or a hire goes wrong, there's no trace of what was decided or why. The same mistake repeats next quarter.",
        stat: "68%",
        statLabel: "repeat the same mistake",
        color: "#a78bfa",
        icon: RotateCcw,
        gradient: "from-purple-500/20 to-purple-500/5",
        solution: "Complete audit trail with root cause analysis.",
    },
    {
        id: "04",
        headline: "You find out after the window closes",
        body: "The signal existed — in Gmail, in Slack, in the calendar. But no one ranked it, no one acted. The opportunity was already gone.",
        stat: "$240k",
        statLabel: "avg deal lost per miss",
        color: "#f97316",
        icon: CalendarX,
        gradient: "from-orange-500/20 to-orange-500/5",
        solution: "Real-time signal ranking before opportunities expire.",
    },
    {
        id: "05",
        headline: "AI tools that wait to be asked",
        body: "Every AI tool today is reactive. You ask, it answers. But the decisions that matter most are the ones you didn't know to ask about.",
        stat: "0",
        statLabel: "proactive ranked decisions",
        color: "#94a3b8",
        icon: Bot,
        gradient: "from-slate-500/20 to-slate-500/5",
        solution: "Proactive AI that surfaces what you need to know.",
    },
];

// Individual problem card component
const ProblemCard = ({ problem, index, inView }: { problem: typeof PROBLEMS[0]; index: number; inView: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = problem.icon;

    return (
        <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease: EASING }}
            className="list-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="group relative h-full overflow-hidden rounded-2xl border transition-all duration-300"
                style={{
                    borderColor: isHovered ? `${problem.color}40` : "rgba(51,65,85,0.5)",
                    background: `linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.4))`,
                    backdropFilter: "blur(2px)",
                }}
            >
                {/* Gradient overlay on hover */}
                <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 0% 0%, ${problem.color}15, transparent 70%)`,
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Content */}
                <div className="relative p-6">
                    {/* Header with icon and id */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                                style={{
                                    backgroundColor: `${problem.color}15`,
                                    border: `1px solid ${problem.color}30`,
                                }}
                            >
                                <Icon className="h-5 w-5" style={{ color: problem.color }} />
                            </div>
                            <span
                                className="font-mono text-xs font-bold tracking-wider"
                                style={{ color: problem.color }}
                            >
                                {problem.id}
                            </span>
                        </div>
                        {/* Decorative line */}
                        <div
                            className="h-px flex-1 ml-4 opacity-50"
                            style={{ backgroundColor: problem.color }}
                        />
                    </div>

                    {/* Headline */}
                    <h3 className="text-lg font-semibold leading-snug tracking-tight text-white mb-3">
                        {problem.headline}
                    </h3>

                    {/* Body */}
                    <p className="text-sm leading-relaxed text-slate-400 mb-4">
                        {problem.body}
                    </p>

                    {/* Stat section */}
                    <motion.div
                        className="mt-4 pt-4 border-t border-slate-800/60"
                        animate={{ borderColor: isHovered ? `${problem.color}40` : "rgba(51,65,85,0.6)" }}
                    >
                        <div className="flex items-baseline justify-between">
                            <div>
                                <div
                                    className="text-3xl font-bold leading-none tracking-tight"
                                    style={{ color: problem.color }}
                                >
                                    {problem.stat}
                                </div>
                                <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                                    {problem.statLabel}
                                </div>
                            </div>
                            <motion.div
                                className="h-12 w-12 rounded-full blur-xl"
                                style={{ backgroundColor: problem.color }}
                                animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.3 : 0.15 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Solution badge (appears on hover) */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: isHovered ? 0 : 60, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                        background: `linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.8))`,
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3" style={{ color: problem.color }} />
                        <span className="text-[11px] font-medium" style={{ color: problem.color }}>
                            Navis solves this:
                        </span>
                        <span className="text-[11px] text-slate-300">{problem.solution}</span>
                    </div>
                </motion.div>
            </div>
        </motion.li>
    );
};

export function TheProblem() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden"
            style={{ backgroundColor: "#020617" }}
        >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">

                {/* Header with improved hierarchy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASING }}
                    className="mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        <AlertCircle className="h-3 w-3 text-red-400" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-red-300">
                            The hidden cost
                        </span>
                    </motion.div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
                                Your team is deciding{" "}
                                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                    in the dark.
                                </span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-400 max-w-2xl">
                                Every day, hidden friction costs your team time, money, and opportunities.
                                Here's what's really happening.
                            </p>
                        </div>

                        {/* Impact counter */}
                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <TrendingUp className="h-8 w-8 text-amber-400" />
                            <div>
                                <div className="text-2xl font-bold text-white">$1.2M+</div>
                                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                                    average annual loss per team
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Progress indicator */}
                    <motion.div
                        className="mt-8 flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex-1 h-px bg-gradient-to-r from-red-500/30 to-transparent" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600">
                            Five critical gaps
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-l from-red-500/30 to-transparent" />
                    </motion.div>
                </motion.div>

                {/* Problem grid - responsive layout */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {PROBLEMS.map((problem, idx) => (
                        <ProblemCard
                            key={problem.id}
                            problem={problem}
                            index={idx}
                            inView={inView}
                        />
                    ))}
                </div>

                {/* Solution summary card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 p-6 md:p-8">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-50" />
                        
                        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <Shield className="h-4 w-4 text-cyan-400" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-cyan-400">
                                        One solution
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    NavisLabs closes every single gap.
                                </h3>
                                <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                                    From scattered context to missed opportunities — our decision infrastructure
                                    turns chaos into clarity, automatically.
                                </p>
                            </div>
                            <Link
                                href="/products/navis-ai"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap"
                                style={{
                                    background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))",
                                    border: "1px solid rgba(6,182,212,0.4)",
                                    color: "#06b6d4",
                                }}
                            >
                                See how Navis solves this
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

export default TheProblem;