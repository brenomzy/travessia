import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

/** A page's content. Throws if the entry is missing. */
export async function getPage<P extends CollectionEntry<'pages'>['data']['page']>(page: P) {
  const entry = await getEntry('pages', page);
  if (!entry) throw new Error(`Missing page content "${page}"`);
  return entry.data as Extract<CollectionEntry<'pages'>['data'], { page: P }>;
}

/** Features in display order. */
export async function getFeatures() {
  const all = await getCollection('features');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Integrations, featured first, then by name. */
export async function getIntegrations() {
  const all = await getCollection('integrations');
  return all.sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.name.localeCompare(b.data.name));
}

/** Customer stories in display order. */
export async function getStories({ featuredOnly = false } = {}) {
  const all = await getCollection('customers', (e) => !featuredOnly || e.data.featured);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** FAQs for a topic, in order. */
export async function getFaqs(topic: CollectionEntry<'faqs'>['data']['topics'][number]) {
  // Questions written for a feature page stay on that page.
  const all = await getCollection('faqs', (e) => e.data.topics.includes(topic) && !e.data.feature);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Plans, in order. */
export async function getPlans() {
  return (await getCollection('plans')).sort((a, b) => a.data.order - b.data.order);
}

/** Example exchange rates for the fee calculator, in display order. */
export async function getRates() {
  return (await getCollection('rates')).sort((a, b) => a.data.order - b.data.order);
}

/** The questions written for one feature page, in order. */
export async function getFeatureFaqs(feature: string) {
  const all = await getCollection('faqs', (e) => e.data.feature === feature);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Blog posts, newest first, with an estimated reading time (about 200 words a minute). */
export async function getPosts() {
  const all = await getCollection('blog');
  return all
    .map((e) => ({ ...e, minutes: Math.max(1, Math.round((e.body ?? '').split(/\s+/).filter(Boolean).length / 200)) }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];

export async function getAuthor(id: string) {
  const entry = await getEntry('authors', id);
  if (!entry) throw new Error(`Unknown blog author "${id}"`);
  return entry.data;
}

/** Changelog entries, newest first. */
export async function getChanges() {
  const all = await getCollection('changelog');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getComparisons() {
  return getCollection('comparisons');
}

export async function getEvents() {
  return getCollection('events');
}

export async function getLegal() {
  return getCollection('legal');
}
