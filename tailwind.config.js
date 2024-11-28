/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-gray':'rgb(244, 244, 244)',
        'back-gray':'rgb(215, 215, 215)'
      }
    },
  },
  plugins: [],
}