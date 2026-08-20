"use client";

import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   PostHog — no-ops entirely unless NEXT_PUBLIC_POSTHOG_KEY is set.

   The import is DYNAMIC on purpose. A static `import posthog from
   "posthog-js"` puts the whole library (~79 KB gzipped, session
   recording included) into the shared client bundle of every route,
   whether or not analytics is switched on — this component mounts in
   the root layout, so it is on the critical path for the homepage.
   Behind `await import()` it becomes its own chunk that is only ever
   fetched when a key exists.

   `capture_pageview: "history_change"` matters for the App Router:
   every in-site link is a client-side navigation, so a plain
   init-time-only pageview would record the landing page and nothing
   else. `respect_dnt` honours the browser's Do Not Track signal.

   ── Why there is no cookie banner ──────────────────────────
   `cookieless_mode: "always"` means PostHog sets no cookies and
   touches neither localStorage nor sessionStorage. Visitor identity
   is a privacy-preserving hash computed on PostHog's servers, never
   an identifier stored on the reader's device.

   That is what removes the banner. The ePrivacy consent requirement
   is triggered by *storing or accessing information on the user's
   terminal equipment*; store nothing and the trigger never fires. It
   also happens to be a straighter answer for a site whose security
   page argues that trust is a design constraint — "we set no cookies"
   beats asking permission to set them.

   ⚠️ Cookieless mode must ALSO be switched on in the PostHog project
   settings. If it is not, every event sent from here is silently
   discarded server-side — the site looks fine and the dashboard stays
   empty. See the README.
═══════════════════════════════════════════════════════════ */
export function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    let cancelled = false;
    let detach: (() => void) | undefined;

    import("posthog-js").then(({ default: posthog }) => {
      if (cancelled) return;

      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: "history_change",
        autocapture: true,
        respect_dnt: true,

        /* No cookies, no localStorage, no sessionStorage. */
        cookieless_mode: "always",
        /* Belt and braces. Cookieless mode already refuses client
           storage; naming the in-memory store makes that explicit and
           means a future edit cannot quietly reintroduce localStorage
           by dropping one line. */
        persistence: "memory",

        /* Session replay records the DOM — screen contents, text, form
           fields. Not something to run on an enterprise buyer without
           asking, and squarely the kind of processing the missing
           banner would have had to cover. Off, deliberately. */
        disable_session_recording: true,
        /* Unused, and leaving it on costs an extra request per load. */
        disable_surveys: true,
        /* Strips advertising identifiers (gclid, fbclid, …) out of the
           captured URL before it is sent. */
        mask_personal_data_properties: true,
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
      detach = () => window.removeEventListener("scroll", onScroll);
    });

    return () => {
      cancelled = true;
      detach?.();
    };
  }, []);

  return null;
}
