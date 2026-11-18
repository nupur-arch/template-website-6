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
  return <header className="sticky top-0 z-40 h-[var(--header-h)] border-b-2 border-ink bg-paper/95 backdrop-blur">
    <div className="relative mx-auto flex h-full max-w-7xl items-center gap-5 px-4">
      <Link href="/" aria-label={`${siteConfig.name} home`}><Logo className="h-10 w-auto"/></Link>
      <nav aria-label="Primary" className="ml-auto hidden h-full items-center gap-5 md:flex">{siteConfig.nav.map((item) => <Link key={item.href} href={item.href} className={`relative grid h-full place-items-center text-sm font-bold uppercase after:absolute after:bottom-2 after:left-0 after:h-1 after:bg-pink after:transition-[width] ${pathname === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"}`}>{item.label}</Link>)}</nav>
      <button onClick={() => setSearch((value) => !value)} aria-expanded={search} className="ml-auto border-2 border-ink px-3 py-2 text-xs font-bold uppercase md:ml-0">⌕ <span className="hidden lg:inline">Search ⌘K</span></button>
      <button disabled={!mounted} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={strings.toggleTheme} className="grid size-10 place-items-center border-2 border-ink">{mounted && resolvedTheme === "dark" ? "☀" : "◐"}</button>
      <button onClick={() => setMenu((value) => !value)} aria-label={menu ? strings.closeMenu : strings.openMenu} aria-expanded={menu} className="grid size-10 place-items-center border-2 border-ink md:hidden">{menu ? "×" : "≡"}</button>
      <SearchPanel open={search} onClose={() => setSearch(false)}/>
    </div>
    {menu && <nav data-lenis-prevent aria-label="Mobile" className="absolute left-0 top-full w-full border-b-2 border-ink bg-paper p-4 md:hidden">{siteConfig.nav.map((item) => <Link onClick={() => setMenu(false)} key={item.href} href={item.href} className="block border-b border-ink/20 py-4 text-xl font-bold uppercase">{item.label}</Link>)}</nav>}
  </header>;
}
