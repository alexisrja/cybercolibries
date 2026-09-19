import "server-only";
import { z } from "zod";
import { metrics as staticMetrics } from "@/data/community";
import type { MetricsSnapshot } from "@/types";

const STATIC_UPDATED_AT = "2026-09-01T00:00:00.000Z";

const remoteSchema = z.object({
  metrics: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.number().nonnegative(),
      suffix: z.string().optional(),
      description: z.string(),
    }),
  ),
  updatedAt: z.string(),
});

/**
 * Devuelve las métricas de impacto.
 * Si existe `METRICS_API_URL` se consultan (con caché de 1 h y tag `metrics`
 * para revalidar bajo demanda); si falla o no está configurada, se usan los
 * valores estáticos para que la sección nunca quede vacía.
 */
export async function getMetricsSnapshot(): Promise<MetricsSnapshot> {
  const endpoint = process.env.METRICS_API_URL;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, { next: { revalidate: 3600, tags: ["metrics"] } });
      if (res.ok) {
        const parsed = remoteSchema.safeParse(await res.json());
        if (parsed.success) return { ...parsed.data, source: "api" };
      }
    } catch {
      // Se usa el fallback estático.
    }
  }

  return { metrics: staticMetrics, updatedAt: STATIC_UPDATED_AT, source: "static" };
}
