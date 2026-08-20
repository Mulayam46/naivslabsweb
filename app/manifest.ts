import type { MetadataRoute } from "next";

/* A minimal, honest manifest. This is a marketing site, not an installable
   app, so `display: "browser"` is deliberate — claiming "standalone" would
   invite an install prompt for a site that gains nothing from being one.
   Icons reuse the generated app icons so there is a single source. */

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NavisLabs — Enterprise Intelligence Infrastructure",
    short_name: "NavisLabs",
    description:
      "NavisLabs connects the systems your organization already runs and continuously builds a live operational model your teams and AI agents use to make better decisions.",
    start_url: "/",
    display: "browser",
    /* Warm neutrals — matches --canvas so the installed shell and the
       mobile browser chrome (viewport.themeColor) do not disagree. */
    background_color: "#F7F6F3",
    theme_color: "#F7F6F3",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
