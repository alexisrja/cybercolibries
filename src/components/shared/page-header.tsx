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

interface PageHeaderProps {
  breadcrumbs: Crumb[];
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Cabecera de páginas internas con migas de pan (visibles y en schema.org). */
export function PageHeader({ breadcrumbs, eyebrow, title, description, children }: PageHeaderProps) {
  const trail = [{ name: "Inicio", path: "/" }, ...breadcrumbs];

  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--violet)_14%,transparent),transparent_65%)]"
      />
      <Container>
        <nav aria-label="Migas de pan">
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
                    <Link href={c.path} className="transition-colors hover:text-fg">
                      {c.name}
                    </Link>
                  )}
                  {!last && <ChevronRight className="size-3" aria-hidden />}
                </li>
              );
            })}
          </ol>
        </nav>
        {eyebrow && <div className="mt-8">{eyebrow}</div>}
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[1.05] font-medium tracking-[-0.035em] text-fg">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
        {children}
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </header>
  );
}
