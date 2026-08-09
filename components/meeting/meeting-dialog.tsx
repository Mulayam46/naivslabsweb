"use client";

import { useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  FOUNDERS,
  FOUNDER_LIST,
  FOUNDER_NOTE,
  FOUNDER_TAGLINE,
  MEETINGS,
  type Meeting,
} from "@/lib/meetings";
import { CalendlyEmbed } from "./calendly-embed";
import { FounderAvatar, FounderStack } from "./founder-avatar";
import { MeetingCard } from "./meeting-card";

/* ═══════════════════════════════════════════════════════════
   The "Let's Talk" dialog.

   Four states, no navigation:
     meetings  — founder header, then the three meeting types
     note      — the founder note, reachable from the homepage too
     calendar  — NavisLabs header above the Calendly embed
     booked    — Calendly's event_scheduled message lands here

   Light glass over a blurred page, so the site stays visible behind
   it. Radix owns focus trap, ESC, scroll lock and ARIA.
═══════════════════════════════════════════════════════════ */

/** Where the dialog opens. Calendar and booked are only reached from inside. */
export type DialogView = "meetings" | "note";

type View =
  | { step: "meetings" }
  | { step: "note" }
  | { step: "calendar"; meeting: Meeting }
  | { step: "booked"; meeting: Meeting };

const EASE = [0.22, 1, 0.36, 1] as const;

export function MeetingDialog({
  open,
  initialView = "meetings",
  onOpenChange,
}: {
  open: boolean;
  initialView?: DialogView;
  onOpenChange: (open: boolean) => void;
}) {
  const reduce = useReducedMotion();
  /* Initial state, not synced state. The provider remounts this on every
     open (see its `key`), so each session starts on the requested view
     without a setState-in-effect cascade. */
  const [view, setView] = useState<View>({ step: initialView });

  const handleBooked = useCallback(() => {
    setView((v) => (v.step === "calendar" ? { step: "booked", meeting: v.meeting } : v));
  }, []);

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -6 },
    transition: { duration: 0.26, ease: EASE },
  };

  const showBack = view.step !== "meetings";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[90] backdrop-blur-xl"
                style={{ background: "rgba(255,255,255,0.28)" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: EASE }}
                aria-describedby={undefined}
                className="fixed inset-0 z-[100] flex flex-col overflow-hidden backdrop-blur-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[88vh] sm:w-[95vw] sm:max-w-[1120px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[32px]"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow:
                    "0 48px 120px -24px rgba(17,17,17,0.28), 0 8px 32px -8px rgba(17,17,17,0.10)",
                }}
              >
                {/* ── Chrome ── */}
                <div className="flex flex-shrink-0 items-center justify-between px-7 py-6 sm:px-14">
                  {showBack ? (
                    <button
                      type="button"
                      onClick={() => setView({ step: "meetings" })}
                      className="flex items-center gap-2 text-[13.5px] text-text-2 transition-colors hover:text-text"
                    >
                      <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
                      Back
                    </button>
                  ) : (
                    <span className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-text-2">
                      NavisLabs
                    </span>
                  )}

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close"
                      className="flex h-10 w-10 items-center justify-center rounded-full text-text-2 transition-all duration-200 hover:scale-105 hover:text-text motion-reduce:hover:scale-100"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <X size={16} strokeWidth={1.75} aria-hidden />
                    </button>
                  </Dialog.Close>
                </div>

                {/* ── Body ── */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {/* ══ Meetings ══ */}
                    {view.step === "meetings" && (
                      <motion.div key="meetings" {...fade} className="px-7 pb-20 sm:px-14">
                        <FounderHeader />

                        <Dialog.Title className="mt-12 font-display text-[clamp(1.75rem,2.8vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text">
                          Meet the founders
                        </Dialog.Title>

                        <div className="mt-9 grid gap-5 lg:grid-cols-3">
                          {MEETINGS.map((m, i) => (
                            <MeetingCard
                              key={m.id}
                              meeting={m}
                              index={i}
                              onSelect={(meeting) => setView({ step: "calendar", meeting })}
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setView({ step: "note" })}
                          className="mt-10 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors hover:text-accent"
                        >
                          Read our founder note
                          <ArrowRight size={14} strokeWidth={1.75} aria-hidden />
                        </button>
                      </motion.div>
                    )}

                    {/* ══ Founder note ══ */}
                    {view.step === "note" && (
                      <motion.div key="note" {...fade} className="px-7 pb-20 sm:px-14">
                        <div className="mx-auto max-w-[640px]">
                          <FounderStack founders={FOUNDER_LIST} size={52} />

                          <Dialog.Title className="mt-8 font-display text-[clamp(1.75rem,2.8vw,2.25rem)] font-semibold tracking-[-0.03em] text-text">
                            Founder Note
                          </Dialog.Title>

                          <div className="mt-8 flex flex-col gap-5">
                            {FOUNDER_NOTE.map((para) => (
                              <p key={para} className="text-[16px] leading-[1.7] text-text-2">
                                {para}
                              </p>
                            ))}
                          </div>

                          <p className="mt-8 text-[16px] font-medium text-text">
                            — Abhishek &amp; Mulayam
                          </p>

                          <button
                            type="button"
                            onClick={() => setView({ step: "meetings" })}
                            className="btn btn-primary mt-10"
                          >
                            Book a meeting
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ══ Calendar ══ */}
                    {view.step === "calendar" && (
                      <motion.div key="calendar" {...fade} className="px-4 pb-10 sm:px-8">
                        <MeetingHeader meeting={view.meeting} />
                        <CalendlyEmbed meeting={view.meeting} onBooked={handleBooked} />
                      </motion.div>
                    )}

                    {/* ══ Booked ══ */}
                    {view.step === "booked" && (
                      <motion.div
                        key="booked"
                        {...fade}
                        className="flex min-h-[460px] flex-col items-center justify-center px-7 pb-20 text-center sm:px-14"
                      >
                        <span
                          className="flex h-14 w-14 items-center justify-center rounded-full"
                          style={{ background: "var(--accent-wash)" }}
                        >
                          <Check size={22} strokeWidth={1.75} className="text-accent" aria-hidden />
                        </span>

                        <h2 className="mt-8 font-display text-[clamp(1.75rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-text">
                          You&rsquo;re booked.
                        </h2>
                        <p className="mt-4 text-[16px] text-text-2">
                          Looking forward to meeting you.
                        </p>

                        <div className="mt-10">
                          <FounderStack
                            founders={view.meeting.hosts.map((h) => FOUNDERS[h])}
                            size={48}
                          />
                        </div>
                        <p className="mt-4 text-[14.5px] text-text">
                          {view.meeting.hosts.map((h) => FOUNDERS[h].name).join(" · ")}
                        </p>

                        <p className="mt-8 text-[13.5px] text-text-2">
                          You&rsquo;ll receive a confirmation email shortly.
                        </p>

                        <Dialog.Close asChild>
                          <button type="button" className="btn btn-primary mt-10">
                            Close
                          </button>
                        </Dialog.Close>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/* ── Founder header — photos, names, then one warm line ── */

function FounderHeader() {
  return (
    <div>
      <FounderStack founders={FOUNDER_LIST} size={56} />

      <div className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
        {FOUNDER_LIST.map((f) => (
          <div key={f.id}>
            <p className="text-[15px] font-medium text-text">{f.name}</p>
            <p className="mt-0.5 text-[13px] text-text-2">{f.role}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[14px] text-text-2">{FOUNDER_TAGLINE}</p>
    </div>
  );
}

/* ── Our header, which is why Calendly's details are hidden ── */

function MeetingHeader({ meeting }: { meeting: Meeting }) {
  const hosts = meeting.hosts.map((h) => FOUNDERS[h]);
  return (
    <div className="mx-auto mb-10 max-w-[900px] px-3 pt-4 text-center sm:px-0">
      <div className="flex justify-center">
        <FounderStack founders={hosts} size={48} />
      </div>

      <Dialog.Title className="mt-6 font-display text-[28px] font-semibold tracking-[-0.025em] text-text">
        {meeting.title}
      </Dialog.Title>
      <p className="mx-auto mt-3 max-w-[54ch] text-[15px] leading-relaxed text-text-2">
        {meeting.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span className="text-[13px] text-text-2">{meeting.minutes} min</span>
        <span className="text-[13px] text-text-2">{meeting.scheduling}</span>
        <span className="text-[13px] text-text-2">{meeting.confirmation}</span>
      </div>
    </div>
  );
}

/* Re-exported so the homepage founder section can render the same
   avatars without importing from two places. */
export { FounderAvatar };
