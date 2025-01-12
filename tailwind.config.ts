import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#29AA00',
          dark: '#238E00',
          light: '#33CC00',
          50: '#E6F4E6',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
