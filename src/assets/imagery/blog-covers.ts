/**
 * One image per blog category (brand/imagery.md, "Where the photos are used"). Exchange keeps the painted meeting;
 * the other four are photographs from step 9. `position` is the CSS object-position for the crop; `scrim` marks a
 * photograph, which takes the soft rio-negro scrim behind the title (brand/rules.md, "Type and logo on imagery").
 */
import type { ImageMetadata } from 'astro';
import exchange from './meeting-wide.png';
import taxes from './photo-dock.jpg';
import invoices from './photo-river-forest.jpg';
import guides from './photo-canoe.jpg';
import news from './photo-ferry.jpg';

export interface BlogCover {
  src: ImageMetadata;
  position: string;
  scrim: boolean;
}

export const BLOG_COVERS = {
  exchange: { src: exchange, position: 'right center', scrim: false },
  taxes: { src: taxes, position: '60% 55%', scrim: true },
  invoices: { src: invoices, position: '50% 40%', scrim: true },
  guides: { src: guides, position: '50% 68%', scrim: true },
  news: { src: news, position: '50% 55%', scrim: true },
} as const satisfies Record<string, BlogCover>;

export type BlogCoverCategory = keyof typeof BLOG_COVERS;
