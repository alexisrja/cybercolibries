/**
 * Modelo de dominio de una futura plataforma de CyberColibríes.
 *
 * Nada de esto se usa todavía: define el contrato que seguirían la base de
 * datos, la API y los componentes si más adelante se habilitan registro,
 * progreso y certificados. Mantenerlo aquí evita rehacer el sitio.
 */

import type { SocialLinks } from "./index";

export type UUID = string;
export type ISODate = string;

/* ---------------------------------------------------------------- Identidad */

export type UserRole = "participante" | "mentor" | "admin" | "aliado";

export interface UserProfile {
  id: UUID;
  handle: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  roles: UserRole[];
  generation?: string;
  social: SocialLinks;
  createdAt: ISODate;
}

/* ---------------------------------------------------------------- Formación */

export interface Lesson {
  id: UUID;
  moduleId: UUID;
  slug: string;
  title: string;
  order: number;
  durationMinutes: number;
}

export interface Enrollment {
  id: UUID;
  userId: UUID;
  initiativeSlug: string;
  generation: string;
  status: "postulado" | "activo" | "completado" | "pausado";
  startedAt?: ISODate;
  completedAt?: ISODate;
}

export interface LessonProgress {
  userId: UUID;
  lessonId: UUID;
  completedAt: ISODate;
}

/* ---------------------------------------------------------------- Logros */

export interface Badge {
  id: string;
  name: string;
  description: string;
  criteria: string;
}

export interface Certificate {
  id: UUID;
  userId: UUID;
  initiativeSlug: string;
  issuedAt: ISODate;
  verificationCode: string;
}

/* ---------------------------------------------------------------- Comunidad */

export interface MentorshipSession {
  id: UUID;
  mentorId: UUID;
  participantIds: UUID[];
  topic: string;
  scheduledAt: ISODate;
  status: "programada" | "realizada" | "cancelada";
}

export interface EventRegistration {
  eventId: string;
  userId: UUID;
  registeredAt: ISODate;
  attended?: boolean;
}
