/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  experimental: {
    optimizeUniversalDefaults: true, // Try enabling optimization to avoid `oklch()`
  },
};
