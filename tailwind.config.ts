import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        soft: "rgb(var(--soft) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        terracotta: "rgb(var(--terracotta) / <alpha-value>)",
        butter: "rgb(var(--butter) / <alpha-value>)",
        dusty: "rgb(var(--dusty) / <alpha-value>)",
      },
      fontFamily: { display: ["var(--font-display)"], mono: ["var(--font-mono)"] },
    },
  },
  plugins: [],
} satisfies Config;
