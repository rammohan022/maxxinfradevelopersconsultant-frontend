import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0b2d4d',
          dark: '#071c30',
          light: '#144675',
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#bad5eb',
          300: '#94bde0',
          500: '#144675',
          600: '#0b2d4d',
          700: '#092540',
          800: '#071c30',
          900: '#051322',
        },
        secondary: {
          DEFAULT: '#e8b04b',
          dark: '#c99332',
          light: '#f2c674',
          50: '#fdfaf3',
          100: '#fbf4e4',
          500: '#e8b04b',
          600: '#c99332',
        },
        accent: {
          DEFAULT: '#169dc4',
          dark: '#117b9b',
          light: '#3db2d4',
        },
        navy: '#071c30',
        'navy-light': '#0b2d4d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
