import { cn } from "@/lib/utils";

/**
 * Colibrí facetado construido como una red de nodos.
 * Es el elemento distintivo de la marca: el mismo trazo sirve para el
 * logotipo (variant="mark") y para la composición del hero (variant="hero").
 * Coordenadas en un viewBox de 400×400.
 */

type Pt = readonly [number, number];

const NODES: Pt[] = [
  [392, 104], // 0 punta del pico
  [290, 116], // 1 base del pico (arriba)
  [291, 128], // 2 base del pico (abajo)
  [262, 95], // 3 corona
  [236, 112], // 4 nuca
  [283, 147], // 5 garganta (gorget)
  [270, 178], // 6 pecho
  [226, 140], // 7 hombro
  [248, 222], // 8 vientre
  [203, 194], // 9 espalda baja
  [207, 248], // 10 base de la cola
  [140, 318], // 11 cola A
  [171, 340], // 12 cola B
  [206, 331], // 13 cola C
  [212, 150], // 14 raíz del ala
  [92, 22], // 15 punta del ala
  [178, 66], // 16 borde de ataque
  [130, 98], // 17 ala media
  [180, 146], // 18 borde de salida
  [46, 120], // 19 ala trasera: punta
  [116, 162], // 20 ala trasera: media
  [168, 190], // 21 ala trasera: salida
];

type Face = readonly [number, number, number];

const BODY: Face[] = [
  [0, 1, 2],
  [1, 3, 4],
  [1, 4, 5],
  [1, 5, 2],
  [4, 7, 5],
  [5, 7, 6],
  [7, 9, 6],
  [6, 9, 8],
  [9, 10, 8],
  [9, 11, 10],
  [10, 11, 12],
  [10, 12, 13],
  [10, 13, 8],
  [14, 21, 9],
];

const WING_FRONT: Face[] = [
  [7, 16, 14],
  [16, 15, 17],
  [16, 17, 14],
  [14, 17, 18],
];

const WING_BACK: Face[] = [
  [14, 19, 20],
  [14, 20, 21],
];

const WING_ORIGIN = "212px 148px";

function nodesOf(faces: Face[]) {
  return [...new Set(faces.flat())];
}

const poly = (f: Face) => f.map((i) => NODES[i].join(",")).join(" ");

/* Opacidad por faceta: simula la luz sobre el plumaje. */
const facetOpacity = (i: number, base: number) => base + ((i * 37) % 9) * 0.035;

interface Props {
  variant?: "hero" | "mark";
  animated?: boolean;
  className?: string;
  title?: string;
  /** Sufijo único para el gradiente SVG cuando hay varias instancias en la página. */
  id?: string;
}

export function Hummingbird({ variant = "hero", animated = variant === "hero", className, title, id = variant }: Props) {
  const grad = `cc-iri-${id}`;
  const isMark = variant === "mark";

  const renderGroup = (faces: Face[], offset: number) => (
    <>
      {faces.map((f, i) => (
        <polygon
          key={`f-${i}`}
          points={poly(f)}
          fill={`url(#${grad})`}
          fillOpacity={isMark ? facetOpacity(i + offset, 0.55) : facetOpacity(i + offset, 0.1)}
          stroke={isMark ? "none" : `url(#${grad})`}
          strokeOpacity={0.9}
          strokeWidth={1.1}
          strokeLinejoin="round"
        />
      ))}
      {!isMark &&
        nodesOf(faces).map((n) => (
          <circle
            key={`n-${n}`}
            cx={NODES[n][0]}
            cy={NODES[n][1]}
            r={n === 0 ? 3.2 : 2.4}
            className="fill-bg"
            stroke={`url(#${grad})`}
            strokeWidth={1.4}
          />
        ))}
    </>
  );

  return (
    <svg
      viewBox={isMark ? "30 10 370 340" : "0 0 400 400"}
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={grad} x1="60" y1="40" x2="390" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--teal)" }} />
          <stop offset="0.4" style={{ stopColor: "var(--blue)" }} />
          <stop offset="0.72" style={{ stopColor: "var(--violet)" }} />
          <stop offset="1" style={{ stopColor: "var(--magenta)" }} />
        </linearGradient>
      </defs>

      <g className={cn(animated && "motion-safe:animate-wing-back")} style={{ transformOrigin: WING_ORIGIN }}>
        {renderGroup(WING_BACK, 20)}
      </g>
      <g>{renderGroup(BODY, 0)}</g>
      <circle cx={268} cy={112} r={isMark ? 7 : 3.6} className={isMark ? "fill-bg" : "fill-fg"} />
      <g className={cn(animated && "motion-safe:animate-wing")} style={{ transformOrigin: WING_ORIGIN }}>
        {renderGroup(WING_FRONT, 10)}
      </g>
    </svg>
  );
}
