/**
 * A minimal RSS 2.0 feed for the changelog, built by hand so no feed library is needed (SPEC §5.6).
 * Every value is escaped; links are absolute.
 */
import { lang } from '../strings';
import { path } from './routes';
import { getChanges, getPage } from './content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function changelogFeed(site: URL) {
  const page = await getPage('changelog');
  const changes = await getChanges();
  const base = new URL(path('changelog'), site).href;
  const items = changes
    .map(
      ({ data: c }) => `    <item>
      <title>${esc(`${page.types[c.type]}: ${c.title}`)}</title>
      <link>${esc(`${base}#${c.slug}`)}</link>
      <guid isPermaLink="true">${esc(`${base}#${c.slug}`)}</guid>
      <pubDate>${c.date.toUTCString()}</pubDate>
      <description>${esc(c.summary)}</description>
    </item>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(page.feedTitle)}</title>
    <link>${esc(base)}</link>
    <description>${esc(page.seo.description)}</description>
    <language>${lang}</language>
${items}
  </channel>
</rss>
`;
}
