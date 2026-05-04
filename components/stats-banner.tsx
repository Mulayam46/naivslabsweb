"use client";

import { motion } from "motion/react";
import { Inbox, GitBranch, Brain, ShieldCheck, Users } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const EASING = [0.22, 1, 0.36, 1] as const;

const INSIGHTS = [
  {
    icon: Inbox,
    stat: "Turns scattered work into structured memory",
    highlight: "structured memory",
    context:
      "Email, Slack, calendar, and doc events become typed events with extracted entities. Each one writes to one of four memory types — Episodic, Semantic, State, Decision — and can trigger a Decision Skill automatically.",
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
    icon: GitBranch,
    stat: "Ranks every decision by impact + your behavior",
    highlight: "Ranks every decision",
    context:
      "Navis runs a multi-decision priority engine. Decisions are scored by predicted impact, your behavior modifier, downstream effects, and conflict with other open work. You see one screen, one next move \u2014 not an inbox.",
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
    icon: ShieldCheck,
    stat: "Governance and audit trace on every action",
    highlight: "audit trace on every action",
    context:
      "Per-channel action policies (auto · confirm · require approval · blocked) gate every external action. Each execution writes a tamper-evident trace — trigger → memory → reasoning → simulation → decision → execution → outcome — to the Audit Log.",
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
    stat: "A Company Brain that cites the memory it used",
    highlight: "cites the memory it used",
    context:
      "Every recommendation lands with the exact memory citations behind it: which episodic event, which person, which past decision pattern. People are derived from your team roster + active decisions, not editorial.",
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
    icon: Users,
    stat: "Coordinates the team around the right decision",
    highlight: "Coordinates the team",
    context:
      "Every decision carries an owner + delegates. Multi-actor traces show when a teammate acknowledges. \"Waiting on you\" signals surface in the sidebar. Navis doesn't just help you decide — it routes the work.",
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
