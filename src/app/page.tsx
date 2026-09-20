import { InitiativeCard } from "@/components/cards/initiative-card";
import { CtaBand, TaglineStrip } from "@/components/shared/cta-band";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { Testimonials } from "@/components/shared/testimonials";
import { ValueGrid } from "@/components/shared/value-grid";
import { HomeHero } from "@/sections/home-hero";
import { home, whatWeDo } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { getInitiatives, getTestimonials } from "@/services/content.service";

export const metadata = buildMetadata({
  title: "CyberColibríes · Comunidad de ciberseguridad",
  description:
    "Comunidad que impulsa nuevas generaciones de talento en ciberseguridad. Aprendemos, compartimos conocimiento y creamos oportunidades.",
  path: "/",
});

export default async function HomePage() {
  const [initiatives, testimonials] = await Promise.all([getInitiatives(), getTestimonials()]);

  return (
    <>
      <HomeHero />

      <Section id="que-es" labelledBy="que-es-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <SectionHeader id="que-es-title" eyebrow="Comunidad" title={home.whatIs.title} />
          <Reveal delay={0.08} className="space-y-5 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            {home.whatIs.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>
        </div>
        <ValueGrid items={whatWeDo} className="mt-12" />
      </Section>

      <Section id="iniciativas" labelledBy="iniciativas-title" className="border-y border-line bg-elevated/30">
        <SectionHeader
          id="iniciativas-title"
          eyebrow="Iniciativas"
          title="Nuestras iniciativas"
          description="Distintas formas de aprender, colaborar y generar impacto en ciberseguridad."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {initiatives.map((initiative, i) => (
            <Reveal as="li" key={initiative.slug} delay={i * 0.07}>
              <InitiativeCard initiative={initiative} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {testimonials.length > 0 && (
        <Section id="testimonios" labelledBy="testimonios-title">
          <SectionHeader
            id="testimonios-title"
            eyebrow="Testimonios"
            title="Historias reales de personas que forman parte de CyberColibríes."
          />
          <div className="mt-12">
            <Testimonials items={testimonials} />
          </div>
        </Section>
      )}

      <Section id="idea" labelledBy="idea-title">
        <SectionHeader
          id="idea-title"
          eyebrow={home.idea.eyebrow}
          title={home.idea.title}
          description={home.idea.body}
          align="center"
        />
        <div className="mt-6">
          <TaglineStrip />
        </div>
      </Section>

      <CtaBand {...home.closing} location="home_closing" />
    </>
  );
}
