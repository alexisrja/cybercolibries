import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { MethodPath } from "@/features/program/method-path";
import type { MethodStep } from "@/types";

export function Methodology({ steps, skills }: { steps: MethodStep[]; skills: string[] }) {
  return (
    <Section id="metodologia" labelledBy="method-title" className="border-y border-line bg-elevated/30">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <SectionHeader
        id="method-title"
        path="metodologia"
        title="Cómo aprendemos"
        description="No memorizamos herramientas: entrenamos la forma de pensar de una persona investigadora. Cada ciclo termina con feedback y empieza un nivel más arriba."
      />

      <MethodPath steps={steps} />

      <Reveal className="mt-20 grid gap-8 rounded-2xl border border-line bg-bg/60 p-6 sm:p-8 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <h3 className="font-display text-xl font-medium tracking-tight">Lo que desarrollas</h3>
          <p className="mt-2 text-muted">Habilidades que se quedan contigo aunque cambien las herramientas.</p>
        </div>
        <ul className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg transition-[border-color,box-shadow] duration-300 hover:border-teal/60 hover:shadow-[0_0_18px_-6px_var(--teal)]"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
