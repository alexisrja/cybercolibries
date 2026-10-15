import type { FaqItem, Initiative, ParticipationPath, Photo, Testimonial, ValueCard } from "@/types";

/**
 * Copy oficial del sitio.
 * Fuente: documento "Contenido web oficial · CyberColibríes"
 * (estructura y textos literales para Inicio, Comunidad, Iniciativas y
 * Participa).
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
    quote: [
      "Hola, soy Karla Susana Martínez, ingeniera en telecomunicaciones y actualmente analista de ciberseguridad. Cuando decidí adentrarme en este campo, mis conocimientos eran muy básicos y no tenía claro por dónde comenzar. El curso impartido por Francisco Guadarrama fue una experiencia clave en mi formación, ya que combinó de manera clara la teoría con ejercicios prácticos, laboratorios tipo CTF y temas como OSINT y fundamentos de pentesting. Esta metodología permitió que cada clase fuera dinámica, retadora y, sobre todo, enfocada en aplicar los conocimientos adquiridos.",
      "Además de la formación técnica, valoro especialmente la orientación profesional recibida sobre currículum, certificaciones, desarrollo de habilidades y cómo generar valor dentro de una organización. La combinación de exigencia, acompañamiento y disposición para resolver dudas me permitió desarrollar mayor confianza y pensamiento crítico. Este curso no solo me proporcionó las bases necesarias para continuar aprendiendo, sino que también fue fundamental para abrirme las puertas al mundo de la ciberseguridad y conseguir mi primer empleo en el área.",
    ].join("\n\n"),
    name: "Karla Susana Martínez",
    context: "Analista de ciberseguridad · Primera generación",
    photo: "/testimonials/karla-martinez.jpg",
    sourceUrl:
      "https://www.linkedin.com/posts/cybercolibr%C3%ADes_caso-de-exitohola-soy-karla-susana-activity-7367751571608150016-vvY5?utm_source=share&utm_medium=member_desktop&rcm=ACoAADF1j-kByaidWwtv0be5iRkZ6dtn9jxNzPc",
  },
  {
    id: "diana",
    quote: [
      "CyberColibríes es una comunidad que va más allá de compartir aspectos técnicos; busca acercar a sus alumnos al mundo de la ciberseguridad mediante las experiencias, aprendizajes y vivencias de sus ponentes. Sus pláticas permiten no solo explorar diversos temas, sino también conocer nuevas perspectivas y descubrir las múltiples posibilidades que ofrece este campo.",
      "Ha sido muy especial formar parte de esta comunidad desde ambas perspectivas: primero como alumna, cuando recién comenzaba en esta área, y tiempo después como ponente, compartiendo mi experiencia junto con un colega de mi equipo. Más allá de la experiencia personal, ha sido muy significativo contribuir al crecimiento de quienes comienzan este camino.",
    ].join("\n\n"),
    name: "Diana",
    context: "Alumna y ponente · CyberColibríes",
    photo: "/testimonials/diana.jpg",
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

/** Fotografías reales de sesiones, actividades y logros de la comunidad. */
export const communityPhotos: Photo[] = [
  {
    id: "premios-amcs-2026",
    caption: "CyberColibríes, finalista en los Premios AMCS 2026.",
    src: "/community/premios-amcs-2026.jpg",
    alt: "Reconocimiento y participantes de CyberColibríes como finalistas en los Premios AMCS 2026",
  },
  {
    id: "tercera-generacion-primera-sesion",
    caption: "Primera sesión de la tercera generación de CyberColibríes.",
    src: "/community/tercera-generacion-primera-sesion.png",
    alt: "Publicación sobre la primera sesión virtual de la tercera generación de CyberColibríes",
  },
  {
    id: "superficie-ataque-cti",
    caption: "Sesión práctica sobre superficie de ataque desde Cyber Threat Intelligence.",
    src: "/community/superficie-ataque-cti.png",
    alt: "Sesión virtual de CyberColibríes sobre superficie de ataque desde CTI",
  },
  {
    id: "introduccion-soc",
    caption: "Introducción al SOC compartida con la comunidad.",
    src: "/community/introduccion-soc.png",
    alt: "Sesión virtual de introducción a un centro de operaciones de seguridad",
  },
  {
    id: "analisis-correo-spoofing",
    caption: "Análisis de intentos de extorsión mediante correo fraudulento.",
    src: "/community/analisis-correo-spoofing.png",
    alt: "Sesión práctica de análisis de correos electrónicos fraudulentos",
  },
  {
    id: "curso-cyber-threat-intelligence",
    caption: "Primera sesión del curso de Cyber Threat Intelligence.",
    src: "/community/curso-cyber-threat-intelligence.png",
    alt: "Clase virtual de introducción a Cyber Threat Intelligence",
  },
  {
    id: "sesion-universidad-mexiquense",
    caption: "Nuevo ciclo de aprendizaje con estudiantes de la Universidad Mexiquense del Bicentenario.",
    src: "/community/sesion-universidad-mexiquense.png",
    alt: "Encuentro virtual con estudiantes de la Universidad Mexiquense del Bicentenario",
  },
  {
    id: "reto-osint",
    caption: "Reto OSINT resuelto en comunidad.",
    src: "/community/reto-osint.png",
    alt: "Participantes de CyberColibríes completando un reto práctico de OSINT",
  },
];

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
    image: "/initiatives/researcher-program.png",
    summary: "Ruta formativa para quienes quieren desarrollar sus primeras capacidades en ciberseguridad.",
    description:
      "Una ruta de formación para personas que buscan desarrollar sus primeras capacidades profesionales en ciberseguridad mediante contenido, práctica, acompañamiento y retos.",
    status: "activa",
    icon: "graduation-cap",
    cta: {
      label: "Conocer el Researcher Program",
      href: "/iniciativas/researcher-program#researcher-program-inicio",
    },
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
    image: "/initiatives/colibri-talks.png",
    summary: "Charlas y sesiones para compartir conocimiento y experiencias.",
    description:
      "Charlas abiertas para la comunidad donde profesionales compartirán experiencias, conocimiento, herramientas y aprendizajes del mundo de la ciberseguridad. Sesiones creadas para aprender directamente de quienes trabajan, investigan y construyen dentro de la industria.",
    status: "proximamente",
    icon: "mic",
  },
  {
    slug: "colibri-mental",
    name: "Colibrí Mental",
    image: "/initiatives/colibri-mental.png",
    summary: "Blog de noticias, herramientas e investigaciones creadas o seleccionadas por la comunidad.",
    description:
      "Nuestro espacio de conocimiento: un blog de noticias, herramientas, investigaciones, análisis y recursos creados o seleccionados por la comunidad. Un lugar para mantenernos curiosos, entender lo que ocurre en ciberseguridad y compartir conocimiento útil con otras personas.",
    status: "proximamente",
    icon: "newspaper",
  },
];

/* ------------------------------------------------------------------ Participa */

export const participate = {
  title: "Hay muchas formas de ser parte de CyberColibríes.",
  intro:
    "No necesitas estar en el mismo punto profesional que los demás. Puedes venir a aprender, compartir lo que sabes, colaborar o ayudarnos a llevar conocimiento a nuevas comunidades.",
  chooseTitle: "Elige cómo quieres participar",
  otherIdea: {
    title: "Cuéntanos cómo quieres participar",
    body: "Escríbenos directamente por LinkedIn para conversar sobre aprendizaje, mentoría, charlas, proyectos o colaboraciones.",
  },
  linkedinGuide: {
    cta: "Escribir por LinkedIn",
    note: "Visita nuestra página y selecciona “Mensaje”. Cuéntanos brevemente quién eres y cómo te gustaría participar.",
  },
  quote: "No importa si vienes a aprender o a enseñar. Lo importante es que el conocimiento siga moviéndose.",
} as const;

export const participationPaths: ParticipationPath[] = [
  {
    id: "aprender",
    title: "Quiero aprender",
    description: "Participa en nuestras actividades, contenidos, convocatorias y espacios de aprendizaje.",
    cta: "Únete a la comunidad",
    icon: "compass",
    image: "/participa/quiero-aprender.png",
    squareImage: "/participa/quiero-aprender-square.png",
  },
  {
    id: "compartir",
    title: "Quiero compartir conocimiento",
    description:
      "Si trabajas, investigas o tienes experiencia en algún área de tecnología o ciberseguridad, puedes compartirla con la comunidad.",
    cta: "Quiero compartir",
    icon: "megaphone",
    image: "/participa/quiero-compartir-conocimiento.png",
    squareImage: "/participa/quiero-compartir-conocimiento-square.png",
  },
  {
    id: "mentor",
    title: "Quiero ser mentor",
    description:
      "Acompaña a personas que están comenzando, comparte experiencia, resuelve dudas y aporta retroalimentación para su desarrollo.",
    cta: "Quiero ser mentor",
    icon: "lightbulb",
    image: "/participa/quiero-ser-mentor.png",
    squareImage: "/participa/quiero-ser-mentor-square.png",
  },
  {
    id: "organizacion",
    title: "Quiero colaborar como organización",
    description:
      "Universidades, comunidades, empresas y organizaciones pueden colaborar mediante difusión, espacios, conocimiento, herramientas o iniciativas conjuntas.",
    cta: "Hablemos",
    icon: "handshake",
    image: "/participa/quiero-colaborar-organizacion.png",
    squareImage: "/participa/quiero-colaborar-organizacion-square.png",
  },
];

export const participationLabels: Record<ParticipationPath["id"], string> = {
  aprender: "Quiero aprender",
  compartir: "Quiero compartir conocimiento",
  mentor: "Quiero ser mentor",
  organizacion: "Quiero colaborar como organización",
  otro: "Tengo otra idea",
};

/* ------------------------------------------------------------------ Preguntas frecuentes */

export const faqSection = {
  eyebrow: "Preguntas frecuentes",
  title: "Dudas antes de dar el primer paso",
  description:
    "Lo que más nos preguntan sobre la comunidad, el Researcher Program y las formas de participar.",
} as const;

/**
 * Preguntas frecuentes de la página Participa.
 * Cada respuesta se compone únicamente con afirmaciones que ya están en el
 * copy oficial (Inicio, Comunidad, Iniciativas, Researcher Program y
 * Participa). No se añaden fechas de convocatoria, requisitos, sedes ni
 * cifras: lo que el sitio no afirma, aquí no se responde.
 */
export const faqs: FaqItem[] = [
  {
    id: "que-es-cybercolibries",
    question: "¿Qué es CyberColibríes?",
    answer:
      "CyberColibríes es una comunidad enfocada en acercar la ciberseguridad a estudiantes, personas que comienzan su carrera y quienes buscan desarrollar nuevas habilidades tecnológicas. Creemos en aprender haciendo, compartir conocimiento y generar oportunidades de crecimiento mediante educación, práctica, mentoría y colaboración.",
  },
  {
    id: "a-quien-va-dirigida",
    question: "¿A quién va dirigida la comunidad?",
    answer:
      "La comunidad reúne estudiantes, profesionales, mentores y personas interesadas en tecnología y ciberseguridad. No necesitas estar en el mismo punto profesional que los demás: puedes venir a aprender, compartir lo que sabes, colaborar o ayudarnos a llevar conocimiento a nuevas comunidades.",
  },
  {
    id: "que-es-researcher-program",
    question: "¿Qué es el CyberColibrí Researcher Program?",
    answer:
      "Es una iniciativa educativa gratuita impulsada por CyberColibríes: una ruta formativa de siete meses, de nivel introductorio y modalidad teórico-práctica o híbrida, con 14 sesiones prácticas virtuales y 20 horas de contenido bajo demanda. Está orientada a personas que desean construir sus primeras capacidades en ciberseguridad y su perfil de egreso es Analista Junior de Ciberseguridad.",
  },
  {
    id: "costo-researcher-program",
    question: "¿El Researcher Program tiene algún costo?",
    answer:
      "No. El CyberColibrí Researcher Program es una iniciativa educativa gratuita impulsada por CyberColibríes.",
  },
  {
    id: "modulos-researcher-program",
    question: "¿Qué módulos incluye el Researcher Program?",
    answer:
      "La ruta se compone de ocho módulos: Fundamentos de Tecnologías de la Información y Ciberseguridad; Redes e Infraestructura Tecnológica; Gestión de Vulnerabilidades; Hacking Ético; Monitoreo de Seguridad; Ciberinteligencia de Amenazas; Respuesta a Incidentes, e Informática Forense. Parte de la tecnología y avanza hacia las principales disciplinas de la ciberseguridad.",
  },
  {
    id: "experiencia-previa",
    question: "¿Necesito experiencia previa en ciberseguridad?",
    answer:
      "El Researcher Program es de nivel introductorio y su ruta parte de los fundamentos de tecnologías de la información antes de avanzar hacia las disciplinas de ciberseguridad. En la comunidad hay espacio para comenzar, preguntar, practicar, compartir lo que sabes y crecer junto a otras personas.",
  },
  {
    id: "como-participar",
    question: "¿Cómo puedo participar en CyberColibríes?",
    answer:
      "Hay cuatro formas de sumarse: aprender, participando en nuestras actividades, contenidos y convocatorias; compartir conocimiento, si trabajas o investigas en alguna área de tecnología o ciberseguridad; ser mentor, acompañando a personas que están comenzando; o colaborar como organización —universidades, comunidades, empresas y organizaciones— mediante difusión, espacios, conocimiento, herramientas o iniciativas conjuntas. Si tienes otra idea, escríbenos por LinkedIn: visita nuestra página, selecciona “Mensaje” y cuéntanos brevemente quién eres y cómo te gustaría participar.",
  },
  {
    id: "colibri-talks-y-mental",
    question: "¿Qué son Colibrí Talks y Colibrí Mental?",
    answer:
      "Son dos iniciativas que aún están por comenzar. Colibrí Talks serán charlas abiertas para la comunidad, donde profesionales compartirán experiencias, conocimiento, herramientas y aprendizajes del mundo de la ciberseguridad. Colibrí Mental será nuestro blog de noticias, herramientas, investigaciones, análisis y recursos creados o seleccionados por la comunidad.",
  },
];
