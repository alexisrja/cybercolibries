import { z } from "zod";

export const PROFILE_VALUES = [
  "researcher",
  "mentor",
  "colaborador",
  "universidad",
  "empresa",
  "speaker",
  "otro",
] as const;

/** Esquema compartido entre el formulario (cliente) y la API (servidor). */
export const contactSchema = z.object({
  name: z.string({ error: "Escribe tu nombre." }).trim().min(2, "Escribe tu nombre (mínimo 2 caracteres).").max(80, "El nombre es demasiado largo."),
  email: z.email("Escribe un correo válido, por ejemplo nombre@dominio.com.").max(120),
  profile: z.enum(PROFILE_VALUES, { error: "Elige cómo quieres participar." }),
  organization: z.string().trim().max(120, "Máximo 120 caracteres.").optional().or(z.literal("")),
  message: z
    .string({ error: "Escribe tu mensaje." })
    .trim()
    .min(20, "Cuéntanos un poco más (mínimo 20 caracteres).")
    .max(2000, "Máximo 2000 caracteres."),
  consent: z.literal(true, { error: "Necesitamos tu autorización para responderte." }),
  /** Honeypot: los humanos no ven este campo. */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function toFieldErrors(error: z.ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
