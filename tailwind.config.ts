import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ]
  ,
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1D4ED8",
        "custom-gray": "#1E293B",
      },
    },
  },
  plugins: [],
} satisfies Config;


