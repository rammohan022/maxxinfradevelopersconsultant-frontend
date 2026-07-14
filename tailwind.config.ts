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
        primary: '#915a2d',
        'primary-dark': '#734723',
        secondary: '#f58235',
        'secondary-dark': '#d36b28',
        navy: '#3b4d81',
        'navy-light': '#4c62a1',
        maroon: {
          DEFAULT: '#915a2d',
          500: '#a66a38',
          600: '#915a2d',
          700: '#734723',
          800: '#5c381c',
          900: '#402713',
        },
        red: {
          50: '#fcf6f0',
          100: '#f8eadb',
          200: '#f0d0b3',
          300: '#e6b083',
          400: '#da8b54',
          500: '#f58235',
          600: '#a66a38',
          700: '#915a2d',
          800: '#734723',
          900: '#5c381c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
