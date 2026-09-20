import type { Initiative, Partner, ParticipationPath, Photo, Testimonial, ValueCard } from "@/types";

/**
 * Copy oficial del sitio.
 * Fuente: documento "Contenido web oficial · CyberColibríes"
 * (estructura y textos literales para Inicio, Comunidad, Iniciativas,
 * Impacto y Participa).
 *
 * Reglas del documento que se respetan aquí:
 * - CyberColibríes se presenta como comunidad; el Researcher Program es una
 *   iniciativa, no el centro de la identidad.
 * - No se publican cifras sin evidencia ni testimonios de ejemplo.
 */

/* ------------------------------------------------------------------ Inicio */

export const home = {
  eyebrow: "Comunidad · Educación · Oportunidades",
  title: "CyberColibríes",
  subtitle: "Comunidad que impulsa nuevas generaciones de talento en ciberseguridad.",
  intro:
    "Aprendemos, compartimos conocimiento y creamos oportunidades para que más personas puedan iniciar y crecer en ciberseguridad.",
  primaryCta: { label: "Únete a la comunidad", href: "/participa" },
  secondaryCta: { label: "Conoce más", href: "/comunidad" },
  whatIs: {
    title: "¿Qué es CyberColibríes?",
    paragraphs: [
      "CyberColibríes es una comunidad enfocada en acercar la ciberseguridad a estudiantes, personas que comienzan su carrera y quienes buscan desarrollar nuevas habilidades tecnológicas.",
      "Creemos en aprender haciendo, compartir conocimiento y generar oportunidades de crecimiento mediante educación, práctica, mentoría y colaboración.",
    ],
  },
  idea: {
    eyebrow: "Nuestra idea de comunidad",
    title: "No buscamos únicamente enseñar herramientas.",
    body: "Queremos que más personas tengan acceso al conocimiento, encuentren una comunidad donde aprender y puedan construir su propio camino profesional.",
  },
  closing: {
    title: "Hay muchas formas de ser parte de CyberColibríes.",
    body: "Aprende, participa, comparte conocimiento o ayúdanos a llevar oportunidades a más personas.",
    cta: { label: "Únete a la comunidad", href: "/participa" },
  },
} as const;

export const whatWeDo: ValueCard[] = [
  {
    title: "Aprendemos",
    description: "Contenido y espacios para desarrollar habilidades en tecnología y ciberseguridad.",
    icon: "book-open",
  },
  {
    title: "Practicamos",
    description: "Laboratorios, ejercicios, retos y actividades para llevar el conocimiento a escenarios reales.",
    icon: "wrench",
  },
  {
    title: "Compartimos",
    description: "Charlas, experiencias, recursos y conocimiento generado por la comunidad.",
    icon: "share",
  },
  {
    title: "Conectamos",
    description: "Personas que están comenzando con profesionales, mentores, comunidades y organizaciones.",
    icon: "network",
  },
];

/**
 * Testimonios reales compartidos para su publicación por la comunidad.
 * Las citas se conservan literalmente; los testimonios en video no se
 * transcriben ni resumen para no atribuir palabras que no fueron verificadas.
 */
export const testimonials: Testimonial[] = [
  {
    id: "karla-susana-martinez",
    quote:
      "Definitivamente, este curso fue el que me abrió las puertas al mundo de la ciberseguridad y me ayudó a conseguir mi primer empleo en dicha área.",
    name: "Karla Susana Martínez",
    context: "Analista de ciberseguridad · Primera generación",
    photo: "/testimonials/karla-martinez.jpg",
  },
  {
    id: "isaac-leyva",
    name: "Isaac Leyva",
    context: "Primera generación · Testimonio en video",
    video: "/testimonials/isaac-leiva.mp4",
    poster: "/testimonials/isaac-leiva-poster.webp",
  },
];

/* ------------------------------------------------------------------ Comunidad */

export const community = {
  title: "Una comunidad para aprender, compartir y crecer en ciberseguridad.",
  intro:
    "CyberColibríes reúne estudiantes, profesionales, mentores y personas interesadas en tecnología y ciberseguridad con un mismo objetivo: acercar el conocimiento, crear oportunidades y ayudar a desarrollar nuevas generaciones de talento.",
  mission:
    "Impulsar el desarrollo de nuevas generaciones de profesionales mediante educación accesible, mentoría, colaboración comunitaria y generación de conocimiento práctico.",
  vision:
    "Ser una comunidad referente por democratizar el acceso al conocimiento, desarrollar talento emergente y construir una red colaborativa capaz de contribuir a personas, organizaciones y comunidades.",
  weAreCommunity: {
    title: "Somos comunidad",
    paragraphs: [
      "CyberColibríes no está construido alrededor de una sola persona ni de un solo programa. Es una comunidad que crece con quienes aprenden, quienes enseñan, quienes comparten su experiencia y quienes ayudan a abrir nuevas oportunidades.",
      "Aquí hay espacio para comenzar, preguntar, practicar, compartir lo que sabes y crecer junto a otras personas.",
    ],
  },
  closing: {
    title: "Sé parte de la comunidad.",
    body: "Ya sea para aprender, colaborar o compartir conocimiento, siempre hay una forma de participar.",
    cta: { label: "Quiero ser parte", href: "/participa" },
  },
} as const;

export const values: ValueCard[] = [
  {
    title: "Aprender",
    description:
      "Creemos que las personas pueden desarrollar nuevas habilidades cuando encuentran conocimiento accesible, guía y un espacio seguro para preguntar.",
    icon: "book-open",
  },
  {
    title: "Practicar",
    description: "El conocimiento se fortalece cuando se convierte en ejercicios, retos, laboratorios y resolución de problemas.",
    icon: "wrench",
  },
  {
    title: "Compartir",
    description: "La comunidad crece cuando quienes saben algo ayudan a quienes están comenzando.",
    icon: "share",
  },
  {
    title: "Impactar",
    description: "Buscamos que el aprendizaje se convierta en nuevas capacidades, conexiones y oportunidades.",
    icon: "sparkles",
  },
];

/**
 * Fotografías reales de la comunidad (sesiones, mentorías, charlas…).
 * Vacío hasta contar con material propio y autorizado; el documento pide
 * priorizar imágenes reales sobre fotografías de stock.
 */
export const communityPhotos: Photo[] = [];

/* ------------------------------------------------------------------ Iniciativas */

export const initiativesPage = {
  title: "Distintas formas de compartir conocimiento y generar oportunidades.",
  intro:
    "Nuestras iniciativas nacen de una misma idea: acercar la ciberseguridad a más personas mediante formación, comunidad y conocimiento práctico.",
} as const;

export const initiatives: Initiative[] = [
  {
    slug: "researcher-program",
    name: "CyberColibrí Researcher Program",
    summary: "Ruta formativa para quienes quieren desarrollar sus primeras capacidades en ciberseguridad.",
    description:
      "Una ruta de formación para personas que buscan desarrollar sus primeras capacidades profesionales en ciberseguridad mediante contenido, práctica, acompañamiento y retos.",
    status: "activa",
    icon: "graduation-cap",
    cta: { label: "Conocer el Researcher Program", href: "/iniciativas/researcher-program" },
    pillars: [
      { title: "Formación", description: "Una ruta progresiva desde fundamentos hasta capacidades prácticas.", icon: "book-open" },
      { title: "Práctica", description: "Ejercicios, laboratorios y escenarios para aplicar lo aprendido.", icon: "wrench" },
      { title: "Mentoría", description: "Acompañamiento y retroalimentación de personas con experiencia.", icon: "message" },
      { title: "Comunidad", description: "Aprendizaje junto a otras personas que están construyendo su camino.", icon: "users" },
    ],
  },
  {
    slug: "colibri-talks",
    name: "Colibrí Talks",
    summary: "Charlas y sesiones para compartir conocimiento y experiencias.",
    description:
      "Charlas abiertas para la comunidad donde profesionales compartirán experiencias, conocimiento, herramientas y aprendizajes del mundo de la ciberseguridad. Sesiones creadas para aprender directamente de quienes trabajan, investigan y construyen dentro de la industria.",
    status: "proximamente",
    icon: "mic",
  },
  {
    slug: "colibri-mental",
    name: "Colibrí Mental",
    summary: "Blog de noticias, herramientas e investigaciones creadas o seleccionadas por la comunidad.",
    description:
      "Nuestro espacio de conocimiento: un blog de noticias, herramientas, investigaciones, análisis y recursos creados o seleccionados por la comunidad. Un lugar para mantenernos curiosos, entender lo que ocurre en ciberseguridad y compartir conocimiento útil con otras personas.",
    status: "proximamente",
    icon: "newspaper",
  },
];

/* ------------------------------------------------------------------ Impacto */

export const impact = {
  title: "El impacto se construye persona por persona.",
  intro:
    "CyberColibríes busca que más personas puedan acercarse a la ciberseguridad, desarrollar nuevas habilidades y encontrar una comunidad que acompañe su crecimiento.",
  stories: {
    title: "Historias que nos impulsan",
    intro: "El impacto también se cuenta a través de las experiencias de quienes han formado parte de CyberColibríes.",
  },
  inAction: {
    title: "Comunidad en acción",
    lead: "Sesiones. Mentorías. Charlas. Retos. Aprendizaje. Colaboración.",
  },
  collaborations: {
    title: "Colaboraciones",
    body: "CyberColibríes está abierto a colaborar con universidades, comunidades, especialistas, empresas y organizaciones que compartan el objetivo de acercar conocimiento y oportunidades a más personas.",
  },
  closing: {
    title: "Ayúdanos a llevar oportunidades a más personas.",
    body: "El impacto crece cuando más personas deciden aprender, compartir o colaborar.",
    cta: { label: "Participa", href: "/participa" },
  },
} as const;

export const impactAreas: ValueCard[] = [
  {
    title: "Conocimiento accesible",
    description:
      "Acercamos contenidos, experiencias y espacios de aprendizaje a personas que quieren iniciar o fortalecer su camino en ciberseguridad.",
    icon: "globe",
  },
  {
    title: "Desarrollo de talento",
    description:
      "Creamos oportunidades para practicar, investigar, recibir retroalimentación y construir capacidades aplicables al mundo profesional.",
    icon: "target",
  },
  {
    title: "Comunidad",
    description:
      "Conectamos personas que están comenzando con otras que quieren enseñar, mentorizar, compartir experiencias o colaborar.",
    icon: "users",
  },
  {
    title: "Efecto multiplicador",
    description: "Cada persona que aprende y posteriormente comparte lo aprendido ayuda a que el conocimiento llegue a alguien más.",
    icon: "share",
  },
];

/** Historias reales y autorizadas que también se presentan en Inicio. */
export const stories: Testimonial[] = testimonials;

/** Fotografías de actividades para "Comunidad en acción". */
export const actionPhotos: Photo[] = [];

/** Solo aliados con participación real y autorización para usar su marca. */
export const partners: Partner[] = [];

/* ------------------------------------------------------------------ Participa */

export const participate = {
  title: "Hay muchas formas de ser parte de CyberColibríes.",
  intro:
    "No necesitas estar en el mismo punto profesional que los demás. Puedes venir a aprender, compartir lo que sabes, colaborar o ayudarnos a llevar conocimiento a nuevas comunidades.",
  chooseTitle: "Elige cómo quieres participar",
  otherIdea: {
    title: "¿Tienes otra idea?",
    body: "Si quieres proponer una charla, proyecto, colaboración, recurso o iniciativa que pueda generar impacto, queremos escucharte.",
  },
  quote: "No importa si vienes a aprender o a enseñar. Lo importante es que el conocimiento siga moviéndose.",
  closing: {
    title: "Tu lugar en la comunidad puede empezar hoy.",
    body: "Aprende. Comparte. Colabora. Impacta.",
    cta: { label: "Únete a la comunidad", href: "/participa#contacto" },
  },
} as const;

export const participationPaths: ParticipationPath[] = [
  {
    id: "aprender",
    title: "Quiero aprender",
    description: "Participa en nuestras actividades, contenidos, convocatorias y espacios de aprendizaje.",
    cta: "Únete a la comunidad",
    icon: "compass",
  },
  {
    id: "compartir",
    title: "Quiero compartir conocimiento",
    description:
      "Si trabajas, investigas o tienes experiencia en algún área de tecnología o ciberseguridad, puedes compartirla con la comunidad.",
    cta: "Quiero compartir",
    icon: "megaphone",
  },
  {
    id: "mentor",
    title: "Quiero ser mentor",
    description:
      "Acompaña a personas que están comenzando, comparte experiencia, resuelve dudas y aporta retroalimentación para su desarrollo.",
    cta: "Quiero ser mentor",
    icon: "lightbulb",
  },
  {
    id: "organizacion",
    title: "Quiero colaborar como organización",
    description:
      "Universidades, comunidades, empresas y organizaciones pueden colaborar mediante difusión, espacios, conocimiento, herramientas o iniciativas conjuntas.",
    cta: "Hablemos",
    icon: "handshake",
  },
];

export const participationLabels: Record<ParticipationPath["id"], string> = {
  aprender: "Quiero aprender",
  compartir: "Quiero compartir conocimiento",
  mentor: "Quiero ser mentor",
  organizacion: "Quiero colaborar como organización",
  otro: "Tengo otra idea",
};
