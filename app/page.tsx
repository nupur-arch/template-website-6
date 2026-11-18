import { SafeImage } from "@/components/safe-image";
import { strings } from "@/content/strings";
import { getFeaturedArticles } from "@/services/articles";

export default async function Home() {
  const articles = await getFeaturedArticles();
  return <>
    <section className="soft-divider bg-butter px-4 pb-20 pt-16 text-ink"><div className="mx-auto max-w-7xl"><p className="mb-4 inline-block rotate-[-2deg] rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold uppercase shadow-sm">Independent • vivid • daily</p><h1 className="display soft-depth max-w-5xl text-6xl leading-[.9] sm:text-8xl lg:text-[9rem]">{strings.latest}</h1><p className="mt-8 max-w-xl text-lg">A minimal foundation proving the theme, header, search, and normalized mock data are wired and ready.</p></div></section>
    <section className="mx-auto max-w-7xl px-4 py-16"><div className="mb-8 flex items-end justify-between border-b border-line pb-3"><h2 className="display text-4xl md:text-6xl">{strings.featured}</h2><span className="rounded-full bg-sage px-3 py-1 text-xs font-bold text-ink">20 STORIES</span></div><div className="grid gap-8 md:grid-cols-3">{articles.slice(0, 6).map((article, index) => <article key={article.id} className="soft-card-shadow overflow-hidden rounded-[28px] border border-line bg-surface"><SafeImage src={article.image} alt={article.title} category={article.category.name} width={800} height={520} priority={index < 3} className="aspect-[4/3] w-full object-cover"/><div className="p-5"><p className="text-xs font-bold uppercase text-terracotta">{article.category.name} · {article.readTime} min</p><h3 className="display line-clamp-2 mt-2 text-2xl leading-tight">{article.title}</h3></div></article>)}</div></section>
  </>;
}
