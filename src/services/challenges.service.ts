import "server-only";
import { challenges } from "@/data/challenges";
import type { Challenge } from "@/types";

/**
 * Fuente actual: datos estáticos en `src/data/challenges.ts`.
 * Para conectar la plataforma, reemplazar el cuerpo de estas funciones por
 * consultas a Supabase (tabla `challenges`) manteniendo la misma firma.
 */

const byStatusThenTitle = (a: Challenge, b: Challenge) => {
  const order = { disponible: 0, proximamente: 1, "en-diseno": 2 } as const;
  return order[a.status] - order[b.status] || a.title.localeCompare(b.title, "es");
};

export async function getChallenges(): Promise<Challenge[]> {
  return [...challenges].sort(byStatusThenTitle);
}

export async function getChallengeBySlug(slug: string): Promise<Challenge | undefined> {
  return challenges.find((c) => c.slug === slug);
}

export async function getRelatedChallenges(challenge: Challenge, limit = 3): Promise<Challenge[]> {
  return challenges
    .filter((c) => c.slug !== challenge.slug)
    .map((c) => ({
      c,
      score:
        (c.category === challenge.category ? 3 : 0) +
        c.skills.filter((s) => challenge.skills.includes(s)).length +
        (c.difficulty === challenge.difficulty ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ c }) => c);
}
