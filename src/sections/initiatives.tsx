import { ProgramCard } from "@/components/cards/program-card";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { initiatives } from "@/data/institutional";

export function Initiatives() {
  return (
    <Section id="programas" labelledBy="initiatives-title">
      <SectionHeader
        id="initiatives-title"
        path="programas"
        title="¿Qué hacemos?"
        description="Cinco iniciativas conectadas: aprendes en el programa, practicas en los challenges, profundizas en Labs y creces con la comunidad."
      />
      <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {initiatives.map((item, i) => (
          <Reveal as="li" key={item.id} delay={i * 0.06} className={item.featured ? "md:col-span-2" : undefined}>
            <ProgramCard initiative={item} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
