import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { trackAttrs } from "@/lib/analytics";
import type { PartnerProfile } from "@/types";

const profileToContact: Record<string, string> = {
  universidades: "universidad",
  empresas: "empresa",
  comunidades: "colaborador",
};

export function Alliances({ profiles }: { profiles: PartnerProfile[] }) {
  return (
    <Section id="alianzas" labelledBy="alliances-title" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[30rem] w-[40rem] translate-x-1/3 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--magenta)_10%,transparent),transparent_65%)]"
      />
      <SectionHeader
        id="alliances-title"
        path="alianzas"
        title="Construyamos más oportunidades juntos."
        description="Cada alianza se traduce en más becas, más mentores, más laboratorios y más personas llegando a su primer empleo en seguridad."
      />

      <ul className="mt-14 grid gap-4 lg:grid-cols-3">
        {profiles.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 0.08}>
            <article className="card-iri group flex h-full flex-col rounded-2xl p-7">
              <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-elevated/60 text-teal">
                <Icon name={p.icon} className="size-5" />
              </span>
              <h3 className="mt-7 font-display text-xl font-medium tracking-tight">{p.title}</h3>
              <p className="mt-2 text-muted">{p.description}</p>
              <ul className="mt-6 space-y-2.5">
                {p.offers.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-fg">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
              <Link
                href={`/?perfil=${profileToContact[p.id] ?? "colaborador"}#contacto`}
                className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-fg"
                {...trackAttrs("cta_click", `Alianza ${p.title}`, "alliances")}
              >
                Hablemos
                <span className="sr-only"> sobre una alianza con {p.title.toLowerCase()}</span>
                <ArrowRight className="size-4 text-teal transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-line-strong p-8 sm:p-10">
          <div aria-hidden className="absolute inset-0 -z-10 bg-iri opacity-[0.08]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-2xl font-medium tracking-tight sm:text-[1.7rem]">
                ¿Tu organización quiere formar el talento que necesita?
              </p>
              <p className="mt-2 text-muted">Diseñamos la colaboración contigo: desde una charla hasta una cohorte completa.</p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link href="/?perfil=empresa#contacto" {...trackAttrs("cta_click", "Quiero colaborar", "alliances_band")}>
                Quiero colaborar <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
