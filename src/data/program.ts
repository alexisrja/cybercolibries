import type { MethodStep, Program } from "@/types";

/**
 * TODO(contenido): validar duración, fechas y modalidad con el equipo
 * académico antes de publicar la convocatoria.
 */
export const researcherProgram: Program = {
  slug: "researcher-program",
  name: "CyberColibrí Researcher Program",
  headline: "De los fundamentos a tu primer perfil junior en ciberseguridad.",
  description:
    "Un programa guiado de seis módulos que te lleva de entender cómo funciona una computadora a investigar un incidente real. Cada módulo combina clases en vivo, laboratorios, una Researcher Mission y retroalimentación de mentores.",
  facts: [
    { label: "Duración", value: "24 semanas", detail: "6 módulos de 4 semanas" },
    { label: "Modalidad", value: "Online en vivo", detail: "Sesiones semanales + labs asíncronos" },
    { label: "Nivel", value: "Inicial → Junior", detail: "No necesitas experiencia previa en seguridad" },
    { label: "Perfil objetivo", value: "Estudiantes y perfiles TI", detail: "También personas en transición de carrera" },
    { label: "Metodología", value: "Researcher Missions", detail: "Aprender, practicar, investigar y documentar" },
  ],
  audience: [
    "Estudiantes de carreras de tecnología o afines.",
    "Personas de soporte, redes o desarrollo que quieren especializarse.",
    "Profesionales de otras áreas en transición hacia ciberseguridad.",
    "Cualquier persona con curiosidad, constancia y ganas de compartir.",
  ],
  includes: [
    "Clases en vivo grabadas para repasar",
    "Laboratorios prácticos por módulo",
    "Seis Researcher Missions evaluadas",
    "Mentoría y feedback de profesionales",
    "Acceso a Researcher Challenges",
    "Comunidad activa durante y después del programa",
  ],
  modules: [
    {
      number: 1,
      slug: "fundamentos",
      title: "Fundamentos de TI y Ciberseguridad",
      summary: "Sistemas operativos, línea de comandos, virtualización y los conceptos base de la seguridad de la información.",
      topics: ["Linux y Windows desde la terminal", "Tríada CIA y gestión de riesgos", "Virtualización y tu propio lab", "Criptografía esencial"],
      outcome: "Montas tu laboratorio y te mueves con soltura en la terminal.",
      weeks: 4,
      icon: "cpu",
    },
    {
      number: 2,
      slug: "redes",
      title: "Redes e Infraestructura",
      summary: "Cómo viajan los datos, qué hay en una red empresarial y cómo leer el tráfico para entender qué está pasando.",
      topics: ["Modelos OSI y TCP/IP", "DNS, HTTP y TLS en detalle", "Captura y análisis con Wireshark", "Segmentación y firewalls"],
      outcome: "Investigas una captura de tráfico y explicas lo que encontraste.",
      weeks: 4,
      icon: "network",
    },
    {
      number: 3,
      slug: "pentesting",
      title: "Análisis de Vulnerabilidades y Pentesting",
      summary: "Metodología ofensiva ética: reconocimiento, explotación controlada y, sobre todo, reportes que alguien pueda usar.",
      topics: ["Reconocimiento y enumeración", "OWASP Top 10 en práctica", "Escaneo y validación de vulnerabilidades", "Redacción de reportes técnicos"],
      outcome: "Entregas un reporte de pentest con hallazgos priorizados.",
      weeks: 4,
      icon: "bug",
    },
    {
      number: 4,
      slug: "soc",
      title: "Seguridad Defensiva y SOC",
      summary: "El día a día de un analista: logs, alertas, SIEM, triage y cómo separar el ruido de lo importante.",
      topics: ["Fuentes de logs y telemetría", "SIEM y reglas de detección", "Triage y escalamiento", "MITRE ATT&CK aplicado"],
      outcome: "Triagas alertas reales y justificas cada decisión.",
      weeks: 4,
      icon: "shield",
    },
    {
      number: 5,
      slug: "cti",
      title: "Cyber Threat Intelligence",
      summary: "Convertir datos sueltos en inteligencia accionable: fuentes, IOCs, TTPs y cómo comunicarlo a quien decide.",
      topics: ["Ciclo de inteligencia", "OSINT responsable", "IOCs, TTPs y pivoteo", "Reportes de inteligencia"],
      outcome: "Construyes el perfil de una amenaza a partir de evidencia pública.",
      weeks: 4,
      icon: "radar",
    },
    {
      number: 6,
      slug: "dfir",
      title: "Respuesta a Incidentes y Forense Digital",
      summary: "Qué hacer cuando algo ya pasó: contener, preservar evidencia, reconstruir la línea de tiempo y aprender del incidente.",
      topics: ["Ciclo de respuesta a incidentes", "Adquisición y cadena de custodia", "Análisis de disco y memoria", "Timeline y lecciones aprendidas"],
      outcome: "Reconstruyes un incidente de punta a punta en tu misión final.",
      weeks: 4,
      icon: "fingerprint",
    },
  ],
};

export const methodSteps: MethodStep[] = [
  { id: "aprender", title: "Aprender", description: "Conceptos claros en sesiones en vivo y material de apoyo.", icon: "book-open" },
  { id: "practicar", title: "Practicar", description: "Laboratorios guiados para llevar la teoría a tus manos.", icon: "wrench" },
  { id: "mission", title: "Researcher Mission", description: "Una investigación con contexto real, preguntas abiertas y evidencia.", icon: "compass" },
  { id: "challenge", title: "Challenge", description: "Un reto sin guía paso a paso que pone a prueba tu criterio.", icon: "target" },
  { id: "feedback", title: "Feedback", description: "Mentores revisan tu razonamiento, no solo tu respuesta.", icon: "message" },
  { id: "crecer", title: "Crecer", description: "Documentas, compartes y subes de nivel con la comunidad.", icon: "sparkles" },
];

export const methodSkills = [
  "Investigación",
  "Razonamiento",
  "Criterio técnico",
  "Interpretación",
  "Documentación",
  "Resolución de problemas",
  "Comunicación técnica",
];
