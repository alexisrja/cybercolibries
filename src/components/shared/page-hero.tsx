import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "./section";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema } from "@/lib/seo";

interface Crumb {
  name: string;
  path: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Cabecera común de las páginas internas: una sola idea, mucho aire. */
export function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  const trail = breadcrumbs ? [{ name: "Inicio", path: "/" }, ...breadcrumbs] : null;

  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_65%)]"
      />
      <Container>
        {trail && (
          <nav aria-label="Migas de pan" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-subtle">
              {trail.map((c, i) => {
                const last = i === trail.length - 1;
                return (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className="text-muted">
                        {c.name}
                      </span>
                    ) : (
                      <Link href={c.path} className="inline-flex min-h-8 items-center transition-colors hover:text-fg">
                        {c.name}
                      </Link>
                    )}
                    {!last && <ChevronRight className="size-3" aria-hidden />}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="hud-label flex items-center gap-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.08] font-medium tracking-tight text-fg">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
        {children}
      </Container>
      {trail && <JsonLd data={breadcrumbSchema(trail)} />}
    </header>
  );
}
