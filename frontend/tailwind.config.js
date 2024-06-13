/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        custom: {
          'button-color': '#1737C9',
        }
      }
    },
  },
  plugins: [],
}