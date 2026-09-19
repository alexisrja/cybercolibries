import type { Initiative, PartnerProfile, ParticipationPath, Pillar, Principle } from "@/types";

export const identity = {
  intro:
    "CyberColibríes es una comunidad de formación en ciberseguridad. Reunimos a personas que están empezando, mentores que ya recorrieron el camino y organizaciones que quieren abrir oportunidades, para que aprender seguridad no dependa de dónde vienes ni de cuánto puedes pagar.",
  why: "Elegimos al colibrí porque es pequeño, preciso e incansable: visita cientos de flores al día y, al hacerlo, poliniza. Así entendemos el conocimiento: se mueve, se comparte y hace crecer algo más grande.",
  mission:
    "Formar talento en ciberseguridad mediante educación accesible, práctica guiada y mentoría, para que más personas puedan construir su primer perfil profesional en el área.",
  vision:
    "Ser la comunidad de referencia en Latinoamérica para empezar en ciberseguridad: un ecosistema donde aprender, investigar y colaborar abre puertas reales.",
};

export const pillars: Pillar[] = [
  {
    title: "Aprender",
    description:
      "Educación accesible y formación práctica: fundamentos sólidos, laboratorios y retos que se parecen al trabajo real.",
    icon: "book-open",
  },
  {
    title: "Conectar",
    description:
      "Estudiantes, mentores y profesionales compartiendo conocimiento, dudas y oportunidades en un mismo espacio.",
    icon: "users",
  },
  {
    title: "Impactar",
    description:
      "Crear oportunidades y acercar la ciberseguridad a comunidades que históricamente han quedado fuera de ella.",
    icon: "sparkles",
  },
];

export const principles: Principle[] = [
  { title: "Educación accesible", description: "Contenido abierto y rutas pensadas para quien empieza desde cero.", icon: "globe" },
  { title: "Aprender haciendo", description: "Cada concepto se aterriza en un laboratorio, una misión o un reto.", icon: "wrench" },
  { title: "Comunidad", description: "Nadie aprende solo: resolvemos, preguntamos y celebramos en grupo.", icon: "users" },
  { title: "Colaboración", description: "Mentores, universidades y empresas construyendo con nosotros.", icon: "handshake" },
  { title: "Investigación", description: "Formamos criterio: preguntar bien, buscar evidencia y sacar conclusiones.", icon: "search" },
  { title: "Compartir conocimiento", description: "Lo que aprendes lo documentas y lo devuelves a la comunidad.", icon: "megaphone" },
  { title: "Impacto social", description: "Medimos el éxito en personas que consiguen su primera oportunidad.", icon: "heart" },
];

export const initiatives: Initiative[] = [
  {
    id: "researcher-program",
    title: "CyberColibrí Researcher Program",
    description:
      "Programa de formación en ciberseguridad orientado al desarrollo de talento junior: seis módulos, misiones prácticas y mentoría de principio a fin.",
    category: "Formación",
    status: "convocatoria",
    icon: "graduation-cap",
    cta: { label: "Conoce el programa", href: "/programas/researcher-program" },
    featured: true,
  },
  {
    id: "colibri-talks",
    title: "Colibrí Talks",
    description: "Charlas y sesiones donde profesionales comparten cómo trabajan, qué se equivocaron y qué aprendieron.",
    category: "Divulgación",
    status: "activo",
    icon: "mic",
    cta: { label: "Ver próximas charlas", href: "/#comunidad" },
  },
  {
    id: "community",
    title: "CyberColibrí Community",
    description: "El espacio para aprender, colaborar y crecer: canales de estudio, eventos y acompañamiento entre pares.",
    category: "Comunidad",
    status: "activo",
    icon: "users",
    cta: { label: "Únete a la comunidad", href: "/#participa" },
  },
  {
    id: "challenges",
    title: "Researcher Challenges",
    description: "Retos prácticos para desarrollar investigación, razonamiento y criterio técnico sobre escenarios realistas.",
    category: "Práctica",
    status: "activo",
    icon: "target",
    cta: { label: "Explorar challenges", href: "/challenges" },
  },
  {
    id: "labs",
    title: "CyberColibrí Labs",
    description: "Contenido educativo, research notes, guías, herramientas y recursos abiertos para toda la comunidad.",
    category: "Conocimiento",
    status: "activo",
    icon: "flask",
    cta: { label: "Ir a Labs", href: "/aprende" },
  },
];

export const partnerProfiles: PartnerProfile[] = [
  {
    id: "universidades",
    title: "Universidades",
    description: "Programas de formación y colaboración académica.",
    offers: ["Cohortes para estudiantes", "Talleres y charlas en campus", "Proyectos de investigación conjunta"],
    icon: "graduation-cap",
  },
  {
    id: "empresas",
    title: "Empresas",
    description: "Mentoría, infraestructura, tecnología, patrocinios y oportunidades.",
    offers: ["Mentores de tu equipo", "Laboratorios e infraestructura", "Becas, patrocinios y vacantes junior"],
    icon: "building",
  },
  {
    id: "comunidades",
    title: "Comunidades",
    description: "Eventos, conocimiento y colaboración.",
    offers: ["Eventos y CTFs en conjunto", "Intercambio de speakers", "Contenido y recursos compartidos"],
    icon: "network",
  },
];

export const participationPaths: ParticipationPath[] = [
  {
    id: "researcher",
    title: "Soy Researcher",
    description: "Quiero aprender y formar parte del programa.",
    cta: "Postularme",
    icon: "compass",
  },
  {
    id: "mentor",
    title: "Quiero ser Mentor",
    description: "Quiero compartir experiencia y acompañar a otros.",
    cta: "Ser mentor",
    icon: "lightbulb",
  },
  {
    id: "colaborador",
    title: "Quiero colaborar",
    description: "Quiero contribuir al proyecto con mi tiempo o talento.",
    cta: "Colaborar",
    icon: "heart",
  },
  {
    id: "universidad",
    title: "Represento una Universidad",
    description: "Quiero crear una alianza académica.",
    cta: "Proponer alianza",
    icon: "graduation-cap",
  },
  {
    id: "empresa",
    title: "Represento una Empresa",
    description: "Quiero colaborar o patrocinar.",
    cta: "Hablar con el equipo",
    icon: "building",
  },
  {
    id: "speaker",
    title: "Quiero impartir una charla",
    description: "Quiero compartir conocimiento en Colibrí Talks.",
    cta: "Proponer charla",
    icon: "mic",
  },
];

export const participationLabels: Record<ParticipationPath["id"], string> = {
  researcher: "Quiero ser Researcher",
  mentor: "Quiero ser Mentor",
  colaborador: "Quiero colaborar",
  universidad: "Represento una universidad",
  empresa: "Represento una empresa",
  speaker: "Quiero impartir una charla",
  otro: "Otro motivo",
};
