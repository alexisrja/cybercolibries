"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article";
}

/**
 * Aparición suave al entrar en pantalla (una sola vez).
 * Con `prefers-reduced-motion`, MotionConfig (en Providers) elimina el
 * desplazamiento y deja solo un fundido breve.
 */
export function Reveal({ children, className, delay = 0, y = 22, as = "div" }: RevealProps) {
  const Cmp = m[as];
  return (
    <Cmp
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Cmp>
  );
}
