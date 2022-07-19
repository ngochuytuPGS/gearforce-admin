/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ['color-primary']: '#323259',
        ['color-secondary']: '#1B1B38',
        ['color-sidebar-scrollbar-track']: '#242446',
        ['color-sidebar-scrollbar-thumb']: '#13132B',
        ['color-sidebar-active']: '#9C6BF8',
        ['color-main-scrollbar-track']: '#13132B',
        ['color-main-scrollbar-thumb']: '#B18AFF',
        ['color-input']: '#252547',
        ['color-border']: '#13132B',
        ['color-purple']: '#B18AFF',
        ['color-blue']: '#1162C6',
        ['color-orange']: '#F0AD4E',
        ['color-orange-dark']: '#AD8252',
        ['transparent-300']: 'rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
  important: true,
};
