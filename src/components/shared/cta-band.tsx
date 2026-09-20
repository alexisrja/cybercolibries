import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { Container } from "./section";
import { trackAttrs } from "@/lib/analytics";
import type { Cta } from "@/types";

/** Cierre de página: una sola acción, sin ruido alrededor. */
export function CtaBand({ title, body, cta, location }: { title: string; body: string; cta: Cta; location: string }) {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line-strong p-8 sm:p-12">
            <div aria-hidden className="absolute inset-0 -z-10 bg-iri opacity-[0.09]" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight font-medium tracking-tight text-fg">
                  {title}
                </p>
                <p className="mt-3 leading-relaxed text-muted">{body}</p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <Link href={cta.href} {...trackAttrs("join_click", cta.label, location)}>
                  {cta.label} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Frase de cierre de la marca, usada como respiro entre secciones. */
export function TaglineStrip() {
  const words = ["Aprender.", "Practicar.", "Compartir.", "Impactar."];
  return (
    <Container>
      <Reveal>
        <p
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 py-10 text-center font-display text-[clamp(1.2rem,3.4vw,2.2rem)] font-medium tracking-tight"
          aria-label="Aprender. Practicar. Compartir. Impactar."
        >
          {words.map((w, i) => (
            <span key={w} aria-hidden className={i % 2 === 0 ? "text-fg" : "text-iri"}>
              {w}
            </span>
          ))}
        </p>
      </Reveal>
    </Container>
  );
}
