/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Contrast-checked against ink-950/ink-900 for WCAG AA (constraint 9).
        ink: {
          950: '#0B0F14',
          900: '#111821',
          800: '#1A2431',
          700: '#243140',
          600: '#334457',
        },
        line: '#2B3A4B',
        fg: '#F2F6FA',
        muted: '#AAB8C6',
        subtle: '#8595A6',
        crisis: { 700: '#A8281C', 600: '#C62F22', 500: '#E2483A', 100: '#FFD9D4' },
        accent: { 600: '#0D9488', 500: '#14B8A6', 400: '#2DD4BF', 100: '#CCFBF1' },
        flag: { 900: '#3A2A06', 500: '#F59E0B', 200: '#FDE4A8' },
      },
      spacing: { tap: '44px' },
      minHeight: { tap: '44px' },
      minWidth: { tap: '44px' },
      borderRadius: { xl2: '1.25rem' },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
