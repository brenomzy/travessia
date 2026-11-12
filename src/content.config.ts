import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
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
  finalCta: z.object({ title: z.string(), lead: z.string() }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages', generateId: pathId }),
  schema: z.discriminatedUnion('page', [home]),
});

export const collections = { features, pages };
export { locale };
