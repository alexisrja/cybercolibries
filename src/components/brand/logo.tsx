import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  id: string;
  /** Oculta el texto (solo símbolo). */
  compact?: boolean;
  href?: string;
}

export function Logo({ className, id, compact, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      id={`logo-${id}`}
      className={cn("inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg", className)}
      aria-label="CyberColibríes, ir al inicio"
    >
      <BrandMark className="size-11 shrink-0" sizes="44px" eager={id === "nav"} />
      {!compact && (
        <span className="font-display text-[0.8rem] font-medium tracking-normal text-fg sm:text-[0.95rem]">
          Cyber<span className="text-iri">Colibríes</span>
        </span>
      )}
    </Link>
  );
}
