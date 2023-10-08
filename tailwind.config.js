/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FFFFFF",
        "secondary": "#267125",
        "button": "#2F772D",
        "title": "#DEBA3B",
        "textbutton": "#2B2B2B"
      }
    },
  },
  plugins: [],
}

