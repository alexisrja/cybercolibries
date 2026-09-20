"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { mainNav, siteConfig } from "@/lib/site";
import { trackAttrs } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          scrolled
            ? "border-b border-line bg-[color-mix(in_oklab,var(--bg)_84%,transparent)] shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Principal"
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-500 sm:px-6 lg:px-8",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo id="nav" />

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const current = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors",
                      current ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 bottom-1.5 h-px origin-center bg-iri transition-transform duration-500",
                        current ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/participa" {...trackAttrs("join_click", "Únete", "navbar")}>
                Únete
              </Link>
            </Button>

            <Modal open={open} onOpenChange={setOpen}>
              <ModalTrigger asChild>
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface lg:hidden"
                  aria-label="Abrir menú"
                >
                  <Menu className="size-5" aria-hidden />
                </button>
              </ModalTrigger>
              <ModalContent title="Menú" side="right" hideTitle>
                <div className="mt-1">
                  <Logo id="menu" />
                </div>
                <ul className="mt-10 flex flex-col">
                  {mainNav.map((item) => {
                    const current = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <ModalClose asChild>
                          <Link
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            className={cn(
                              "flex min-h-14 items-center justify-between border-b border-line font-display text-lg tracking-tight transition-colors",
                              current ? "text-fg" : "text-muted hover:text-fg",
                            )}
                          >
                            {item.label}
                            {current && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
                          </Link>
                        </ModalClose>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-auto space-y-4 pt-8">
                  <ModalClose asChild>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/participa" {...trackAttrs("join_click", "Únete", "mobile_menu")}>
                        Únete a la comunidad <ArrowUpRight />
                      </Link>
                    </Button>
                  </ModalClose>
                  <p className="text-center font-mono text-xs text-subtle">{siteConfig.tagline}</p>
                </div>
              </ModalContent>
            </Modal>
          </div>
        </nav>
      </div>
      <m.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-iri"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
      />
    </header>
  );
}
