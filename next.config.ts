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
};

export default nextConfig;
