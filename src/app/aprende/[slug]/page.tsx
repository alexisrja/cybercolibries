import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/cards/blog-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/section";
import { ShareButtons } from "@/features/labs/share-buttons";
import { extractToc, renderMdx } from "@/lib/mdx";
import { buildMetadata, organizationId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { getAllPostMeta, getPostBySlug, getRelatedPosts } from "@/services/content.service";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPostMeta()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/aprende/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/aprende/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    tags: post.tags,
  });
}

export default async function PostPage({ params }: PageProps<"/aprende/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [content, related] = await Promise.all([renderMdx(post.body), getRelatedPosts(post)]);
  const toc = extractToc(post.body);
  const url = absoluteUrl(`/aprende/${post.slug}`);

  return (
    <article>
      <PageHeader
        breadcrumbs={[
          { name: "Aprende", path: "/aprende" },
          { name: post.title, path: `/aprende/${post.slug}` },
        ]}
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="teal">{post.category}</Badge>
            <span className="font-mono text-xs text-subtle">{post.readingMinutes} min de lectura</span>
          </div>
        }
        title={post.title}
        description={post.excerpt}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <p>
            <span className="text-fg">{post.author.name}</span>
            {post.author.role && <> · {post.author.role}</>}
          </p>
          <p>
            Publicado el <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && (
              <>
                {" "}
                · actualizado el <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            )}
          </p>
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
        <div className="min-w-0">
          <div className="prose-cc max-w-[72ch]">{content}</div>

          <div className="mt-14 flex max-w-[72ch] flex-col gap-6 border-t border-line pt-8">
            <ul className="flex flex-wrap gap-2" aria-label="Etiquetas">
              {post.tags.map((t) => (
                <li key={t}>
                  <Link
                    href={`/aprende?tag=${encodeURIComponent(t)}`}
                    className="inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-teal/50 hover:text-fg"
                  >
                    #{t}
                  </Link>
                </li>
              ))}
            </ul>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>

        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <nav aria-labelledby="toc-title" className="sticky top-28">
              <p id="toc-title" className="hud-label">
                En este artículo
              </p>
              <ol className="mt-4 space-y-2.5 border-l border-line">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-7" : "pl-4"}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l border-transparent pl-0 text-sm leading-snug text-muted transition-colors hover:text-fg"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
              <Link
                href="/aprende"
                className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              >
                <ArrowLeft className="size-4" aria-hidden /> Volver a Labs
              </Link>
            </nav>
          </aside>
        )}
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-elevated/30 py-16 sm:py-20">
          <Container>
            <h2 id="related-title" className="font-display text-2xl font-medium tracking-tight">
              Sigue aprendiendo
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <Container className="py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line-strong p-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-medium tracking-tight">¿Te quedaste con dudas?</p>
            <p className="mt-1 text-muted">En la comunidad las resolvemos juntos, sin preguntas tontas.</p>
          </div>
          <Button asChild>
            <Link href="/#participa">
              Únete a la comunidad <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: "es",
          keywords: post.tags.join(", "),
          articleSection: post.category,
          timeRequired: `PT${post.readingMinutes}M`,
          author: { "@type": "Person", name: post.author.name },
          publisher: { "@id": organizationId },
          mainEntityOfPage: url,
          url,
        }}
      />
    </article>
  );
}
