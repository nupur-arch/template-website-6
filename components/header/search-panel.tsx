"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SafeImage } from "@/components/safe-image";
import { Skeleton } from "@/components/ui/skeleton";
import { strings } from "@/content/strings";
import type { SearchResult } from "@/types";

function Highlight({ text, query }: { text: string; query: string }) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return text;
  return <>{text.slice(0, index)}<mark className="rounded bg-butter px-0.5 text-ink">{text.slice(index, index + query.length)}</mark>{text.slice(index + query.length)}</>;
}

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { inputRef.current?.focus(); setRecent(JSON.parse(localStorage.getItem("pressplay-recent") ?? "[]") as string[]); } }, [open]);
  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); setLoading(false); return; }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true); setError(false);
      try { const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal }); if (!response.ok) throw new Error(); setResults(await response.json() as SearchResult[]); setActive(0); }
      catch (caught) { if ((caught as Error).name !== "AbortError") setError(true); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }, 300);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);
  const groups = useMemo(() => Object.groupBy(results, (item) => item.group), [results]);
  if (!open) return null;
  const select = (result: SearchResult) => { const next = [query, ...recent.filter((item) => item !== query)].slice(0, 5); localStorage.setItem("pressplay-recent", JSON.stringify(next)); window.location.href = result.href; };
  return (
    <div className="fixed inset-0 z-50 bg-ink/60 p-0 md:absolute md:inset-auto md:right-4 md:top-[calc(100%+8px)] md:w-[min(620px,calc(100vw-2rem))] md:bg-transparent" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section data-lenis-prevent role="dialog" aria-modal="true" aria-label="Site search" className="h-full overflow-y-auto rounded-[28px] border border-line bg-surface p-4 shadow-[0_24px_70px_rgb(31_36_33/0.18)] md:h-auto md:max-h-[70vh]">
        <div className="flex gap-2"><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={strings.searchPlaceholder} aria-label={strings.search} className="min-w-0 flex-1 rounded-full border border-line bg-soft px-4 py-3" onKeyDown={(event) => { if (event.key === "Escape") onClose(); if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)); } if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); } if (event.key === "Enter" && results[active]) select(results[active]); }} /><button aria-label="Close search" onClick={onClose} className="rounded-full border border-line bg-soft px-4">×</button></div>
        {loading && <div className="mt-4 space-y-3" aria-label="Loading results"><Skeleton className="h-16"/><Skeleton className="h-16"/><Skeleton className="h-16"/></div>}
        {error && <p className="mt-4 rounded-[24px] border border-terracotta bg-soft p-3">Search is unavailable. Please try again.</p>}
        {!loading && query.length >= 2 && !error && results.length === 0 && <p className="mt-4 p-4 text-center">{strings.noResults}</p>}
        {query.length < 2 && recent.length > 0 && <div className="mt-4"><h2 className="text-xs font-bold uppercase">{strings.recentSearches}</h2><div className="mt-2 flex flex-wrap gap-2">{recent.map((item) => <button key={item} onClick={() => setQuery(item)} className="rounded-full border border-line bg-sage px-3 py-1 text-ink">{item}</button>)}</div></div>}
        {Object.entries(groups).map(([group, items]) => <div key={group} className="mt-4"><h2 className="border-b border-line pb-1 text-xs font-bold uppercase">{group}</h2>{items?.map((item) => { const index = results.indexOf(item); return <Link key={item.id} href={item.href} onClick={() => select(item)} className={`mt-2 grid grid-cols-[64px_1fr] gap-3 rounded-[24px] p-2 ${active === index ? "bg-butter/70 text-ink" : ""}`}><SafeImage src={item.image} alt="" category={group} width={64} height={48} className="h-12 w-16 object-cover"/><span><strong className="line-clamp-2"><Highlight text={item.title} query={query}/></strong><small className="block text-muted">{item.subtitle}</small></span></Link>; })}</div>)}
        <Link href={`/search?q=${encodeURIComponent(query)}`} className="mt-4 block text-right text-xs font-bold uppercase underline decoration-terracotta decoration-2 underline-offset-4">View all results →</Link>
      </section>
    </div>
  );
}
