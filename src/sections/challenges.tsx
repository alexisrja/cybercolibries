import Link from "next/link";
import { ArrowRight, Award, BarChart3, FlaskConical, Trophy } from "lucide-react";
import { ChallengeCard } from "@/components/cards/challenge-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { trackAttrs } from "@/lib/analytics";
import type { Challenge } from "@/types";

const upcoming = [
  { icon: BarChart3, label: "Progreso personal" },
  { icon: Trophy, label: "Puntuaciones" },
  { icon: Award, label: "Badges" },
  { icon: FlaskConical, label: "Labs en vivo" },
];

export function Challenges({ challenges }: { challenges: Challenge[] }) {
  const featured = challenges.filter((c) => c.status === "disponible").slice(0, 3);

  return (
    <Section id="challenges" labelledBy="challenges-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="challenges-title"
          path="challenges"
          title="Researcher Challenges"
          description="Escenarios realistas, sin guía paso a paso. Lo que se evalúa es cómo investigas, qué evidencia usas y cómo lo comunicas."
        />
        <Reveal className="shrink-0">
          <Button asChild variant="secondary">
            <Link href="/challenges" {...trackAttrs("cta_click", "Ver todos los challenges", "home_challenges")}>
              Ver todos los challenges <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 0.07}>
            <ChallengeCard challenge={c} />
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-line-strong p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            <span className="font-mono text-violet">roadmap</span> · Próximamente en la plataforma:
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {upcoming.map(({ icon: I, label }) => (
              <li key={label} className="inline-flex items-center gap-2 text-sm text-fg">
                <I className="size-4 text-violet" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
