import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: netlify(),

  prefetch: true,

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
    },
  },

  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ammokuvfnnrgyklspcvt.supabase.co',
      },
    ],
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  integrations: [react()],
});