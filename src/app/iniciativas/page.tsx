import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { initiativesPage } from "@/data/content";
import { trackAttrs } from "@/lib/analytics";
import { buildMetadata } from "@/lib/seo";
import { getInitiatives } from "@/services/content.service";

export const metadata = buildMetadata({
  title: "Iniciativas",
  description:
    "Researcher Program, Colibrí Talks y Colibrí Mental: distintas formas de compartir conocimiento y generar oportunidades en ciberseguridad.",
  path: "/iniciativas",
});

export default async function InitiativesPage() {
  const initiatives = await getInitiatives();

  return (
    <>
      <PageHero
        id="iniciativas-inicio"
        eyebrow="Iniciativas"
        title={initiativesPage.title}
        description={initiativesPage.intro}
      />

      {initiatives.map((initiative, index) => (
        <Section
          key={initiative.slug}
          id={initiative.slug}
          labelledBy={`${initiative.slug}-title`}
          className={
            index % 2 === 1
              ? "border-y border-line bg-elevated/30 py-7 sm:py-8 lg:py-10"
              : "py-7 sm:py-8 lg:py-10"
          }
        >
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.45fr)] lg:gap-10">
            <Reveal className="card-iri relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl lg:max-w-none">
              <h2 id={`${initiative.slug}-title`} className="sr-only">
                {initiative.name}
              </h2>
              {initiative.image && (
                <Image
                  src={initiative.image}
                  alt={`Ilustración de ${initiative.name}`}
                  fill
                  sizes="(min-width: 1280px) 380px, (min-width: 1024px) 32vw, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/20 via-transparent to-bg/10" aria-hidden />
              {initiative.status === "proximamente" && (
                <Badge
                  tone="info"
                  className="absolute top-4 right-4 bg-bg/90 text-accent-soft shadow-lg backdrop-blur-md"
                >
                  Próximamente
                </Badge>
              )}
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-[1.05rem] leading-relaxed text-muted sm:text-lg">{initiative.description}</p>
              {initiative.cta && (
                <Button asChild className="mt-6">
                  <Link
                    href={initiative.cta.href}
                    {...trackAttrs("cta_click", initiative.cta.label, `initiatives:${initiative.slug}`)}
                  >
                    {initiative.cta.label} <ArrowRight />
                  </Link>
                </Button>
              )}
            </Reveal>
          </div>
        </Section>
      ))}
    </>
  );
}
