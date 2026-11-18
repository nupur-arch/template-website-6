import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { siteConfig } from "@/content/site.config";

const display = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono", display: "swap" });
export const metadata: Metadata = { title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` }, description: siteConfig.description, icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang={siteConfig.language} suppressHydrationWarning><body className={`${display.variable} ${mono.variable}`}><ThemeProvider><SmoothScrollProvider><Header/><main>{children}</main><Footer/></SmoothScrollProvider></ThemeProvider></body></html>; }
