import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";
import { home } from "@/data/content";
import { trackAttrs } from "@/lib/analytics";

/** El emblema sobre un escenario de red: comunidad conectada, sin adornos de más. */
function BrandStage() {
  return (
    <div className="relative mx-auto aspect-square w-52 sm:w-80 lg:w-full lg:max-w-[28rem]">
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--accent)_26%,transparent),transparent_62%),radial-gradient(circle_at_70%_70%,color-mix(in_oklab,var(--accent-soft)_22%,transparent),transparent_58%)] blur-2xl"
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
            className="fill-bg stroke-accent motion-safe:animate-pulse-node"
            strokeWidth="1.4"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}
      </svg>
      <BrandMark
        alt="Colibrí multicolor, emblema de CyberColibríes"
        eager
        sizes="(min-width: 1024px) 448px, (min-width: 640px) 320px, 208px"
        className="absolute inset-[10%] size-[80%] motion-safe:animate-hover"
      />
    </div>
  );
}

export function HomeHero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 pb-10 sm:pt-28 lg:pt-32 lg:pb-16"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0">
          <p className="hud-label flex items-center gap-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {home.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(1.85rem,6vw,3.4rem)] leading-[1.02] font-medium tracking-tight text-iri"
          >
            {home.title}
          </h1>
          <p className="mt-5 max-w-xl text-[clamp(1.2rem,3.4vw,1.75rem)] leading-snug font-medium text-fg">
            {home.subtitle}
          </p>
          <p className="mt-5 max-w-lg leading-relaxed text-muted sm:text-lg">{home.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href={home.primaryCta.href} {...trackAttrs("join_click", home.primaryCta.label, "home_hero")}>
                {home.primaryCta.label}
                <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={home.secondaryCta.href} {...trackAttrs("cta_click", home.secondaryCta.label, "home_hero")}>
                {home.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>

        <BrandStage />
      </Container>
    </section>
  );
}
