/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const Rots = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

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
  plugins: [require('daisyui'), Rots],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f43f5e",
          "secondary": "#fb7185",
          "accent": "#ef4444",
          "neutral": "#fecdd3",
          "base-100": "#f3f4f6",
          "info": "#e11d48",
          "success": "#f87171",
          "warning": "#b91c1c",
          "error": "#dc2626",
        },
      },
    ],
  },
};
