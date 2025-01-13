/** @type {import('tailwindcss').Config} */
import typography from"@tailwindcss/typography";
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    themes: ["coffee", "winter"],
  },
  plugins: ["@tailwindcss/typography", "daisyui"],
  daisyui: {
    themes: ["coffee", "light"],
  },
};
