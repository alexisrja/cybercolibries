import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/section";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="hud-label">
            <span className="text-teal">error</span> 404 · ruta no encontrada
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] font-medium tracking-[-0.04em]">
            Este colibrí voló a otra flor.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            La página que buscas no existe o cambió de lugar. Revisa la dirección o vuelve al inicio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft /> Volver al inicio
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/aprende">Explorar Labs</Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm opacity-80 motion-safe:animate-hover">
          <BrandMark sizes="(max-width: 640px) 90vw, 384px" className="h-auto w-full" />
        </div>
      </Container>
    </section>
  );
}
