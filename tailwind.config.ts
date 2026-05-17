import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        panel: "#0d111c",
        gold: "#f7c948",
        ruby: "#e11d48",
        emerald: "#10b981",
        cyan: "#38bdf8"
      },
      boxShadow: {
        glow: "0 0 32px rgba(247, 201, 72, 0.34)",
        ruby: "0 0 28px rgba(225, 29, 72, 0.32)"
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
