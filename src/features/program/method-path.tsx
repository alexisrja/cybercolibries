"use client";

import { m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import type { MethodStep } from "@/types";

/**
 * Línea de progresión de la metodología. Cada etapa se "desbloquea" cuando
 * la línea llega a ella, como subir de nivel.
 */
export function MethodPath({ steps }: { steps: MethodStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(steps.length, Math.floor(v * steps.length + 0.35));
    setReached((prev) => (prev === next ? prev : next));
  });

  return (
    <ol ref={ref} className="relative mt-16 grid gap-8 lg:grid-cols-6 lg:gap-4">
      {/* Línea horizontal (desktop) */}
      <div aria-hidden className="absolute top-6 right-[8%] left-[8%] hidden h-px bg-line-strong lg:block">
        <m.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-iri" />
      </div>
      {/* Línea vertical (móvil) */}
      <div aria-hidden className="absolute top-2 bottom-2 left-6 w-px bg-line-strong lg:hidden">
        <m.div style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-gradient-to-b from-teal via-violet to-magenta" />
      </div>

      {steps.map((step, i) => {
        const on = i < reached;
        return (
          <li key={step.id} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <span
              className={cn(
                "relative z-10 grid size-12 shrink-0 place-items-center rounded-full border bg-bg transition-[border-color,color,box-shadow] duration-500",
                on ? "border-teal text-teal shadow-[0_0_24px_-4px_var(--teal)]" : "border-line-strong text-subtle",
              )}
            >
              <Icon name={step.icon} className="size-5" />
            </span>
            <div className="lg:mt-6">
              <p className="font-mono text-[0.7rem] tracking-widest text-subtle uppercase">
                Etapa {i + 1}
                <span className="sr-only"> de {steps.length}</span>
              </p>
              <h3
                className={cn(
                  "mt-1 font-display text-base font-medium tracking-tight transition-colors duration-500",
                  on ? "text-fg" : "text-muted",
                )}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted lg:px-1">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
