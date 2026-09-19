"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contador animado que arranca al entrar en pantalla.
 * El valor inicial es el final, así el HTML del servidor (SEO, sin JS)
 * muestra la cifra correcta; solo se reinicia a 0 si el usuario acepta
 * movimiento y el elemento aún no es visible.
 */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1600) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // ya visible: no parpadear

    setValue(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, value };
}
