"use client";

import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Icon } from "@/components/shared/icon";
import { cn, pad2 } from "@/lib/utils";
import type { ProgramModule } from "@/types";

/**
 * Ruta de aprendizaje: una columna vertebral que se "dibuja" con el scroll
 * (la trayectoria del colibrí) y seis módulos que alternan a los lados.
 */
export function ModuleRoute({ modules, detailed = false }: { modules: ProgramModule[]; detailed?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative mt-16 space-y-6 lg:space-y-0">
      {/* Columna vertebral */}
      <div aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-line-strong lg:left-1/2 lg:-translate-x-1/2">
        <m.div style={{ scaleY }} className="absolute inset-0 origin-top bg-gradient-to-b from-teal via-violet to-magenta" />
      </div>

      {modules.map((mod, i) => {
        const right = i % 2 === 1;
        return (
          <li key={mod.slug} className="relative grid pl-14 lg:grid-cols-2 lg:gap-16 lg:pl-0">
            {/* Nodo */}
            <m.span
              aria-hidden
              initial={{ scale: 0.6, opacity: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ margin: "0px 0px -45% 0px" }}
              transition={{ duration: 0.5 }}
              className="absolute top-6 left-0 z-10 grid size-10 place-items-center rounded-full border border-teal/60 bg-bg font-mono text-xs text-teal shadow-[0_0_20px_-4px_var(--teal)] lg:left-1/2 lg:-translate-x-1/2"
            >
              {pad2(mod.number)}
            </m.span>

            <m.article
              initial={{ opacity: 0, x: right ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className={cn(
                "card-iri rounded-2xl p-6 sm:p-7 lg:my-5",
                right ? "lg:col-start-2" : "lg:col-start-1 lg:text-right",
              )}
            >
              <div className={cn("flex items-center gap-3", !right && "lg:flex-row-reverse")}>
                <Icon name={mod.icon} className="size-5 text-teal" />
                <p className="hud-label">
                  Módulo {pad2(mod.number)} · {mod.weeks} semanas
                </p>
              </div>
              <h3 className="mt-4 font-display text-xl leading-snug font-medium tracking-tight text-fg sm:text-[1.35rem]">
                {mod.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{mod.summary}</p>

              {detailed && (
                <ul className={cn("mt-5 flex flex-wrap gap-2", !right && "lg:justify-end")}>
                  {mod.topics.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <p
                className={cn(
                  "mt-5 flex gap-2 border-t border-line pt-4 text-sm text-fg",
                  !right && "lg:flex-row-reverse",
                )}
              >
                <span className="font-mono text-teal" aria-hidden>
                  →
                </span>
                <span>
                  <span className="sr-only">Resultado: </span>
                  {mod.outcome}
                </span>
              </p>
            </m.article>
          </li>
        );
      })}
    </ol>
  );
}
