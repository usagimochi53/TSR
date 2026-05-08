import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: "#4f6f52",
        leaf: "#7a9f54",
        paper: "#fbfaf6",
        ink: "#273127",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(39, 49, 39, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
