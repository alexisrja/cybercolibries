"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";
import { participationLabels } from "@/data/content";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { PROFILE_VALUES, contactSchema, toFieldErrors, type ContactErrors, type ContactField } from "./schema";

type Status = "idle" | "loading" | "success" | "error";

type Values = {
  name: string;
  email: string;
  profile: string;
  organization: string;
  message: string;
  consent: boolean;
  website: string;
};

const empty: Values = { name: "", email: "", profile: "", organization: "", message: "", consent: false, website: "" };

const FIELD_ORDER: ContactField[] = ["name", "email", "profile", "organization", "message", "consent"];

const isProfile = (v: string | null): v is (typeof PROFILE_VALUES)[number] =>
  Boolean(v && (PROFILE_VALUES as readonly string[]).includes(v));

function ContactFormInner({ preset }: { preset?: string }) {
  const [values, setValues] = useState<Values>({ ...empty, profile: preset ?? "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [prevPreset, setPrevPreset] = useState(preset);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Si el visitante llega desde "Participa" con otro perfil, se actualiza la selección.
  if (preset !== prevPreset) {
    setPrevPreset(preset);
    if (preset) setValues((v) => ({ ...v, profile: preset }));
  }

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as ContactField]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateField = (key: ContactField) => {
    const result = contactSchema.safeParse(values);
    const fieldErrors = result.success ? {} : toFieldErrors(result.error);
    setErrors((e) => ({ ...e, [key]: fieldErrors[key] }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = toFieldErrors(result.error);
      setErrors(fieldErrors);
      const first = FIELD_ORDER.find((f) => fieldErrors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("loading");
    track("contact_submit", { profile: values.profile });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = (await res.json().catch(() => ({}))) as { errors?: ContactErrors; message?: string };

      if (res.ok) {
        setStatus("success");
        track("contact_success", { profile: values.profile });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (res.status === 400 && data.errors) setErrors(data.errors);
      setServerError(
        res.status === 429
          ? "Recibimos varios mensajes seguidos desde tu conexión. Espera unos minutos y vuelve a intentarlo."
          : (data.message ?? "No pudimos enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo."),
      );
      setStatus("error");
      track("contact_error", { status: res.status });
    } catch {
      setServerError("No pudimos coinfo con el servidor. Revisa tu conexión e inténtalo de nuevo.");
      setStatus("error");
      track("contact_error", { status: 0 });
    }
  };

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center outline-none"
      >
        <span className="grid size-16 place-items-center rounded-full border border-accent/40 text-accent shadow-[0_0_30px_-6px_var(--accent)]">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium tracking-tight">Mensaje enviado</h3>
        <p className="mt-3 max-w-sm text-muted">
          Gracias, {values.name.split(" ")[0]}. Te responderemos a <span className="text-fg">{values.email}</span> en un
          máximo de 3 días hábiles.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setValues({ ...empty, profile: preset ?? "" });
            setStatus("idle");
          }}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  const describedBy = (key: ContactField) => (errors[key] ? `${key}-error` : undefined);
  const loading = status === "loading";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-required-note">
      <p id="form-required-note" className="text-sm text-subtle">
        Todos los campos son obligatorios salvo los marcados como opcionales.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => values.name && validateField("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder="Tu nombre"
          />
          <FieldError id="name-error">{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => values.email && validateField("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder="nombre@dominio.com"
          />
          <FieldError id="email-error">{errors.email}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="profile">¿Cómo quieres participar?</Label>
          <Select
            id="profile"
            name="profile"
            value={values.profile}
            onChange={(e) => set("profile", e.target.value)}
            aria-invalid={Boolean(errors.profile)}
            aria-describedby={describedBy("profile")}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {PROFILE_VALUES.map((p) => (
              <option key={p} value={p}>
                {participationLabels[p]}
              </option>
            ))}
          </Select>
          <FieldError id="profile-error">{errors.profile}</FieldError>
        </div>
        <div>
          <Label htmlFor="organization">
            Organización <span className="font-normal text-subtle">(opcional)</span>
          </Label>
          <Input
            id="organization"
            name="organization"
            autoComplete="organization"
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={describedBy("organization")}
            placeholder="Universidad, empresa o comunidad"
          />
          <FieldError id="organization-error">{errors.organization}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => values.message && validateField("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={cn("message-count", describedBy("message"))}
          placeholder="Cuéntanos quién eres y qué te gustaría hacer con la comunidad."
          maxLength={2000}
        />
        <div className="flex items-start justify-between gap-4">
          <FieldError id="message-error">{errors.message}</FieldError>
          <p id="message-count" className="mt-2 ml-auto font-mono text-xs text-subtle">
            {values.message.length}/2000
          </p>
        </div>
      </div>

      {/* Honeypot anti-spam: invisible para personas y lectores de pantalla */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No completar</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
          />
          <span>
            Acepto que CyberColibríes use estos datos solo para responder mi mensaje, según el{" "}
            <Link href="/privacidad" className="text-accent underline underline-offset-2">
              aviso de privacidad
            </Link>
            .
          </span>
        </label>
        <FieldError id="consent-error">{errors.consent}</FieldError>
      </div>

      <div aria-live="polite" role="status">
        {status === "error" && serverError && (
          <p className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-fg">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
            {serverError}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={loading} aria-disabled={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden /> Enviando…
          </>
        ) : (
          <>
            Enviar mensaje <Send />
          </>
        )}
      </Button>
    </form>
  );
}

function ContactFormWithParams() {
  const params = useSearchParams();
  const perfil = params.get("perfil");
  return <ContactFormInner preset={isProfile(perfil) ? perfil : undefined} />;
}

/** Lee `?perfil=` para preseleccionar el motivo cuando se llega desde "Participa". */
export function ContactForm() {
  return (
    <Suspense fallback={<ContactFormInner />}>
      <ContactFormWithParams />
    </Suspense>
  );
}
