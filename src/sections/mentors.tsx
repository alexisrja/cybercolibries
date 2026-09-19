import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MentorCard } from "@/components/cards/mentor-card";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeader } from "@/components/shared/section";
import { trackAttrs } from "@/lib/analytics";
import type { Mentor } from "@/types";

export function Mentors({ mentors }: { mentors: Mentor[] }) {
  return (
    <Section id="mentores" labelledBy="mentors-title">
      <SectionHeader
        id="mentors-title"
        path="comunidad/mentores"
        title="Mentores que ya recorrieron el camino"
        description="Profesionales de ofensiva, defensa, inteligencia y forense que revisan tu razonamiento, comparten cómo trabajan y te ayudan a dar el siguiente paso."
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor, i) => (
          <Reveal as="li" key={mentor.id} delay={(i % 3) * 0.07}>
            <MentorCard mentor={mentor} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-8 text-center">
        <Link
          href="/?perfil=mentor#contacto"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          {...trackAttrs("cta_click", "Quiero ser mentor", "mentors")}
        >
          ¿Tienes experiencia que compartir? <span className="text-teal">Quiero ser mentor</span>
          <ArrowRight className="size-4 text-teal transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </Reveal>
    </Section>
  );
}
