import type { ReactNode } from "react";
import { Container } from "./section";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Niveles después de "Inicio"; activan las migas visibles y su schema. */
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}

/** Cabecera común de las páginas internas: una sola idea y espaciado contenido. */
export function PageHero({ id, eyebrow, title, description, breadcrumbs, children, className }: PageHeroProps) {
  return (
    <header
      id={id}
      className={cn(
        "relative isolate overflow-hidden border-b border-line pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-28 lg:pb-12",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_65%)]"
      />
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <p className="hud-label flex items-center gap-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-4xl font-display text-[1.7rem] leading-[1.08] font-medium tracking-tight text-fg sm:text-[clamp(1.9rem,5vw,3.4rem)]">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
        {children}
      </Container>
    </header>
  );
}
