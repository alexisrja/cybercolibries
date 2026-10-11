# CyberColibríes — sitio web

Sitio de CyberColibríes, comunidad que impulsa talento en ciberseguridad.
**Aprender. Practicar. Compartir. Impactar.**

El contenido y la estructura siguen el documento **"Contenido web oficial · CyberColibríes"**: cinco páginas independientes, la comunidad como centro y el Researcher Program como una iniciativa más.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio: qué es CyberColibríes, cómo trabajamos, iniciativas, testimonios y cierre |
| `/comunidad` | Quiénes somos, misión y visión, principios, "Somos comunidad" y fotografías |
| `/iniciativas` | Researcher Program, Colibrí Talks y Colibrí Mental |
| `/iniciativas/researcher-program` | Detalle de la iniciativa: formación, práctica, mentoría y comunidad |
| `/participa` | Cuatro formas de sumarse y contacto directo por LinkedIn (`#contacto`) |

Más: `/privacidad`, `/terminos`, `/cookies`, página 404, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, imagen Open Graph y `/.well-known/security.txt`.

## Reglas de contenido que el código respeta

- **Sin cifras inventadas.** No hay contadores ni métricas hasta que existan datos verificables.
- **Testimonios reales.** Solo se publican testimonios compartidos y autorizados por integrantes de la comunidad.
- **Fotografías propias.** La galería utiliza imágenes reales de sesiones, actividades y logros de la comunidad.
- **Sin logotipos de aliados** hasta confirmar colaboración y autorización de marca.

## Stack

- **Next.js 16** (App Router, Turbopack, Server Components) + **React 19** + **TypeScript** estricto
- **Tailwind CSS v4**: los tokens de diseño viven en `src/styles/globals.css`
- Primitivas en estilo **shadcn/ui** (Radix + CVA) en `src/components/ui`
- **Lucide** para iconos; los logos de redes son SVG propios
- **Motion** (`motion/react`) con `LazyMotion` + `domAnimation`

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm run start
npm run lint
```

Copia `.env.example` a `.env.local`. Sin variables el sitio funciona y la analítica queda apagada. El contacto se realiza directamente mediante la cuenta oficial de LinkedIn.

## Estructura

```text
src/
 ├── app/               Una carpeta por página + metadata, sitemap, robots y OG
 ├── components/
 │   ├── ui/            Button, Badge y Modal
 │   ├── brand/         BrandMark (logo oficial) y Logo
 │   ├── cards/         InitiativeCard
 │   ├── layout/        Navbar, Footer, Providers, ThemeToggle
 │   └── shared/        Section, SectionHeader, PageHero, ValueGrid, PhotoGrid,
 │                      Testimonials, CtaBand, Reveal, JsonLd, Icon
 ├── features/          contacto por LinkedIn y analítica
 ├── sections/          HomeHero
 ├── services/          content.service (contenido)
 ├── data/              content.ts — copy oficial en un solo lugar
 ├── hooks/             usePointerGlow
 ├── lib/               site, seo/schema.org, analytics y utils
 ├── types/             dominio (index.ts) y futura plataforma (platform.ts)
 └── styles/            globals.css
```

**Cambiar textos:** todo el copy vive en `src/data/content.ts`.
**Conectar un CMS o Supabase:** reescribe `src/services/content.service.ts` manteniendo las firmas; las páginas no cambian.

## Identidad visual

- Paleta iridiscente inspirada en el plumaje del colibrí: turquesa → azul → violeta → fucsia, con acento "néctar" para estados. Versiones propias para modo oscuro (principal) y claro.
- Tipografía: Unbounded para títulos, Instrument Sans para textos, JetBrains Mono para etiquetas.
- El emblema oficial aparece sobre un escenario de anillos y nodos en la portada; `BrandMark` sirve versiones responsivas con `next/image`.
- Tarjetas `card-iri`: el borde se ilumina siguiendo al cursor mediante un único listener global, así las tarjetas siguen siendo Server Components.

> Los originales de marca se conservan fuera del repositorio (`rescursos/`, ignorada por git). Las versiones optimizadas están en `public/brand`.

## SEO, accesibilidad y rendimiento

- Metadata por página con `buildMetadata()`: canonical, Open Graph y Twitter/X Cards.
- schema.org: `EducationalOrganization`, `WebSite`, `Course` en el Researcher Program y `BreadcrumbList` en páginas internas.
- Foco visible, `aria-current` en navegación y controles táctiles accesibles.
- `prefers-reduced-motion` respetado en CSS y en Motion.
- Cabeceras de seguridad en `next.config.ts`.

## Analítica (opcional, sin cookies)

`NEXT_PUBLIC_ANALYTICS_PROVIDER` acepta `plausible`, `umami` o `ga`. Para medir un CTA basta `trackAttrs("cta_click", "Etiqueta", "ubicación")`: un listener global envía el evento sin convertir el componente en cliente.

## Pendientes antes de publicar

- [ ] Dominio definitivo (`src/lib/site.ts`, `public/.well-known/security.txt`).
- [ ] Logotipos de aliados con autorización.
- [ ] Revisión legal de privacidad, términos y cookies.
