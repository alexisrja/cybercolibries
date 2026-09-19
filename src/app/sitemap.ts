import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getChallenges } from "@/services/challenges.service";
import { getAllPostMeta } from "@/services/content.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, challenges] = await Promise.all([getAllPostMeta(), getChallenges()]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/programas/researcher-program"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/challenges"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/aprende"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...["/privacidad", "/terminos", "/cookies"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];

  return [
    ...staticRoutes,
    ...posts.map((p) => ({
      url: absoluteUrl(`/aprende/${p.slug}`),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...challenges.map((c) => ({
      url: absoluteUrl(`/challenges/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
