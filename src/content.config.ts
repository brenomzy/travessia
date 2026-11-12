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
const link = z.object({ label: z.string(), route: z.string() });
const step = z.object({ title: z.string(), detail: z.string() });

/** The small product-UI picture on each feature card. Strings are content, not code. */
const vignette = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('invoice'),
    title: z.string(),
    /** Who sent it, under the title on the product bento. */
    from: z.string().optional(),
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

const productCard = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('invoice'),
    number: z.string(),
    from: z.string(),
    status: z.string(),
    billToLabel: z.string(),
    billTo: z.string(),
    lines: z.array(z.object({ label: z.string(), amount: z.string() })),
    totalLabel: z.string(),
    total: z.string(),
    methods: z.array(z.string()),
  }),
  z.object({ kind: z.literal('conversion'), status: z.string(), time: z.string(), from: z.string(), to: z.string(), note: z.string() }),
  /** Show the feature's own vignette, larger. */
  z.object({ kind: z.literal('vignette') }),
]);

const features = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/features', generateId: pathId }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    /** Home feature cards. */
    summary: z.string().max(160),
    /** Product overview row: the paragraph, three bullets and the link. */
    intro: z.string(),
    benefits: z.array(z.string()).length(3),
    linkLabel: z.string(),
    /** Feature page (SPEC §6.2: hero, problem, how it works, related integrations, FAQ, CTA). */
    hero: z.object({ title: z.string(), lead: z.string(), secondary: link }),
    /** The product UI in the hero. Invoices stay in English: they are what the client sees. */
    heroCard: productCard,
    problem: z.object({ title: z.string(), points: z.array(z.object({ label: z.string(), detail: z.string() })).length(3) }),
    steps: z.array(step).length(3),
    faqTitle: z.string(),
    integrationsLabel: z.string(),
    /** translationKeys from the integrations collection. */
    integrations: z.array(z.string()),
    vignette,
    scene: z.string().optional(),
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
    /** How often data moves, in words: "Uma vez por mês", "A cada fatura". */
    frequency: z.string(),
    /** to: Travessia sends to it. from: it sends to Travessia. both: two-way. */
    direction: z.enum(['to', 'from', 'both']),
    maintainedBy: z.string(),
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
      /** URL segment, shared by both languages. */
      slug: z.string(),
      craft: z.enum(['design', 'development', 'translation', 'video', 'writing']),
      city: z.string(),
      teamSize: z.number().int().min(1),
      /** In words, for the facts list: "EUA, Reino Unido e Canadá". */
      clientCountries: z.string(),
      person: z.object({ name: z.string(), role: z.string(), photo: image().optional() }),
      /** Shown under the name on cards: "Designer de produto". */
      role: z.string(),
      /** One line under the spotlight quote: "estúdio de vídeo com 6 pessoas…". */
      context: z.string(),
      quote: z.string(),
      headline: z.string(),
      lead: z.string(),
      /** The number on the index card. */
      highlight: z.object({ value: z.string(), label: z.string() }),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(3),
      legalName: z.string(),
      /** Year and month, "2026-03". */
      since: z.string().regex(/^\d{4}-\d{2}$/),
      /** Features used, in words. */
      features: z.string(),
      cover: image(),
      coverAlt: z.string(),
      /** CSS object-position for the cover crop, e.g. "50% 92%". */
      coverPosition: z.string().default('50% 50%'),
      coverRecipe: z.string().optional(),
      /** Shown on Home. */
      featured: z.boolean().default(false),
      /** The big story at the top of the stories index. */
      spotlight: z.boolean().default(false),
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
  topics: z.array(z.enum(['general', 'pricing', 'taxes', 'product', 'security', 'clients'])).min(1),
  /** translationKey of the feature page this question belongs to, if any. */
  feature: z.string().optional(),
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

// ---------- rates (made-up example rates for the fee calculator, SPEC §6.2) ----------
const rates = defineCollection({
  loader: file('./src/content/rates.json'),
  schema: z.object({
    id: z.string(),
    name: localized,
    symbol: z.string(),
    /** Reais per one unit of this currency. Example values only; this site moves no money. */
    rate: z.number().positive(),
    order: z.number(),
  }),
});

// ---------- authors and blog ----------
const authors = defineCollection({
  loader: file('./src/content/authors.json'),
  schema: z.object({ id: z.string(), name: z.string(), role: localized, bio: localized }),
});

const blogCategory = z.enum(['exchange', 'taxes', 'invoices', 'guides', 'news']);
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId: pathId }),
  schema: z.object({
    title: z.string().max(60),
    slug: z.string(),
    /** The dek under the title and the meta description. */
    description: z.string().max(160),
    /** Picks the cover pattern (src/assets/textures/covers) until V1 generates per-post covers. */
    category: blogCategory,
    /** id in authors.json. */
    author: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    /** Rank in "Most read this month", 1 first. */
    popular: z.number().int().optional(),
    translationKey: z.string(),
  }),
});

// ---------- changelog ----------
const changeArea = z.enum(['invoices', 'exchange', 'taxInvoice', 'account']);
const changeType = z.enum(['new', 'improved', 'fixed']);
const changelog = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/changelog', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    /** Anchor id on the changelog page and in the RSS feed. */
    slug: z.string(),
    date: z.coerce.date(),
    type: changeType,
    area: changeArea,
    summary: z.string(),
    /** An optional piece of product UI beside the entry (Paper: rate alert, balances). */
    visual: z
      .discriminatedUnion('kind', [
        z.object({ kind: z.literal('rateAlert'), title: z.string(), from: z.string(), rate: z.string(), note: z.string() }),
        z.object({
          kind: z.literal('balances'),
          rows: z.array(z.object({ label: z.string(), amount: z.string(), badge: z.string().optional() })),
        }),
      ])
      .optional(),
    translationKey: z.string(),
  }),
});

// ---------- comparisons, events, legal ----------
const qa = z.object({ question: z.string(), answer: z.string() });
const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/comparisons', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    /** Short name for the breadcrumb: "Transferência pelo banco". */
    label: z.string(),
    description: z.string().max(200),
    updated: z.coerce.date(),
    reviewer: z.string(),
    short: z.object({ title: z.string(), text: z.string(), note: z.string() }),
    table: z.object({
      title: z.string(),
      us: z.string(),
      them: z.string(),
      rows: z.array(z.object({ label: z.string(), us: z.string(), them: z.string() })),
    }),
    /** The worked example (Paper: "A conta, passo a passo"). Only where money is compared. */
    breakdown: z
      .object({
        title: z.string(),
        rateNote: z.string(),
        totalLabel: z.string(),
        note: z.string(),
        cards: z.array(z.object({ title: z.string(), rows: z.array(z.object({ label: z.string(), value: z.string() })), total: z.string() })),
      })
      .optional(),
    faq: z.object({ title: z.string(), items: z.array(qa) }),
    translationKey: z.string(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/events', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    /** "Webinar ao vivo"; kindPast replaces it once the date has passed ("Gravação"). */
    kind: z.string(),
    kindPast: z.string(),
    lead: z.string(),
    leadPast: z.string(),
    /** The page switches to its recording state after this date (checked at build time). */
    date: z.coerce.date(),
    time: z.string(),
    place: z.string(),
    duration: z.string(),
    agenda: z.array(z.object({ time: z.string(), chapter: z.string(), title: z.string(), detail: z.string() })),
    speakers: z.array(z.object({ name: z.string(), role: z.string() })),
    register: z.object({ title: z.string(), text: z.string(), count: z.string(), submit: z.string() }),
    missed: z.object({ title: z.string(), text: z.string() }),
    translationKey: z.string(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    tab: z.string(),
    slug: z.string(),
    route: z.enum(['privacy', 'terms']),
    version: z.string(),
    effective: z.coerce.date(),
    summaryTitle: z.string(),
    summary: z.array(z.string()),
    translationKey: z.string(),
  }),
});

// ---------- pages ----------
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
    amountLabel: z.string(),
    currencyLabel: z.string(),
    defaultAmount: z.number().positive(),
    /** "{fee}" is replaced with the plan fee, e.g. "0,6%". */
    feeLabel: z.string(),
    convertedLabel: z.string(),
    rateLabel: z.string(),
    resultLabel: z.string(),
    /** "{when}" is "amanhã" or a weekday, "{date}" the day and month, both from Intl. */
    arrival: z.string(),
    /** Shown in the server HTML and without JS, before the arrival day is worked out. */
    arrivalFallback: z.string(),
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

const product = z.object({
  page: z.literal('product'),
  translationKey: z.literal('product'),
  seo: z.object({ title: z.string(), description: z.string() }),
  hero: z.object({
    title: z.string(),
    lead: z.string(),
    primary: link,
    secondary: link,
    card: z.object({ status: z.string(), time: z.string(), from: z.string(), to: z.string(), note: z.string() }),
  }),
  /** The heading over the feature bento. */
  features: z.object({ title: z.string(), lead: z.string() }),
});

const categoryIds = ['accounting', 'invoicing', 'time-tracking', 'freelance-platforms', 'payments', 'productivity'] as const;
const integrationsPage = z.object({
  page: z.literal('integrations'),
  translationKey: z.literal('integrations'),
  seo: z.object({ title: z.string(), description: z.string() }),
  index: z.object({
    title: z.string(),
    lead: z.string(),
    searchLabel: z.string(),
    groupLabel: z.string(),
    all: z.string(),
    /** "{count}" is replaced. */
    resultCount: z.string(),
    resultOne: z.string(),
    empty: z.string(),
    showAll: z.string(),
    popular: z.string(),
    status: z.object({ beta: z.string(), 'coming-soon': z.string() }),
    suggest: z.object({ title: z.string(), text: z.string(), link }),
  }),
  detail: z.object({
    primary: link,
    secondary: z.string(),
    connectTitle: z.string(),
    factsLabel: z.string(),
    facts: z.object({ category: z.string(), frequency: z.string(), direction: z.string(), cost: z.string(), maintainedBy: z.string() }),
    cost: z.string(),
    /** "{name}" is replaced with the integration's name. */
    direction: z.object({ to: z.string(), from: z.string(), both: z.string() }),
    pairLabel: z.string(),
    title: z.string(),
    view: z.string(),
  }),
  /**
   * One template per category for the detail page: the hero lead, the sync card and the
   * "what gets sent" table. "{name}" is replaced with the integration's name.
   */
  categories: z.record(
    z.enum(categoryIds),
    z.object({
      label: z.string(),
      relatedTitle: z.string(),
      lead: z.string(),
      card: z.object({
        title: z.string(),
        status: z.string(),
        rows: z.array(z.object({ title: z.string(), meta: z.string(), time: z.string() })),
        action: z.string(),
      }),
      sends: z.object({
        title: z.string(),
        lead: z.string(),
        fields: z.array(z.object({ label: z.string(), value: z.string(), highlight: z.boolean() })),
      }),
    }),
  ),
});

const pricingPage = z.object({
  page: z.literal('pricing'),
  translationKey: z.literal('pricing'),
  seo: z.object({ title: z.string(), description: z.string() }),
  hero: z.object({ title: z.string(), lead: z.string() }),
  plans: z.object({
    heading: z.string(),
    billingLabel: z.string(),
    billing: z.object({ monthly: z.string(), annual: z.string() }),
    perMonth: z.string(),
    perYear: z.string(),
    popular: z.string(),
    usdNote: z.string(),
  }),
  compare: z.object({
    title: z.string(),
    note: z.string(),
    featureLabel: z.string(),
    included: z.string(),
    notIncluded: z.string(),
    /** "{label}" is replaced with the row label, for the help button's accessible name. */
    helpLabel: z.string(),
    /** values: keyed by plan id; true shows "included", false shows "not included". */
    rows: z.array(
      z.object({
        label: z.string(),
        help: z.string().optional(),
        values: z.record(z.string(), z.union([z.string(), z.boolean()])),
      }),
    ),
  }),
  faq: z.object({
    title: z.string(),
    tabsLabel: z.string(),
    topics: z.array(z.object({ id: z.enum(['general', 'pricing', 'taxes', 'product', 'security', 'clients']), label: z.string() })),
  }),
});

const calculatorPage = z.object({
  page: z.literal('calculator'),
  translationKey: z.literal('calculator'),
  seo: z.object({ title: z.string(), description: z.string() }),
  /** The calculator on the seam (Paper: /calculadora "Calculator B"). "{fee}" is replaced. */
  tool: z.object({
    title: z.string(),
    currencyLabel: z.string(),
    amountLabel: z.string(),
    feeLabel: z.string(),
    rateLabel: z.string(),
    arrivesLabel: z.string(),
    /** Shown before the arrival day is worked out on the client. */
    arrivesFallback: z.string(),
    resultLabel: z.string(),
    disclaimer: z.string(),
    defaultAmount: z.number().positive(),
  }),
  /** Worked examples; the numbers are computed from rates.json and the plan fee, never typed. */
  examples: z.object({
    title: z.string(),
    /** "{rates}" becomes the list of example rates, "{fee}" the fee. */
    lead: z.string(),
    caption: z.string(),
    columns: z.object({ invoice: z.string(), fee: z.string(), converted: z.string(), receive: z.string() }),
    rows: z.array(z.object({ currency: z.string(), amount: z.number().positive() })),
  }),
  notes: z.array(z.object({ title: z.string(), text: z.string() })),
});

const forClients = z.object({
  page: z.literal('forClients'),
  translationKey: z.literal('forClients'),
  seo: z.object({ title: z.string(), description: z.string() }),
  /** primary and cta go to a feature page: "feature" is its translationKey. */
  hero: z.object({
    title: z.string(),
    lead: z.string(),
    primary: z.object({ label: z.string(), feature: z.string() }),
    secondary: z.object({ label: z.string(), href: z.string() }),
  }),
  /** The sample invoice in the hero. Always in English: it's what the client receives. */
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
  }),
  steps: z.object({ title: z.string(), items: z.array(z.object({ title: z.string(), detail: z.string() })).length(3) }),
  panels: z.array(z.object({ title: z.string(), items: z.array(z.string()), tone: z.enum(['tint', 'dark']) })),
  faq: z.object({ title: z.string(), lead: z.string() }),
  cta: z.object({ title: z.string(), link: z.object({ label: z.string(), feature: z.string() }) }),
});

const option = z.object({ value: z.string(), label: z.string() });
const openAccount = z.object({
  page: z.literal('openAccount'),
  translationKey: z.literal('openAccount'),
  seo: z.object({ title: z.string(), description: z.string() }),
  title: z.string(),
  lead: z.string(),
  steps: z.array(z.string()),
  /** The SignupForm island. Name and email only are required; nothing is ever sent (SPEC D18). */
  form: z.object({
    title: z.string(),
    note: z.string(),
    name: z.object({ label: z.string(), placeholder: z.string(), missing: z.string() }),
    email: z.object({ label: z.string(), placeholder: z.string(), missing: z.string(), invalid: z.string() }),
    work: z.object({ label: z.string(), placeholder: z.string(), options: z.array(option) }),
    country: z.object({
      label: z.string(),
      placeholder: z.string(),
      empty: z.string(),
      clear: z.string(),
      open: z.string(),
      options: z.array(option),
    }),
    newsletter: z.string(),
    submit: z.string(),
    /** "{link}" becomes a link to the privacy page labelled privacyLink. */
    privacy: z.string(),
    privacyLink: z.string(),
  }),
  /** "{name}" and "{position}" are filled in on submit. */
  success: z.object({ title: z.string(), text: z.string(), again: z.string() }),
  toast: z.object({ title: z.string(), description: z.string(), close: z.string() }),
});

const storiesPage = z.object({
  page: z.literal('stories'),
  translationKey: z.literal('stories'),
  seo: z.object({ title: z.string(), description: z.string() }),
  title: z.string(),
  lead: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  spotlightLink: z.string(),
  moreTitle: z.string(),
  filterLabel: z.string(),
  all: z.string(),
  crafts: z.record(z.enum(['design', 'development', 'translation', 'video', 'writing']), z.string()),
  /** Filter for stories with more than one person. */
  studios: z.string(),
  read: z.string(),
  /** Accessible name for "Read" links; "{name}" is replaced. */
  readAbout: z.string(),
  detail: z.object({
    factsLabel: z.string(),
    facts: z.object({ company: z.string(), city: z.string(), team: z.string(), clients: z.string(), since: z.string(), features: z.string() }),
    teamOne: z.string(),
    /** "{n}" is replaced. */
    teamMany: z.string(),
    otherTitle: z.string(),
    metricsLabel: z.string(),
  }),
});

const blogPage = z.object({
  page: z.literal('blog'),
  translationKey: z.literal('blog'),
  seo: z.object({ title: z.string(), description: z.string() }),
  title: z.string(),
  lead: z.string(),
  categoriesLabel: z.string(),
  all: z.string(),
  /** Category names, URL slugs and the lead on each category page, in this language. */
  categories: z.record(blogCategory, z.object({ slug: z.string(), label: z.string(), lead: z.string() })),
  popularTitle: z.string(),
  allTitle: z.string(),
  /** "{n}" is replaced. */
  count: z.string(),
  countShort: z.string(),
  showMore: z.string(),
  minutes: z.string(),
  readingTime: z.string(),
  newsletter: z.object({ title: z.string(), text: z.string(), submit: z.string() }),
  post: z.object({
    toc: z.string(),
    calculator: z.object({ title: z.string(), text: z.string(), link: z.string() }),
    copyLink: z.string(),
    copied: z.string(),
    linkedin: z.string(),
    shareLabel: z.string(),
    continueTitle: z.string(),
  }),
});

const changelogPage = z.object({
  page: z.literal('changelog'),
  translationKey: z.literal('changelog'),
  seo: z.object({ title: z.string(), description: z.string() }),
  title: z.string(),
  lead: z.string(),
  email: z.object({ label: z.string() }),
  rss: z.object({ label: z.string() }),
  filters: z.object({ type: z.string(), area: z.string(), allType: z.string(), allArea: z.string() }),
  types: z.record(changeType, z.string()),
  areas: z.record(changeArea, z.string()),
  resultCount: z.string(),
  showMore: z.string(),
  feedTitle: z.string(),
});

const comparePage = z.object({
  page: z.literal('compare'),
  translationKey: z.literal('compare'),
  root: z.string(),
  /** "{date}" and "{reviewer}" are replaced. */
  updated: z.string(),
  calculator: z.string(),
});
const eventsPage = z.object({
  page: z.literal('events'),
  translationKey: z.literal('events'),
  root: z.string(),
  date: z.string(),
  time: z.string(),
  place: z.string(),
  agendaTitle: z.string(),
  speakersTitle: z.string(),
  chaptersLabel: z.string(),
  videoNote: z.string(),
});
const aboutPage = z.object({
  page: z.literal('about'),
  translationKey: z.literal('about'),
  seo: z.object({ title: z.string(), description: z.string() }),
  title: z.string(),
  lead: z.string(),
  story: z.object({ title: z.string(), paragraphs: z.array(z.string()) }),
  panels: z.array(z.object({ title: z.string(), items: z.array(z.string()), tone: z.enum(['tint', 'dark', 'outline']) })),
  team: z.object({ title: z.string(), note: z.string(), people: z.array(z.object({ name: z.string(), role: z.string() })) }),
  disclaimer: z.object({ title: z.string(), text: z.string(), note: z.string() }),
});
const notFoundPage = z.object({
  page: z.literal('notFound'),
  translationKey: z.literal('notFound'),
  seo: z.object({ title: z.string(), description: z.string() }),
  title: z.string(),
  lead: z.string(),
  links: z.array(link),
});
const legalPage = z.object({
  page: z.literal('legal'),
  translationKey: z.literal('legal'),
  tabsLabel: z.string(),
  toc: z.string(),
  /** "{version}" and "{date}" are replaced. */
  version: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages', generateId: pathId }),
  schema: z.discriminatedUnion('page', [home, product, integrationsPage, pricingPage, calculatorPage, forClients, openAccount, storiesPage, blogPage, changelogPage, comparePage, eventsPage, aboutPage, notFoundPage, legalPage]),
});

export const collections = { features, integrations, customers, faqs, plans, rates, authors, blog, changelog, comparisons, events, legal, pages };
export { locale };
