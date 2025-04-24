/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        blue: '#4f6a9e',
        white: '#ffffff',
        black: '#000000',
        gold: '#c7b66b',
      },
    },
  },
  plugins: [],
};

export default config;
