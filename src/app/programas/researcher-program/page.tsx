import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { MethodPath } from "@/features/program/method-path";
import { ModuleRoute } from "@/features/program/module-route";
import { ProgramFacts } from "@/features/program/program-facts";
import { trackAttrs } from "@/lib/analytics";
import { buildMetadata, organizationId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getMethodology, getProgram } from "@/services/program.service";

export const metadata = buildMetadata({
  title: "CyberColibrí Researcher Program",
  description:
    "De los fundamentos a tu primer perfil junior en ciberseguridad: seis módulos, Researcher Missions, challenges y mentoría. Programa online en vivo.",
  path: "/programas/researcher-program",
});

const faqs = [
  {
    q: "¿Necesito experiencia previa en ciberseguridad?",
    a: "No. El módulo 01 parte de los fundamentos. Sí te pedimos constancia: entre 8 y 10 horas por semana entre sesiones y práctica.",
  },
  {
    q: "¿Qué equipo necesito?",
    a: "Una computadora con al menos 8 GB de RAM y conexión estable. En el primer módulo montamos juntos tu laboratorio con herramientas gratuitas.",
  },
  {
    q: "¿Cómo es el proceso de selección?",
    a: "Llenas una postulación breve, resuelves un reto introductorio y tienes una conversación corta con el equipo. Buscamos curiosidad y compromiso, no currículums perfectos.",
  },
  {
    q: "¿Qué pasa al terminar?",
    a: "Te quedas en la comunidad: sigues resolviendo challenges, publicas en Labs, puedes volverte mentor y accedes a las oportunidades que comparten nuestras alianzas.",
  },
];

export default async function ResearcherProgramPage() {
  const [program, methodology] = await Promise.all([getProgram("researcher-program"), getMethodology()]);
  if (!program) notFound();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Programas", path: "/#programas" },
          { name: "Researcher Program", path: "/programas/researcher-program" },
        ]}
        eyebrow={<p className="hud-label"><span className="text-teal">~/</span>programas/researcher-program</p>}
        title={program.headline}
        description={program.description}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/?perfil=researcher#contacto" {...trackAttrs("program_interest", "Quiero participar", "program_page_hero")}>
              Quiero participar <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#modulos">Ver los módulos</a>
          </Button>
        </div>
      </PageHeader>

      <Section labelledBy="facts-title" className="pb-0 sm:pb-0 lg:pb-0">
        <h2 id="facts-title" className="sr-only">
          Ficha del programa
        </h2>
        <Reveal>
          <ProgramFacts facts={program.facts} />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line p-7">
              <h3 className="font-display text-xl font-medium tracking-tight">Para quién es</h3>
              <ul className="mt-5 space-y-3">
                {program.audience.map((a) => (
                  <li key={a} className="flex gap-3 text-muted">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-teal" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-line p-7">
              <h3 className="font-display text-xl font-medium tracking-tight">Qué incluye</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {program.includes.map((i) => (
                  <li key={i} className="flex gap-3 text-sm text-fg">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="modulos" labelledBy="modules-title">
        <SectionHeader
          id="modules-title"
          path="researcher-program/modulos"
          title="Ruta de aprendizaje"
          description="Seis módulos que construyen uno sobre otro. Cada uno termina con una Researcher Mission: una investigación que se revisa con un mentor."
        />
        <ModuleRoute modules={program.modules} detailed />
      </Section>

      <Section labelledBy="method-title" className="border-y border-line bg-elevated/30">
        <SectionHeader
          id="method-title"
          path="researcher-program/metodologia"
          title="Así se vive cada módulo"
          description={`Desarrollas ${methodology.skills.slice(0, -1).join(", ").toLowerCase()} y ${methodology.skills.at(-1)?.toLowerCase()}.`}
        />
        <MethodPath steps={methodology.steps} />
      </Section>

      <Section labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader id="faq-title" path="researcher-program/faq" title="Preguntas frecuentes" />
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md text-lg font-medium text-fg">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-teal transition-transform duration-300 group-open:rotate-45" aria-hidden />
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-line-strong p-8 text-center sm:p-14">
            <div aria-hidden className="absolute inset-0 -z-10 bg-iri opacity-10" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
            <p className="hud-label">Convocatoria abierta · Generación 5</p>
            <p className="mx-auto mt-4 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-tight font-medium tracking-tight">
              Tu primer perfil junior empieza con una postulación.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/?perfil=researcher#contacto" {...trackAttrs("program_interest", "Quiero participar", "program_page_footer")}>
                  Quiero participar <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/challenges">Probar un challenge</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: program.name,
            description: program.description,
            url: absoluteUrl("/programas/researcher-program"),
            inLanguage: "es",
            educationalLevel: "Principiante",
            provider: { "@id": organizationId },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
              courseWorkload: "PT10H/semana",
              duration: "P24W",
            },
            syllabusSections: program.modules.map((m) => ({
              "@type": "Syllabus",
              name: m.title,
              description: m.summary,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
    </>
  );
}
