"use client";

import { motion } from "motion/react";
import { Inbox, Video, Brain, CalendarClock, BarChart2 } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const EASING = [0.22, 1, 0.36, 1] as const;

const INSIGHTS = [
  {
    icon: Inbox,
    stat: "Reads your inbox so you don't have to",
    highlight: "Reads your inbox",
    context:
      "Navis monitors Gmail and Slack continuously — categorises by urgency, drafts replies with full thread context, flags stuck threads, and surfaces what actually needs your attention each morning.",
    gradientFrom: "#bfdbfe",
    gradientTo: "#bae6fd",
    iconColor: "#1d4ed8",
    iconBg: "rgba(29,78,216,0.10)",
    rectangleClassName: "bg-blue-50 border-blue-300 leading-loose",
    pointerClassName: "text-blue-500 h-3 w-3",
    accentColor: "#1d4ed8",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  },
  {
    icon: CalendarClock,
    stat: "Smart scheduling from plain language",
    highlight: "Smart scheduling",
    context:
      'Say \u201cSchedule a call with Rajan about Series A docs\u201d and Navis reads your email history, finds mutual free slots, creates an invite with an AI-generated agenda, and books it.',
    gradientFrom: "#c7d2fe",
    gradientTo: "#e9d5ff",
    iconColor: "#4f46e5",
    iconBg: "rgba(79,70,229,0.10)",
    rectangleClassName: "bg-indigo-50 border-indigo-300 leading-loose",
    pointerClassName: "text-indigo-500 h-3 w-3",
    accentColor: "#4f46e5",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/5]",
  },
  {
    icon: Video,
    stat: "A live copilot inside every meeting",
    highlight: "live copilot inside every meeting",
    context:
      "Navis joins as a silent bot and shows a real-time overlay on your screen. Pre-meeting brief, sharp questions to ask, live deal context as it comes up, action items captured automatically, follow-up email drafted before you close the tab.",
    gradientFrom: "#ddd6fe",
    gradientTo: "#fbcfe8",
    iconColor: "#7c3aed",
    iconBg: "rgba(124,58,237,0.10)",
    rectangleClassName: "bg-violet-50 border-violet-300 leading-loose",
    pointerClassName: "text-violet-500 h-3 w-3",
    accentColor: "#7c3aed",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/5/3/8]",
  },
  {
    icon: Brain,
    stat: "Asks the questions you should be asking yourself",
    highlight: "questions you should be asking yourself",
    context:
      'Every other tool waits for you to ask it something. Navis watches your patterns and pushes the question directly to your screen: \u201cMeeting hours went up this week. Was this intentional?\u201d',
    gradientFrom: "#a7f3d0",
    gradientTo: "#99f6e4",
    iconColor: "#059669",
    iconBg: "rgba(5,150,105,0.10)",
    rectangleClassName: "bg-emerald-50 border-emerald-300 leading-loose",
    pointerClassName: "text-emerald-500 h-3 w-3",
    accentColor: "#059669",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
  },
  {
    icon: BarChart2,
    stat: "A weekly digest that actually means something",
    highlight: "weekly digest",
    context:
      "Every Sunday at 8pm: your week in numbers — meetings vs deep work vs stated goals — plus one concrete action for next week. Not a dashboard. A decision.",
    gradientFrom: "#fde68a",
    gradientTo: "#fca5a5",
    iconColor: "#d97706",
    iconBg: "rgba(217,119,6,0.10)",
    rectangleClassName: "bg-amber-50 border-amber-300 leading-loose",
    pointerClassName: "text-amber-500 h-3 w-3",
    accentColor: "#d97706",
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  },
];

export function StatsBanner() {
  return (
    <section
      className="px-4 py-8 md:px-8 md:py-10"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "rgba(255,255,255,0.52)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-136 xl:grid-rows-2">
          {INSIGHTS.map((item, i) => {
            const Icon = item.icon;
            const highlightIndex = item.stat.indexOf(item.highlight);
            const prefix = item.stat.slice(0, highlightIndex);
            const suffix = item.stat.slice(
              highlightIndex + item.highlight.length
            );

            return (
              <motion.li
                key={item.stat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: EASING }}
                className={`min-h-56 list-none ${item.area}`}
              >
                {/* Outer wrapper — GlowingEffect lives here */}
                <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-2 md:rounded-3xl md:p-3">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />

                  {/* Inner card */}
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6">
                    {/* Subtle accent glow in corner */}
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                        opacity: 0.5,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className="relative w-fit rounded-lg border border-gray-200 p-2"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: item.accentColor }}
                      />
                    </div>

                    {/* Text */}
                    <div className="relative space-y-3">
                      {/* Stat title with PointerHighlight */}
                      <div className="font-sans text-xl/[1.375rem] font-semibold tracking-tight text-balance text-slate-900 md:text-2xl/[1.875rem]">
                        {prefix}
                        <PointerHighlight
                          rectangleClassName={item.rectangleClassName}
                          pointerClassName={item.pointerClassName}
                          containerClassName="inline-block mx-0.5"
                        >
                          <span className="relative z-10">{item.highlight}</span>
                        </PointerHighlight>
                        {suffix}
                      </div>

                      {/* Context */}
                      <p className="font-sans text-sm/[1.125rem] text-slate-500 md:text-base/[1.375rem]">
                        {item.context}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
