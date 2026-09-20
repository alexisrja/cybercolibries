import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";
import type { ValueCard } from "@/types";

/** Rejilla de bloques breves (Aprendemos/Practicamos…, Lo que nos mueve, Impacto). */
export function ValueGrid({
  items,
  columns = 4,
  className,
}: {
  items: ValueCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-4",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % 4) * 0.06}>
          <article className="card-iri h-full rounded-2xl p-6 sm:p-7">
            <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-elevated/60 text-teal">
              <Icon name={item.icon} className="size-5" />
            </span>
            <h3 className="mt-6 font-display text-lg font-medium tracking-tight text-fg">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
