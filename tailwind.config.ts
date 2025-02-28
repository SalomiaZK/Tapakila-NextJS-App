import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bleuNuit: "#14213D",
        orMetallique: "#FFBA08",
        blancCasse:"#E5E5E5",
        bleuElec: "#0077FF",
        violetNeon: "#9B5DE5",
        grisAnthracite: "#222222",
      },
    },
  },
  plugins: [],
} satisfies Config;
