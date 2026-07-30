/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EA6113",
        secondary: "#F88F22",
        accent: "#FBB931",
        "light-accent": "#FFE3B3",
        background: {
          DEFAULT: "#0B0B0D",
          light: "#111111",
          lighter: "#161616",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(234, 97, 19, 0.2)',
        'glow-lg': '0 0 30px rgba(234, 97, 19, 0.3)',
      },
    },
  },
  plugins: [],
};