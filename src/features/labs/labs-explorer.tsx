"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useDeferredValue, useEffect, useMemo, useRef } from "react";
import { Search, X } from "lucide-react";
import { BlogCard } from "@/components/cards/blog-card";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { LAB_CATEGORIES, type LabCategory, type PostMeta } from "@/types";

const ALL = "Todo";

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

interface Props {
  posts: PostMeta[];
  tags: string[];
}

interface InnerProps extends Props {
  initialQuery?: string;
  initialCategory?: string;
  initialTag?: string;
}

function Explorer({ posts, tags, initialQuery = "", initialCategory = ALL, initialTag = "" }: InnerProps) {
  const query = initialQuery;
  const category = initialCategory;
  const tag = initialTag;
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, [posts]);

  const results = useMemo(() => {
    const q = normalize(deferredQuery.trim());
    return posts.filter((p) => {
      if (category !== ALL && p.category !== category) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (!q) return true;
      return normalize([p.title, p.excerpt, p.category, p.author.name, ...p.tags].join(" ")).includes(q);
    });
  }, [posts, deferredQuery, category, tag]);

  // La URL es la fuente de verdad, también al navegar con Atrás o enlaces internos.
  const updateFilters = (changes: { q?: string; categoria?: string; tag?: string }) => {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  };

  // Analítica de búsqueda con debounce.
  useEffect(() => {
    const q = deferredQuery.trim();
    if (q.length < 3) return;
    const id = setTimeout(() => track("labs_search", { query: q, results: results.length }), 900);
    return () => clearTimeout(id);
  }, [deferredQuery, results.length]);

  // Atajo "/" para buscar.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectCategory = (c: string) => {
    updateFilters({ categoria: c === ALL ? "" : c });
    track("labs_filter", { category: c });
  };

  const reset = () => {
    updateFilters({ q: "", categoria: "", tag: "" });
  };

  const hasFilters = Boolean(query || tag || category !== ALL);

  return (
    <div>
      <div role="search" className="relative">
        <label htmlFor="labs-search" className="sr-only">
          Buscar en Labs
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-subtle" aria-hidden />
        <input
          ref={inputRef}
          id="labs-search"
          type="search"
          value={query}
          onChange={(e) => updateFilters({ q: e.target.value })}
          placeholder="Busca por tema, herramienta o etiqueta…"
          className="h-14 w-full rounded-2xl border border-line-strong bg-elevated/60 pr-24 pl-13 text-base text-fg outline-none placeholder:text-subtle focus-visible:border-teal focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--teal)_18%,transparent)] [&::-webkit-search-cancel-button]:hidden"
          aria-describedby="labs-results"
        />
        {query ? (
          <button
            type="button"
            onClick={() => updateFilters({ q: "" })}
            className="absolute top-1/2 right-4 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-fg"
            aria-label="Borrar búsqueda"
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : (
          <kbd className="absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-md border border-line-strong px-2 py-0.5 font-mono text-xs text-subtle sm:block">
            /
          </kbd>
        )}
      </div>

      <div className="mt-6">
        <p className="hud-label mb-3" id="labs-categories">
          Categorías
        </p>
        <div role="group" aria-labelledby="labs-categories" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap">
          {[ALL, ...LAB_CATEGORIES].map((c) => {
            const count = c === ALL ? posts.length : (counts.get(c as LabCategory) ?? 0);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => selectCategory(c)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                  category === c ? "border-teal/60 bg-teal/10 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {c}
                <span className="font-mono text-[0.7rem] text-subtle">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mt-5">
          <p className="hud-label mb-3" id="labs-tags">
            Tags
          </p>
          <div role="group" aria-labelledby="labs-tags" className="flex flex-wrap gap-x-3 gap-y-2">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tag === t}
                onClick={() => updateFilters({ tag: tag === t ? "" : t })}
                className={cn(
                  "inline-flex min-h-9 items-center px-1 font-mono text-xs transition-colors",
                  tag === t ? "text-teal" : "text-subtle hover:text-fg",
                )}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
        <p id="labs-results" aria-live="polite" className="text-sm text-muted">
          {results.length === 1 ? "1 resultado" : `${results.length} resultados`}
          {tag && (
            <>
              {" "}
              con <span className="font-mono text-teal">#{tag}</span>
            </>
          )}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="text-sm text-teal underline-offset-4 hover:underline">
            Limpiar filtros
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-display text-lg font-medium tracking-tight">
            {category !== ALL && !query && !tag ? `Aún no hay contenido en ${category}` : "Sin resultados para esta búsqueda"}
          </p>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Prueba con otra palabra o categoría. ¿Quieres escribir sobre este tema? La comunidad publica en Labs.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm text-fg hover:border-teal/50">
              Ver todo el contenido
            </button>
            <Link href="/?perfil=colaborador#contacto" className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-teal hover:underline">
              Proponer un artículo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function ExplorerWithParams(props: Props) {
  const params = useSearchParams();
  const cat = params.get("categoria");
  return (
    <Explorer
      {...props}
      initialQuery={params.get("q") ?? ""}
      initialCategory={cat && (LAB_CATEGORIES as readonly string[]).includes(cat) ? cat : ALL}
      initialTag={params.get("tag") ?? ""}
    />
  );
}

/** Buscador + filtros por categoría y tag. Estado reflejado en la URL (?q, ?categoria, ?tag). */
export function LabsExplorer(props: Props) {
  return (
    <Suspense fallback={<Explorer {...props} />}>
      <ExplorerWithParams {...props} />
    </Suspense>
  );
}
