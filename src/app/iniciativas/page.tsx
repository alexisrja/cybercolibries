import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { ValueGrid } from "@/components/shared/value-grid";
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
      <PageHero eyebrow="Iniciativas" title={initiativesPage.title} description={initiativesPage.intro} />

      {initiatives.map((initiative, index) => (
        <Section
          key={initiative.slug}
          id={initiative.slug}
          labelledBy={`${initiative.slug}-title`}
          className={index % 2 === 1 ? "border-y border-line bg-elevated/30" : undefined}
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <Reveal>
              <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-elevated/60 text-teal">
                <Icon name={initiative.icon} className="size-5" />
              </span>
              <h2
                id={`${initiative.slug}-title`}
                className="mt-6 font-display text-[clamp(1.5rem,3.4vw,2.2rem)] leading-tight font-medium tracking-tight text-fg"
              >
                {initiative.name}
              </h2>
              {initiative.status === "proximamente" && (
                <Badge tone="nectar" className="mt-4">
                  Próximamente
                </Badge>
              )}
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-[1.05rem] leading-relaxed text-muted sm:text-lg">{initiative.description}</p>
              {initiative.cta && (
                <Button asChild className="mt-8">
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

          {initiative.pillars && <ValueGrid items={initiative.pillars} className="mt-12" />}
        </Section>
      ))}
    </>
  );
}
