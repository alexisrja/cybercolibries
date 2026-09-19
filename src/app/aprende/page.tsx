import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/section";
import { LabsExplorer } from "@/features/labs/labs-explorer";
import { buildMetadata } from "@/lib/seo";
import { getAllPostMeta, getAllTags } from "@/services/content.service";

export const metadata = buildMetadata({
  title: "Aprende · CyberColibrí Labs",
  description:
    "Artículos, research notes, guías y herramientas de ciberseguridad escritas por la comunidad CyberColibríes. Contenido abierto para aprender haciendo.",
  path: "/aprende",
});

export default async function LabsPage() {
  const [posts, tags] = await Promise.all([getAllPostMeta(), getAllTags()]);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Aprende", path: "/aprende" }]}
        eyebrow={<p className="hud-label"><span className="text-teal">~/</span>labs</p>}
        title={
          <>
            CyberColibrí <span className="text-iri">Labs</span>
          </>
        }
        description="El centro de conocimiento abierto de la comunidad. Lo que investigamos, lo documentamos; lo que documentamos, lo compartimos."
      />
      <Container className="py-14 sm:py-20">
        <LabsExplorer posts={posts} tags={tags} />
      </Container>
    </>
  );
}
