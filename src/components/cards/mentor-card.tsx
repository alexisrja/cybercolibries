import Image from "next/image";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/shared/social-icons";
import { Globe } from "lucide-react";
import type { Mentor, SocialLinks } from "@/types";

const socialMeta: Record<keyof SocialLinks, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  github: { label: "GitHub", Icon: GitHubIcon },
  x: { label: "X", Icon: XIcon },
  website: { label: "Sitio web", Icon: Globe },
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export function MentorCard({ mentor }: { mentor: Mentor }) {
  const links = (Object.entries(mentor.social) as [keyof SocialLinks, string | undefined][]).filter(
    (entry): entry is [keyof SocialLinks, string] => Boolean(entry[1]),
  );

  return (
    <article className="card-iri group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0">
          <span
            aria-hidden
            className="absolute -inset-[3px] rounded-full bg-iri opacity-50 transition-opacity duration-500 group-hover:opacity-100 motion-safe:group-hover:animate-[spin_6s_linear_infinite]"
          />
          <div className="relative size-full overflow-hidden rounded-full border-2 border-bg bg-elevated">
            {mentor.photo ? (
              <Image src={mentor.photo} alt={`Fotografía de ${mentor.name}`} fill sizes="64px" className="object-cover" />
            ) : (
              <span aria-hidden className="grid size-full place-items-center font-display text-lg text-fg">
                {initials(mentor.name)}
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight font-medium tracking-tight text-fg">{mentor.name}</h3>
          <p className="mt-1 text-sm text-muted">{mentor.role}</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 border-y border-line py-4">
        <div>
          <dt className="hud-label">Especialidad</dt>
          <dd className="mt-1 text-sm text-fg">{mentor.specialty}</dd>
        </div>
        <div>
          <dt className="hud-label">Experiencia</dt>
          <dd className="mt-1 text-sm text-fg">{mentor.experienceYears} años</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm leading-relaxed text-muted">{mentor.bio}</p>

      <div className="mt-auto pt-5">
        <p className="hud-label">Sesiones y temas</p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {mentor.topics.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors duration-300 group-hover:border-teal/30 group-hover:text-fg"
            >
              {t}
            </li>
          ))}
        </ul>
        {links.length > 0 && (
          <ul className="mt-5 flex gap-1.5" aria-label={`Redes profesionales de ${mentor.name}`}>
            {links.map(([key, href]) => {
              const { label, Icon } = socialMeta[key];
              return (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de ${mentor.name}`}
                    className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-teal/50 hover:text-fg"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}
