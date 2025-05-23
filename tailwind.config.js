import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
};

