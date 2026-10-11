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
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-7 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
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
      <Container className="pt-6 pb-5 sm:pt-8 sm:pb-6">
        <div className="grid gap-6 sm:gap-7 lg:grid-cols-[minmax(13rem,0.8fr)_minmax(0,2fr)] lg:gap-10">
          <div className="max-w-none lg:max-w-xs">
            <div className="flex items-center justify-between gap-4">
              <Logo id="footer" />
              <ul className="flex shrink-0 flex-wrap gap-2" aria-label="Redes sociales">
                {socials.map(([key, href]) => {
                  const { Icon, label } = socialIcons[key];
                  return (
                    <li key={key}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (se abre en una pestaña nueva)`}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-[color,border-color,box-shadow] hover:border-accent/50 hover:text-fg hover:shadow-[0_0_18px_-6px_var(--accent)]"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className="mt-3 hidden max-w-xl text-xs leading-relaxed text-muted sm:block lg:max-w-none">
              Comunidad que impulsa talento en ciberseguridad mediante educación accesible, práctica, mentoría y
              colaboración.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
            <FooterColumn title="Explora" items={mainNav} />
            <FooterColumn title="Iniciativas" items={initiativesNav} />
            <div>
              <h2 className="hud-label">Contacto</h2>
              <ul className="mt-2 text-sm">
                <li>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-7 items-center text-muted transition-colors [overflow-wrap:anywhere] hover:text-fg"
                  >
                    Escríbenos por LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="/.well-known/security.txt"
                    className="inline-flex min-h-7 items-center text-muted transition-colors hover:text-fg"
                  >
                    Divulgación responsable
                  </a>
                </li>
              </ul>
            </div>
            <FooterColumn title="Legal" items={legalNav} />
          </div>
        </div>

        <div className="mt-5 border-t border-line pt-3 text-xs text-subtle sm:mt-6 sm:pt-4">
          <p>
            © {year} {siteConfig.name}. Conocimiento abierto, comunidad cuidada.
          </p>
        </div>
      </Container>
    </footer>
  );
}
