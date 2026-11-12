import type { Locale } from './index';

/**
 * One route map for both languages (SPEC D4, §6.1). PT-BR has no prefix; EN lives under /en/.
 * Pages ask for a key, never a hard-coded path, so localized slugs stay in one place.
 */
export const routes = {
  home: { 'pt-br': '/', en: '/en/' },
  product: { 'pt-br': '/produto', en: '/en/product' },
  pricing: { 'pt-br': '/precos', en: '/en/pricing' },
  calculator: { 'pt-br': '/calculadora', en: '/en/calculator' },
  forClients: { 'pt-br': '/para-clientes', en: '/en/for-clients' },
  integrations: { 'pt-br': '/integracoes', en: '/en/integrations' },
  stories: { 'pt-br': '/historias', en: '/en/stories' },
  blog: { 'pt-br': '/blog', en: '/en/blog' },
  changelog: { 'pt-br': '/novidades', en: '/en/changelog' },
  about: { 'pt-br': '/sobre', en: '/en/about' },
  openAccount: { 'pt-br': '/abrir-conta', en: '/en/open-account' },
  privacy: { 'pt-br': '/privacidade', en: '/en/privacy' },
  terms: { 'pt-br': '/termos', en: '/en/terms' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const path = (key: RouteKey, locale: Locale) => routes[key][locale];

/** Feature pages live under the product route; their slugs come from the `features` collection. */
export const featurePath = (slug: string, locale: Locale) => `${routes.product[locale]}/${slug}`;

/** Integration detail pages live under the integrations route. */
export const integrationPath = (slug: string, locale: Locale) => `${routes.integrations[locale]}/${slug}`;

/** Story pages live under the stories route; the slug is shared by both languages. */
export const storyPath = (slug: string, locale: Locale) => `${routes.stories[locale]}/${slug}`;

/** Blog posts and category pages. Category slugs are localized ("impostos" / "taxes"). */
export const postPath = (slug: string, locale: Locale) => `${routes.blog[locale]}/${slug}`;
export const blogCategoryPath = (slug: string, locale: Locale) =>
  `${routes.blog[locale]}/${locale === 'pt-br' ? 'categoria' : 'category'}/${slug}`;

/** Comparison and event pages (no index pages; SPEC §6.1). */
export const comparePath = (slug: string, locale: Locale) => `${locale === 'pt-br' ? '/comparar' : '/en/compare'}/${slug}`;
export const eventPath = (slug: string, locale: Locale) => `${locale === 'pt-br' ? '/eventos' : '/en/events'}/${slug}`;

/** Both language versions of a route, for hreflang alternates and the language switcher. */
export const alternates = (key: RouteKey) => routes[key];
