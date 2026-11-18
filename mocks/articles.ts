import type { Article, Category } from "@/types";

const categories: Record<string, Category> = {
  news: { id: "cat-news", name: "News", slug: "news", color: "blue" },
  culture: { id: "cat-culture", name: "Culture", slug: "culture", color: "pink" },
  sports: { id: "cat-sports", name: "Sports", slug: "sports", color: "yellow" },
  science: { id: "cat-science", name: "Science", slug: "science", color: "blue" },
  world: { id: "cat-world", name: "World", slug: "world", color: "pink" },
};
const photos = [
  "photo-1504711434969-e33886168f5c", "photo-1521295121783-8a321d551ad2", "photo-1529107386315-e1a2ed48a620", "photo-1475721027785-f74eccf877e2", "photo-1500530855697-b586d89ba3ee",
  "photo-1531058020387-3be344556be6", "photo-1469571486292-0ba58a3f068b", "photo-1540747913346-19e32dc3e97e", "photo-1461896836934-ffe607ba8211", "photo-1517649763962-0c623066013b",
  "photo-1507413245164-6160d8298b31", "photo-1532094349884-543bc11b234d", "photo-1451187580459-43490279c0fa", "photo-1535223289827-42f1e9919769", "photo-1517976547714-720226b864c1",
  "photo-1500534314209-a25ddb2bd429", "photo-1446776811953-b23d57bd21aa"
];
const titles = [
  "The city block rewriting its own rules", "Small magazines are making a loud return", "Inside the new era of public night markets", "The speech that changed the room", "A field guide to slower mornings",
  "Why every great venue needs a strange corner", "The volunteers mapping invisible borders", "A final decided in the last bright minute", "The runners building a league of their own", "The art of the impossible comeback",
  "A tiny lab with a planet-sized question", "What deep ice tells us about tomorrow", "The telescope listening between the stars", "The repair movement reaches your phone", "The river that became a classroom",
  "Letters from a town at the edge", "A new atlas for an old landscape", "The archive hidden beneath the station", "How neighborhoods remember", "Twenty ways to read the weather"
];

export const mockArticles: Article[] = titles.map((title, index) => {
  const key = (["news", "culture", "news", "news", "culture", "culture", "world", "sports", "sports", "sports", "science", "science", "science", "science", "world", "world", "world", "culture", "news", "science"] as const)[index];
  return { id: `article-${index + 1}`, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), title, excerpt: "Sharp reporting, vivid detail, and a fresh way to see what is happening now.", body: `## ${title}\n\nThis is a mock story used to prove the normalized content layer.`, category: categories[key], image: index >= 17 ? null : `https://images.unsplash.com/${photos[index]}?auto=format&fit=crop&w=1200&q=80`, publishedAt: `2026-11-${String(18 - (index % 12)).padStart(2, "0")}T09:00:00.000Z`, readTime: 4 + (index % 5), featured: true };
});
