"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL, type Meeting } from "@/lib/meetings";

/* ═══════════════════════════════════════════════════════════
   Calendly inline embed.

   Themed to the light dialog so the iframe doesn't read as pasted in,
   and capped at 900px so the calendar stays centred and legible inside
   a wide modal. Booking completion comes from Calendly's own
   postMessage event — no polling.
═══════════════════════════════════════════════════════════ */

const SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_ORIGIN = "https://calendly.com";
let loader: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("calendly"));
    document.head.appendChild(s);
  });
  return loader;
}

/** Match the widget to the light glass surface. */
function themed(raw: string) {
  const u = new URL(raw);
  u.searchParams.set("background_color", "ffffff");
  u.searchParams.set("text_color", "14130f");
  u.searchParams.set("primary_color", "2e2a24");
  /* `hide_gdpr_banner=1` is deliberately NOT set. Suppressing a third
     party's own cookie notice does not remove the cookies it sets — it
     only removes the disclosure, which is the part that matters under
     GDPR. Calendly is a processor here and this widget runs for EU
     visitors, so its banner stays visible. */
  /* Our header already states the title, duration and hosts. */
  u.searchParams.set("hide_landing_page_details", "1");
  u.searchParams.set("hide_event_type_details", "1");
  return u.toString();
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-8 text-center">
      <p className="max-w-[46ch] text-[15px] leading-relaxed text-text-2">{children}</p>
    </div>
  );
}

export function CalendlyEmbed({
  meeting,
  onBooked,
}: {
  meeting: Meeting;
  onBooked: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const url = meeting.url;

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    loadCalendly()
      .then(() => {
        if (cancelled || !host.current) return;
        host.current.innerHTML = "";
        window.Calendly?.initInlineWidget({ url: themed(url), parentElement: host.current });
        setState("ready");
      })
      .catch(() => !cancelled && setState("failed"));
    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      /* Exact origin, not a substring. `includes("calendly.com")` also
         matches https://calendly.com.attacker.example, which would let
         any page we embed drive our booking state. */
      if (e.origin !== CALENDLY_ORIGIN) return;
      if ((e.data as { event?: string } | undefined)?.event === "calendly.event_scheduled") {
        onBooked();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onBooked]);

  if (!url) {
    return (
      <Notice>
        This calendar isn&rsquo;t connected yet. Email us and we&rsquo;ll send times for a{" "}
        {meeting.minutes}-minute session within one business day.
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(meeting.title)}`}
          className="btn btn-primary mt-6"
        >
          Email {CONTACT_EMAIL}
        </a>
      </Notice>
    );
  }

  if (state === "failed") {
    return (
      <Notice>
        The scheduler couldn&rsquo;t load — an ad blocker or network policy may be
        blocking it.
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
          Open the calendar
        </a>
      </Notice>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[900px]">
      {state === "loading" && (
        <div className="flex min-h-[520px] items-center justify-center">
          <span className="anim-breathe t-label text-text-2">Loading availability</span>
        </div>
      )}
      <div
        ref={host}
        className={state === "loading" ? "hidden" : "overflow-hidden rounded-[20px]"}
        style={{ minWidth: 280, height: 660 }}
      />
    </div>
  );
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}
