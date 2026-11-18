// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Cloudflare Pages (SPEC D6).
  site: 'https://travessia.brenodaroz.com',
  // /pricing.html, not /pricing/index.html, so Cloudflare Pages serves /pricing without a trailing-slash redirect
  // and the canonical URLs (no trailing slash) are the URLs that answer 200.
  build: { format: 'file' },
  // Self-hosted, subset fonts with font-display: swap (SPEC §5.5.5). Two families at most.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  integrations: [
    react(),
    sitemap(),
  ],
});
