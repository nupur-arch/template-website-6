import { apiClient } from "@/lib/api/client";
import { mapApiArticle } from "@/lib/api/mappers";
import { mockArticles } from "@/mocks/articles";
import type { Article } from "@/types";

export async function getFeaturedArticles(signal?: AbortSignal): Promise<Article[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return mockArticles;
  const raw = await apiClient<Record<string, unknown>[]>("articles?featured=true", { signal });
  return raw.map(mapApiArticle);
}
