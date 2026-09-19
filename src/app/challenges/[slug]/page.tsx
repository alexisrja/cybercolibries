import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, FileText, Lock } from "lucide-react";
import { ChallengeCard, DifficultyMeter } from "@/components/cards/challenge-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/section";
import { challengeStatusMeta } from "@/data/challenges";
import { researcherProgram } from "@/data/program";
import { trackAttrs } from "@/lib/analytics";
import { buildMetadata, organizationId } from "@/lib/seo";
import { pad2 } from "@/lib/utils";
import { getChallengeBySlug, getChallenges, getRelatedChallenges } from "@/services/challenges.service";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getChallenges()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/challenges/[slug]">) {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);
  if (!challenge) return {};
  return buildMetadata({
    title: `${challenge.title} · Challenge`,
    description: challenge.summary,
    path: `/challenges/${challenge.slug}`,
  });
}

export default async function ChallengePage({ params }: PageProps<"/challenges/[slug]">) {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);
  if (!challenge) notFound();

  const related = await getRelatedChallenges(challenge);
  const status = challengeStatusMeta[challenge.status];
  const mod = researcherProgram.modules.find((m) => m.number === challenge.moduleNumber);
  const available = challenge.status === "disponible";

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Challenges", path: "/challenges" },
          { name: challenge.title, path: `/challenges/${challenge.slug}` },
        ]}
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={status.tone} dot>
              {status.label}
            </Badge>
            <span className="hud-label">{challenge.category}</span>
          </div>
        }
        title={challenge.title}
        description={challenge.summary}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <DifficultyMeter difficulty={challenge.difficulty} />
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            <Clock className="size-4 text-teal" aria-hidden /> {challenge.estimatedTime}
          </span>
          <p className="font-mono text-xs text-teal">{challenge.skills.join(" · ")}</p>
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="scenario-title">
            <h2 id="scenario-title" className="hud-label text-teal">
              Escenario
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-fg">{challenge.scenario}</p>
          </section>

          <section aria-labelledby="objectives-title">
            <h2 id="objectives-title" className="font-display text-xl font-medium tracking-tight">
              Objetivos
            </h2>
            <ul className="mt-5 space-y-3">
              {challenge.objectives.map((o) => (
                <li key={o} className="flex gap-3 text-muted">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="deliverables-title">
            <h2 id="deliverables-title" className="font-display text-xl font-medium tracking-tight">
              Entregables
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {challenge.deliverables.map((d) => (
                <li key={d} className="flex gap-3 rounded-xl border border-line p-4 text-sm text-fg">
                  <FileText className="size-4 shrink-0 text-violet" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="hud-corners rounded-2xl border border-line bg-elevated/50 p-6">
            <p className="hud-label">Tu progreso</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {available
                ? "Pronto podrás iniciar este reto desde tu perfil, guardar avances y recibir feedback de un mentor. Mientras tanto, se habilita para researchers del programa."
                : "Este reto aún no está abierto. Déjanos tus datos y te avisamos cuando se publique."}
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-line-strong p-3 text-xs text-subtle">
              <Lock className="size-4" aria-hidden />
              Puntaje, badges y labs se activan con la plataforma.
            </div>
            <Button asChild className="mt-5 w-full">
              <Link href="/?perfil=researcher#contacto" {...trackAttrs("challenge_open", `solicitar:${challenge.slug}`, "challenge_detail")}>
                {available ? "Quiero resolverlo" : "Avísame cuando abra"} <ArrowRight />
              </Link>
            </Button>
          </div>

          {mod && (
            <Link
              href="/programas/researcher-program#modulos"
              className="card-iri block rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
            >
              <p className="hud-label">Relacionado con</p>
              <p className="mt-2 font-medium text-fg">
                Módulo {pad2(mod.number)} · {mod.title}
              </p>
            </Link>
          )}
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-challenges" className="border-t border-line bg-elevated/30 py-16 sm:py-20">
          <Container>
            <h2 id="related-challenges" className="font-display text-2xl font-medium tracking-tight">
              Otros challenges
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <ChallengeCard challenge={c} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: challenge.title,
          description: challenge.summary,
          learningResourceType: "Challenge",
          educationalLevel: challenge.difficulty,
          teaches: challenge.skills,
          timeRequired: challenge.estimatedTime,
          inLanguage: "es",
          provider: { "@id": organizationId },
        }}
      />
    </>
  );
}
