"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { MeetingDialog, type DialogView } from "./meeting-dialog";

/* One dialog for the whole site.

   Mounted once in the root layout, so every trigger anywhere opens the
   same instance — that is how duplicate dialogs and duplicate embeds
   get avoided. `open()` takes the view to land on, so the homepage
   founder CTA can go straight to the note while CTAs go to meetings. */

const MeetingContext = createContext<{ open: (view?: DialogView) => void } | null>(null);

export function useMeeting() {
  const ctx = useContext(MeetingContext);
  if (!ctx) {
    throw new Error("useMeeting must be used inside <MeetingProvider>");
  }
  return ctx;
}

export function MeetingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<DialogView>("meetings");
  /* Incremented per open so the dialog remounts with fresh state — a
     reopen never lands back on a stale calendar or confirmation. */
  const [session, setSession] = useState(0);

  const value = useMemo(
    () => ({
      open: (next: DialogView = "meetings") => {
        setView(next);
        setSession((n) => n + 1);
        setOpen(true);
      },
    }),
    [],
  );

  const onOpenChange = useCallback((next: boolean) => setOpen(next), []);

  return (
    <MeetingContext.Provider value={value}>
      {children}
      <MeetingDialog
        key={session}
        open={open}
        initialView={view}
        onOpenChange={onOpenChange}
      />
    </MeetingContext.Provider>
  );
}
