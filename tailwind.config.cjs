/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
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
    plugins: [require("daisyui")],
    daisyui: {
        themes: ['halloween'],
        logs: true,
    }
}
