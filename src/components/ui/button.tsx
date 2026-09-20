import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,box-shadow,background-color,border-color,color,background-position] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-iri bg-[length:180%_100%] bg-[position:0%_0%] text-[var(--on-accent)] shadow-[0_0_0_1px_rgb(255_255_255/0.14)_inset,0_10px_30px_-12px_var(--accent)] hover:-translate-y-0.5 hover:bg-[position:100%_0%] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2)_inset,0_16px_40px_-12px_var(--accent-deep)]",
        secondary:
          "glass border border-line-strong text-fg hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_0_24px_-8px_var(--accent)]",
        ghost: "text-muted hover:bg-surface hover:text-fg",
        link: "rounded-md px-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
