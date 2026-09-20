import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/shared/section";
import { socialIcons } from "@/components/shared/social-icons";
import { initiativesNav, legalNav, mainNav, siteConfig, type SocialNetwork } from "@/lib/site";
import type { NavItem } from "@/types";

function FooterColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h2 className="hud-label">{title}</h2>
      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-9 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              {item.label}
              {item.note && (
                <span className="font-mono text-[0.62rem] tracking-wider text-subtle uppercase">{item.note}</span>
              )}
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
    <footer className="relative border-t border-line">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-iri opacity-40" />
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="max-w-sm">
            <Logo id="footer" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Comunidad que impulsa talento en ciberseguridad mediante educación accesible, práctica, mentoría y
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
                      className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-[color,border-color,box-shadow] hover:border-accent/50 hover:text-fg hover:shadow-[0_0_18px_-6px_var(--accent)]"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn title="Explora" items={mainNav} />
            <FooterColumn title="Iniciativas" items={initiativesNav} />
            <div>
              <h2 className="hud-label">Contacto</h2>
              <ul className="mt-4 space-y-1 text-sm">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex min-h-9 items-center text-muted transition-colors [overflow-wrap:anywhere] hover:text-fg"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href="/.well-known/security.txt"
                    className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-fg"
                  >
                    Divulgación responsable
                  </a>
                </li>
              </ul>
              <h2 className="hud-label mt-6">Legal</h2>
              <ul className="mt-4 space-y-1 text-sm">
                {legalNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p
          className="mt-16 flex flex-wrap gap-x-4 gap-y-1 font-display text-[clamp(1.4rem,5vw,3.6rem)] leading-none font-medium tracking-tight"
          aria-label={siteConfig.tagline}
        >
          {["Aprender.", "Practicar.", "Compartir.", "Impactar."].map((word) => (
            <span key={word} aria-hidden className="text-fg/15 transition-colors duration-500 hover:text-iri">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Conocimiento abierto, comunidad cuidada.
          </p>
          <p className="font-mono">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
