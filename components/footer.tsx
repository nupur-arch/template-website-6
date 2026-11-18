import Link from "next/link";
import { Logo } from "./logo";

export function Footer() { return <footer className="rounded-t-[28px] border-t border-line bg-soft px-4 py-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end"><div><Logo variant="stacked" monochrome className="h-20 w-auto"/><p className="mt-3 max-w-md text-sm text-muted">Independent reporting with the color turned all the way up.</p></div><div className="flex gap-5 text-sm font-bold uppercase text-terracotta"><Link href="/brand">Brand</Link><Link href="/search">Search</Link></div></div></footer>; }
