import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        'xl': '0 11px 15px #000000',
        'sm': '0 5px 4px #000000'
      }
    },
    screens: {
      '4xl': { 'min': '2000px' },

      '2xl': { 'min': '1440px' },

      'xl': { 'min': '1279px' },

      'lg': { 'max': '1023px' },

      'md': { 'max': '767px' },

      'sm': { 'max': '639px' },

      'betterhover': { 'raw': '(hover: hover)' },
    },
  },
  plugins: [],
}
export default config
