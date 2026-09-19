"use client";

import { useEffect } from "react";

/**
 * Un único listener global que actualiza --mx / --my en la tarjeta
 * `.card-iri` bajo el cursor. Así las tarjetas siguen siendo Server
 * Components y no se crea un listener por tarjeta.
 */
export function usePointerGlow(selector = ".card-iri") {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const el = (last.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${last.clientX - r.left}px`);
      el.style.setProperty("--my", `${last.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [selector]);
}
