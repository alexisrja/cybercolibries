import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { socialIcons } from "@/components/shared/social-icons";
import { ContactForm } from "@/features/contact/contact-form";
import { participate, participationPaths } from "@/data/content";
import { trackAttrs } from "@/lib/analytics";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, type SocialNetwork } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Participa",
  description:
    "Aprende, comparte conocimiento, sé mentor o colabora como organización. Hay muchas formas de ser parte de CyberColibríes.",
  path: "/participa",
});

export default function ParticipatePage() {
  const socials = Object.entries(siteConfig.social) as [SocialNetwork, string][];

  return (
    <>
      <PageHero eyebrow="Participa" title={participate.title} description={participate.intro} />

      <Section labelledBy="formas-title">
        <SectionHeader id="formas-title" eyebrow="Formas de sumarte" title={participate.chooseTitle} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {participationPaths.map((path, i) => (
            <Reveal as="li" key={path.id} delay={(i % 2) * 0.07}>
              <Link
                href={`/participa?perfil=${path.id}#contacto`}
                className="card-iri group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1 sm:p-7"
                {...trackAttrs("join_click", path.title, "participate")}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-elevated/60 text-accent transition-colors duration-300 group-hover:border-accent/50">
                    <Icon name={path.icon} className="size-5" />
                  </span>
                  <ArrowRight
                    className="size-5 -translate-x-2 text-accent opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-7 font-display text-lg font-medium tracking-tight text-fg">{path.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{path.description}</p>
                <span className="mt-auto pt-6 text-sm font-medium text-accent">{path.cta}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="contacto" labelledBy="contacto-title" className="border-y border-line bg-elevated/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <SectionHeader
              id="contacto-title"
              eyebrow="Escríbenos"
              title={participate.otherIdea.title}
              description={participate.otherIdea.body}
            />
            <Reveal delay={0.08} className="mt-10 space-y-6">
              <div className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="hud-label">Correo</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 inline-flex min-h-8 items-center text-fg underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Redes sociales">
                {socials.map(([key, href]) => {
                  const { Icon: SocialIcon, label } = socialIcons[key];
                  return (
                    <li key={key}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
                      >
                        <SocialIcon className="size-4" />
                        {label}
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="max-w-sm border-l border-line-strong pl-5 text-[1.05rem] leading-relaxed text-fg italic">
                “{participate.quote}”
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="glass rounded-3xl border border-line p-6 shadow-[var(--shadow-card)] sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand {...participate.closing} location="participate_closing" />
    </>
  );
}
