/**
 * Capa de analítica agnóstica del proveedor.
 *
 * Proveedores soportados (se eligen con NEXT_PUBLIC_ANALYTICS_PROVIDER):
 *  - "plausible" (recomendado, sin cookies)
 *  - "umami"     (sin cookies, self-hosted)
 *  - "ga"        (Google Analytics 4; requiere banner de consentimiento)
 *
 * Si no hay proveedor configurado, `track` no hace nada (salvo log en dev).
 */

export type AnalyticsEvent =
  | "cta_click"
  | "join_click"
  | "program_interest"
  | "challenge_open"
  | "labs_search"
  | "labs_filter"
  | "content_share"
  | "theme_toggle";

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

type PlausibleFn = (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
type UmamiApi = { track: (event: string, data?: Record<string, string | number | boolean>) => void };
type GtagFn = (command: "event", event: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
    umami?: UmamiApi;
    gtag?: GtagFn;
  }
}

export const analyticsProvider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER as "plausible" | "umami" | "ga" | undefined;

function clean(props?: AnalyticsProps) {
  if (!props) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(props)) if (v !== undefined) out[k] = v;
  return out;
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps) {
  if (typeof window === "undefined") return;
  const data = clean(props);

  try {
    switch (analyticsProvider) {
      case "plausible":
        window.plausible?.(event, data ? { props: data } : undefined);
        break;
      case "umami":
        window.umami?.track(event, data);
        break;
      case "ga":
        window.gtag?.("event", event, data);
        break;
      default:
        if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, data ?? "");
    }
  } catch {
    // La analítica nunca debe romper la experiencia.
  }
}

/**
 * Atributos para marcar CTAs sin convertirlos en componentes cliente.
 * Un listener global (AnalyticsListener) los detecta al hacer clic.
 */
export function trackAttrs(event: AnalyticsEvent, label: string, location?: string) {
  return {
    "data-track": event,
    "data-track-label": label,
    ...(location ? { "data-track-location": location } : {}),
  } as const;
}
