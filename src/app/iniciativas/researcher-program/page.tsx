import { notFound } from "next/navigation";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/shared/section";
import { ValueGrid } from "@/components/shared/value-grid";
import { buildMetadata, organizationId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getInitiative } from "@/services/content.service";

export const metadata = buildMetadata({
  title: "CyberColibrí Researcher Program",
  description:
    "Ruta de formación para desarrollar las primeras capacidades profesionales en ciberseguridad mediante contenido, práctica, acompañamiento y retos.",
  path: "/iniciativas/researcher-program",
});

export default async function ResearcherProgramPage() {
  const program = await getInitiative("researcher-program");
  if (!program) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Iniciativas", path: "/iniciativas" },
          { name: "Researcher Program", path: "/iniciativas/researcher-program" },
        ]}
        eyebrow="Iniciativa"
        title={program.name}
        description={program.description}
      />

      <Section labelledBy="pilares-title">
        <SectionHeader
          id="pilares-title"
          eyebrow="Cómo funciona"
          title="Formación, práctica, mentoría y comunidad"
          description="El programa combina estos cuatro elementos a lo largo de toda la ruta."
        />
        {program.pillars && <ValueGrid items={program.pillars} className="mt-12" />}
      </Section>

      {/*
        El documento de contenido pide no publicar temarios ni detalles
        operativos en esta etapa. Cuando el temario y las fechas estén
        confirmados, se agregan aquí como una nueva sección.
      */}

      <CtaBand
        title="¿Quieres formar parte de la próxima generación?"
        body="Déjanos tus datos y te avisamos cuando abra la convocatoria."
        cta={{ label: "Quiero participar", href: "/participa?perfil=aprender#contacto" }}
        location="researcher_program"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: program.name,
          description: program.description,
          url: absoluteUrl("/iniciativas/researcher-program"),
          inLanguage: "es",
          provider: { "@id": organizationId },
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "online" },
        }}
      />
    </>
  );
}
