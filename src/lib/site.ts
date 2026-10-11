import type { NavItem } from "@/types";

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
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cybercolibries.org").replace(/\/$/, ""),
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
