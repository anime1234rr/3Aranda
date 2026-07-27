import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: netlify(),

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  integrations: [react()],
});