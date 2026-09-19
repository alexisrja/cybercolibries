import type { ProgramFact } from "@/types";

/** Ficha técnica del programa: duración, modalidad, nivel, perfil y metodología. */
export function ProgramFacts({ facts }: { facts: ProgramFact[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5 [&>div]:bg-bg">
      {facts.map((fact) => (
        <div key={fact.label} className="p-5 last:sm:col-span-2 last:lg:col-span-1">
          <dt className="hud-label">{fact.label}</dt>
          <dd className="mt-2 font-display text-[1.05rem] font-medium tracking-tight text-fg">{fact.value}</dd>
          {fact.detail && <dd className="mt-1 text-sm leading-snug text-muted">{fact.detail}</dd>}
        </div>
      ))}
    </dl>
  );
}
