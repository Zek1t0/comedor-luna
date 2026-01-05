import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: "https://comedorluna.com.ar",
  base: "/",
  trailingSlash: "always",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});