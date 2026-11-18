"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/content/site.config";
import { strings } from "@/content/strings";
import { SearchPanel } from "./search-panel";

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => { const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearch(true); } if (event.key === "Escape") { setSearch(false); setMenu(false); } }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, []);
  return <header className="sticky top-0 z-40 h-[var(--header-h)] bg-transparent px-2 pt-2">
    <div className="relative mx-auto flex h-[calc(100%-0.5rem)] max-w-7xl items-center gap-5 rounded-full border border-line bg-surface/95 px-4 shadow-[0_12px_35px_rgb(31_36_33/0.10)] backdrop-blur">
      <Link href="/" aria-label={`${siteConfig.name} home`}><Logo className="h-10 w-auto"/></Link>
      <nav aria-label="Primary" className="ml-auto hidden h-full items-center gap-5 md:flex">{siteConfig.nav.map((item) => <Link key={item.href} href={item.href} className={`relative grid h-full place-items-center text-sm font-bold uppercase after:absolute after:bottom-2 after:left-0 after:h-0.5 after:rounded-full after:bg-terracotta after:transition-[width] ${pathname === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"}`}>{item.label}</Link>)}</nav>
      <button onClick={() => setSearch((value) => !value)} aria-expanded={search} className="ml-auto rounded-full border border-line bg-soft px-3 py-2 text-xs font-bold uppercase md:ml-0">⌕ <span className="hidden lg:inline">Search ⌘K</span></button>
      <button disabled={!mounted} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={strings.toggleTheme} className="grid size-10 place-items-center rounded-full border border-line bg-soft">{mounted && resolvedTheme === "dark" ? "☀" : "◐"}</button>
      <button onClick={() => setMenu((value) => !value)} aria-label={menu ? strings.closeMenu : strings.openMenu} aria-expanded={menu} className="grid size-10 place-items-center rounded-full border border-line bg-soft md:hidden">{menu ? "×" : "≡"}</button>
      <SearchPanel open={search} onClose={() => setSearch(false)}/>
    </div>
    {menu && <nav data-lenis-prevent aria-label="Mobile" className="absolute left-2 right-2 top-full rounded-[24px] border border-line bg-surface p-4 shadow-xl md:hidden">{siteConfig.nav.map((item) => <Link onClick={() => setMenu(false)} key={item.href} href={item.href} className="block border-b border-line py-4 text-xl font-bold uppercase last:border-0">{item.label}</Link>)}</nav>}
  </header>;
}
