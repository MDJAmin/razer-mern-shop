/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "light":"#FFFFFF",
        "dark":"#000000",
        "gray":"#2C2C2C",
        "black-bg":"#131313",
        "light-bg":"#F4F4F4",
        "light-green":"#00FF00",
        "dark-green":"#16BE0F",
        "soft-green":"#20D668",
        "info-green":"#5DBF28",
        "placeHolder":"#ACADAC",
        "error":"#2C2C2C"
      },
    },
  },

  darkMode: 'class',

  plugins: [],
};
