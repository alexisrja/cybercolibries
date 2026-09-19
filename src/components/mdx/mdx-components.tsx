import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "nota" | "tip" | "advertencia";

const calloutMeta: Record<CalloutType, { Icon: typeof Info; label: string; className: string }> = {
  nota: { Icon: Info, label: "Nota", className: "border-blue/30 bg-blue/5 [&_svg]:text-blue" },
  tip: { Icon: Lightbulb, label: "Tip", className: "border-teal/30 bg-teal/5 [&_svg]:text-teal" },
  advertencia: { Icon: AlertTriangle, label: "Advertencia", className: "border-nectar/30 bg-nectar/5 [&_svg]:text-nectar" },
};

export function Callout({ type = "nota", title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
  const { Icon, label, className } = calloutMeta[type];
  return (
    <aside className={cn("not-prose my-8 flex gap-4 rounded-2xl border p-5", className)}>
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="text-[0.97rem] leading-relaxed text-muted [&_strong]:text-fg">
        <p className="mb-1 font-medium text-fg">{title ?? label}</p>
        {children}
      </div>
    </aside>
  );
}

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

/** Componentes disponibles dentro de los archivos MDX de Labs. */
export const mdxComponents = {
  a: Anchor,
  Callout,
};
