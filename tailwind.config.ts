import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dooh-dark":       "#050507",
        "dooh-dark-mid":   "#07070c",
        "dooh-lime":       "#ddf81d",
        "dooh-lime-light": "#dfff92",
        "dooh-white":      "#f7f7f7",
        "dooh-gray-mid":   "#c0cacb",
        "dooh-gray-light": "#d8d8d8",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
