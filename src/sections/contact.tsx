import { Clock, Mail, MessagesSquare } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { socialIcons } from "@/components/shared/social-icons";
import { ContactForm } from "@/features/contact/contact-form";
import { siteConfig, type SocialNetwork } from "@/lib/site";

export function Contact() {
  const socials = Object.entries(siteConfig.social) as [SocialNetwork, string][];

  return (
    <Section id="contacto" labelledBy="contact-title" className="pb-12 sm:pb-16 lg:pb-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div>
          <SectionHeader
            id="contact-title"
            path="contacto"
            title="Escríbenos"
            description="Dudas sobre el programa, alianzas, charlas o prensa. Una persona del equipo lee cada mensaje."
          />

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5">
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="hud-label">Correo</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 inline-block text-fg underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MessagesSquare className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="hud-label">Comunidad</p>
                  <a
                    href={siteConfig.social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-fg underline-offset-4 hover:underline"
                  >
                    Servidor de Discord<span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="hud-label">Tiempo de respuesta</p>
                  <p className="mt-1 text-fg">Máximo 3 días hábiles</p>
                </div>
              </li>
            </ul>

            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Redes sociales">
              {socials.map(([key, href]) => {
                const { Icon, label } = socialIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-muted transition-colors hover:border-teal/50 hover:text-fg"
                    >
                      <Icon className="size-4" />
                      {label}
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl border border-line p-6 shadow-[var(--shadow-card)] sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
