import type { ContactInput } from "@/features/contact/schema";

export type ContactResult = { ok: true } | { ok: false; reason: "delivery_failed" };

/**
 * Entrega de los mensajes del formulario de Participa.
 *
 * - Con `CONTACT_WEBHOOK_URL` definida, se envía un POST JSON (compatible con
 *   n8n, Make, Zapier, Slack workflows o una Edge Function de Supabase).
 * - Sin configuración, en desarrollo se registra en consola.
 *
 * Para guardar en base de datos, reemplazar por un insert en Supabase
 * (tabla `contact_requests`) manteniendo la firma.
 */
export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const payload = {
    name: input.name,
    email: input.email,
    profile: input.profile,
    organization: input.organization || null,
    message: input.message,
    receivedAt: new Date().toISOString(),
    source: "website",
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Mensaje recibido (sin CONTACT_WEBHOOK_URL):", payload);
      return { ok: true };
    }
    console.error("[contact] CONTACT_WEBHOOK_URL no está configurada en producción.");
    return { ok: false, reason: "delivery_failed" };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.CONTACT_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
  } catch {
    return { ok: false, reason: "delivery_failed" };
  }
}
