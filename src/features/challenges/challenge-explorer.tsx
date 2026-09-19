"use client";

import { useMemo, useState, type ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";
import type { Challenge } from "@/types";

interface Props {
  challenges: Challenge[];
  /** Tarjetas pre-renderizadas en el servidor, indexadas por slug. */
  cards: Record<string, ReactNode>;
}

const ALL = "Todos";

/** Filtro por categoría. Preparado para sumar dificultad, estado o progreso del usuario. */
export function ChallengeExplorer({ challenges, cards }: Props) {
  const categories = useMemo(() => [ALL, ...new Set(challenges.map((c) => c.category))], [challenges]);
  const [category, setCategory] = useState(ALL);
  const [touched, setTouched] = useState(false);
  const visible = category === ALL ? challenges : challenges.filter((c) => c.category === category);

  return (
    <div>
      <div role="group" aria-label="Filtrar por categoría" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setTouched(true);
            }}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm transition-colors",
              category === c
                ? "border-teal/60 bg-teal/10 text-fg"
                : "border-line text-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} challenges visibles
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <>
          {visible.map((c) => (
            <m.li
              key={c.slug}
              initial={touched ? { opacity: 0, scale: 0.97 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {cards[c.slug]}
            </m.li>
          ))}
        </>
      </ul>
    </div>
  );
}
