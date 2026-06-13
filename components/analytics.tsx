"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/* No-ops unless NEXT_PUBLIC_POSTHOG_KEY is set. Autocapture covers CTA
   clicks; pageviews + scroll-depth milestones tracked explicitly. */
export function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: true,
      autocapture: true,
      persistence: "localStorage",
    });

    const marks = new Set<number>();
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const depth = Math.round((window.scrollY / total) * 100);
      for (const m of [25, 50, 75, 100]) {
        if (depth >= m && !marks.has(m)) {
          marks.add(m);
          posthog.capture("scroll_depth", { depth: m });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
