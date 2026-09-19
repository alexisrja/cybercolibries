"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { LinkedInIcon, XIcon } from "@/components/shared/social-icons";
import { track } from "@/lib/analytics";

const noopSubscribe = () => () => {};

const btn =
  "inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-[color,border-color] hover:border-teal/50 hover:text-fg";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  // Evita desajustes de hidratación: en el servidor siempre es false.
  const canNativeShare = useSyncExternalStore(
    noopSubscribe,
    () => "share" in navigator,
    () => false,
  );
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { network: "linkedin", label: "Compartir en LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { network: "x", label: "Compartir en X", href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: XIcon },
    { network: "whatsapp", label: "Compartir por WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: MessageCircle },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("content_share", { network: "copy", url });
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* el navegador no permitió acceder al portapapeles */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="hud-label mr-1">Compartir</span>
      {links.map(({ network, label, href, Icon }) => (
        <a
          key={network}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={btn}
          onClick={() => track("content_share", { network, url })}
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button type="button" onClick={copy} className={btn} aria-label={copied ? "Enlace copiado" : "Copiar enlace"}>
        {copied ? <Check className="size-4 text-teal" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
      </button>
      {canNativeShare && (
        <button
          type="button"
          className={btn}
          aria-label="Más opciones para compartir"
          onClick={() => {
            navigator.share({ title, url }).catch(() => undefined);
            track("content_share", { network: "native", url });
          }}
        >
          <Share2 className="size-4" aria-hidden />
        </button>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Enlace copiado al portapapeles" : ""}
      </span>
    </div>
  );
}
