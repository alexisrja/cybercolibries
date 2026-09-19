/**
 * Tipos de dominio del sitio institucional.
 * Los tipos de la futura plataforma (researchers, progreso, badges…)
 * viven en `./platform.ts` para no mezclar responsabilidades.
 */

export type IconName =
  | "book-open"
  | "users"
  | "sparkles"
  | "radar"
  | "mic"
  | "flask"
  | "target"
  | "network"
  | "shield"
  | "search"
  | "file-text"
  | "graduation-cap"
  | "building"
  | "handshake"
  | "megaphone"
  | "heart"
  | "compass"
  | "calendar"
  | "flag"
  | "message"
  | "wrench"
  | "video"
  | "cpu"
  | "bug"
  | "fingerprint"
  | "globe"
  | "layers"
  | "lightbulb"
  | "route";

export interface NavItem {
  label: string;
  href: string;
  /** id de la sección en la home, usado por el scroll spy */
  sectionId?: string;
}

export interface Pillar {
  title: string;
  description: string;
  icon: IconName;
}

export interface Principle {
  title: string;
  description: string;
  icon: IconName;
}

export type InitiativeStatus = "activo" | "convocatoria" | "proximamente";

export interface Initiative {
  id: string;
  title: string;
  description: string;
  category: string;
  status: InitiativeStatus;
  icon: IconName;
  cta: { label: string; href: string };
  featured?: boolean;
}

/* ------------------------------------------------------------------ Programa */

export interface ProgramFact {
  label: string;
  value: string;
  detail?: string;
}

export interface ProgramModule {
  number: number;
  slug: string;
  title: string;
  summary: string;
  topics: string[];
  outcome: string;
  weeks: number;
  icon: IconName;
}

export interface Program {
  slug: string;
  name: string;
  headline: string;
  description: string;
  facts: ProgramFact[];
  modules: ProgramModule[];
  audience: string[];
  includes: string[];
}

export interface MethodStep {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

/* ------------------------------------------------------------------ Challenges */

export type Difficulty = "inicial" | "junior" | "intermedio" | "avanzado";
export type ChallengeStatus = "disponible" | "proximamente" | "en-diseno";

export interface Challenge {
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  status: ChallengeStatus;
  skills: string[];
  summary: string;
  scenario: string;
  objectives: string[];
  deliverables: string[];
  estimatedTime: string;
  /** Módulo del programa con el que se relaciona */
  moduleNumber?: number;
  /* Campos preparados para la plataforma (aún no se usan en la UI) */
  points?: number;
  labUrl?: string;
  badgeId?: string;
}

/* ------------------------------------------------------------------ Comunidad */

export interface CommunityActivity {
  title: string;
  description: string;
  icon: IconName;
  cadence: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  type: "Colibrí Talk" | "Workshop" | "CTF" | "Mentoría" | "Meetup";
  date: string; // ISO
  modality: "Online" | "Presencial" | "Híbrido";
  description: string;
  registrationUrl?: string;
}

export interface GalleryItem {
  id: string;
  caption: string;
  kind: string;
  /** Ruta a la fotografía real. Si falta, se muestra una composición generativa. */
  image?: string;
  alt?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  x?: string;
  website?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  topics: string[];
  photo?: string;
  social: SocialLinks;
}

/* ------------------------------------------------------------------ Impacto */

export interface Metric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description: string;
}

export interface MetricsSnapshot {
  metrics: Metric[];
  updatedAt: string;
  source: "static" | "api" | "database";
}

export interface Story {
  id: string;
  name: string;
  generation: string;
  role: string;
  quote: string;
  highlight: string;
}

/* ------------------------------------------------------------------ Alianzas / Participa */

export interface PartnerProfile {
  id: string;
  title: string;
  description: string;
  offers: string[];
  icon: IconName;
}

export type ParticipationProfile =
  | "researcher"
  | "mentor"
  | "colaborador"
  | "universidad"
  | "empresa"
  | "speaker"
  | "otro";

export interface ParticipationPath {
  id: ParticipationProfile;
  title: string;
  description: string;
  cta: string;
  icon: IconName;
}

/* ------------------------------------------------------------------ Labs / contenido */

export const LAB_CATEGORIES = [
  "Artículos",
  "Research Notes",
  "Guías",
  "Videos",
  "Herramientas",
  "Challenges",
  "Ciberseguridad",
  "Tecnología",
] as const;

export type LabCategory = (typeof LAB_CATEGORIES)[number];

export interface Author {
  name: string;
  role?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: LabCategory;
  tags: string[];
  date: string;
  updated?: string;
  author: Author;
  readingMinutes: number;
  cover?: string;
  draft?: boolean;
}

export interface Post extends PostMeta {
  body: string;
}
