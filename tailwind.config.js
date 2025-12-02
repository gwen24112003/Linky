/** @type {import('tailwindcss').Config} */
const { colors, fonts, spacing, radius, shadows, sizes } = require('./src/theme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: fonts,
      colors: colors,
      spacing: spacing,
      borderRadius: radius,
      boxShadow: shadows,
      width: sizes,
      height: sizes,
      minWidth: sizes,
      minHeight: sizes,
      maxWidth: sizes,
      maxHeight: sizes,
    },
  },
  plugins: [],
}