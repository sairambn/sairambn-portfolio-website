import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0a0a0a',
        paper: '#f7f6f3',
        muted: '#8a8780',
        line: '#1f1f1f',
        accent: '#c4a574',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        /* Script name — optical size, no negative tracking (cursive hates it) */
        'script-xl': [
          'clamp(4.25rem, 13vw, 9.5rem)',
          { lineHeight: '0.95', letterSpacing: '0.01em', fontWeight: '400' },
        ],
        /* Section titles */
        'display-md': [
          'clamp(1.85rem, 3.8vw, 2.75rem)',
          { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' },
        ],
        /* Project titles */
        'display-sm': [
          'clamp(1.2rem, 2.2vw, 1.55rem)',
          { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' },
        ],
      },
      maxWidth: {
        site: '1320px',
      },
    },
  },
  plugins: [],
};

export default config;
