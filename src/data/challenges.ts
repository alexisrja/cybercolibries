import type { Challenge, ChallengeStatus, Difficulty } from "@/types";

export const difficultyMeta: Record<Difficulty, { label: string; level: 1 | 2 | 3 | 4 }> = {
  inicial: { label: "Inicial", level: 1 },
  junior: { label: "Junior", level: 2 },
  intermedio: { label: "Intermedio", level: 3 },
  avanzado: { label: "Avanzado", level: 4 },
};

export const challengeStatusMeta: Record<ChallengeStatus, { label: string; tone: "teal" | "nectar" | "violet" }> = {
  disponible: { label: "Disponible", tone: "teal" },
  proximamente: { label: "Próximamente", tone: "nectar" },
  "en-diseno": { label: "En diseño", tone: "violet" },
};

export const challenges: Challenge[] = [
  {
    slug: "network-investigation",
    title: "Network Investigation",
    category: "Networking",
    difficulty: "junior",
    status: "disponible",
    skills: ["Networking", "Analysis", "Investigation"],
    summary: "Una estación de trabajo empezó a comportarse raro. Tienes la captura de tráfico de una hora: descubre qué pasó.",
    scenario:
      "El equipo de soporte reporta que una laptop de contabilidad está lenta y hace conexiones a horas extrañas. Te entregan un archivo PCAP con una hora de tráfico. No hay más contexto: el objetivo es reconstruir lo que ocurrió y explicar si representa un riesgo.",
    objectives: [
      "Identificar los hosts y servicios involucrados.",
      "Detectar patrones anómalos en DNS y HTTP.",
      "Determinar si hubo exfiltración o comunicación con infraestructura sospechosa.",
    ],
    deliverables: ["Línea de tiempo de eventos", "Lista de indicadores observados", "Conclusión de una página para un público no técnico"],
    estimatedTime: "3–4 h",
    moduleNumber: 2,
    points: 150,
  },
  {
    slug: "phish-tales",
    title: "Phish Tales",
    category: "Threat Intel",
    difficulty: "inicial",
    status: "disponible",
    skills: ["Email", "OSINT", "Critical thinking"],
    summary: "Tres correos, uno legítimo. Analiza encabezados, enlaces y adjuntos para decidir cuál es cuál y por qué.",
    scenario:
      "Recursos Humanos recibió tres correos sobre un cambio de nómina. Dos de ellos son intentos de phishing con diferente nivel de sofisticación. Debes demostrar con evidencia cuál es legítimo.",
    objectives: ["Leer e interpretar encabezados SMTP", "Analizar URLs sin visitarlas", "Evaluar SPF, DKIM y DMARC"],
    deliverables: ["Dictamen por correo con evidencia", "Recomendaciones para el equipo de RR. HH."],
    estimatedTime: "1–2 h",
    moduleNumber: 1,
    points: 80,
  },
  {
    slug: "log-hunt",
    title: "Log Hunt: acceso sospechoso",
    category: "SOC",
    difficulty: "junior",
    status: "disponible",
    skills: ["SIEM", "Detection", "Triage"],
    summary: "Miles de eventos de autenticación y una alerta ambigua. Decide si es un falso positivo o el inicio de algo serio.",
    scenario:
      "Una regla de detección disparó por múltiples intentos fallidos seguidos de un inicio de sesión exitoso desde un país inusual. Tienes los logs de autenticación y de VPN de los últimos siete días.",
    objectives: ["Correlacionar eventos entre fuentes", "Construir una hipótesis y validarla", "Proponer una mejora a la regla de detección"],
    deliverables: ["Ticket de triage con decisión justificada", "Propuesta de ajuste a la regla"],
    estimatedTime: "2–3 h",
    moduleNumber: 4,
    points: 120,
  },
  {
    slug: "web-recon-mission",
    title: "Web Recon Mission",
    category: "Pentesting",
    difficulty: "junior",
    status: "proximamente",
    skills: ["Recon", "OWASP", "Reporting"],
    summary: "Una aplicación web de laboratorio y un alcance definido. Enumera, valida y reporta como lo harías para un cliente.",
    scenario:
      "Una startup ficticia te contrata para una evaluación acotada de su portal de clientes. El reto no es encontrar todo, sino priorizar bien y comunicarlo con claridad.",
    objectives: ["Respetar el alcance y las reglas de compromiso", "Enumerar superficie de ataque", "Validar hallazgos sin causar daño"],
    deliverables: ["Reporte con hallazgos priorizados por riesgo"],
    estimatedTime: "4–5 h",
    moduleNumber: 3,
  },
  {
    slug: "ioc-pivoting",
    title: "IOC Pivoting",
    category: "CTI",
    difficulty: "intermedio",
    status: "proximamente",
    skills: ["CTI", "OSINT", "Correlation"],
    summary: "Parte de un solo dominio malicioso y reconstruye la infraestructura de una campaña con fuentes abiertas.",
    scenario:
      "Un aliado comparte un dominio observado en una campaña de credenciales. Tu trabajo es pivotear sobre registros, certificados y hosting para mapear el resto de la infraestructura.",
    objectives: ["Pivotear con fuentes públicas", "Distinguir correlación de coincidencia", "Asignar niveles de confianza"],
    deliverables: ["Mapa de infraestructura", "Reporte de inteligencia con niveles de confianza"],
    estimatedTime: "3–4 h",
    moduleNumber: 5,
  },
  {
    slug: "memory-trail",
    title: "Memory Trail",
    category: "DFIR",
    difficulty: "intermedio",
    status: "en-diseno",
    skills: ["Forensics", "Memory", "Timeline"],
    summary: "Un volcado de memoria de un servidor comprometido. Encuentra el proceso intruso y cómo llegó ahí.",
    scenario:
      "El equipo de respuesta aisló un servidor y adquirió su memoria antes de apagarlo. Tu tarea es identificar persistencia, procesos maliciosos y el vector inicial.",
    objectives: ["Analizar procesos y conexiones en memoria", "Identificar mecanismos de persistencia", "Construir una línea de tiempo"],
    deliverables: ["Timeline del incidente", "Informe forense resumido"],
    estimatedTime: "5–6 h",
    moduleNumber: 6,
  },
];
