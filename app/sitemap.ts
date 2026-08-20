import type { MetadataRoute } from "next";

const BASE = "https://navislabs.in";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/platform", priority: 0.9 },
  { path: "/solutions", priority: 0.8 },
  { path: "/security", priority: 0.8 },
  { path: "/company", priority: 0.7 },
  { path: "/resources", priority: 0.6 },
  { path: "/how-it-works", priority: 0.6 },
  { path: "/vision", priority: 0.6 },
];

/* Bump this when page CONTENT actually changes.

   It used to be `new Date()`, which stamped every URL with the build
   time — so a deploy that only touched CSS told crawlers all eight
   pages had changed. Repeated often enough, that is how a crawler
   learns to stop trusting the field. A hand-maintained date is less
   convenient and considerably more honest. */
const LAST_CONTENT_CHANGE = "2026-08-18";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_CONTENT_CHANGE);
  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
