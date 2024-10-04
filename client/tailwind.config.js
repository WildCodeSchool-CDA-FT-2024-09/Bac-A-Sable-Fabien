/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgrey: "#E8E8E8",
        darkgrey: "#1E2731",
        orangy: "#E85800",
      },
    },
  },
  plugins: [],
}

