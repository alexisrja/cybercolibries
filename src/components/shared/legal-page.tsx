import type { ReactNode } from "react";
import { PageHero } from "./page-hero";
import { Container } from "./section";
import { formatDate } from "@/lib/utils";

interface LegalPageProps {
  title: string;
  path: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

/**
 * Plantilla para textos legales.
 * TODO(legal): revisar con asesoría legal según la jurisdicción de la organización.
 */
export function LegalPage({ title, path, updated, intro, children }: LegalPageProps) {
  return (
    <>
      <PageHero breadcrumbs={[{ name: title, path }]} title={title} description={intro}>
        <p className="mt-6 font-mono text-xs text-subtle">
          Última actualización: <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </PageHero>
      <Container className="py-14 sm:py-20">
        <div className="prose-cc max-w-[72ch]">{children}</div>
      </Container>
    </>
  );
}
