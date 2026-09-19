import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

/** Día y mes abreviado por separado, p. ej. { day: "08", month: "oct" }. */
export function dateParts(iso: string) {
  const parts = shortDateFormatter.formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: get("day"), month: get("month").replace(".", "") };
}

const numberFormatter = new Intl.NumberFormat("es-MX");

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
