import "server-only";
import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import { LAB_CATEGORIES, type Post, type PostMeta } from "@/types";

/**
 * Proveedor de contenido de CyberColibrí Labs.
 *
 * Hoy: archivos MDX en `/content/labs` con frontmatter validado por zod.
 * Mañana: cambiar `readAllPosts` por un cliente de Sanity/Strapi/Contentful
 * (o una tabla en Supabase). El resto de la app solo usa las funciones
 * exportadas, así que el cambio queda aislado en este archivo.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "labs");

const frontmatterSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  category: z.enum(LAB_CATEGORIES),
  tags: z.array(z.string()).default([]),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.object({ name: z.string(), role: z.string().optional() }),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
});

const readAllPosts = cache(async (): Promise<Post[]> => {
  let files: string[] = [];
  try {
    files = (await fs.readdir(CONTENT_DIR)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = frontmatterSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Frontmatter inválido en content/labs/${file}: ${parsed.error.message}`);
      }
      const fm = parsed.data;
      const post: Post = {
        slug,
        title: fm.title,
        excerpt: fm.excerpt,
        category: fm.category,
        tags: fm.tags,
        date: fm.date.toISOString(),
        updated: fm.updated?.toISOString(),
        author: fm.author,
        cover: fm.cover,
        draft: fm.draft,
        readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
        body: content,
      };
      return post;
    }),
  );

  const isProd = process.env.NODE_ENV === "production";
  return posts
    .filter((p) => !(isProd && p.draft))
    .sort((a, b) => b.date.localeCompare(a.date));
});

const toMeta = ({ body: _body, ...meta }: Post): PostMeta => meta;

export async function getAllPostMeta(): Promise<PostMeta[]> {
  return (await readAllPosts()).map(toMeta);
}

export async function getLatestPosts(limit = 3): Promise<PostMeta[]> {
  return (await getAllPostMeta()).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return (await readAllPosts()).find((p) => p.slug === slug);
}

/** Relacionados por categoría y tags compartidos. */
export async function getRelatedPosts(post: PostMeta, limit = 3): Promise<PostMeta[]> {
  const all = await getAllPostMeta();
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map(({ p }) => p);
}

export async function getAllTags(): Promise<string[]> {
  const tags = new Set((await getAllPostMeta()).flatMap((p) => p.tags));
  return [...tags].sort((a, b) => a.localeCompare(b, "es"));
}
