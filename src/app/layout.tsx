import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import { JsonLd } from "@/components/shared/json-ld";
import { Analytics } from "@/features/analytics/analytics";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "@/styles/globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Formación, comunidad e impacto en ciberseguridad`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "ciberseguridad",
    "comunidad de ciberseguridad",
    "formación en ciberseguridad",
    "pentesting",
    "SOC",
    "threat intelligence",
    "forense digital",
    "mentoría",
    "Latinoamérica",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060913" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-clip">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Providers>
          <Navbar />
          <main id="contenido" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
