/**
 * Modelo de dominio de la futura plataforma CyberColibríes.
 *
 * Nada de esto se usa todavía en la UI: define el contrato que seguirán
 * la base de datos (Supabase/Postgres), la API y los componentes cuando
 * se habiliten registro, progreso, badges, certificados y dashboard.
 * Mantenerlo aquí evita que el sitio institucional tenga que reescribirse.
 */

import type { ChallengeStatus, Difficulty, SocialLinks } from "./index";

export type UUID = string;
export type ISODate = string;

/* ---------------------------------------------------------------- Identidad */

export type UserRole = "researcher" | "mentor" | "admin" | "partner";

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

/* ---------------------------------------------------------------- Educación */

export interface Lesson {
  id: UUID;
  moduleId: UUID;
  slug: string;
  title: string;
  order: number;
  durationMinutes: number;
  resourceIds: UUID[];
}

export interface Resource {
  id: UUID;
  kind: "video" | "lectura" | "lab" | "herramienta" | "plantilla";
  title: string;
  url: string;
}

export interface Enrollment {
  id: UUID;
  userId: UUID;
  programSlug: string;
  generation: string;
  status: "postulado" | "activo" | "completado" | "pausado";
  startedAt?: ISODate;
  completedAt?: ISODate;
}

/* ---------------------------------------------------------------- Progreso */

export interface LessonProgress {
  userId: UUID;
  lessonId: UUID;
  completedAt: ISODate;
}

export interface ChallengeAttempt {
  id: UUID;
  userId: UUID;
  challengeSlug: string;
  status: "en-progreso" | "entregado" | "evaluado";
  score?: number;
  feedback?: string;
  reviewerId?: UUID;
  submittedAt?: ISODate;
}

export interface ChallengeRecord {
  slug: string;
  difficulty: Difficulty;
  status: ChallengeStatus;
  maxScore: number;
  rubric: { criterion: string; weight: number }[];
}

/* ---------------------------------------------------------------- Logros */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserBadge {
  userId: UUID;
  badgeId: string;
  awardedAt: ISODate;
}

export interface Certificate {
  id: UUID;
  userId: UUID;
  programSlug: string;
  issuedAt: ISODate;
  verificationCode: string;
}

/* ---------------------------------------------------------------- Comunidad */

export interface MentorshipSession {
  id: UUID;
  mentorId: UUID;
  researcherIds: UUID[];
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

/* ---------------------------------------------------------------- Dashboard */

export interface DashboardSummary {
  userId: UUID;
  completedLessons: number;
  totalLessons: number;
  challengesSolved: number;
  points: number;
  badges: UserBadge[];
  recentActivity: { kind: string; label: string; at: ISODate }[];
}
