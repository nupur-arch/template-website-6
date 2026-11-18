export const siteConfig = {
  name: "Press/Play",
  description: "Independent reporting with the color turned all the way up.",
  language: "en",
  defaultRoute: "/sports",
  categories: ["News", "Culture", "Sports", "Science", "World"] as const,
  nav: [
    { label: "News", href: "/news" },
    { label: "Culture", href: "/culture" },
    { label: "Sports", href: "/sports" },
    { label: "Science", href: "/science" },
  ],
} as const;
