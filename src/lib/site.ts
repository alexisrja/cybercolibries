import type { NavItem } from "@/types";

/**
 * Configuración global del sitio.
 * TODO(brand): confirmar dominio, correo y URLs oficiales de redes sociales.
 */
export const siteConfig = {
  name: "CyberColibríes",
  shortName: "CyberColibríes",
  tagline: "Aprender. Practicar. Compartir. Impactar.",
  headline: "Formación, comunidad e impacto en ciberseguridad.",
  description:
    "CyberColibríes es una comunidad que forma talento en ciberseguridad mediante educación accesible, práctica, mentoría y colaboración.",
  manifesto:
    "No somos solamente un curso de ciberseguridad; somos una comunidad que forma talento, comparte conocimiento y crea oportunidades.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cybercolibries.org").replace(/\/$/, ""),
  locale: "es_MX",
  email: "hola@cybercolibries.org",
  securityEmail: "seguridad@cybercolibries.org",
  social: {
    linkedin: "https://www.linkedin.com/company/cybercolibries",
    instagram: "https://www.instagram.com/cybercolibries",
    github: "https://github.com/cybercolibries",
    youtube: "https://www.youtube.com/@cybercolibries",
    discord: "https://discord.gg/cybercolibries",
  },
} as const;

export type SocialNetwork = keyof typeof siteConfig.social;

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/#inicio", sectionId: "inicio" },
  { label: "Nosotros", href: "/#nosotros", sectionId: "nosotros" },
  { label: "Programas", href: "/#programas", sectionId: "programas" },
  { label: "Comunidad", href: "/#comunidad", sectionId: "comunidad" },
  { label: "Impacto", href: "/#impacto", sectionId: "impacto" },
  { label: "Aprende", href: "/aprende" },
  { label: "Participa", href: "/#participa", sectionId: "participa" },
];

export const footerNav: NavItem[] = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Programas", href: "/#programas" },
  { label: "Comunidad", href: "/#comunidad" },
  { label: "Impacto", href: "/#impacto" },
  { label: "Aprende", href: "/aprende" },
  { label: "Participa", href: "/#participa" },
  { label: "Contacto", href: "/#contacto" },
];

export const programNav: NavItem[] = [
  { label: "Researcher Program", href: "/programas/researcher-program" },
  { label: "Researcher Challenges", href: "/challenges" },
  { label: "CyberColibrí Labs", href: "/aprende" },
];

export const legalNav: NavItem[] = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
  { label: "Cookies", href: "/cookies" },
];

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
