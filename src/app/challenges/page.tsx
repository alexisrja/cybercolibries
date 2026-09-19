import { ChallengeCard } from "@/components/cards/challenge-card";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/section";
import { ChallengeExplorer } from "@/features/challenges/challenge-explorer";
import { buildMetadata } from "@/lib/seo";
import { getChallenges } from "@/services/challenges.service";

export const metadata = buildMetadata({
  title: "Researcher Challenges",
  description:
    "Retos prácticos de ciberseguridad para desarrollar investigación, razonamiento y criterio técnico: redes, SOC, pentesting, threat intelligence y forense.",
  path: "/challenges",
});

const rules = [
  { title: "Sin guía paso a paso", text: "Recibes un escenario y preguntas abiertas, como en el trabajo real." },
  { title: "Evidencia primero", text: "Cada conclusión debe apoyarse en algo que puedas mostrar." },
  { title: "Se evalúa el proceso", text: "Un mentor revisa cómo llegaste, no solo a dónde llegaste." },
];

export default async function ChallengesPage() {
  const challenges = await getChallenges();
  const cards = Object.fromEntries(challenges.map((c) => [c.slug, <ChallengeCard key={c.slug} challenge={c} headingLevel="h2" />]));

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Challenges", path: "/challenges" }]}
        eyebrow={<p className="hud-label"><span className="text-teal">~/</span>challenges</p>}
        title={
          <>
            Researcher <span className="text-iri">Challenges</span>
          </>
        }
        description="Retos prácticos para desarrollar investigación, razonamiento y criterio técnico. Elige uno, investiga y documenta lo que encuentres."
      >
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {rules.map((r) => (
            <li key={r.title} className="rounded-2xl border border-line bg-bg/60 p-5">
              <p className="font-medium text-fg">{r.title}</p>
              <p className="mt-1 text-sm text-muted">{r.text}</p>
            </li>
          ))}
        </ul>
      </PageHeader>
      <Container className="py-14 sm:py-20">
        <ChallengeExplorer challenges={challenges} cards={cards} />
      </Container>
    </>
  );
}
