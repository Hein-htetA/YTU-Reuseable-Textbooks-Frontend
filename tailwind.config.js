/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre-Baskerville"', "sans-serif"],
        sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
        default: ["Merriweather", "serif"],
      },
      colors: {
        violet: "#8372f7",
        lightBlue: "#d6d3f3",
        lightYellow: "#fef8f1",
      },
    },
  },
  plugins: [],
};
