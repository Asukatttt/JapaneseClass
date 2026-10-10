/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1D3658',
        'ink-soft': '#55657D',
        cream: '#FFFAF3',
        sand: '#F6EEE3',
        sakura: '#C93E5E',
        'sakura-dark': '#B03452',
        'sakura-soft': '#FDE8EC',
        peach: '#F9D1A9',
        mint: '#E3F1E7',
        line: '#E7DFD3',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(29, 54, 88, 0.04), 0 14px 32px -14px rgba(29, 54, 88, 0.18)',
        lift: '0 2px 4px rgba(29, 54, 88, 0.05), 0 28px 48px -18px rgba(29, 54, 88, 0.30)',
      },
    },
  },
  plugins: [],
}
