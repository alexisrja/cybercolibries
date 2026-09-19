"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Los iconos se alternan con CSS (clase .dark) para evitar desajustes de hidratación. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => {
        const next = resolvedTheme === "light" ? "dark" : "light";
        setTheme(next);
        track("theme_toggle", { theme: next });
      }}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg",
        className,
      )}
      aria-label="Cambiar entre modo claro y oscuro"
    >
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
      <Moon className="size-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
