/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // Base
        "light":"#FFFFFF",
        "dark":"#000000",
        "gray":"#2C2C2C",
        // Bg
        "black-bg":"#131313",
        "light-bg":"#F4F4F4",
        // Green
        "light-green":"#00FF00",
        "dark-green":"#16BE0F",
        "soft-green":"#20D668",
        "info-green":"#5DBF28",
        // Slider
        "green":"#16BE0F",
        "yellow":"#D9AD0B",
        "pink":"#E8077D",
        "red":"#A60502",
        "orange":"#C1391A",
        "blue":"#063465",
        // Details
        "placeHolder":"#ACADAC",
        "error":"#2C2C2C"
      },
    },
  },

  darkMode: 'class',

  plugins: [],
};
