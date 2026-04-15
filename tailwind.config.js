/** @type {import('tailwindcss').Config} */
const { colors, fonts, spacing, radius, shadows, sizes } = require('./theme');

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
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
  plugins: [require('@tailwindcss/typography')],
};
