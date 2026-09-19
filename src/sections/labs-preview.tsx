import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/cards/blog-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { trackAttrs } from "@/lib/analytics";
import { LAB_CATEGORIES, type PostMeta } from "@/types";

export function LabsPreview({ posts }: { posts: PostMeta[] }) {
  return (
    <Section id="aprende" labelledBy="labs-title" className="border-y border-line bg-elevated/30">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="labs-title"
          path="labs"
          title="CyberColibrí Labs"
          description="El centro de conocimiento abierto de la comunidad: artículos, research notes, guías y herramientas escritas por researchers y mentores."
        />
        <Reveal className="shrink-0">
          <Button asChild variant="secondary">
            <Link href="/aprende" {...trackAttrs("cta_click", "Explorar Labs", "home_labs")}>
              Explorar Labs <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <ul className="flex flex-wrap gap-2" aria-label="Categorías de Labs">
          {LAB_CATEGORIES.map((c) => (
            <li key={c}>
              <Link
                href={`/aprende?categoria=${encodeURIComponent(c)}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-teal/50 hover:text-fg"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.slug} delay={i * 0.07}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
