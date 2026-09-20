import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-line-strong text-muted",
        accent: "border-accent/35 bg-accent/10 text-accent",
        soft: "border-accent-soft/40 bg-accent-soft/10 text-accent-soft",
        danger: "border-danger/35 bg-danger/10 text-danger",
        info: "border-info/35 bg-info/10 text-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, tone, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
