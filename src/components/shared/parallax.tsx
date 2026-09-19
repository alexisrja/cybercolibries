"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Parallax ligero ligado al scroll. MotionConfig lo desactiva con reduced motion. */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}
