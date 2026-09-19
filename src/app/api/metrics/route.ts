import { NextResponse } from "next/server";
import { getMetricsSnapshot } from "@/services/metrics.service";

/**
 * Endpoint público de métricas de impacto.
 * Útil para widgets externos, reportes a aliados o un futuro dashboard.
 */
export const revalidate = 3600;

export async function GET() {
  const snapshot = await getMetricsSnapshot();
  return NextResponse.json(snapshot, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
