import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: "https://zekit0.github.io",
  base: "/comedor-luna",
  trailingSlash: "always",


  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
