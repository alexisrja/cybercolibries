import type { CommunityActivity, CommunityEvent, GalleryItem, Mentor, Metric, Story } from "@/types";

/*
 * DATOS DE EJEMPLO
 * ----------------
 * Mentores, historias, métricas y eventos son contenido de muestra para
 * diseñar la experiencia. Reemplazar por datos reales (o conectar el
 * servicio correspondiente a Supabase/CMS) antes de publicar.
 */

export const communityActivities: CommunityActivity[] = [
  { title: "Eventos", description: "Encuentros abiertos para conocer a la comunidad.", icon: "calendar", cadence: "Mensual" },
  { title: "Sesiones", description: "Estudio guiado y resolución de dudas en vivo.", icon: "book-open", cadence: "Semanal" },
  { title: "Workshops", description: "Talleres prácticos con herramientas reales.", icon: "wrench", cadence: "Bimestral" },
  { title: "CTFs", description: "Competencias por equipos para aprender jugando.", icon: "flag", cadence: "Trimestral" },
  { title: "Challenges", description: "Retos de investigación con feedback.", icon: "target", cadence: "Continuo" },
  { title: "Mentorías", description: "Acompañamiento 1:1 y grupal con profesionales.", icon: "message", cadence: "Por cohorte" },
];

export const upcomingEvents: CommunityEvent[] = [
  {
    id: "talk-2026-10",
    title: "De soporte TI a analista SOC: lo que nadie te cuenta",
    type: "Colibrí Talk",
    date: "2026-10-08T00:00:00.000Z",
    modality: "Online",
    description: "Una conversación honesta sobre la transición de carrera, las entrevistas y el primer año.",
  },
  {
    id: "ctf-2026-10",
    title: "Colibrí CTF · Edición Otoño",
    type: "CTF",
    date: "2026-10-24T00:00:00.000Z",
    modality: "Híbrido",
    description: "Retos de redes, web, forense y OSINT. Equipos mixtos de researchers y mentores.",
  },
  {
    id: "workshop-2026-11",
    title: "Workshop: detecciones con Sigma desde cero",
    type: "Workshop",
    date: "2026-11-12T00:00:00.000Z",
    modality: "Online",
    description: "Escribe, prueba y comparte tus primeras reglas de detección.",
  },
];

export const gallery: GalleryItem[] = [
  { id: "g1", caption: "Colibrí CTF · equipos mixtos", kind: "CTF" },
  { id: "g2", caption: "Workshop de análisis de tráfico", kind: "Workshop" },
  { id: "g3", caption: "Colibrí Talk con la generación 3", kind: "Talk" },
  { id: "g4", caption: "Sesión de mentoría grupal", kind: "Mentoría" },
  { id: "g5", caption: "Cierre de cohorte y demo day", kind: "Evento" },
];

export const mentors: Mentor[] = [
  {
    id: "m1",
    name: "Daniela Ortega",
    role: "Threat Intelligence Analyst",
    specialty: "Cyber Threat Intelligence",
    experienceYears: 8,
    bio: "Rastrea campañas de fraude y phishing en la región y enseña a convertir datos en decisiones.",
    topics: ["OSINT responsable", "Pivoteo de IOCs", "Reportes de inteligencia"],
    social: {},
  },
  {
    id: "m2",
    name: "Luis Herrera",
    role: "SOC Lead",
    specialty: "Seguridad Defensiva",
    experienceYears: 10,
    bio: "Ha formado equipos de SOC desde cero; cree que el mejor analista es el que sabe hacer preguntas.",
    topics: ["Triage de alertas", "Ingeniería de detección", "MITRE ATT&CK"],
    social: {},
  },
  {
    id: "m3",
    name: "Mariana Ríos",
    role: "Pentester",
    specialty: "Seguridad Ofensiva",
    experienceYears: 6,
    bio: "Evalúa aplicaciones web y móviles; obsesionada con reportes que los desarrolladores sí quieran leer.",
    topics: ["OWASP Top 10", "Reporte técnico", "Metodología de pentest"],
    social: {},
  },
  {
    id: "m4",
    name: "Andrés Molina",
    role: "DFIR Consultant",
    specialty: "Respuesta a Incidentes",
    experienceYears: 12,
    bio: "Ha respondido incidentes en banca y gobierno. Enseña forense con casos reconstruidos.",
    topics: ["Forense de memoria", "Timeline", "Cadena de custodia"],
    social: {},
  },
  {
    id: "m5",
    name: "Sofía Navarro",
    role: "Cloud Security Engineer",
    specialty: "Infraestructura y Cloud",
    experienceYears: 7,
    bio: "Diseña arquitecturas seguras en la nube y acompaña a quienes vienen de redes y sistemas.",
    topics: ["Redes en la nube", "IAM", "Hardening"],
    social: {},
  },
  {
    id: "m6",
    name: "Ricardo Paz",
    role: "Security Researcher",
    specialty: "Investigación y Malware",
    experienceYears: 9,
    bio: "Analiza malware y publica investigación abierta. Mentor de las Research Notes de Labs.",
    topics: ["Análisis de malware", "Ingeniería inversa", "Escritura técnica"],
    social: {},
  },
];

export const metrics: Metric[] = [
  { id: "trained", label: "Personas capacitadas", value: 480, suffix: "+", description: "Researchers y participantes de talleres" },
  { id: "generations", label: "Generaciones", value: 4, description: "Cohortes del Researcher Program" },
  { id: "hours", label: "Horas de formación", value: 1200, suffix: "+", description: "Entre clases, labs y mentorías" },
  { id: "mentors", label: "Mentores", value: 18, description: "Profesionales activos en la comunidad" },
  { id: "challenges", label: "Challenges", value: 36, description: "Retos publicados y evaluados" },
  { id: "alliances", label: "Alianzas", value: 9, description: "Universidades, empresas y comunidades" },
];

export const stories: Story[] = [
  {
    id: "s1",
    name: "Valeria M.",
    generation: "Generación 2",
    role: "Hoy: Analista SOC Jr.",
    quote:
      "Llegué sin saber qué era un SIEM. Lo que más me sirvió no fue la herramienta, fue aprender a justificar cada decisión frente a un mentor.",
    highlight: "Primer empleo en seguridad",
  },
  {
    id: "s2",
    name: "Jorge C.",
    generation: "Generación 3",
    role: "Hoy: Pentester Jr.",
    quote:
      "Los challenges me obligaron a documentar. En mi entrevista técnica me pidieron un reporte y ya tenía cinco en mi portafolio.",
    highlight: "Portafolio de reportes",
  },
  {
    id: "s3",
    name: "Karla R.",
    generation: "Generación 1",
    role: "Hoy: Mentora de la comunidad",
    quote:
      "Pasé de preguntar en los canales a responder en ellos. Ahora acompaño a la generación 4 en el módulo de redes.",
    highlight: "De researcher a mentora",
  },
];
