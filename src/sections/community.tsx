import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { trackAttrs } from "@/lib/analytics";
import { cn, dateParts } from "@/lib/utils";
import type { CommunityActivity, CommunityEvent, GalleryItem } from "@/types";

/* Composición generativa mientras llegan las fotografías reales. */
function GalleryTile({ item, index, className }: { item: GalleryItem; index: number; className?: string }) {
  const hues = [
    "from-teal/30 via-blue/10 to-transparent",
    "from-violet/30 via-magenta/10 to-transparent",
    "from-blue/30 via-teal/10 to-transparent",
    "from-magenta/25 via-violet/10 to-transparent",
    "from-teal/25 via-violet/15 to-transparent",
  ];
  return (
    <figure className={cn("group relative overflow-hidden rounded-2xl border border-line bg-elevated", className)}>
      {item.image ? (
        <Image
          src={item.image}
          alt={item.alt ?? item.caption}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-br", hues[index % hues.length])}>
          <div className="absolute inset-0 bg-grid opacity-70 [mask-image:none]" />
          <svg viewBox="0 0 200 120" className="absolute inset-0 size-full opacity-60" preserveAspectRatio="none">
            {Array.from({ length: 7 }).map((_, i) => (
              <circle
                key={i}
                cx={20 + ((i * 53 + index * 31) % 170)}
                cy={15 + ((i * 37 + index * 17) % 95)}
                r={i % 3 === 0 ? 2.2 : 1.4}
                className="fill-fg/40"
              />
            ))}
          </svg>
        </div>
      )}
      <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-xl glass border border-line px-3 py-2 text-sm text-fg">
        <span className="truncate">{item.caption}</span>
        <span className="font-mono text-[0.68rem] tracking-wider text-subtle uppercase">{item.kind}</span>
      </figcaption>
    </figure>
  );
}

interface CommunityProps {
  activities: CommunityActivity[];
  events: CommunityEvent[];
  gallery: GalleryItem[];
}

export function Community({ activities, events, gallery }: CommunityProps) {
  return (
    <Section id="comunidad" labelledBy="community-title">
      <SectionHeader
        id="community-title"
        path="comunidad"
        title={
          <>
            Una comunidad que <span className="text-iri">aprende junta</span>.
          </>
        }
        description="El programa dura seis meses; la comunidad se queda. Aquí preguntas sin miedo, compartes lo que descubres y encuentras a las personas con las que vas a crecer."
      />

      {/* Actividades */}
      <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {activities.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.05}>
            <div className="card-iri h-full rounded-2xl p-5">
              <Icon name={a.icon} className="size-5 text-teal" />
              <h3 className="mt-5 font-medium text-fg">{a.title}</h3>
              <p className="mt-1 text-sm leading-snug text-muted">{a.description}</p>
              <p className="mt-4 font-mono text-[0.68rem] tracking-wider text-subtle uppercase">{a.cadence}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Galería */}
        <Reveal>
          <div className="grid h-full auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-3">
            {gallery.map((item, i) => (
              <GalleryTile
                key={item.id}
                item={item}
                index={i}
                className={cn(i === 0 && "col-span-2 row-span-2", i === 4 && "sm:col-span-2")}
              />
            ))}
          </div>
        </Reveal>

        {/* Próximos eventos */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-2xl border border-line bg-elevated/40 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-medium tracking-tight">Próximos eventos</h3>
              <span className="hud-label">agenda</span>
            </div>
            <ul className="mt-5 divide-y divide-line">
              {events.map((e) => {
                const { day, month } = dateParts(e.date);
                return (
                  <li key={e.id} className="flex gap-4 py-4 first:pt-0">
                    <time
                      dateTime={e.date}
                      className="grid size-14 shrink-0 place-content-center rounded-xl border border-line-strong text-center"
                    >
                      <span className="font-display text-lg leading-none text-fg">{day}</span>
                      <span className="mt-1 font-mono text-[0.65rem] tracking-wider text-subtle uppercase">{month}</span>
                    </time>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="violet">{e.type}</Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-subtle">
                          <MapPin className="size-3" aria-hidden />
                          {e.modality}
                        </span>
                      </div>
                      <p className="mt-2 leading-snug font-medium text-fg">{e.title}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto pt-4">
              <Button asChild className="w-full">
                <Link href="/?perfil=researcher#contacto" {...trackAttrs("join_click", "Únete a la comunidad", "community")}>
                  Únete a la comunidad <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
