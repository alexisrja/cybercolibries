# CyberColibríes — sitio institucional

Sitio de CyberColibríes, una comunidad que forma talento en ciberseguridad.
**Aprender. Practicar. Compartir. Impactar.**

## Stack

- **Next.js 16** (App Router, Turbopack, Server Components) + **React 19** + **TypeScript** estricto
- **Tailwind CSS v4**: los tokens de diseño viven en `src/styles/globals.css`
- Primitivas en estilo **shadcn/ui** (Radix + CVA) en `src/components/ui`
- **Lucide** para iconos. Los logos de redes sociales son SVG propios, porque lucide v1 ya no los incluye.
- **Motion** (`motion/react`) cargado con `LazyMotion` + `domAnimation`
- **MDX** para el contenido de Labs, compilado en build con `@mdx-js/mdx`, `remark-gfm` y `rehype-slug`
- **Zod** para validar el frontmatter, el formulario y las respuestas de la API

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build de producción (todas las páginas son estáticas salvo /api/contact)
npm run start    # servir el build
npm run lint
```

Copia `.env.example` a `.env.local` y completa lo que necesites. Sin variables, el sitio funciona igual: la analítica queda apagada, el contacto se registra en consola en desarrollo y las métricas salen de los datos estáticos.

## Estructura

```text
content/labs/           Artículos MDX de CyberColibrí Labs
src/
 ├── app/               Rutas, metadata, sitemap, robots, OG, API
 ├── components/
 │   ├── ui/            Button, Badge, Field (Input/Select/Textarea), Modal
 │   ├── brand/         Marca oficial (BrandMark) y Logo
 │   ├── cards/         ProgramCard, ChallengeCard, MentorCard, MetricCard, BlogCard
 │   ├── layout/        Navbar, Footer, Providers, ThemeToggle
 │   ├── shared/        Section, SectionHeader, Reveal, PageHeader, JsonLd, partículas…
 │   └── mdx/           Componentes disponibles dentro del MDX (Callout…)
 ├── features/          Lógica por dominio: contact, labs, challenges, program, analytics
 ├── sections/          Secciones de la home (Hero, About, Impact…)
 ├── services/          Acceso a datos. Es la única capa que cambia al conectar un CMS o una base de datos.
 ├── data/              Datos estáticos actuales
 ├── hooks/             useScrollSpy, useCountUp, usePointerGlow
 ├── lib/               site config, SEO/schema.org, analytics, MDX, rate limit, utils
 ├── types/             Tipos de dominio (index.ts) y de la futura plataforma (platform.ts)
 └── styles/            globals.css (tokens, utilidades, prose)
```

## Identidad visual

- **Paleta iridiscente** inspirada en el plumaje del colibrí: turquesa → azul → violeta → fucsia, con un acento "néctar" para estados. Cada color tiene su versión para modo oscuro (principal) y modo claro.
- **Tipografía**: Unbounded para títulos, Instrument Sans para textos y JetBrains Mono para etiquetas HUD y código.
- **Marca oficial**: el colibrí multicolor de `rescursos/`, integrado en la navegación, portada, pie, página 404, iconos e imagen social. `BrandMark` sirve versiones responsivas con `next/image`.
- **Tarjetas `card-iri`**: el brillo del borde sigue al cursor. Un solo listener global escribe las variables `--mx`/`--my`, así las tarjetas siguen siendo Server Components.

> Los originales se conservan en `rescursos/`. La versión limpia con transparencia está en `public/brand/logo-transparent.png` (1254 × 1254); `logo.webp` es su copia WebP sin pérdida. La procedencia y las variantes se documentan en `public/brand/README.md`.

## Contenido (Labs)

Agrega un archivo `content/labs/mi-articulo.mdx`:

```mdx
---
title: "Título"
excerpt: "Resumen de una o dos frases."
category: "Guías" # Artículos | Research Notes | Guías | Videos | Herramientas | Challenges | Ciberseguridad | Tecnología
tags: ["Redes", "Wireshark"]
date: "2026-09-01"
author:
  name: "Nombre"
  role: "Rol opcional"
draft: false
---

Contenido en Markdown. Puedes usar <Callout type="tip">…</Callout>.
```

Zod valida el frontmatter durante el build. La slug, la tabla de contenidos, los artículos relacionados, el sitemap y el JSON-LD se generan solos.

**Migrar a un CMS** (Sanity, Strapi o Contentful): reescribe `readAllPosts` en `src/services/content.service.ts` para que devuelva `Post[]`. Ningún componente cambia.

## Datos y futura plataforma

Cada servicio de `src/services` tiene la firma asíncrona que tendrá con una base de datos:

| Servicio | Hoy | Mañana |
| --- | --- | --- |
| `challenges.service` | `data/challenges.ts` | Tabla `challenges` en Supabase |
| `community.service` | `data/community.ts` | CMS o tablas `mentors`, `events`, `stories` |
| `metrics.service` | Estático o `METRICS_API_URL` (caché de 1 h, tag `metrics`) | Vista agregada en Postgres |
| `contact.service` | Webhook (`CONTACT_WEBHOOK_URL`) | Insert en `contact_requests` |
| `content.service` | MDX local | Headless CMS |

`src/types/platform.ts` ya define el modelo de la plataforma: `UserProfile`, `Enrollment`, `Lesson`, `LessonProgress`, `ChallengeAttempt`, `Badge`, `Certificate`, `MentorshipSession` y `DashboardSummary`. Los challenges ya tienen campos opcionales (`points`, `labUrl`, `badgeId`) para progreso y puntuación.

Pasos recomendados para agregar autenticación y dashboard:
1. Agregar `@supabase/ssr` y un cliente en `src/lib/supabase/`.
2. Proteger rutas con `src/proxy.ts`. En Next 16 este archivo reemplaza a `middleware`.
3. Crear las rutas `/(plataforma)/dashboard`, `/perfil` y `/challenges/[slug]/intento` con los tipos de `platform.ts`.

## SEO

- Metadata por página con `buildMetadata()`, que agrega canonical, Open Graph y Twitter/X Cards.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` y la imagen OG se generan a partir del código. Los iconos PNG usan la marca oficial.
- schema.org: `EducationalOrganization`, `WebSite` (con `SearchAction`), `Course` + `FAQPage` en el programa, `TechArticle` en Labs, `LearningResource` en challenges y `BreadcrumbList` en las páginas internas.

## Analítica (opcional y respetuosa de la privacidad)

Elige el proveedor con `NEXT_PUBLIC_ANALYTICS_PROVIDER` (`plausible`, `umami` o `ga`). El script carga con `lazyOnload`.
Para medir un CTA, basta con el helper `trackAttrs("cta_click", "Etiqueta", "ubicación")`. Un listener global envía el evento, así que no hace falta convertir el componente en componente cliente.
Eventos incluidos: `cta_click`, `join_click`, `program_interest`, `challenge_open`, `contact_submit`, `contact_success`, `contact_error`, `labs_search`, `labs_filter`, `content_share` y `theme_toggle`.

## Accesibilidad y rendimiento

- HTML semántico, enlace para saltar al contenido, `aria-current` en la navegación y focus visible en todos los controles.
- El formulario tiene labels, `aria-invalid`/`aria-describedby`, pone el foco en el primer error y anuncia los estados en regiones `aria-live`.
- Con `prefers-reduced-motion`, `MotionConfig` desactiva los desplazamientos, el CSS detiene las animaciones y las partículas se dibujan en un solo cuadro estático.
- Las partículas cargan de forma diferida (`next/dynamic`, `ssr: false`) y se pausan fuera de pantalla o con la pestaña oculta.
- Los contadores muestran la cifra real en el HTML del servidor, lo que ayuda al SEO y funciona sin JS.
- Cabeceras de seguridad en `next.config.ts` y `/.well-known/security.txt`.

## Pendientes antes de publicar

- [x] Logo oficial integrado y optimizado para web.
- [ ] Dominio, correo y URLs reales de redes (`src/lib/site.ts`, `public/.well-known/security.txt`).
- [ ] Reemplazar los **datos de ejemplo**: mentores, historias, métricas, eventos y galería (`src/data/community.ts`).
- [ ] Confirmar la duración, las fechas y la modalidad del programa (`src/data/program.ts`).
- [ ] Revisión legal de privacidad, términos y cookies.
- [ ] Configurar `CONTACT_WEBHOOK_URL` en producción.
