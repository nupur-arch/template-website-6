"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SafeImage } from "@/components/safe-image";
import type { Article } from "@/types";

const spots = [[5,5,28,1],[38,2,23,2],[67,8,27,0],[12,44,22,2],[41,39,28,0],[74,49,20,1],[3,80,25,0],[32,77,21,1],[60,83,32,2],[8,121,29,1],[44,118,21,0],[72,126,24,2],[3,161,22,2],[31,156,31,0],[68,167,25,1],[9,201,28,0],[43,199,22,2],[73,208,21,1],[18,243,25,2],[55,241,34,0]] as const;
const tones = ["bg-surface", "bg-butter", "bg-soft"];

export default function HeroCanvas({ articles }: { articles: Article[] }) {
  const reduced = useReducedMotion();
  const [view, setView] = useState<"canvas" | "grid">("canvas");
  const [opened, setOpened] = useState<Article | null>(null);
  const [cursor, setCursor] = useState({ show: false, open: false });
  const refs = useRef<Array<HTMLAnchorElement | null>>([]);
  const x = useMotionValue(-250), y = useMotionValue(-300);
  const cursorX = useSpring(0, { stiffness: 500, damping: 40 }), cursorY = useSpring(0, { stiffness: 500, damping: 40 });
  const parallaxX = useTransform(x, v => v * .035), parallaxY = useTransform(y, v => v * .035);

  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpened(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const moveFocus = (index: number, key: string) => {
    const columns = view === "grid" || reduced ? 4 : 5;
    const delta = key === "ArrowRight" ? 1 : key === "ArrowLeft" ? -1 : key === "ArrowDown" ? columns : -columns;
    refs.current[(index + delta + articles.length) % articles.length]?.focus();
  };

  const tile = (article: Article, index: number, canvas = false) => {
    const spot = spots[index];
    return <motion.article key={article.id} layoutId={`card-${article.id}`} whileHover={reduced ? undefined : { scale: 1.045, zIndex: 10 }} className={`${canvas ? "absolute" : "snap-start"} group overflow-hidden rounded-[26px] border border-line ${tones[spot[3]]} soft-card-shadow`} style={canvas ? { left: `${spot[0]}%`, top: `${spot[1] * 9}px`, width: `${spot[2]}%`, zIndex: spot[3] + 1 } : undefined} onMouseEnter={() => setCursor({ show: true, open: true })} onMouseLeave={() => setCursor(c => ({ ...c, open: false }))}>
      <Link ref={node => { refs.current[index] = node; }} href={`/articles/${article.slug}`} className="block" aria-label={`Open article: ${article.title}`} onClick={e => { e.preventDefault(); setOpened(article); }} onKeyDown={e => { if (e.key.startsWith("Arrow")) { e.preventDefault(); moveFocus(index, e.key); } }}>
        <motion.div layoutId={`image-${article.id}`} className="overflow-hidden rounded-[24px]"><SafeImage src={article.image} alt="" category={article.category.name} width={720} height={480} priority={index < 4} className="aspect-[4/3] w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0" /></motion.div>
        <div className="p-4"><p className="text-[11px] font-bold uppercase text-muted">{article.category.name} · {article.readTime} min</p><h2 className="display line-clamp-2 mt-1 text-xl leading-tight sm:text-2xl">{article.title}</h2></div>
      </Link>
    </motion.article>;
  };

  const staticView = view === "grid" || reduced;
  return <section className="hero-shell relative overflow-hidden bg-paper" aria-labelledby="hero-heading">
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 sm:p-6"><div><p className="inline-flex rounded-full bg-terracotta px-3 py-1 text-xs font-bold uppercase text-accentInk">Today&apos;s 20</p><h1 id="hero-heading" className="display mt-2 max-w-lg text-5xl leading-[.85] sm:text-7xl">The day, spread out.</h1></div><div className="pointer-events-auto flex rounded-full border border-line bg-surface/95 p-1 shadow-lg" role="group" aria-label="Hero view">{(["canvas","grid"] as const).map(option => <button key={option} type="button" onClick={() => setView(option)} aria-pressed={view === option} className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${view === option ? "bg-ink text-paper" : "text-muted"}`}>{option}</button>)}</div></div>
    <motion.div className="pointer-events-none absolute bottom-7 left-7 z-20 hidden h-24 w-24 place-items-center rounded-full border border-line bg-sage text-center text-xs font-bold uppercase shadow-lg md:grid" style={{ x: parallaxX, y: parallaxY, rotate: -8 }}>Fresh<br/>dispatches</motion.div>
    <div className="hero-mobile-strip absolute inset-x-0 bottom-0 top-40 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 pt-4 md:hidden" data-lenis-prevent>{articles.map((a,i) => <div key={a.id} className={`w-[72vw] shrink-0 ${i % 2 ? "pt-14" : "pb-14"}`}>{tile(a,i)}</div>)}</div>
    {staticView ? <div className="hero-static-grid absolute inset-x-0 bottom-0 top-36 hidden overflow-y-auto px-4 pb-10 pt-10 md:grid md:grid-cols-3 lg:grid-cols-4" data-lenis-prevent>{articles.map((a,i) => tile(a,i))}</div> : <div className="absolute inset-x-0 bottom-0 top-32 hidden cursor-none overflow-hidden md:block" data-lenis-prevent onMouseEnter={() => setCursor(c => ({...c,show:true}))} onMouseLeave={() => setCursor({show:false,open:false})} onMouseMove={e => { cursorX.set(e.clientX - 37); cursorY.set(e.clientY - 37); }}><motion.div drag dragMomentum dragElastic={.08} style={{x,y}} onDragEnd={() => { x.set(((x.get() + 2200) % 2600) - 2200); y.set(((y.get() + 2300) % 2600) - 2300); }} className="absolute h-[2900px] w-[2400px] max-w-none" aria-label="Draggable article canvas">{articles.map((a,i) => tile(a,i,true))}</motion.div><motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 grid h-[74px] w-[74px] place-items-center rounded-full bg-ink text-[11px] font-bold uppercase text-paper" animate={{opacity:cursor.show?1:0,scale:cursor.open?1.15:1}} style={{x:cursorX,y:cursorY}}>{cursor.open?"Open":"Drag"}</motion.div></div>}
    <AnimatePresence>{opened && <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-ink/60 p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setOpened(null)} role="dialog" aria-modal="true" aria-labelledby="preview-title"><motion.article layoutId={`card-${opened.id}`} className="max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-line bg-surface p-3 shadow-2xl" onClick={e => e.stopPropagation()}><motion.div layoutId={`image-${opened.id}`}><SafeImage src={opened.image} alt={opened.title} category={opened.category.name} width={1000} height={620} className="aspect-[16/9] w-full object-cover"/></motion.div><div className="p-4 sm:p-6"><p className="text-xs font-bold uppercase text-muted">{opened.category.name} · {opened.readTime} min read</p><h2 id="preview-title" className="display mt-2 text-4xl leading-none sm:text-5xl">{opened.title}</h2><p className="mt-4 text-muted">{opened.excerpt}</p><div className="mt-6 flex gap-3"><Link href={`/articles/${opened.slug}`} className="rounded-full bg-terracotta px-5 py-3 text-sm font-bold text-accentInk">Read article</Link><button type="button" onClick={() => setOpened(null)} className="rounded-full border border-line px-5 py-3 text-sm font-bold">Close</button></div></div></motion.article></motion.div>}</AnimatePresence>
  </section>;
}
