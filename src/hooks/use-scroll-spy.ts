"use client";

import { useEffect, useState } from "react";

/** Devuelve el id de la sección visible más cercana al tercio superior. */
export function useScrollSpy(ids: string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) return;
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (visible.size) {
          const [first] = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]));
          setActive(first[0]);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}
