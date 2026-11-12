import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

/** Locale folder of a content entry id, e.g. "pt-br/home" → "pt-br". */
export const entryLocale = (id: string): Locale => (id.startsWith('en/') ? 'en' : 'pt-br');

/** A page's content in one language. Throws if the translation is missing (SPEC rule 4: never fall back). */
export async function getPage<P extends CollectionEntry<'pages'>['data']['page']>(locale: Locale, page: P) {
  const entry = await getEntry('pages', `${locale}/${page}`);
  if (!entry) throw new Error(`Missing ${locale} translation of page "${page}"`);
  return entry.data as Extract<CollectionEntry<'pages'>['data'], { page: P }>;
}

/** Features in one language, in display order. */
export async function getFeatures(locale: Locale) {
  const all = await getCollection('features', (e) => entryLocale(e.id) === locale);
  return all.sort((a, b) => a.data.order - b.data.order);
}
