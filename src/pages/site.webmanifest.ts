import type { APIRoute } from 'astro';
import { s } from '../strings';
import { tokens } from '../tokens/tokens';

/** Web app manifest. Name and description come from strings; colours from tokens (the mark's dark water). */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: s.meta.siteName,
      short_name: s.meta.siteName,
      description: s.footer.tagline,
      start_url: '/',
      display: 'browser',
      background_color: tokens.palette['rio-negro']['900'],
      theme_color: tokens.palette['rio-negro']['900'],
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
