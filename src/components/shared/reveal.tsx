"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}

/**
 * Contenedor para animaciones de entrada. El estado inicial se deja visible
 * para que el contenido siga siendo legible durante SSR, navegación por ancla
 * y en navegadores donde la observación de intersección no está disponible.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Cmp = m[as];
  return (
    <Cmp
      data-reveal
      className={className}
      initial={false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Cmp>
  );
}
