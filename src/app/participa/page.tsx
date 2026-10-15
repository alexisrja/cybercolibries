import { getImageProps } from "next/image";
import Link from "next/link";
import { Faq } from "@/components/shared/faq";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { LinkedInContactCard } from "@/features/contact/linkedin-contact-card";
import { faqSection, participate, participationPaths } from "@/data/content";
import { trackAttrs } from "@/lib/analytics";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getFaqs } from "@/services/content.service";
import type { ParticipationPath } from "@/types";

export const metadata = buildMetadata({
  title: "Participa",
  description:
    "Aprende, comparte conocimiento, sé mentor o colabora como organización. Hay muchas formas de ser parte de CyberColibríes.",
  path: "/participa",
});

function ParticipationArtwork({ path }: { path: ParticipationPath }) {
  const alt = `${path.title}. ${path.description} ${path.cta}.`;
  const { props: squareProps } = getImageProps({
    src: path.squareImage,
    alt,
    width: 1536,
    height: 1536,
    sizes: "(min-width: 640px) 50vw, 100vw",
  });
  const { props: landscapeProps } = getImageProps({
    src: path.image,
    alt,
    width: 1536,
    height: 1024,
    sizes: "50vw",
  });

  return (
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet={landscapeProps.srcSet}
        sizes={landscapeProps.sizes}
      />
      <img
        {...squareProps}
        alt={alt}
        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.01] lg:aspect-[1.84/1]"
      />
    </picture>
  );
}

export default async function ParticipatePage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        id="participa-inicio"
        eyebrow="Participa"
        title={participate.chooseTitle}
        description={participate.intro}
        breadcrumbs={[{ name: "Participa", path: "/participa" }]}
        className="pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-14"
      >
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10">
          {participationPaths.map((path, i) => (
            <Reveal as="li" key={path.id} delay={(i % 2) * 0.07}>
              <Link
                href={`/participa?perfil=${path.id}#contacto`}
                className="group block overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                {...trackAttrs("join_click", path.title, "participate")}
              >
                <ParticipationArtwork path={path} />
              </Link>
            </Reveal>
          ))}
        </ul>
      </PageHero>

      {/* Las dudas se resuelven antes del CTA de contacto, no después. */}
      <Section
        id="preguntas-frecuentes"
        labelledBy="preguntas-frecuentes-title"
        className="border-t border-line"
      >
        <SectionHeader
          id="preguntas-frecuentes-title"
          eyebrow={faqSection.eyebrow}
          title={faqSection.title}
          description={faqSection.description}
        />
        <Faq items={faqs} className="mt-8 sm:mt-10" />
      </Section>

      <Section
        id="contacto"
        labelledBy="contacto-title"
        className="border-y border-line bg-elevated/30 py-10 sm:py-12 lg:py-14"
      >
        <Reveal>
          <div className="glass hud-corners relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line p-6 shadow-[var(--shadow-card)] sm:p-8 lg:p-10">
            <div
              aria-hidden
              className="absolute -top-32 -right-28 size-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,#0a66c2_24%,transparent),transparent_68%)]"
            />
            <SectionHeader
              id="contacto-title"
              eyebrow="Escríbenos"
              title={participate.otherIdea.title}
              description={participate.otherIdea.body}
              align="center"
              className="mx-auto"
            />

            <LinkedInContactCard
              href={siteConfig.social.linkedin}
              cta={participate.linkedinGuide.cta}
              note={participate.linkedinGuide.note}
            />

            <p className="relative mx-auto mt-8 max-w-3xl border-t border-line-strong pt-6 text-center text-sm leading-relaxed text-fg italic sm:text-base">
              “{participate.quote}”
            </p>
          </div>
        </Reveal>
      </Section>

      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
