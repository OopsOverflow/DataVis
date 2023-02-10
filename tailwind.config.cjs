/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  jit: true,
  darkmode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
        mono: ['Ubuntu Mono', 'monospace'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#b91c1c',

          secondary: '#9f1239',

          accent: '#b91c1c',

          neutral: '#3D4451',

          'base-100': '#FFFFFF',

          info: '#9f1239',

          success: '#f87171',

          warning: '#f97316',

          error: '#7f1d1d',
        },
      },
    ],
  },
};
