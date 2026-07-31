/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0D0D0F",
          subtle: "#121316",
        },
        surface: {
          DEFAULT: "#17181C",
          hover: "#22242B",
          active: "#2A2C35",
          border: "#282A33",
        },
        primary: {
          DEFAULT: "#EA6113",
          hover: "#F87125",
          light: "rgba(234, 97, 19, 0.15)",
        },
        secondary: {
          DEFAULT: "#F88F22",
          hover: "#FA9F3F",
          light: "rgba(248, 143, 34, 0.15)",
        },
        accent: {
          DEFAULT: "#FBB931",
          hover: "#FDC453",
          light: "rgba(251, 185, 49, 0.15)",
        },
        muted: {
          DEFAULT: "#A1A1AA",
          dark: "#71717A",
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(234, 97, 19, 0.12)',
        'glow': '0 0 20px rgba(234, 97, 19, 0.2)',
        'surface': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'glass': '0 8px 24px -4px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};