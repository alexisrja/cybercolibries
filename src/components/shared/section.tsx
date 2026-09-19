import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}

export function Section({ id, className, children, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-24 lg:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  /** Ruta tipo terminal que ubica al visitante dentro del ecosistema. */
  path: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
}

export function SectionHeader({
  path,
  title,
  description,
  id,
  align = "left",
  className,
  as: Heading = "h2",
  children,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("hud-label flex items-center gap-2", align === "center" && "justify-center")}>
        <span aria-hidden className="text-teal">
          ~/
        </span>
        {path}
        <span aria-hidden className="inline-block h-3 w-1.5 bg-teal/70 motion-safe:animate-pulse" />
      </p>
      <Heading
        id={id}
        className="mt-4 font-display text-[clamp(1.85rem,4.2vw,3.1rem)] leading-[1.08] font-medium tracking-[-0.025em] text-fg"
      >
        {title}
      </Heading>
      {description && <p className="mt-5 text-[1.075rem] leading-relaxed text-muted sm:text-lg">{description}</p>}
      {children}
    </Reveal>
  );
}
