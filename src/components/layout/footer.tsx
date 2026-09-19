import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/shared/section";
import { socialIcons } from "@/components/shared/social-icons";
import { footerNav, legalNav, programNav, siteConfig, type SocialNetwork } from "@/lib/site";

const closing = ["Aprender.", "Practicar.", "Compartir.", "Impactar."];

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="hud-label">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.social) as [SocialNetwork, string][];

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-iri opacity-40" />
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr]">
          <div className="max-w-sm">
            <Logo id="footer" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Comunidad que forma talento en ciberseguridad mediante educación accesible, práctica, mentoría y
              colaboración.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Redes sociales">
              {socials.map(([key, href]) => {
                const { Icon, label } = socialIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (se abre en una pestaña nueva)`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-[color,border-color,box-shadow] hover:border-teal/50 hover:text-fg hover:shadow-[0_0_18px_-6px_var(--teal)]"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1.2fr_0.8fr_1.5fr]">
            <FooterColumn title="Explora" items={footerNav} />
            <FooterColumn title="Programas" items={programNav} />
            <FooterColumn title="Legal" items={legalNav} />
            <div>
              <h2 className="hud-label">Contacto</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="text-muted [overflow-wrap:anywhere] transition-colors hover:text-fg">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href="/.well-known/security.txt" className="text-muted transition-colors hover:text-fg">
                    Divulgación responsable
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          className="mt-20 flex flex-wrap gap-x-4 gap-y-1 font-display text-[clamp(1.6rem,5.4vw,4.4rem)] leading-none font-medium tracking-[-0.04em]"
          aria-label={siteConfig.tagline}
        >
          {closing.map((word) => (
            <span
              key={word}
              aria-hidden
              className="text-fg/15 transition-colors duration-500 hover:text-iri motion-reduce:transition-none"
            >
              {word}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Conocimiento abierto, comunidad cuidada.
          </p>
          <p className="font-mono">status: hovering · v1.0</p>
        </div>
      </Container>
    </footer>
  );
}
