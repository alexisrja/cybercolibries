import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Migas de pan visibles más su `BreadcrumbList` de schema.org.
 * Ambas cosas van juntas: los buscadores piden que el marcado refleje
 * una navegación que la persona realmente ve en la página.
 * El primer nivel ("Inicio") se añade aquí para no repetirlo en cada página.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ name: "Inicio", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Migas de pan" className={cn("mb-8", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-subtle">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-muted">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="inline-flex min-h-8 items-center transition-colors hover:text-fg"
                  >
                    {crumb.name}
                  </Link>
                )}
                {!last && <ChevronRight className="size-3" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
