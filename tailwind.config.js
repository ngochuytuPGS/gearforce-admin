/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ['transparent-300']: 'rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [],
  important: true,
};
