"use client";

import Script from "next/script";
import { useEffect } from "react";
import { analyticsProvider, track, type AnalyticsEvent } from "@/lib/analytics";

/** Delegación de clics: cualquier elemento con `data-track` envía un evento. */
function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as AnalyticsEvent, {
        label: el.dataset.trackLabel,
        location: el.dataset.trackLocation,
        path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

/**
 * Carga el script del proveedor con `lazyOnload` para no afectar
 * Core Web Vitals. Sin variables de entorno no carga nada.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  const scriptSrc = process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL;
  const siteId = process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID;

  return (
    <>
      <AnalyticsListener />
      {analyticsProvider === "plausible" && domain && (
        <Script
          defer
          data-domain={domain}
          src={scriptSrc ?? "https://plausible.io/js/script.outbound-links.js"}
          strategy="lazyOnload"
        />
      )}
      {analyticsProvider === "umami" && siteId && scriptSrc && (
        <Script defer data-website-id={siteId} src={scriptSrc} strategy="lazyOnload" />
      )}
      {analyticsProvider === "ga" && siteId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteId}`} strategy="lazyOnload" />
          <Script id="ga-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${siteId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
