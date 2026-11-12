import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { readFileSync } from 'node:fs';
import { z } from 'astro/zod';

/*
 * Content collections (SPEC §7). Every entry lives in a per-locale folder, shares its
 * filename with its translation and carries a translationKey.
 */

const locale = z.enum(['pt-br', 'en']);

/** Keep the locale folder in every id ("en/faturas-internacionais"), even when an entry has a `slug` field. */
const pathId = ({ entry }: { entry: string }) => entry.replace(/\.(md|json)$/, '');

// ---------- features ----------
const step = z.object({ title: z.string(), detail: z.string() });

/** The small product-UI picture on each feature card. Strings are content, not code. */
const vignette = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('invoice'),
    title: z.string(),
    languages: z.array(z.string()).length(2),
    amount: z.string(),
    action: z.string(),
  }),
  z.object({
    kind: z.literal('balances'),
    rows: z.array(z.object({ label: z.string(), amount: z.string() })),
    convert: z.object({ label: z.string(), amount: z.string() }),
  }),
  z.object({
    kind: z.literal('taxInvoice'),
    title: z.string(),
    meta: z.string(),
    rows: z.array(z.object({ label: z.string(), value: z.string(), highlight: z.boolean().default(false) })),
  }),
  z.object({
    kind: z.literal('report'),
    title: z.string(),
    meta: z.string(),
    /** Bar heights as fractions of the tallest; the last bar is the current month. */
    bars: z.array(z.number().min(0).max(1)),
    footer: z.object({ label: z.string(), value: z.string() }),
  }),
]);

const features = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/features', generateId: pathId }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    summary: z.string().max(160),
    problem: z.string(),
    steps: z.array(step).length(3),
    benefits: z.array(z.string()),
    vignette,
    scene: z.string().optional(),
    faqTopic: z.enum(['general', 'pricing', 'taxes', 'product', 'security']),
    order: z.number(),
    translationKey: z.string(),
  }),
});

// ---------- integrations ----------
const integrations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/integrations', generateId: pathId }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    /** SVG path, written by the logo generator or uploaded. Until then the sphere shows initials. */
    logo: z.string().optional(),
    category: z.enum(['freelance-platforms', 'invoicing', 'time-tracking', 'accounting', 'payments', 'productivity']),
    status: z.enum(['live', 'beta', 'coming-soon']),
    shortDescription: z.string().max(140),
    setupSteps: z.array(step),
    docsUrl: z.url().optional(),
    featured: z.boolean().default(false),
    /** Logo sphere settings (tuned in V3). tone: plain (white), primary (tapajós), inverse (noite). */
    sphere: z.object({
      include: z.boolean().default(true),
      weight: z.number().min(1).max(3).default(2),
      tone: z.enum(['plain', 'primary', 'inverse']).default('plain'),
    }),
    translationKey: z.string(),
  }),
});

// ---------- customers ----------
const customers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/customers', generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      craft: z.enum(['design', 'development', 'translation', 'video', 'writing']),
      city: z.string(),
      teamSize: z.number().int().min(1),
      clientCountries: z.array(z.string()),
      person: z.object({ name: z.string(), role: z.string(), photo: image().optional() }),
      quote: z.string(),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(3),
      cover: image(),
      coverAlt: z.string(),
      /** CSS object-position for the cover crop, e.g. "50% 92%". */
      coverPosition: z.string().default('50% 50%'),
      coverRecipe: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number(),
      translationKey: z.string(),
    }),
});

// ---------- faqs (one JSON array per locale) ----------
const faq = z.object({
  id: z.string(),
  locale,
  question: z.string(),
  answer: z.string(),
  topics: z.array(z.enum(['general', 'pricing', 'taxes', 'product', 'security'])).min(1),
  order: z.number(),
});
const faqs = defineCollection({
  loader: async () =>
    (['pt-br', 'en'] as const).flatMap((l) =>
      (JSON.parse(readFileSync(`./src/content/faqs/${l}.json`, 'utf8')) as Record<string, unknown>[]).map((item) => ({
        ...item,
        locale: l,
        id: `${l}/${item.id}`,
      })),
    ),
  schema: faq,
});

// ---------- plans ----------
const localized = z.object({ 'pt-br': z.string(), en: z.string() });
const money = z.object({ brl: z.number(), usd: z.number() });
const plans = defineCollection({
  loader: file('./src/content/plans.json'),
  schema: z.object({
    id: z.string(),
    name: localized,
    summary: localized,
    /** monthly: per month; annual: per year. */
    price: z.object({ monthly: money, annual: money }),
    fee: z.number(),
    seats: z.number().int(),
    features: z.object({ 'pt-br': z.array(z.string()), en: z.array(z.string()) }),
    highlight: z.boolean(),
    cta: localized,
    order: z.number(),
  }),
});

// ---------- pages ----------
const link = z.object({ label: z.string(), route: z.string() });
const stat = z.object({ before: z.string(), value: z.string(), after: z.string() });

const home = z.object({
  page: z.literal('home'),
  translationKey: z.literal('home'),
  seo: z.object({ title: z.string(), description: z.string() }),
  hero: z.object({
    title: z.string(),
    titleHighlight: z.string(),
    lead: z.string(),
    clientsNote: z.object({ text: z.string(), link }),
    logoStrip: z.object({ label: z.string(), names: z.array(z.string()) }),
    /** Strings shown inside the product-UI illustration. Invoices are in English for the client. */
    ui: z.object({
      invoice: z.object({
        number: z.string(),
        from: z.string(),
        status: z.string(),
        billToLabel: z.string(),
        billTo: z.string(),
        lines: z.array(z.object({ label: z.string(), amount: z.string() })),
        totalLabel: z.string(),
        total: z.string(),
        methods: z.array(z.string()),
        summary: z.string(),
        summaryCurrency: z.string(),
        summaryAmount: z.string(),
        summaryNote: z.string(),
      }),
      crossing: z.object({
        title: z.string(),
        rows: z.array(z.object({ label: z.string(), value: z.string(), highlight: z.boolean().default(false) })),
      }),
      conversion: z.object({ status: z.string(), time: z.string(), from: z.string(), to: z.string(), note: z.string() }),
      phone: z.object({
        date: z.string(),
        time: z.string(),
        appTime: z.string(),
        notificationTitle: z.string(),
        notificationBody: z.string(),
        taxInvoice: z.string(),
        balanceLabel: z.string(),
        balance: z.string(),
      }),
      received: z.object({ label: z.string(), currency: z.string(), amount: z.string(), note: z.string() }),
    }),
  }),
  outcomes: z.object({ title: z.string(), lead: z.string(), stats: z.array(stat).length(3) }),
  calculator: z.object({
    title: z.string(),
    lead: z.string(),
    points: z.array(z.string()),
    currencies: z.array(z.string()),
    amountLabel: z.string(),
    amount: z.string(),
    currency: z.string(),
    rows: z.array(z.object({ label: z.string(), value: z.string() })),
    resultLabel: z.string(),
    result: z.string(),
    arrival: z.string(),
    disclaimer: z.string(),
  }),
  features: z.object({ title: z.string(), link }),
  showcase: z.object({
    title: z.string(),
    lead: z.string(),
    tabsLabel: z.string(),
    app: z.object({
      nav: z.array(z.string()),
      user: z.object({ initials: z.string(), name: z.string(), meta: z.string() }),
    }),
    tabs: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        /** Which sidebar item is current when this tab shows. */
        nav: z.number().int(),
        title: z.string(),
        actions: z.tuple([z.string(), z.string()]),
        stats: z.array(z.object({ label: z.string(), value: z.string(), note: z.string(), highlight: z.boolean() })).length(3),
        listTitle: z.string(),
        rows: z.array(
          z.object({
            title: z.string(),
            detail: z.string(),
            date: z.string(),
            amount: z.string(),
            tone: z.enum(['default', 'highlight', 'muted']),
          }),
        ),
      }),
    ),
  }),
  integrations: z.object({
    title: z.string(),
    lead: z.string(),
    /** "{count}" is replaced with the number of integrations in the collection. */
    count: z.string(),
    countNote: z.string(),
    link,
    accountant: z.object({
      title: z.string(),
      rows: z.array(z.object({ name: z.string(), status: z.string(), connected: z.boolean() })),
    }),
    platforms: z.object({ title: z.string(), text: z.string() }),
  }),
  stories: z.object({ title: z.string(), link }),
  pricing: z.object({
    title: z.string(),
    titleSecond: z.string(),
    billingLabel: z.string(),
    billing: z.object({ monthly: z.string(), annual: z.string() }),
    perMonth: z.string(),
    perYear: z.string(),
    popular: z.string(),
    /** EN shows a USD reference next to BRL prices; "{usd}" is replaced. Empty in PT-BR. */
    usdNote: z.string(),
  }),
  faq: z.object({ title: z.string(), lead: z.string() }),
  finalCta: z.object({ title: z.string(), lead: z.string() }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages', generateId: pathId }),
  schema: z.discriminatedUnion('page', [home]),
});

export const collections = { features, integrations, customers, faqs, plans, pages };
export { locale };
