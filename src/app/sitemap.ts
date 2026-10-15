import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

type Entry = {
  path: string;
  priority: number;
  freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** Fecha real del último cambio de contenido (ISO). Actualizar al editar la página. */
  lastModified: string;
};

/**
 * `lastModified` es una fecha fija por página, no la del build: si cada
 * despliegue dice que todo cambió, los buscadores dejan de confiar en el dato.
 */
const pages: Entry[] = [
  { path: "/", priority: 1, freq: "weekly", lastModified: "2026-10-13" },
  { path: "/comunidad", priority: 0.9, freq: "monthly", lastModified: "2026-10-13" },
  { path: "/iniciativas", priority: 0.9, freq: "monthly", lastModified: "2026-10-13" },
  { path: "/iniciativas/researcher-program", priority: 0.8, freq: "monthly", lastModified: "2026-10-13" },
  { path: "/participa", priority: 0.9, freq: "monthly", lastModified: "2026-10-13" },
  { path: "/privacidad", priority: 0.2, freq: "yearly", lastModified: "2026-09-19" },
  { path: "/terminos", priority: 0.2, freq: "yearly", lastModified: "2026-09-19" },
  { path: "/cookies", priority: 0.2, freq: "yearly", lastModified: "2026-09-19" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, freq, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: freq,
    priority,
  }));
}
