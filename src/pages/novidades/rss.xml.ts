import type { APIRoute } from 'astro';
import { changelogFeed } from '../../lib/rss';

export const GET: APIRoute = async ({ site }) =>
  new Response(await changelogFeed('pt-br', site ?? new URL('https://travessia.example')), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
