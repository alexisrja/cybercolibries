import { CtaBand, TaglineStrip } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { PhotoGrid } from "@/components/shared/photo-grid";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { ValueGrid } from "@/components/shared/value-grid";
import { community, values } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { getCommunityPhotos } from "@/services/content.service";

export const metadata = buildMetadata({
  title: "Comunidad",
  description:
    "Quiénes somos, por qué existimos y qué principios mueven a CyberColibríes: una comunidad para aprender, compartir y crecer en ciberseguridad.",
  path: "/comunidad",
});

export default async function CommunityPage() {
  const photos = await getCommunityPhotos();

  return (
    <>
      <PageHero eyebrow="Comunidad" title={community.title} description={community.intro} />

      <Section labelledBy="razon-title">
        <SectionHeader id="razon-title" eyebrow="Nuestra razón de ser" title="Misión y visión" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[
            { label: "Misión", text: community.mission },
            { label: "Visión", text: community.vision },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="hud-corners h-full rounded-2xl border border-line bg-elevated/40 p-7 sm:p-9">
                <h3 className="hud-label text-teal">{item.label}</h3>
                <p className="mt-4 text-lg leading-snug font-medium tracking-tight text-fg sm:text-[1.3rem]">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section labelledBy="mueve-title" className="border-y border-line bg-elevated/30">
        <SectionHeader id="mueve-title" eyebrow="Principios" title="Lo que nos mueve" />
        <ValueGrid items={values} className="mt-12" />
      </Section>

      <Section labelledBy="somos-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <SectionHeader id="somos-title" eyebrow="Comunidad" title={community.weAreCommunity.title} />
          <Reveal delay={0.08} className="space-y-5 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            {community.weAreCommunity.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>
        </div>
        <div className="mt-12">
          <PhotoGrid
            photos={photos}
            note="Aquí irán fotografías reales de sesiones, participantes, speakers, mentorías y actividades de la comunidad."
          />
        </div>
      </Section>

      <TaglineStrip />

      <div className="mt-10">
        <CtaBand {...community.closing} location="community_closing" />
      </div>
    </>
  );
}
