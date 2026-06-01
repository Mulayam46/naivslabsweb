"use client";

/**
 * @author dorianbaffier + extended integration
 * @description Combined insights banner with aurora ambient, magnetic 3D tilt, and focus-dim siblings.
 * @version 2.1.0
 * @date 2025-02-20
 * @license MIT
 * @website https://kokonutui.com
 * @github https://github.com/kokonut-labs/kokonutui
 */

import type { LucideIcon } from "lucide-react";
import { Cloud, Code, Cpu, Globe, Lock, Zap, Inbox, GitBranch, Brain, ShieldCheck, Users } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

// ─── Constants ──────────────────────────────────────────────────────────────────

const TILT_MAX = 9;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;
const EASING = [0.22, 1, 0.36, 1] as const;

// ─── Insight Data ────────────────────────────────────────────────────────────────

interface InsightItem {
  icon: LucideIcon;
  stat: string;
  highlight: string;
  context: string;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
  iconBg: string;
  rectangleClassName: string;
  pointerClassName: string;
  accentColor: string;
  area: string;
}

const INSIGHTS: InsightItem[] = [
  {
    icon: Inbox,
    stat: "Turn raw signals into auditable decisions",
    highlight: "auditable decisions",
    context:
      "Email, Slack, calendar, and meeting events become typed events with extracted entities. Each writes to one of four memory types — Episodic, Semantic, State, Decision — and can trigger a Decision Skill automatically.",
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
    stat: "See what matters now — and why",
    highlight: "what matters now",
    context:
      "Navis runs a multi-decision priority engine. Decisions are scored by predicted impact, your behavior modifier, downstream effects, and conflict with other open work. One screen. One next move. Not an inbox.",
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
    stat: "Nothing executes without control",
    highlight: "without control",
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
    stat: "Simulated outcomes before you act",
    highlight: "Simulated outcomes",
    context:
      "Every recommendation lands with cited memory and simulated paths. Navis models stakeholders, runs alternative paths against historical Decision Memory, and shows close probabilities before you commit.",
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
    stat: "Navis adapts to how you work",
    highlight: "how you work",
    context:
      "The Behavior layer reads memory + outcomes to model your response patterns and weight every recommendation. Owner + delegates per decision, multi-actor traces, and \"waiting on you\" signals route work to the right teammate.",
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

// ─── Spotlight Feature Data ──────────────────────────────────────────────────────

export interface SpotlightItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const DEFAULT_SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    icon: Zap,
    title: "Instant",
    description:
      "Sub-100ms latency on every request, globally distributed across every region.",
    color: "#f59e0b",
  },
  {
    icon: Lock,
    title: "Secure",
    description:
      "Zero-trust by default. SOC 2 certified with end-to-end encryption throughout.",
    color: "#60a5fa",
  },
  {
    icon: Globe,
    title: "Global",
    description:
      "Edge-deployed to 300+ locations. Your users always hit a nearby server.",
    color: "#34d399",
  },
  {
    icon: Code,
    title: "Developer first",
    description:
      "Type-safe SDKs in five languages, a complete REST API, and honest docs.",
    color: "#a78bfa",
  },
  {
    icon: Cpu,
    title: "Scalable",
    description:
      "From side project to Series B without touching your infrastructure config.",
    color: "#38bdf8",
  },
  {
    icon: Cloud,
    title: "Serverless",
    description:
      "No servers to provision, patch, or babysit. Just deploy and move on.",
    color: "#f472b6",
  },
];

// ─── Insight Card Component ──────────────────────────────────────────────────────

interface InsightCardProps {
  item: InsightItem;
  index: number;
}

function InsightCard({ item, index }: InsightCardProps) {
  const Icon = item.icon;
  const highlightIndex = item.stat.indexOf(item.highlight);
  const prefix = item.stat.slice(0, highlightIndex);
  const suffix = item.stat.slice(highlightIndex + item.highlight.length);

  return (
    <motion.li
      key={item.stat}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: EASING }}
      className={`min-h-56 list-none ${item.area}`}
    >
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

        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6">
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl"
            style={{
              background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
              opacity: 0.5,
            }}
          />

          <div
            className="relative w-fit rounded-lg border border-gray-200 p-2"
            style={{ backgroundColor: item.iconBg }}
          >
            <Icon className="h-4 w-4" style={{ color: item.accentColor }} />
          </div>

          <div className="relative space-y-3">
            <div className="font-sans text-lg/[1.25rem] font-semibold tracking-tight text-balance text-slate-900 sm:text-xl/[1.375rem] md:text-2xl/[1.875rem]">
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

            <p className="font-sans text-sm/[1.125rem] text-slate-500 md:text-base/[1.375rem]">
              {item.context}
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

// ─── Spotlight Card Component (with 3D tilt) ────────────────────────────────────

interface SpotlightCardProps {
  item: SpotlightItem;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function SpotlightCard({ item, dimmed, onHoverStart, onHoverEnd }: SpotlightCardProps) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      animate={{
        scale: dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.5 : 1,
      }}
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6",
        "border-zinc-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "dark:border-white/6 dark:bg-white/3 dark:shadow-none",
        "transition-[border-color] duration-300",
        "hover:border-zinc-300 dark:hover:border-white/14"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}14, transparent 65%)`,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}2e, transparent 65%)`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/4.5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />

      <div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          background: `${item.color}18`,
          boxShadow: `inset 0 0 0 1px ${item.color}30`,
        }}
      >
        <Icon size={17} strokeWidth={1.9} style={{ color: item.color }} />
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-semibold text-[14px] text-zinc-900 tracking-tight dark:text-white">
          {item.title}
        </h3>
        <p className="text-[12.5px] text-zinc-500 leading-relaxed dark:text-white/40">
          {item.description}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${item.color}80, transparent)`,
        }}
      />
    </motion.div>
  );
}

// ─── Combined Main Component ─────────────────────────────────────────────────────

export interface CombinedFeaturesProps {
  spotlightItems?: SpotlightItem[];
  spotlightEyebrow?: string;
  spotlightHeading?: string;
  className?: string;
}

export default function CombinedFeatures({
  spotlightItems = DEFAULT_SPOTLIGHT_ITEMS,
  spotlightEyebrow = "Features",
  spotlightHeading = "Everything you need",
  className,
}: CombinedFeaturesProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <div className={cn("space-y-10", className)}>
      {/* Insights Banner Section */}
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
            {INSIGHTS.map((item, i) => (
              <InsightCard key={item.stat} item={item} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* Spotlight Cards Section */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl px-8 pt-9 pb-10",
          "bg-white dark:bg-[#06060f]"
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mb-8 flex flex-col gap-1.5">
          <p className="font-semibold text-[10px] text-indigo-600 uppercase tracking-[0.22em] dark:text-indigo-400/80">
            {spotlightEyebrow}
          </p>
          <h2 className="font-semibold text-[22px] text-zinc-900 tracking-tight dark:text-white">
            {spotlightHeading}
          </h2>
        </div>

        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
          {spotlightItems.map((item) => (
            <SpotlightCard
              key={item.title}
              dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
              item={item}
              onHoverEnd={() => setHoveredTitle(null)}
              onHoverStart={() => setHoveredTitle(item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

