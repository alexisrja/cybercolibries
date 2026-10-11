/**
 * Tipos de dominio del sitio.
 * El contenido proviene del documento "Contenido web oficial · CyberColibríes".
 * Los tipos de la futura plataforma viven en `./platform.ts`.
 */

export type IconName =
  | "book-open"
  | "users"
  | "sparkles"
  | "mic"
  | "newspaper"
  | "target"
  | "network"
  | "shield"
  | "search"
  | "graduation-cap"
  | "building"
  | "handshake"
  | "megaphone"
  | "heart"
  | "compass"
  | "message"
  | "wrench"
  | "globe"
  | "lightbulb"
  | "share";

export interface NavItem {
  label: string;
  href: string;
  /** Texto auxiliar, p. ej. "Próximamente" en el pie de página. */
  note?: string;
}

export interface Cta {
  label: string;
  href: string;
}

/** Bloque breve de cuatro columnas usado en varias páginas. */
export interface ValueCard {
  title: string;
  description: string;
  icon: IconName;
}

/* ------------------------------------------------------------------ Iniciativas */

export type InitiativeStatus = "activa" | "proximamente";

export interface Initiative {
  slug: string;
  name: string;
  summary: string;
  image?: string;
  description?: string;
  status: InitiativeStatus;
  icon: IconName;
  /** Solo las iniciativas con página propia tienen enlace. */
  cta?: Cta;
  pillars?: ValueCard[];
}

/* ------------------------------------------------------------------ Testimonios */

/**
 * El documento es explícito: solo testimonios reales y autorizados.
 * Pueden ser una cita escrita o un video proporcionado por la persona.
 */
export interface Testimonial {
  id: string;
  quote?: string;
  name: string;
  context: string;
  photo?: string;
  video?: string;
  poster?: string;
  sourceUrl?: string;
}

/* ------------------------------------------------------------------ Fotografías */

export interface Photo {
  id: string;
  /** Pie de foto: actividad, generación o contexto. */
  caption: string;
  src?: string;
  alt?: string;
}

/* ------------------------------------------------------------------ Colaboraciones */

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  url?: string;
}

/* ------------------------------------------------------------------ Participa */

export type ParticipationProfile = "aprender" | "compartir" | "mentor" | "organizacion" | "otro";

export interface ParticipationPath {
  id: ParticipationProfile;
  title: string;
  description: string;
  cta: string;
  icon: IconName;
  image: string;
  squareImage: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  x?: string;
  website?: string;
}
