import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        riso: "rgb(var(--riso) / <alpha-value>)",
        pink: "rgb(var(--pink) / <alpha-value>)",
        sun: "rgb(var(--sun) / <alpha-value>)",
      },
      fontFamily: { display: ["var(--font-display)"], mono: ["var(--font-mono)"] },
    },
  },
  plugins: [],
} satisfies Config;
