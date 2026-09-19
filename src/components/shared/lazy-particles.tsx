"use client";

import dynamic from "next/dynamic";

/** Carga diferida: el canvas no bloquea el primer render ni el LCP. */
export const LazyParticles = dynamic(() => import("./particle-field"), { ssr: false });
