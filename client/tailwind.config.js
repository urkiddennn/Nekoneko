/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /^(bg|text|border|ring|outline|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ['hover', 'focus', 'active', 'group-hover'],
    },
    {
      pattern: /^(bg|text|border|ring|outline|fill|stroke)-(white|black|transparent|current|inherit)$/,
      variants: ['hover', 'focus', 'active', 'group-hover'],
    },
    {
      pattern: /^(p|padding|m|margin|w|width|h|height|gap|space).+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /^(flex|grid|hidden|block|inline|relative|absolute|fixed|sticky).+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /^(items|justify|content|self).+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /^(rounded|font|shadow|opacity|z).+/,
      variants: ['hover', 'group-hover', 'sm', 'md'],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

