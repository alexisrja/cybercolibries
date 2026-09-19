import { Quote } from "lucide-react";
import { MetricCard } from "@/components/cards/metric-card";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { formatDate } from "@/lib/utils";
import type { MetricsSnapshot, Story } from "@/types";

function StoryCard({ story }: { story: Story }) {
  return (
    <figure className="card-iri flex h-full flex-col rounded-2xl p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <Quote className="size-6 text-violet" aria-hidden />
        <span className="rounded-full border border-teal/30 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-teal uppercase">
          {story.highlight}
        </span>
      </div>
      <blockquote className="mt-5 pb-8 text-[1.05rem] leading-relaxed text-fg">“{story.quote}”</blockquote>
      <figcaption className="mt-auto border-t border-line pt-5">
        <p className="font-medium text-fg">{story.name}</p>
        <p className="text-sm text-muted">
          {story.generation} · {story.role}
        </p>
      </figcaption>
    </figure>
  );
}

export function Impact({ snapshot, stories }: { snapshot: MetricsSnapshot; stories: Story[] }) {
  return (
    <Section id="impacto" labelledBy="impact-title">
      <SectionHeader
        id="impact-title"
        path="impacto"
        title="Nuestro impacto"
        description="Medimos lo que importa: personas que aprendieron, horas que invertimos juntos y oportunidades que se abrieron."
      />

      <Reveal className="mt-14">
        <div className="hud-corners overflow-hidden rounded-2xl border border-line">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-elevated/60 px-5 py-3">
            <p className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="size-2 rounded-full bg-teal shadow-[0_0_10px_var(--teal)]" aria-hidden />
              impact.dashboard
            </p>
            <p className="font-mono text-xs text-subtle">
              <span className="sr-only">Última actualización: </span>
              actualizado <time dateTime={snapshot.updatedAt}>{formatDate(snapshot.updatedAt)}</time>
            </p>
          </div>
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {snapshot.metrics.map((metric, i) => (
              <li key={metric.id}>
                <MetricCard metric={metric} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-24">
        <Reveal>
          <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Historias CyberColibríes</h3>
          <p className="mt-3 max-w-xl text-muted">Researchers que llegaron con curiosidad y hoy están construyendo su camino.</p>
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal as="li" key={story.id} delay={i * 0.08}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
