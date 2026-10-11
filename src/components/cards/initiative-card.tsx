import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon";
import { trackAttrs } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Initiative } from "@/types";

export function InitiativeCard({
  initiative,
  className,
  variant = "default",
}: {
  initiative: Initiative;
  className?: string;
  variant?: "default" | "visual";
}) {
  const soon = initiative.status === "proximamente";

  if (variant === "visual" && initiative.image) {
    const image = (
      <>
        <Image
          src={initiative.image}
          alt={`Ilustración de ${initiative.name}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/25 via-transparent to-bg/10" aria-hidden />
        {soon && (
          <Badge tone="info" className="absolute top-4 right-4 bg-bg/90 text-accent-soft shadow-lg backdrop-blur-md">
            Próximamente
          </Badge>
        )}
        <div className="sr-only">
          <h3>{initiative.name}</h3>
          <p>{initiative.summary}</p>
        </div>
      </>
    );

    return (
      <article
        className={cn(
          "card-iri group relative aspect-[4/3] h-full overflow-hidden rounded-2xl p-0",
          className,
        )}
      >
        {initiative.cta ? (
          <Link
            href={initiative.cta.href}
            aria-label={initiative.cta.label}
            className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            {...trackAttrs("cta_click", initiative.cta.label, `initiative:${initiative.slug}`)}
          >
            {image}
          </Link>
        ) : (
          image
        )}
      </article>
    );
  }

  return (
    <article className={cn("card-iri group flex h-full flex-col rounded-2xl p-6 sm:p-7", className)}>
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-elevated/60 text-accent">
          <Icon name={initiative.icon} className="size-5" />
        </span>
        {soon && <Badge tone="info">Próximamente</Badge>}
      </div>
      <h3 className="mt-7 font-display text-xl leading-snug font-medium tracking-tight text-fg">{initiative.name}</h3>
      <p className="mt-3 leading-relaxed text-muted">{initiative.summary}</p>
      {initiative.cta && (
        <Link
          href={initiative.cta.href}
          className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-fg after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          {...trackAttrs("cta_click", initiative.cta.label, `initiative:${initiative.slug}`)}
        >
          {initiative.cta.label}
          <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </article>
  );
}
