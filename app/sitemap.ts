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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
