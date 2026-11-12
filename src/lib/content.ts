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

/** Integrations in one language, featured first, then by name. */
export async function getIntegrations(locale: Locale) {
  const all = await getCollection('integrations', (e) => entryLocale(e.id) === locale);
  return all.sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.name.localeCompare(b.data.name));
}

/** Customer stories in one language, in display order. */
export async function getStories(locale: Locale, { featuredOnly = false } = {}) {
  const all = await getCollection(
    'customers',
    (e) => entryLocale(e.id) === locale && (!featuredOnly || e.data.featured),
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** FAQs in one language for a topic, in order. */
export async function getFaqs(locale: Locale, topic: CollectionEntry<'faqs'>['data']['topics'][number]) {
  const all = await getCollection('faqs', (e) => e.data.locale === locale && e.data.topics.includes(topic));
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Plans, in order. Names and features carry both languages. */
export async function getPlans() {
  return (await getCollection('plans')).sort((a, b) => a.data.order - b.data.order);
}
