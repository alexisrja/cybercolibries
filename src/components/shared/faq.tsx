import { ChevronDown } from "lucide-react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

/**
 * Lista de preguntas frecuentes.
 * Se usa `<details>`/`<summary>` nativos: el navegador aporta el plegado, el
 * foco y el rol de botón sin JavaScript, y la respuesta viaja siempre en el
 * HTML servido. Eso último es un requisito del resultado enriquecido de
 * `FAQPage`: Google acepta secciones plegables, pero no texto que solo exista
 * después de una petición del cliente.
 */
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={Math.min(i, 4) * 0.05}>
          <details
            id={item.id}
            className="group rounded-2xl border border-line bg-elevated/40 transition-colors hover:border-line-strong open:border-line-strong"
          >
            {/* `list-none` basta en Chrome y Firefox; Safari necesita además el marcador propio. */}
            <summary className="flex cursor-pointer list-none items-start gap-4 rounded-2xl p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden sm:p-6">
              <h3 className="flex-1 font-display text-base leading-snug font-medium tracking-tight text-fg sm:text-lg">
                {item.question}
              </h3>
              <ChevronDown
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6 sm:text-base">
              {item.answer}
            </p>
          </details>
        </Reveal>
      ))}
    </ul>
  );
}
