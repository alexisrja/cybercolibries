import Image from "next/image";
import { Camera } from "lucide-react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

/**
 * Mosaico de fotografías reales de la comunidad.
 * Sin fotografías cargadas muestra espacios reservados, en vez de imágenes de
 * stock: el documento pide priorizar material propio.
 */
export function PhotoGrid({ photos, note }: { photos: Photo[]; note?: string }) {
  if (photos.length === 0) {
    return (
      <Reveal>
        <div className="rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center">
          <Camera className="mx-auto size-6 text-subtle" aria-hidden />
          <p className="mt-4 font-medium text-fg">Espacio reservado para fotografías de la comunidad</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            {note ?? "Aquí irán imágenes reales de sesiones, mentorías, charlas y actividades, con su pie de foto."}
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <ul className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-3">
      {photos.map((photo, i) => (
        <Reveal as="li" key={photo.id} delay={(i % 3) * 0.06} className={cn(i === 0 && "col-span-2 row-span-2")}>
          <figure className="group relative size-full overflow-hidden rounded-2xl border border-line bg-elevated">
            {photo.src && (
              <Image
                src={photo.src}
                alt={photo.alt ?? photo.caption}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <figcaption className="glass absolute inset-x-3 bottom-3 rounded-xl border border-line px-3 py-2 text-sm text-fg">
              {photo.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
