import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, toFieldErrors } from "@/features/contact/schema";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";
import { submitContact } from "@/services/contact.service";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ message: "Formato no soportado." }, { status: 415 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anon";
  const { allowed } = rateLimit(`contact:${ip}`);
  if (!allowed) {
    return NextResponse.json({ message: "Demasiadas solicitudes." }, { status: 429, headers: { "Retry-After": "600" } });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "El cuerpo de la solicitud no es JSON válido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Revisa los campos marcados.", errors: toFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot con contenido: se responde OK sin procesar para no dar pistas al bot.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const result = await submitContact(parsed.data);
  if (!result.ok) {
    return NextResponse.json(
      { message: `No pudimos entregar tu mensaje. Escríbenos directamente a ${siteConfig.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
