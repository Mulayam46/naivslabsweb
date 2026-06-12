import type { MetadataRoute } from "next";

const BASE = "https://navislabs.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/how-it-works", "/vision", "/security", "/request-access"].map(
    (p) => ({ url: `${BASE}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }),
  );
}
