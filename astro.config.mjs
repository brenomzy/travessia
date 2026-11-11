// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Placeholder until the Webflow Cloud URL is known (SPEC §5.1, open question 9).
  site: 'https://travessia.example',
  // PT-BR is the default language with no prefix; EN lives under /en/ (SPEC D4, §6.1).
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'pt-br', locales: { 'pt-br': 'pt-BR', en: 'en' } },
    }),
  ],
});
