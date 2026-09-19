import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-line-strong text-muted",
        teal: "border-teal/35 bg-teal/10 text-teal",
        violet: "border-violet/35 bg-violet/10 text-violet",
        magenta: "border-magenta/35 bg-magenta/10 text-magenta",
        nectar: "border-nectar/35 bg-nectar/10 text-nectar",
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
