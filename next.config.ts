import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad. Una comunidad de ciberseguridad debe predicar con el ejemplo.
 * La CSP estricta (con nonces) se puede activar desde `src/proxy.ts` cuando se
 * integren servicios de terceros; aquí se aplican las cabeceras de base.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // Añadir aquí los dominios del CMS / Storage (Sanity, Supabase…) cuando se conecten.
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  /**
   * Cualquier host `*.vercel.app` que sirva producción es un duplicado del
   * sitio: un 301 consolida la autoridad en el dominio oficial. Solo se emite
   * en producción, porque los despliegues de preview viven en ese dominio y
   * deben seguir siendo accesibles.
   */
  async redirects() {
    if (process.env.VERCEL_ENV !== "production") return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        destination: "https://cybercolibries.org/:path*",
        // 301 explícito: algunos rastreadores y scrapers antiguos no siguen un 308.
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
