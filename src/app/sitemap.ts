import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/comunidad", priority: 0.9, freq: "monthly" },
    { path: "/iniciativas", priority: 0.9, freq: "monthly" },
    { path: "/iniciativas/researcher-program", priority: 0.8, freq: "monthly" },
    { path: "/impacto", priority: 0.8, freq: "monthly" },
    { path: "/participa", priority: 0.9, freq: "monthly" },
    { path: "/privacidad", priority: 0.2, freq: "yearly" },
    { path: "/terminos", priority: 0.2, freq: "yearly" },
    { path: "/cookies", priority: 0.2, freq: "yearly" },
  ];

  return pages.map(({ path, priority, freq }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
