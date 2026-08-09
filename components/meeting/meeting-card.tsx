"use client";

import { ArrowRight, Clock, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FOUNDERS, type Meeting } from "@/lib/meetings";
import { FounderStack } from "./founder-avatar";

const ICON = { strokeWidth: 1.75, "aria-hidden": true, className: "icon-ui" } as const;

export function MeetingCard({
  meeting,
  index,
  onSelect,
}: {
  meeting: Meeting;
  index: number;
  onSelect: (meeting: Meeting) => void;
}) {
  const reduce = useReducedMotion();
  const hosts = meeting.hosts.map((h) => FOUNDERS[h]);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(meeting)}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="meeting-card group flex w-full flex-col rounded-[20px] p-6 text-left"
    >
      <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="flex items-center gap-1.5 text-[12.5px] text-text-2">
          <Clock {...ICON} />
          {meeting.minutes} min
        </span>
        <span className="flex items-center gap-1.5 text-[12.5px] text-text-2">
          <Users {...ICON} />
          {meeting.scheduling}
        </span>
      </span>

      <span className="mt-5 block font-display text-[20px] font-semibold leading-tight tracking-[-0.02em] text-text">
        {meeting.title}
      </span>

      <span className="mt-2.5 block text-[14px] leading-relaxed text-text-2">
        {meeting.description}
      </span>

      <span className="mt-2 block text-[12px] text-text-2">{meeting.confirmation}</span>

      <span
        className="mt-auto flex items-center justify-between gap-4 pt-6"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <span className="flex items-center gap-2.5">
          <FounderStack founders={hosts} size={26} />
          <span className="text-[12.5px] text-text-2">
            {hosts.map((h) => h.name.split(" ")[0]).join(" & ")}
          </span>
        </span>

        <span className="flex items-center gap-1.5 text-[13.5px] font-medium text-text">
          {meeting.action}
          <ArrowRight
            strokeWidth={1.75}
            aria-hidden
            className="icon-inline transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </span>
      </span>
    </motion.button>
  );
}
