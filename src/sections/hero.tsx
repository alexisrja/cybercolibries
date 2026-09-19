import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";
import { trackAttrs } from "@/lib/analytics";
import { formatNumber } from "@/lib/utils";
import type { Metric } from "@/types";

/**
 * El emblema se presenta sobre un "escenario" técnico: anillos de órbita,
 * nodos de red y un halo con los colores de la marca. Refuerza la idea de
 * comunidad conectada sin competir con el logotipo.
 */
function BrandStage() {
  return (
    <div className="relative mx-auto w-52 sm:w-80 lg:w-full lg:max-w-[30rem]">
      <div className="relative aspect-square">
        <div
          aria-hidden
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--teal)_28%,transparent),transparent_62%),radial-gradient(circle_at_70%_70%,color-mix(in_oklab,var(--magenta)_20%,transparent),transparent_58%)] blur-2xl"
        />
        <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 size-full">
          <g fill="none" className="stroke-line-strong">
            <circle cx="200" cy="200" r="196" />
            <circle cx="200" cy="200" r="150" strokeDasharray="2 10" className="motion-safe:animate-dash" />
            <circle cx="200" cy="200" r="104" opacity="0.5" />
          </g>
          {[
            [200, 4],
            [396, 200],
            [200, 396],
            [4, 200],
            [58, 58],
            [342, 342],
          ].map(([cx, cy], i) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="3.5"
              className="fill-bg stroke-teal motion-safe:animate-pulse-node"
              strokeWidth="1.4"
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          ))}
        </svg>
        <BrandMark
          alt="Colibrí multicolor, emblema de CyberColibríes"
          eager
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 320px, 208px"
          className="absolute inset-[10%] size-[80%] motion-safe:animate-hover"
        />
      </div>

      <p className="hud-label absolute top-[6%] -left-2 hidden rounded-md border border-line bg-elevated/80 px-2.5 py-1.5 sm:block">
        gen <span className="text-teal">05</span> · activa
      </p>
      <p className="hud-label absolute right-0 bottom-[8%] hidden items-center gap-2 rounded-md border border-line bg-elevated/80 px-2.5 py-1.5 sm:flex">
        <span aria-hidden className="size-1.5 rounded-full bg-teal motion-safe:animate-pulse" />
        comunidad <span className="text-fg">en línea</span>
      </p>
    </div>
  );
}

export function Hero({ stats }: { stats: Metric[] }) {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 pb-8 sm:pt-28 lg:pt-28 lg:pb-12"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <Container className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="relative min-w-0">
          <Link
            href="/programas/researcher-program"
            className="group inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-sm text-muted transition-colors hover:border-teal/50 hover:text-fg"
            {...trackAttrs("program_interest", "Convocatoria abierta", "hero_badge")}
          >
            <span className="shrink-0 font-mono text-xs text-teal uppercase">Abierta</span>
            <span className="sm:hidden">Researcher Program · Gen 5</span>
            <span className="hidden sm:inline">Convocatoria Researcher Program · Gen 5</span>
            <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[1.6rem] leading-[1.08] font-medium tracking-normal min-[375px]:text-[1.75rem] sm:text-[4rem] xl:text-[5rem]"
          >
            <span className="text-fg sm:block">Cyber</span>
            <span className="text-iri sm:block">Colibríes</span>
          </h1>
          <p className="mt-4 max-w-xl text-xl leading-snug font-medium text-fg sm:mt-6 sm:text-[1.75rem]">
            Formación, comunidad e impacto en ciberseguridad.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-muted sm:text-lg">
            Impulsamos nuevas generaciones mediante educación accesible, práctica, mentoría y colaboración.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href="/#programas" {...trackAttrs("cta_click", "Conoce nuestros programas", "hero")}>
                Conoce nuestros programas
                <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/#participa" {...trackAttrs("join_click", "Únete a la comunidad", "hero")}>
                Únete a la comunidad
              </Link>
            </Button>
          </div>
        </div>

        <BrandStage />
      </Container>

      {/* Pulso de la comunidad: prueba social inmediata, con los mismos datos que Impacto. */}
      <Container className="mt-10 sm:mt-14">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-bg px-5 py-4">
              <dt className="hud-label">{stat.label}</dt>
              <dd className="mt-1.5 font-display text-2xl font-medium tracking-tight text-fg tabular-nums sm:text-[1.75rem]">
                {formatNumber(stat.value)}
                {stat.suffix && <span className="text-teal">{stat.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
        <a
          href="#nosotros"
          className="mt-6 inline-flex min-h-11 items-center gap-3 font-mono text-xs text-muted transition-colors hover:text-fg"
        >
          <ArrowDown className="size-4" aria-hidden />
          Conoce CyberColibríes
        </a>
      </Container>
    </section>
  );
}
