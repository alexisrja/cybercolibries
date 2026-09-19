import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { LabCategory, PostMeta } from "@/types";

const categoryTone: Partial<Record<LabCategory, "teal" | "violet" | "magenta" | "nectar">> = {
  Artículos: "teal",
  "Research Notes": "violet",
  Guías: "nectar",
  Herramientas: "magenta",
};

export function BlogCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card-iri group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <Badge tone={categoryTone[post.category] ?? "neutral"}>{post.category}</Badge>
        <span className="font-mono text-xs text-subtle">{post.readingMinutes} min</span>
      </div>
      <Heading className="mt-6 font-display text-lg leading-snug font-medium tracking-tight text-fg">
        <Link
          href={`/aprende/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <p className="text-xs text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.author.name}
        </p>
        <ArrowUpRight
          className="size-4 text-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Etiquetas">
        {post.tags.slice(0, 3).map((t) => (
          <li key={t} className="font-mono text-[0.7rem] text-subtle">
            #{t}
          </li>
        ))}
      </ul>
    </article>
  );
}
