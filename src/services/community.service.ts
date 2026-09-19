import "server-only";
import { communityActivities, gallery, mentors, stories, upcomingEvents } from "@/data/community";
import type { CommunityEvent, Mentor } from "@/types";

/**
 * Comunidad, mentores e historias.
 * Preparado para migrar a un CMS (Sanity/Strapi/Contentful) o a Supabase:
 * los componentes solo dependen de estas funciones y de los tipos en `@/types`.
 */

export async function getMentors(): Promise<Mentor[]> {
  return mentors;
}

export async function getUpcomingEvents(limit = 3): Promise<CommunityEvent[]> {
  return [...upcomingEvents].sort((a, b) => a.date.localeCompare(b.date)).slice(0, limit);
}

export async function getCommunity() {
  return { activities: communityActivities, gallery };
}

export async function getStories() {
  return stories;
}
