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
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(234, 97, 19, 0.15)',
        'glow': '0 0 25px rgba(234, 97, 19, 0.25)',
        'glow-lg': '0 0 40px rgba(234, 97, 19, 0.35)',
        'surface': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};