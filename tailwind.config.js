/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        void: '#0a0a0b',
        carbon: '#111113',
        slate: '#1a1a1f',
        teal: {
          DEFAULT: '#2ea3b0',
          dim: '#237c87',
          glow: '#2ea3b033',
        },
        smoke: '#8a8a9a',
        ash: '#3a3a4a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
