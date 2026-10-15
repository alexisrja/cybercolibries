import {
  communityPhotos,
  faqs,
  initiatives,
  testimonials,
} from "@/data/content";
import type { FaqItem, Initiative, Photo, Testimonial } from "@/types";

/**
 * Única capa de acceso a contenido.
 * Hoy lee los datos estáticos de `src/data/content.ts`; para coinfo un CMS
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

export async function getCommunityPhotos(): Promise<Photo[]> {
  return communityPhotos;
}

/** Preguntas frecuentes de Participa. Alimentan tanto la sección visible como su `FAQPage`. */
export async function getFaqs(): Promise<FaqItem[]> {
  return faqs;
}
