import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

interface BuildMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

/** Metadata consistente por página: canonical, Open Graph y Twitter/X Cards. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  noIndex,
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title ?? siteConfig.name }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: title ?? siteConfig.name,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(images && { images }),
      ...(type === "article" && { publishedTime, modifiedTime, tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

/* ------------------------------------------------------------------ schema.org */

export const organizationId = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization"],
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/logo-512.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/brand/logo-512.png"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    sameAs: Object.values(siteConfig.social),
    knowsLanguage: ["es"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Información general",
      url: siteConfig.social.linkedin,
      availableLanguage: ["es"],
    },
    knowsAbout: [
      "Ciberseguridad",
      "Pentesting",
      "Seguridad defensiva",
      "Cyber Threat Intelligence",
      "Respuesta a incidentes",
      "Forense digital",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es",
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
