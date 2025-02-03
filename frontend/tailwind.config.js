/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-green':'#00FF00',
        'dark-green':'#1B1F1B',
        'gray':'#2C2C2C',
        'light-gray':'#646464',
        'white-smoke':'#CACACA',
        'white':'#FFFFFF',
        'black':'#131313',
      }
    },
  },
  plugins: [],
};
