/**
 * One route map (SPEC §6.1). Pages ask for a key, never a hard-coded path, so slugs stay in one place.
 */
export const routes = {
  home: '/',
  product: '/product',
  pricing: '/pricing',
  calculator: '/calculator',
  forClients: '/for-clients',
  integrations: '/integrations',
  stories: '/stories',
  blog: '/blog',
  changelog: '/changelog',
  about: '/about',
  openAccount: '/open-account',
  privacy: '/privacy',
  terms: '/terms',
} as const satisfies Record<string, string>;

export type RouteKey = keyof typeof routes;

export const path = (key: RouteKey) => routes[key];

/** Feature pages live under the product route; their slugs come from the `features` collection. */
export const featurePath = (slug: string) => `${routes.product}/${slug}`;

/** Integration detail pages live under the integrations route. */
export const integrationPath = (slug: string) => `${routes.integrations}/${slug}`;

/** Story pages live under the stories route. */
export const storyPath = (slug: string) => `${routes.stories}/${slug}`;

/** Blog posts and category pages. */
export const postPath = (slug: string) => `${routes.blog}/${slug}`;
export const blogCategoryPath = (slug: string) => `${routes.blog}/category/${slug}`;

/** Comparison and event pages (no index pages; SPEC §6.1). */
export const comparePath = (slug: string) => `/compare/${slug}`;
export const eventPath = (slug: string) => `/events/${slug}`;
