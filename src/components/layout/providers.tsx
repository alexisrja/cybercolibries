"use client";

import { ThemeProvider } from "next-themes";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";
import { usePointerGlow } from "@/hooks/use-pointer-glow";

function InteractionLayer() {
  usePointerGlow();
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <InteractionLayer />
          {children}
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
