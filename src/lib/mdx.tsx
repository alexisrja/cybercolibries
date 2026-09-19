import "server-only";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/mdx/mdx-components";

/**
 * Compila MDX en el servidor (en build, porque las páginas son estáticas).
 * Solo se evalúa contenido propio del repositorio o de un CMS de confianza:
 * MDX ejecuta JavaScript, nunca debe usarse con contenido de usuarios.
 */
export async function renderMdx(source: string) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });
  return <Content components={mdxComponents} />;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Tabla de contenidos a partir de los encabezados ## y ### (mismos ids que rehype-slug). */
export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCode = false;
  for (const line of source.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[`*_]/g, "");
    items.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return items;
}
