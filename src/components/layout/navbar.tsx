"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { initiativesNav, mainNav } from "@/lib/site";
import { trackAttrs } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopInitiativesOpen, setDesktopInitiativesOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const hrefPath = href.split(/[?#]/)[0];
    return hrefPath === "/" ? pathname === "/" : pathname.startsWith(hrefPath);
  };

  const closeMobileMenu = () => {
    setOpen(false);
    setInitiativesOpen(false);
  };

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

              if (item.label === "Iniciativas") {
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setDesktopInitiativesOpen(true)}
                    onMouseLeave={() => setDesktopInitiativesOpen(false)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setDesktopInitiativesOpen(false);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      aria-haspopup="true"
                      aria-expanded={desktopInitiativesOpen}
                      onFocus={() => setDesktopInitiativesOpen(true)}
                      onClick={() => setDesktopInitiativesOpen(false)}
                      className={cn(
                        "relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm transition-colors",
                        current ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          desktopInitiativesOpen && "rotate-180",
                        )}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-4 bottom-1.5 h-px origin-center bg-iri transition-transform duration-500",
                          current ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>

                    <div
                      className={cn(
                        "pointer-events-none invisible absolute top-full left-1/2 z-20 w-72 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-[opacity,transform,visibility] duration-200",
                        desktopInitiativesOpen && "pointer-events-auto visible translate-y-0 opacity-100",
                      )}
                    >
                      <ul
                        aria-label="Iniciativas"
                        className="overflow-hidden rounded-2xl border border-line-strong bg-elevated p-2 shadow-[0_20px_50px_-20px_rgb(0_8_20/0.65)]"
                      >
                        {initiativesNav.map((initiative) => (
                          <li key={initiative.href}>
                            <Link
                              href={initiative.href}
                              onClick={() => setDesktopInitiativesOpen(false)}
                              className="flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:bg-surface focus-visible:text-fg"
                            >
                              <span>{initiative.label}</span>
                              {initiative.note && (
                                <span className="font-mono text-[0.6rem] tracking-[0.08em] text-subtle uppercase">
                                  {initiative.note}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

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
              <Link href="/participa#participa-inicio" {...trackAttrs("join_click", "Únete", "navbar")}>
                Únete
              </Link>
            </Button>

            <Modal
              open={open}
              onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) setInitiativesOpen(false);
              }}
            >
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

                    if (item.label === "Iniciativas") {
                      return (
                        <li key={item.href} className="border-b border-line">
                          <div className="flex items-center">
                            <ModalClose asChild>
                              <Link
                                href={item.href}
                                aria-current={current ? "page" : undefined}
                                onClick={closeMobileMenu}
                                className={cn(
                                  "flex min-h-14 flex-1 items-center font-display text-lg tracking-tight transition-colors",
                                  current ? "text-fg" : "text-muted hover:text-fg",
                                )}
                              >
                                {item.label}
                              </Link>
                            </ModalClose>
                            <button
                              type="button"
                              aria-label="Mostrar iniciativas"
                              aria-expanded={initiativesOpen}
                              aria-controls="mobile-initiatives-menu"
                              onClick={() => setInitiativesOpen((value) => !value)}
                              className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
                            >
                              <ChevronDown
                                aria-hidden
                                className={cn("size-5 transition-transform duration-200", initiativesOpen && "rotate-180")}
                              />
                            </button>
                          </div>
                          {initiativesOpen && (
                            <ul id="mobile-initiatives-menu" className="mb-3 space-y-1 border-l border-line pl-3">
                              {initiativesNav.map((initiative) => (
                                <li key={initiative.href}>
                                  <ModalClose asChild>
                                    <Link
                                      href={initiative.href}
                                      onClick={closeMobileMenu}
                                      className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
                                    >
                                      <span>{initiative.label}</span>
                                      {initiative.note && (
                                        <span className="font-mono text-[0.58rem] tracking-[0.08em] text-subtle uppercase">
                                          {initiative.note}
                                        </span>
                                      )}
                                    </Link>
                                  </ModalClose>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    }

                    return (
                      <li key={item.href}>
                        <ModalClose asChild>
                          <Link
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            onClick={closeMobileMenu}
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
                <div className="mt-auto pt-8">
                  <ModalClose asChild>
                    <Button asChild size="lg" className="w-full">
                      <Link
                        href="/participa#participa-inicio"
                        onClick={closeMobileMenu}
                        {...trackAttrs("join_click", "Únete", "mobile_menu")}
                      >
                        Únete a la comunidad <ArrowUpRight />
                      </Link>
                    </Button>
                  </ModalClose>
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
