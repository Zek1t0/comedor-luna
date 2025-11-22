import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://Zek1t0.github.io',
  base: '/comedor-luna/',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});