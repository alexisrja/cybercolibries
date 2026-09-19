import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { trackAttrs } from "@/lib/analytics";
import type { ParticipationPath } from "@/types";

export function Participate({ paths }: { paths: ParticipationPath[] }) {
  return (
    <Section id="participa" labelledBy="participate-title">
      <SectionHeader
        id="participate-title"
        path="participa"
        align="center"
        title={
          <>
            Hay un lugar para ti en <span className="text-iri">la bandada</span>.
          </>
        }
        description="Llegues para aprender, enseñar o abrir puertas, empieza por aquí. Elige tu camino y te contactamos."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 3) * 0.07}>
            <Link
              href={`/?perfil=${p.id}#contacto`}
              className="card-iri group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 sm:p-7"
              {...trackAttrs("join_click", p.title, "participate")}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-elevated/60 text-teal transition-colors duration-300 group-hover:border-teal/50">
                  <Icon name={p.icon} className="size-5" />
                </span>
                <ArrowRight
                  className="size-5 -translate-x-2 text-teal opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  aria-hidden
                />
              </div>
              <h3 className="mt-7 font-display text-lg font-medium tracking-tight text-fg">{p.title}</h3>
              <p className="mt-2 text-muted">{p.description}</p>
              <span className="mt-auto pt-6 text-sm font-medium text-teal">{p.cta}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
