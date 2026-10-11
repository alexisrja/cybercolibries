"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Photo } from "@/types";

type CarouselPhoto = Photo & { src: string };

export function CommunityCarousel({ items }: { items: Photo[] }) {
  const slides = items.filter((item): item is CarouselPhoto => Boolean(item.src));
  const [active, setActive] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [manualPaused, setManualPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const autoPaused = manualPaused || hovered || focused || touching || reduceMotion;
  const maxActive = Math.max(slides.length - visibleSlides, 0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateVisibleSlides = () => {
      const nextVisibleSlides = mediaQuery.matches ? 2 : 1;
      setVisibleSlides(nextVisibleSlides);
      setActive((current) => Math.min(current, Math.max(slides.length - nextVisibleSlides, 0)));
    };

    updateVisibleSlides();
    mediaQuery.addEventListener("change", updateVisibleSlides);
    return () => mediaQuery.removeEventListener("change", updateVisibleSlides);
  }, [slides.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (autoPaused || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % (maxActive + 1));
    }, 6000);

    return () => window.clearInterval(timer);
  }, [active, autoPaused, maxActive, slides.length]);

  if (slides.length === 0) return null;

  function showPrevious() {
    setActive((current) => (current - 1 + maxActive + 1) % (maxActive + 1));
  }

  function showNext() {
    setActive((current) => (current + 1) % (maxActive + 1));
  }

  return (
    <div
      className="mt-8 sm:mt-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setFocused(false);
        }
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="hud-label">Galería de la comunidad</p>
        <div className="flex items-center gap-2">
          <span className="mr-1 font-mono text-xs text-subtle" aria-live="polite">
            {visibleSlides === 2 ? (
              <>
                {String(active + 1).padStart(2, "0")}–
                {String(Math.min(active + visibleSlides, slides.length)).padStart(2, "0")}
              </>
            ) : (
              String(active + 1).padStart(2, "0")
            )}{" "}
            / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setManualPaused((paused) => !paused)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-bg/60 text-muted transition-colors hover:border-accent/50 hover:text-fg"
            aria-label={manualPaused ? "Reanudar cambio automático" : "Pausar cambio automático"}
            aria-pressed={manualPaused}
          >
            {manualPaused ? (
              <Play className="size-4" aria-hidden />
            ) : (
              <Pause className="size-4" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={showPrevious}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-bg/60 text-muted transition-colors hover:border-accent/50 hover:text-fg"
            aria-label="Ver imagen anterior"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-bg/60 text-muted transition-colors hover:border-accent/50 hover:text-fg"
            aria-label="Ver imagen siguiente"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        className="mt-4 overflow-hidden rounded-3xl border border-line-strong bg-bg/45 shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Momentos de la comunidad CyberColibríes"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") showPrevious();
          if (event.key === "ArrowRight") showNext();
        }}
        onTouchStart={(event) => {
          setTouching(true);
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          setTouching(false);
          if (touchStartX.current === null) return;
          const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(distance) < 45) return;
          if (distance > 0) showPrevious();
          else showNext();
        }}
        onTouchCancel={() => {
          setTouching(false);
          touchStartX.current = null;
        }}
      >
        <div
          className="flex motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
          style={{ transform: `translateX(-${active * (100 / visibleSlides)}%)` }}
        >
          {slides.map((photo, index) => (
            <figure
              key={photo.id}
              className="shrink-0 p-4 sm:p-6"
              style={{ flexBasis: `${100 / visibleSlides}%` }}
              aria-hidden={index < active || index >= active + visibleSlides}
            >
              <div className="relative h-[26rem] overflow-hidden rounded-2xl bg-elevated/60 sm:h-[32rem] lg:h-[36rem]">
                <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
                <Image
                  src={photo.src}
                  alt={photo.alt ?? photo.caption}
                  fill
                  sizes="(min-width: 1280px) 550px, (min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw"
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
              <figcaption className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-muted sm:text-base">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap justify-center" aria-label="Seleccionar imagen">
        {slides.slice(0, maxActive + 1).map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActive(index)}
            className="group inline-flex size-10 items-center justify-center rounded-full"
            aria-label={
              visibleSlides === 2
                ? `Ver imágenes ${index + 1} y ${index + 2}, comenzando con: ${photo.caption}`
                : `Ver imagen ${index + 1}: ${photo.caption}`
            }
            aria-current={index === active ? "true" : undefined}
          >
            <span
              aria-hidden
              className={`h-2.5 rounded-full transition-[width,background-color] ${
                index === active ? "w-8 bg-accent" : "w-2.5 bg-line-strong group-hover:bg-muted"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
