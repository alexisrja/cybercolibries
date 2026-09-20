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
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-16 sm:py-20 lg:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
  children?: ReactNode;
}

export function SectionHeader({
  eyebrow,
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
      {eyebrow && (
        <p className={cn("hud-label flex items-center gap-2", align === "center" && "justify-center")}>
          <span aria-hidden className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-display font-medium tracking-tight text-fg",
          eyebrow && "mt-4",
          Heading === "h2"
            ? "text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.12]"
            : "text-[clamp(1.35rem,2.6vw,1.75rem)] leading-tight",
        )}
      >
        {title}
      </Heading>
      {description && <p className="mt-5 text-[1.05rem] leading-relaxed text-muted sm:text-lg">{description}</p>}
      {children}
    </Reveal>
  );
}
