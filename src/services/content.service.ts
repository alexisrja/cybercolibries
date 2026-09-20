import {
  actionPhotos,
  communityPhotos,
  initiatives,
  partners,
  stories,
  testimonials,
} from "@/data/content";
import type { Initiative, Partner, Photo, Testimonial } from "@/types";

/**
 * Única capa de acceso a contenido.
 * Hoy lee los datos estáticos de `src/data/content.ts`; para conectar un CMS
 * (Sanity, Strapi, Contentful) o Supabase basta con reescribir estas funciones
 * manteniendo la firma. Las páginas no cambian.
 */

export async function getInitiatives(): Promise<Initiative[]> {
  return initiatives;
}

export async function getInitiative(slug: string): Promise<Initiative | undefined> {
  return initiatives.find((i) => i.slug === slug);
}

/** Testimonios de Inicio. Solo reales y autorizados: si está vacío, no se muestra la sección. */
export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

/** Historias de Impacto. Mismo criterio que los testimonios. */
export async function getStories(): Promise<Testimonial[]> {
  return stories;
}

export async function getCommunityPhotos(): Promise<Photo[]> {
  return communityPhotos;
}

export async function getActionPhotos(): Promise<Photo[]> {
  return actionPhotos;
}

/** Solo aliados con colaboración real y permiso de uso de marca. */
export async function getPartners(): Promise<Partner[]> {
  return partners;
}
