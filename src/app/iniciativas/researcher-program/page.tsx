import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd } from "@/components/shared/json-ld";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeader } from "@/components/shared/section";
import { home } from "@/data/content";
import { buildMetadata, organizationId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "CyberColibrí Researcher Program",
  description:
    "Programa introductorio gratuito de siete meses para desarrollar capacidades en tecnología y ciberseguridad mediante formación teórico-práctica.",
  path: "/iniciativas/researcher-program",
});

const facts = [
  { value: "7 meses", label: "Duración" },
  { value: "14 sesiones", label: "Prácticas virtuales" },
  { value: "20 horas", label: "Bajo demanda" },
] as const;

const officialData = [
  ["Duración", "7 meses"],
  ["Modalidad", "Teórico-práctica / híbrida"],
  ["Prácticas", "14 sesiones virtuales"],
  ["Bajo demanda", "20 horas"],
  ["Nivel", "Introductorio"],
  ["Perfil de egreso", "Analista Junior de Ciberseguridad"],
] as const;

const modules = [
  {
    number: "I",
    title: "Fundamentos de Tecnologías de la Información y Ciberseguridad",
    description:
      "Comprende las bases de los sistemas tecnológicos y los principios esenciales de protección de la información.",
  },
  {
    number: "II",
    title: "Redes e Infraestructura Tecnológica",
    description:
      "Explora cómo se conectan los dispositivos, las redes y los servicios que permiten la comunicación.",
  },
  {
    number: "III",
    title: "Gestión de Vulnerabilidades",
    description:
      "Conoce los fundamentos para identificar, evaluar y gestionar debilidades que pueden afectar la seguridad.",
  },
  {
    number: "IV",
    title: "Hacking Ético",
    description:
      "Introducción al propósito de las evaluaciones de seguridad y a las pruebas realizadas de manera autorizada.",
  },
  {
    number: "V",
    title: "Monitoreo de Seguridad",
    description:
      "Familiarízate con el monitoreo de entornos tecnológicos y el análisis inicial de eventos de seguridad.",
  },
  {
    number: "VI",
    title: "Ciberinteligencia de Amenazas",
    description:
      "Descubre cómo la investigación y el análisis de información contribuyen a comprender amenazas cibernéticas.",
  },
  {
    number: "VII",
    title: "Respuesta a Incidentes",
    description:
      "Conoce los fundamentos para identificar, analizar y atender posibles incidentes de seguridad.",
  },
  {
    number: "VIII",
    title: "Informática Forense",
    description:
      "Introducción a los principios de investigación digital y al análisis de evidencias relacionadas con incidentes.",
  },
] as const;

function ModuleCard({ module }: { module: (typeof modules)[number] }) {
  return (
    <li className="card-iri grid h-full grid-cols-[3rem_1fr] items-start gap-4 rounded-2xl p-5 sm:grid-cols-[3.5rem_1fr] sm:p-6">
      <div className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-elevated/60 font-mono text-sm font-medium text-accent sm:size-14 sm:text-base">
        {module.number}
      </div>
      <div>
        <h3 className="font-display text-base leading-snug font-medium tracking-tight text-fg sm:text-lg">
          {module.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{module.description}</p>
      </div>
    </li>
  );
}

export default function ResearcherProgramPage() {
  return (
    <>
      <header
        id="researcher-program-inicio"
        aria-labelledby="researcher-title"
        className="relative isolate overflow-hidden border-b border-line pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-28 lg:pb-14"
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_65%)]"
        />
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.75fr)] lg:gap-12 xl:gap-16">
            <Reveal>
              <Breadcrumbs
                items={[
                  { name: "Iniciativas", path: "/iniciativas" },
                  { name: "Researcher Program", path: "/iniciativas/researcher-program" },
                ]}
              />
              <h1
                id="researcher-title"
                className="max-w-3xl font-display text-[1.75rem] leading-[1.08] font-medium tracking-tight text-fg sm:text-[clamp(2rem,5vw,3.4rem)]"
              >
                CyberColibrí Researcher Program
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Tu camino en ciberseguridad comienza aquí.
              </p>

              <dl className="mt-8 grid gap-3 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.value} className="card-iri flex flex-col rounded-2xl p-4 sm:p-5">
                    <dt className="order-2 mt-2 text-sm text-muted">{fact.label}</dt>
                    <dd className="order-1 font-display text-lg font-medium tracking-tight text-fg sm:text-xl">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card-iri relative mx-auto aspect-[350/273] w-full max-w-md overflow-hidden rounded-2xl">
                <Image
                  src="/initiatives/researcher-program.png"
                  alt="Ilustración del CyberColibrí Researcher Program"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 26rem, calc(100vw - 3rem)"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <p className="mt-8 text-center font-mono text-xs tracking-wide text-subtle sm:text-sm">
            Formación gratuita&nbsp; · &nbsp;Nivel introductorio&nbsp; · &nbsp;Modalidad teórico-práctica / híbrida
          </p>
        </Container>
      </header>

      <Section labelledBy="programa-title" className="border-b border-line bg-elevated/30">
        <SectionHeader
          id="programa-title"
          eyebrow="Programa"
          title="Formación con propósito."
          description="CyberColibrí Researcher Program es una iniciativa educativa gratuita impulsada por CyberColibríes, orientada a personas que desean construir sus primeras capacidades en ciberseguridad."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:gap-10">
          <Reveal>
            <div className="hud-corners h-full rounded-2xl border border-line bg-elevated/40 p-6 sm:p-7">
              <h3 className="hud-label text-accent">Nuestro propósito</h3>
              <p className="mt-4 text-lg leading-relaxed font-medium tracking-tight text-fg sm:text-xl">
                Acercar conocimientos y oportunidades de desarrollo mediante una formación progresiva que combine
                comprensión tecnológica, aprendizaje práctico e investigación.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line bg-elevated/40 p-6 sm:p-7">
              <h3 className="hud-label text-accent">Datos del programa</h3>
              <dl className="mt-4 divide-y divide-line">
                {officialData.map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-5">
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="text-sm font-medium text-fg">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="ruta-title">
        <SectionHeader
          id="ruta-title"
          eyebrow="Ruta de aprendizaje"
          title="8 módulos de formación"
          description="Una ruta introductoria que parte de la tecnología y avanza hacia las principales disciplinas de la ciberseguridad."
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-2 sm:mt-10">
          {modules.map((module) => (
            <ModuleCard key={module.number} module={module} />
          ))}
        </ol>
      </Section>

      <CtaBand {...home.closing} location="researcher_program_closing" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "CyberColibrí Researcher Program",
          description:
            "Programa introductorio gratuito de siete meses para desarrollar capacidades en tecnología y ciberseguridad.",
          url: absoluteUrl("/iniciativas/researcher-program"),
          inLanguage: "es",
          provider: { "@id": organizationId },
          educationalLevel: "Introductorio",
          timeRequired: "P7M",
          /* Gratuito: requisito de Google para el resultado enriquecido de cursos. */
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "MXN",
            category: "Free",
            availability: "https://schema.org/InStock",
            url: absoluteUrl("/participa"),
          },
          teaches: modules.map((module) => module.title),
          occupationalCategory: "Analista Junior de Ciberseguridad",
          audience: {
            "@type": "EducationalAudience",
            educationalRole: "student",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: ["online", "blended"],
            courseWorkload: "PT20H",
            inLanguage: "es",
            location: { "@type": "VirtualLocation", url: absoluteUrl("/iniciativas/researcher-program") },
          },
        }}
      />
    </>
  );
}
