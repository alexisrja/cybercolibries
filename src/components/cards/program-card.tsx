import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon";
import { trackAttrs } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Initiative, InitiativeStatus } from "@/types";

const statusMeta: Record<InitiativeStatus, { label: string; tone: "teal" | "nectar" | "violet" }> = {
  activo: { label: "Activo", tone: "teal" },
  convocatoria: { label: "Convocatoria abierta", tone: "nectar" },
  proximamente: { label: "Próximamente", tone: "violet" },
};

export function ProgramCard({ initiative, className }: { initiative: Initiative; className?: string }) {
  const status = statusMeta[initiative.status];
  const featured = initiative.featured;

  return (
    <article
      className={cn(
        "card-iri group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 sm:p-7",
        featured && "overflow-hidden",
        className,
      )}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--violet)_30%,transparent),transparent_65%)]"
        />
      )}
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "grid place-items-center rounded-xl border border-line-strong bg-elevated/70 text-teal transition-transform duration-500 group-hover:-rotate-6",
            featured ? "size-14" : "size-12",
          )}
        >
          <Icon name={initiative.icon} className={featured ? "size-6" : "size-5"} />
        </span>
        <Badge tone={status.tone} dot>
          {status.label}
        </Badge>
      </div>

      <p className="hud-label mt-8">{initiative.category}</p>
      <h3
        className={cn(
          "mt-2 font-display font-medium tracking-tight text-fg",
          featured ? "text-2xl sm:text-[1.85rem] sm:leading-tight" : "text-lg leading-snug",
        )}
      >
        {initiative.title}
      </h3>
      <p className={cn("mt-3 leading-relaxed text-muted", featured && "max-w-xl sm:text-lg")}>{initiative.description}</p>

      <div className="mt-auto pt-8">
        <Link
          href={initiative.cta.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          {...trackAttrs("cta_click", initiative.cta.label, `initiative:${initiative.id}`)}
        >
          {initiative.cta.label}
          <ArrowUpRight
            className="size-4 text-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
