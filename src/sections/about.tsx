import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { identity, pillars, principles } from "@/data/institutional";
import { siteConfig } from "@/lib/site";

export function About() {
  return (
    <Section id="nosotros" labelledBy="about-title" className="pt-8 sm:pt-12 lg:pt-12">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <SectionHeader
          id="about-title"
          path="nosotros"
          title={
            <>
              ¿Qué es <span className="text-iri">CyberColibríes</span>?
            </>
          }
          description={identity.intro}
        />
        <Reveal delay={0.1} className="self-end">
          <figure className="relative border-l border-line-strong pl-6">
            <span aria-hidden className="absolute top-0 -left-px h-12 w-px bg-iri" />
            <blockquote className="text-lg leading-relaxed text-fg">{identity.why}</blockquote>
            <figcaption className="hud-label mt-4">Por qué un colibrí</figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Pilares */}
      <ul className="mt-16 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal as="li" key={pillar.title} delay={i * 0.08}>
            <article className="card-iri h-full rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-elevated/60 text-teal">
                  <Icon name={pillar.icon} className="size-5" />
                </span>
                <span aria-hidden className="h-px w-16 bg-gradient-to-r from-transparent to-line-strong" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-medium tracking-tight">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{pillar.description}</p>
            </article>
          </Reveal>
        ))}
      </ul>

      {/* Misión y visión */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { label: "Misión", text: identity.mission },
          { label: "Visión", text: identity.vision },
        ].map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08}>
            <div className="hud-corners h-full rounded-2xl border border-line bg-elevated/40 p-7 sm:p-9">
              <h3 className="hud-label text-teal">{item.label}</h3>
              <p className="mt-4 text-xl leading-snug font-medium tracking-tight text-fg sm:text-[1.4rem]">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Principios */}
      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_2.2fr]">
        <Reveal>
          <h3 className="font-display text-2xl font-medium tracking-tight">Principios</h3>
          <p className="mt-3 max-w-xs leading-relaxed text-muted">Lo que guía cada programa, cada reto y cada conversación.</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-subtle italic">“{siteConfig.manifesto}”</p>
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.04} className="group bg-bg">
              <div className="flex h-full gap-4 p-5 transition-colors duration-300 group-hover:bg-surface">
                <Icon
                  name={p.icon}
                  className="mt-0.5 size-5 shrink-0 text-subtle transition-colors duration-300 group-hover:text-teal"
                />
                <div>
                  <h4 className="font-medium text-fg">{p.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <li aria-hidden className="hidden items-center justify-center bg-bg p-5 lg:col-span-2 lg:flex">
            <span className="font-mono text-xs text-subtle">
              <span className="text-teal">+</span> los que construyamos juntos
            </span>
          </li>
          <li aria-hidden className="hidden bg-bg sm:block lg:hidden" />
        </ul>
      </div>
    </Section>
  );
}
