import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { ModuleRoute } from "@/features/program/module-route";
import { ProgramFacts } from "@/features/program/program-facts";
import { trackAttrs } from "@/lib/analytics";
import type { Program } from "@/types";

export function ResearcherProgram({ program }: { program: Program }) {
  return (
    <Section id="researcher-program" labelledBy="program-title" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 left-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--blue)_12%,transparent),transparent_65%)]"
      />
      <SectionHeader
        id="program-title"
        path="programas/researcher-program"
        title={program.headline}
        description={program.description}
      />
      <Reveal delay={0.1} className="mt-12">
        <ProgramFacts facts={program.facts} />
      </Reveal>

      <ModuleRoute modules={program.modules} />

      <Reveal className="mt-16 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/programas/researcher-program" {...trackAttrs("program_interest", "Conoce el programa", "home_program")}>
            Conoce el programa <ArrowRight />
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/?perfil=researcher#contacto" {...trackAttrs("program_interest", "Quiero participar", "home_program")}>
            Quiero participar
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}
