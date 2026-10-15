import type { NavItem } from "@/types";

/** Dominio oficial de producción: única fuente de verdad para los canonical. */
const PRODUCTION_URL = "https://cybercolibries.org";

/**
 * Resuelve la URL base del sitio.
 *
 * En producción se ignora `NEXT_PUBLIC_SITE_URL` a propósito: una variable mal
 * configurada en el proveedor (el dominio `*.vercel.app`) hacía que canonical,
 * sitemap y Open Graph apuntaran a un dominio duplicado, con lo que los
 * buscadores indexaban ese dominio en lugar del oficial. Preview y local sí
 * pueden sobrescribirla.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") return PRODUCTION_URL;

  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return PRODUCTION_URL;
}

/**
 * Configuración global del sitio.
 * TODO(marca): confirmar dominio definitivo y perfiles oficiales activos.
 */
export const siteConfig = {
  name: "CyberColibríes",
  shortName: "CyberColibríes",
  tagline: "Aprender. Practicar. Compartir. Impactar.",
  headline: "Comunidad que impulsa nuevas generaciones de talento en ciberseguridad.",
  description:
    "CyberColibríes es una comunidad que impulsa talento en ciberseguridad mediante educación accesible, práctica, mentoría y colaboración.",
  url: resolveSiteUrl(),
  /** Variantes de marca que la gente escribe al buscar (sin acento, sin la "e"). */
  alternateNames: ["CyberColibris", "Cyber Colibríes", "Cybercolibries"],
  locale: "es_MX",
  /** Mostrar únicamente perfiles oficiales activos (indicación del documento). */
  social: {
    linkedin: "https://www.linkedin.com/company/cybercolibr%C3%ADes/",
  },
} as const;

export type SocialNetwork = keyof typeof siteConfig.social;

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Comunidad", href: "/comunidad#comunidad-inicio" },
  { label: "Iniciativas", href: "/iniciativas#iniciativas-inicio" },
  { label: "Participa", href: "/participa#participa-inicio" },
];

export const initiativesNav: NavItem[] = [
  { label: "Researcher Program", href: "/iniciativas/researcher-program#researcher-program-inicio" },
  { label: "Colibrí Talks", href: "/iniciativas#colibri-talks", note: "Próximamente" },
  { label: "Colibrí Mental", href: "/iniciativas#colibri-mental", note: "Próximamente" },
];

export const legalNav: NavItem[] = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
  { label: "Cookies", href: "/cookies" },
];

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
