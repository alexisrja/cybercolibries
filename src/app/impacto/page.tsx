import Image from "next/image";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { PhotoGrid } from "@/components/shared/photo-grid";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { Testimonials } from "@/components/shared/testimonials";
import { ValueGrid } from "@/components/shared/value-grid";
import { impact, impactAreas } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { getActionPhotos, getPartners, getStories } from "@/services/content.service";

export const metadata = buildMetadata({
  title: "Impacto",
  description:
    "El impacto se construye persona por persona: conocimiento accesible, desarrollo de talento, comunidad y efecto multiplicador.",
  path: "/impacto",
});

export default async function ImpactPage() {
  const [stories, photos, partners] = await Promise.all([getStories(), getActionPhotos(), getPartners()]);

  return (
    <>
      <PageHero eyebrow="Impacto" title={impact.title} description={impact.intro} />

      <Section labelledBy="impacto-title">
        <SectionHeader id="impacto-title" eyebrow="Cómo se ve" title="Nuestro impacto" />
        <ValueGrid items={impactAreas} className="mt-12" />
      </Section>

      {stories.length > 0 && (
        <Section labelledBy="historias-title" className="border-y border-line bg-elevated/30">
          <SectionHeader id="historias-title" eyebrow="Historias" title={impact.stories.title} description={impact.stories.intro} />
          <div className="mt-12">
            <Testimonials items={stories} />
          </div>
        </Section>
      )}

      <Section labelledBy="accion-title">
        <SectionHeader id="accion-title" eyebrow="Comunidad" title={impact.inAction.title} description={impact.inAction.lead} />
        <div className="mt-12">
          <PhotoGrid
            photos={photos}
            note="Aquí irán fotografías de sesiones, mentorías, charlas y retos, con un pie de foto que indique la actividad o generación."
          />
        </div>
      </Section>

      <Section labelledBy="colaboraciones-title" className="border-t border-line">
        <SectionHeader id="colaboraciones-title" eyebrow="Alianzas" title={impact.collaborations.title} description={impact.collaborations.body} />
        {partners.length > 0 ? (
          <ul className="mt-12 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <li key={partner.id} className="flex h-24 items-center justify-center rounded-2xl border border-line px-5">
                {partner.logo ? (
                  <Image src={partner.logo} alt={partner.name} width={160} height={48} className="h-10 w-auto object-contain" />
                ) : (
                  <span className="text-sm text-muted">{partner.name}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-10">
            <p className="max-w-xl rounded-2xl border border-dashed border-line-strong p-6 text-sm leading-relaxed text-muted">
              Los logotipos de aliados se publicarán conforme se confirmen colaboraciones y su autorización de marca.{" "}
              <span className="text-fg">¿Tu organización quiere colaborar?</span> Escríbenos desde la página Participa.
            </p>
          </Reveal>
        )}
      </Section>

      <CtaBand {...impact.closing} location="impact_closing" />
    </>
  );
}
