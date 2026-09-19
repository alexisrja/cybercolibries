/**
 * Rate limit en memoria por ventana fija.
 * Suficiente para un formulario de contacto en una sola instancia; en un
 * despliegue serverless con varias instancias conviene moverlo a Redis
 * (Upstash) o a una tabla en Supabase.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  bucket.count += 1;
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
  }
  return { allowed: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) };
}
