"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { formatNumber } from "@/lib/utils";
import type { Metric } from "@/types";

/** Barras decorativas deterministas (misma salida en servidor y cliente). */
function Spark({ seed }: { seed: number }) {
  const bars = Array.from({ length: 12 }, (_, i) => 25 + ((i * 29 + seed * 13) % 60) + i * 1.5);
  return (
    <div aria-hidden className="flex h-8 items-end gap-[3px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 rounded-sm bg-teal/25 transition-colors duration-500 group-hover:bg-teal/60"
          style={{ height: `${Math.min(100, h)}%`, transitionDelay: `${i * 25}ms` }}
        />
      ))}
    </div>
  );
}

export function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(metric.value);

  return (
    <div className="group relative flex h-full flex-col justify-between gap-6 bg-bg p-6 transition-colors duration-300 hover:bg-surface sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <h3 className="hud-label">{metric.label}</h3>
      </div>
      <div className="flex items-end justify-between gap-4">
        <p className="font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none font-medium tracking-[-0.04em] text-fg tabular-nums">
          <span ref={ref}>{formatNumber(value)}</span>
          {metric.suffix && <span className="text-iri">{metric.suffix}</span>}
        </p>
        <Spark seed={index + 1} />
      </div>
      <p className="text-sm text-muted">{metric.description}</p>
    </div>
  );
}
