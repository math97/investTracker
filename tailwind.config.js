/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stock-green': '#4ade80',
        'stock-red': '#f87171',
        'card-bg': '#0d0d14',
        'card-border': '#1f1f2e',
        'app-bg': '#050508',
        'purple-accent': '#8b5cf6',
      }
    },
  },
  plugins: [],
}
