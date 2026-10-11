import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "./reveal";
import type { Testimonial } from "@/types";

/**
 * Testimonios reales.
 * Si no hay ninguno autorizado, el componente no renderiza nada: el documento
 * de contenido prohíbe publicar textos de ejemplo.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="grid items-stretch gap-4 md:grid-cols-2">
      {items.map((t, i) => (
        <Reveal as="li" key={t.id} delay={i * 0.08} className={t.video ? "md:col-span-2" : "h-full"}>
          <figure className="card-iri flex h-full flex-col rounded-2xl p-6 sm:p-7">
            {t.video ? (
              <video
                className="mx-auto max-h-[34rem] w-auto max-w-full rounded-xl bg-black shadow-sm"
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
                poster={t.poster}
                aria-label={`Testimonio en video de ${t.name}`}
              >
                <source src={t.video} type="video/mp4" />
                Tu navegador no admite la reproducción de video.
              </video>
            ) : (
              <>
                <Quote className="size-6 text-accent-deep" aria-hidden />
                {t.quote && (
                  <blockquote className="mt-5 whitespace-pre-line text-[1.05rem] leading-relaxed text-fg">
                    “{t.quote}”
                  </blockquote>
                )}
                {t.sourceUrl && (
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-fg"
                    aria-label={`Ver el testimonio completo de ${t.name} en LinkedIn (se abre en una pestaña nueva)`}
                  >
                    Testimonio completo
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
              </>
            )}
            <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-5">
              {t.photo && (
                <Image
                  src={t.photo}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-full object-cover"
                />
              )}
              <span>
                <span className="block font-medium text-fg">{t.name}</span>
                <span className="block text-sm text-muted">{t.context}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
