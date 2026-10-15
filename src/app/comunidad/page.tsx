import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { CommunityCarousel } from "@/components/shared/community-carousel";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeader } from "@/components/shared/section";
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
      <header
        id="comunidad-inicio"
        aria-labelledby="comunidad-title"
        className="relative isolate overflow-hidden border-b border-line pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-28 lg:pb-14"
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_65%)]"
        />
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(26rem,1.1fr)] lg:gap-12 xl:gap-16">
          <Reveal>
            <Breadcrumbs items={[{ name: "Comunidad", path: "/comunidad" }]} />
            <p className="hud-label flex items-center gap-2">
              <span aria-hidden className="h-px w-6 bg-accent" />
              Comunidad
            </p>
            <h1
              id="comunidad-title"
              className="mt-5 max-w-2xl font-display text-[1.7rem] leading-[1.08] font-medium tracking-tight text-fg sm:text-[clamp(1.85rem,3.6vw,2.8rem)]"
            >
              {community.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{community.intro}</p>
          </Reveal>

          <div className="grid gap-4">
            {[
              { label: "Misión", text: community.mission },
              { label: "Visión", text: community.vision },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="hud-corners rounded-2xl border border-line bg-elevated/40 p-6 sm:p-7">
                  <h2 className="hud-label text-accent">{item.label}</h2>
                  <p className="mt-3 text-base leading-relaxed font-medium tracking-tight text-fg sm:text-lg">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </header>

      <Section labelledBy="somos-title" className="border-y border-line bg-elevated/30">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <SectionHeader id="somos-title" eyebrow="Comunidad" title={community.weAreCommunity.title} />
          <Reveal delay={0.08} className="space-y-5 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            {community.weAreCommunity.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>
        </div>
        <CommunityCarousel items={photos} />
      </Section>

      <Section labelledBy="mueve-title">
        <SectionHeader id="mueve-title" eyebrow="Principios" title="Lo que nos mueve" />
        <ValueGrid items={values} className="mt-8 sm:mt-10" />
      </Section>

      <CtaBand {...community.closing} location="community_closing" />
    </>
  );
}
