/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      libre: ['"Libre-Baskerville"', "sans-serif"],
      default: ["Merriweather", "serif"],
    },

    extend: {
      colors: {
        violet: "#8372f7",
        lightBlue: "#d6d3f3",
        lightYellow: "#fef8f1",
      },
    },
  },
  plugins: [],
};
