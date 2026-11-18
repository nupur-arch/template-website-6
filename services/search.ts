import { getFeaturedArticles } from "./articles";
import { getPlayers, getTeams } from "./sports";
import type { SearchResult } from "@/types";

export async function searchContent(query: string, signal?: AbortSignal): Promise<SearchResult[]> {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return [];
  const [articles, teams, players] = await Promise.all([getFeaturedArticles(signal), getTeams(), getPlayers()]);
  return [
    ...articles.filter((item) => item.title.toLowerCase().includes(normalized)).map((item) => ({ id: item.id, title: item.title, subtitle: `${item.category.name} · ${item.readTime} min`, image: item.image, href: `/article/${item.slug}`, group: "news" as const })),
    ...teams.filter((item) => item.name.toLowerCase().includes(normalized)).map((item) => ({ id: item.id, title: item.name, subtitle: "Team", image: item.logo, href: `/teams/${item.id}`, group: "teams" as const })),
    ...players.filter((item) => item.name.toLowerCase().includes(normalized)).map((item) => ({ id: item.id, title: item.name, subtitle: item.position, image: item.image, href: `/players/${item.id}`, group: "players" as const })),
  ];
}
