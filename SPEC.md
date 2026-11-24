# Travessia website: spec

> **Status:** v2.0 · 2026-11-18 · Owner: Breno Daroz
> **What this is:** the spec for the Travessia website: stack, CSS system, components, routes, content and generators. The main brief for the project is [`docs/brand-system-brief.md`](docs/brand-system-brief.md); where the two disagree, the brief wins.
> **v2.0:** the site is English-only, hosted on Cloudflare Pages, and is the public example for the brand system (brief §1). Earlier versions planned it as a test of an external site builder; that plan is dropped.

---

## 0. How to use this file

- `AGENTS.md` copies the project rules from §5.4 and points here. `CLAUDE.md` imports `AGENTS.md`.
- **[verify]** marks something not confirmed yet; **[decide]** marks a choice still open. Log answers in `docs/journal.md` (§10).
- Section numbers are referenced from code comments (`SPEC §5.6.1`, `SPEC D18`). Keep them stable; retire a number instead of reusing it.

---

## 1. The website

### 1.1 What it's for

- The marketing site of Travessia, a made-up fintech (§4). It's what a real company's site would be, so the brand system has a real surface to work on: landing pages are generated into it (brief §5.5), and the `/brand` page shows the system (brief §9).
- A reference for how Breno builds sites: a hand-built CSS system on tokens, accessible islands, and content in typed collections.

### 1.2 Done when

- [x] The site is live on Cloudflare Pages at `travessia.brenodaroz.com`, deployed from the GitHub repo (project `travessia`, also at `travessia-e3u.pages.dev`).
- [x] Every route in §6.1 renders, in English.
- [x] `/styleguide` shows every token and component.
- [ ] The `/brand` page is live (brief §9).

### 1.3 Non-goals

- Other languages. The site is English-only (D4).
- A final brand. The brand is consolidated in brief Phase 1 and evolves through the brand system.
- Real integrations, data or accounts. Forms post nowhere (D18).
- Search visibility. The site stays `noindex` (D7).

---

## 2. Status (2026-11-18)

- Built: tokens pipeline with a WCAG check, CSS layers, layout primitives, Stylelint, the page shell, every page in §6.1 (64 pages), the islands in §5.6.1, the Motion helpers, the river shader, and `/styleguide`. (The seam shader was retired on 2026-11-21; see brand/rules.md.)
- Not built: the main nav dropdowns (the design has four flat links), the `/brand` page, the generated blog covers.
- Live at `travessia.brenodaroz.com` since 2026-11-18; every push to `main` deploys.
- Next: brief Phase 1.

---

## 3. Decisions

Numbers are kept from earlier versions; gaps are retired decisions.

| # | Decision | Why |
|---|---|---|
| D1 | Client: a made-up Brazilian fintech for freelancers and small studios paid by clients abroad (§4) | Catalogue-style data, several page types, a clear audience |
| D2 | Name: **Travessia**. Two web searches on 2026-11-11 found no fintech or payments app with this name. It's a common Portuguese word and a well-known Milton Nascimento song, so search INPI and domains before using it anywhere public beyond this demo. | Avoids accidentally impersonating a real company |
| D3 | Framework: **plain Astro** from the minimal template. No CSS framework, UI kit or starter. | Every class, token and component is ours |
| D4 | Language: **English only**, at `/`. PT-BR was dropped on 2026-11-18 (brief §11). Brazilian terms (Pix, MEI, nota fiscal, carnê-leão) stay in Portuguese with a short explanation. | The audience works in English with clients abroad; one language makes the brand easier to build and show |
| D5 | Repo: **public** GitHub repo. `main` = production. Never commit secrets. | The project is shown publicly |
| D6 | Hosting: **Cloudflare Pages**, static build, deployed from GitHub, at `travessia.brenodaroz.com` | Same as Breno's portfolio; no adapter needed |
| D7 | Indexing: `noindex` sitewide | Keeps a made-up company out of search |
| D8 | Package manager: npm | Least friction |
| D11 | Style guide: our own `/styleguide` (noindex) that renders every token and component from the real CSS | One page to check the system |
| D12 | Integration and customer names: made up. No real banks, platforms, card networks or the Pix logo. | Avoids implying real partnerships |
| D13 | CSS: plain CSS with cascade layers, tokens as custom properties, scoped component styles and a few layout primitives. Stylelint rejects raw values outside the token file. (§5.5) | Small enough to own; nothing for agents to confuse with other frameworks |
| D14 | Tokens: `src/tokens/tokens.json` generates `src/styles/tokens.css` (site) and `src/tokens/tokens.ts` (engines). | One place to change a value; engines and CSS can't drift apart |
| D15 | Accessible primitives: **Base UI** for interactive pieces native HTML doesn't cover well. Unstyled, so it's styled with our tokens. Native HTML where it's enough. (§5.6.1) | Accessible behaviour without a visual framework |
| D16 | Animation: **Motion** for sequencing, scroll and springs; CSS first for everything simpler. Timing comes from tokens. (§5.6.2) | Small, MIT, works with and without React |
| D17 | Libraries: every library gets a row in §5.6 and a trial before it's used | Keeps experiments comparable and easy to back out |
| D18 | Fictional-company safeguards: a "demo site, fictional company" banner on every page and in the footer. Forms ask for name and email only: never passwords, CPF/CNPJ, bank or card details. They post nowhere. Plus `noindex` (D7). | A made-up fintech must never pass for a real one or look like a phishing page |

---

## 4. The company: Travessia

> **Fictional.** Travessia is invented. The site says so on every page (D18), and nothing on it collects real personal or financial data.
> **Source material.** Brief Phase 1 consolidates this section, the site copy and the design into `brand/`. After that, `brand/` is the source of truth for everything here and this section points to it.

### 4.1 Company

- **What it sells:** a cross-border account for Brazilian freelancers and small studios who work in English for clients abroad.
  - Send invoices in USD, EUR or GBP, with a payment link the client pays by card or bank transfer.
  - Hold the money in a multi-currency balance, see the exact rate and fee before converting, and receive reais by Pix.
  - Issue the export service invoice (*nota fiscal de exportação*) automatically for each payment.
  - Keep a monthly tax report ready for the accountant (MEI, Simples Nacional, or an individual using carnê-leão).
- **Features (one page each):** international invoices, get paid and convert, automatic tax invoices, tax reports.
- **Audiences:** the freelancers and studios (most pages), and their clients abroad, who need to trust the invoice and pay easily (the For clients page).
- **Stage:** seed stage, 14 people in São Paulo and Recife, a marketing team of 4. (Was Series A, about 40 people; changed 2026-11-20 to match the About page, `brand/proof.md`.)
- **What the site is for:** account sign-ups (a waitlist form that stores nothing), and being cited in AI answers for questions like "how to get paid from abroad as a Brazilian freelancer" and "how to pay a contractor in Brazil".
- **Proof points (made up, used in copy):** reais in your account by Pix in 1 business day; one 0.6% fee, shown before you convert; export tax invoice issued in under 2 minutes.

### 4.2 Audience

- **Freelancers** (designers, developers, translators, video editors, writers) billing 1–5 foreign clients, usually as MEI or a small company.
- **Small studios** (2–10 people) with several foreign clients and a part-time accountant.
- **Their clients abroad**, who want a professional invoice and an easy way to pay.
- Their jobs: get paid on time, stop losing 2% to 6% to bank wires and bad rates, know the rate before converting, and keep taxes right without a spreadsheet.

### 4.3 Brand direction (starting point)

- **Name:** *travessia* means "crossing", as in a river crossing. Money crosses borders the way boats cross rivers every day in the Amazon.
- **Personality:** calm, trustworthy, warm, quietly proud of being Brazilian. As clear as a bank statement, as friendly as someone who's done this before.
- **Voice:** plain and specific. Short sentences. Numbers instead of adjectives. Explain a tax term the first time it appears. No hype, and no scare tactics about taxes or fees.
- **Vocabulary:**
  - Use: get paid, invoice, client, exchange rate, fee, freelancer, studio.
  - Avoid: solution, seamless, leverage, revolutionary, empower, "hidden fees" scare copy.
  - Keep in Portuguese: Pix, MEI, nota fiscal, carnê-leão, each with a short explanation the first time.
- **Visual inspiration: the Amazônia territorial brand** (FutureBrand São Paulo for RAI and Embratur, April 2026). Borrow the ideas, not the look:
  - **Geography as the generator.** Its alphabet was built from real river curves. Travessia's seam texture does something similar: two colours meeting, after the *Encontro das Águas* near Manaus, where the dark Rio Negro and the sandy Solimões run side by side before they mix.
  - **An elastic system.** Colours and illustrations change with the context: a fixed core palette plus one accent per surface, all from tokens.
  - **Don't take:** its wordmark, typeface, seal or palette, or anything that suggests a link to Embratur, RAI or a government.
- **Palette:** the built palette is in `src/tokens/tokens.json`: rio-negro, igarape, neblina, urucum and white (light water changed from tapajos to igarape on 2026-11-21; rules in `brand/rules.md`). Primitives are named after Brazilian rivers and natural products (brief §11; reasons in `docs/brand-building-playbook.md`, "Colour names").
- **Illustration:** none (playbook step 10, decided 2026-11-24). Product UI carries explainers (invoice, balance, rate, phone), empty states use an icon on a disc, and posts use the paintings or photographs (`brand/imagery.md`). No real banknotes, and no bank, card-network or Pix logos.

---

## 5. Tech stack and repo

### 5.1 Stack

- **Astro 7, plain**, from the minimal template. Node ≥ 22.23.4.
- **Integrations and tooling:** `@astrojs/sitemap`, `@astrojs/react` (islands only), `@astrojs/check` + strict TypeScript, Prettier + `prettier-plugin-astro`, Stylelint + `stylelint-declaration-strict-value` (§5.5.5).
- **Content collections** for all content, defined in `src/content.config.ts` (§7).
- **React islands** only where needed: the Base UI components in §5.6.1. Everything else is `.astro` with zero client JS by default.
- **Libraries (§5.6):** Base UI `@base-ui/react` 1.9.0, Motion `motion` 14.12.0, React 19.3.1. Pin exact versions.
- **Fonts:** Astro's Fonts API self-hosts Figtree and Geist Mono.
- **Hosting:** Cloudflare Pages, static output (`dist/`, one `.html` file per route), at `travessia.brenodaroz.com`. Build: `npm run build`, `NODE_VERSION=24`.
- **Scripts:** `dev`, `build`, `preview`, `check`, `lint:css`, `tokens`, `format`.

### 5.2 Repo layout

```
Travessia/
├─ SPEC.md                         ← this file (the website)
├─ AGENTS.md  (+ CLAUDE.md)        ← project rules (§5.4)
├─ docs/
│  ├─ brand-system-brief.md        ← the main brief
│  ├─ journal.md                   ← build journal (§10)
│  └─ design/texture-lab/          ← seam texture experiments (history; the seam is retired)
├─ brand/                          ← the brand pack (from brief Phase 1)
├─ astro.config.mjs  stylelint.config.mjs
├─ scripts/build-tokens.ts         ← tokens.json → tokens.css + tokens.ts (§5.5.2)
├─ .agents/skills/                 ← project skills (§5.7)
└─ src/
   ├─ tokens/tokens.json           ← source of truth for every token (D14)
   ├─ tokens/tokens.ts             ← generated
   ├─ styles/                      ← global.css, tokens.css (generated), reset, base, layout, utilities
   ├─ content.config.ts            ← collection schemas (§7)
   ├─ content/                     ← collections and page files
   ├─ strings/strings.json         ← UI strings (nav, buttons, labels, a11y text)
   ├─ components/
   │  ├─ ui/  product/  sections/  shell/
   │  ├─ islands/                  ← React + Base UI, each with a .module.css (§5.6.1)
   │  └─ pages/                    ← one component per page template
   ├─ layouts/BaseLayout.astro
   ├─ pages/                       ← thin route files
   ├─ lib/
   │  ├─ routes.ts  content.ts  format.ts  rss.ts
   │  ├─ motion/                   ← reveal, press, pill, tween (§5.6.2)
   │  ├─ sphere/                   ← logo sphere layout
   │  ├─ generators/river/         ← the river shader and its still renderer (§9)
   │  └─ brand/                    ← the brand engine (brief §5.5)
   └─ assets/
      ├─ textures/                 ← approved texture stills
      └─ generated/                ← generator output + recipe.json (never hand-edit)
```

### 5.3 Branches

- `main` deploys to production on Cloudflare Pages. Work on a branch, merge when `check`, `lint:css` and `build` pass.

### 5.4 Project rules for agents (copied into `AGENTS.md`)

1. Read `docs/brand-system-brief.md` and `SPEC.md` before building anything (SPEC §5.5 for styling). There is no CSS framework: don't add Tailwind, Bootstrap, Sass, a UI kit or another framework's class names.
2. Colours, type, spacing, sizes, radii, shadows and motion come **only from tokens** (`var(--…)` from `src/styles/tokens.css`). No raw hex, rgb or px values outside that file. `npm run lint:css` must pass. To add or change a token, edit `src/tokens/tokens.json` and run `npm run tokens`; never edit the generated files.
3. All copy lives in `src/content/**` or `src/strings/strings.json`. Never hardcode copy in pages or components.
4. The site is English-only. Don't add other languages or locale plumbing unless the brief changes.
5. Files in `src/assets/generated/**` are written **only by generators**. Never hand-edit them. Every output sits next to a `recipe.json`.
6. Every image needs alt text. Decorative images use empty alt and are marked decorative.
7. Engines in `src/lib/generators/**` and `src/lib/brand/**` are framework-agnostic TypeScript, with no React or Astro imports.
8. The brand engine in `src/lib/brand/` knows nothing about Travessia: no names, colours, copy or facts. Brand-specific material lives in `brand/` (brief §5.1).
9. JSON-LD and meta tags come from content fields, never from hand-written strings.
10. Keep `noindex` and the fictional-company banner on every page (D7, D18). Forms never ask for passwords, CPF/CNPJ, bank or card details.
11. Component styles live in the component's scoped `<style>` block (or, for a React island, a CSS Module next to it) and use semantic tokens only. Layout comes from the `l-` primitives before any new layout CSS. Variants are props mapped to `data-*` attributes, not extra modifier classes (§5.5.3).
12. Every new UI component gets an entry on `/styleguide` in the same change.
13. Only use libraries listed in §5.6. To try a new one, add its row there first. Pages never import Base UI or Motion directly: they use the wrappers in `src/components/islands/` and `src/lib/motion/`.
14. CSS first for hover, focus and simple transitions. Use Motion only for sequencing, scroll-linked effects, springs and exit animations. Every animation respects `prefers-reduced-motion`.

### 5.5 CSS system and components

Goal: a small system one person can hold in their head and that agents can follow.

#### 5.5.1 Layers and files

`src/styles/global.css` declares the order once, then imports each file into its layer:

```css
@layer reset, tokens, base, layout, components, utilities;
```

| Layer | File | Holds |
|---|---|---|
| reset | `reset.css` | A short modern reset: box-sizing, margins, media defaults, `prefers-reduced-motion` |
| tokens | `tokens.css` | Generated custom properties only (§5.5.2) |
| base | `base.css` | Element defaults: body, headings, links, lists, focus ring, `::selection`, text-wrap |
| layout | `layout.css` | The layout primitives (§5.5.3) |
| components | scoped `<style>` in `.astro` files; CSS Modules for islands | Component styles. Astro scopes them; they land after the global layers. Island CSS Modules wrap their rules in `@layer components`. |
| utilities | `utilities.css` | A handful: `u-visually-hidden`, `u-flow`, `u-text-balance` |

Astro's scoped styles aren't inside a layer, so they beat every layer above, utilities included. That's fine because utilities stay tiny.

#### 5.5.2 Tokens

- **Two tiers.**
  - *Primitives* hold raw values: the palette ramps, sizes and font families.
  - *Semantic* tokens point at primitives: `--color-bg-base`, `--color-text-base`, `--color-text-muted`, `--color-border-base`, `--color-accent-*`, `--space-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--duration-*`.
  - Components use **semantic tokens only**.
- **Fluid type and space** with `clamp()`, generated from a min/max viewport, the way Utopia does it. `build-tokens.ts` writes the clamps.
- **Section themes, not a site-wide dark mode.** `data-theme="light|tint|primary|deep|dark"` on a section swaps the semantic colour tokens. `data-theme-laptop` and `data-theme-desktop` change the theme from a breakpoint up.
- **Pipeline (D14).** `src/tokens/tokens.json` uses W3C design-token (DTCG) style: `$value`, `$type`, aliases like `{teal.600}`. `npm run tokens` runs `scripts/build-tokens.ts` (no dependencies), which writes:
  - `src/styles/tokens.css` with custom properties, fluid clamps and section themes
  - `src/tokens/tokens.ts`, a typed object the engines and the Motion helpers import. Durations come out in seconds; easings as cubic-bezier arrays or CSS `linear()` springs.
  - a check that every semantic colour pair passes WCAG AA, failing the run if not
- Token names map 1:1 across the three files: `color.accent.primary` ↔ `--color-accent-primary` ↔ `tokens.color.accent.primary`. Recipes store the dotted name (§9). In `tokens.json` a name is either a group or a token, never both, so defaults are called `base` (`color.text.base`, not `color.text`).

#### 5.5.3 Layout primitives

Small, composable classes in the spirit of Every Layout. They're the only global layout classes, prefixed `l-`. Each takes options through custom properties, for example `style="--gap: var(--space-l)"`, so no modifier classes are needed.

| Class | Does | Options |
|---|---|---|
| `l-container` | Centred max width with side gutters | `--measure`, or `data-width="narrow\|wide"` |
| `l-bleed` | Full-bleed band whose content lines up with `l-container`: pads by `--page-inset`, the distance from the viewport edge to the content column. Heroes use `--page-inset` as their edge grid columns instead. | none |
| `l-stack` | Vertical rhythm between children | `--gap` |
| `l-cluster` | Wrapping inline group (buttons, tags, logos) | `--gap`, `--justify` |
| `l-grid` | Auto-fit grid, no breakpoints | `--min` (card min width), `--gap` |
| `l-switcher` | Row that becomes a column below a threshold | `--threshold` |
| `l-sidebar` | Content + sidebar that wraps when tight | `--side-width` |
| `l-cover` | Full-height area with a centred principal element | `--min-height` |
| `l-frame` | Fixed aspect-ratio media box | `--ratio` |

Rules:
- **Component naming:** scoped classes use plain names (`.card`, `.title`, `.meta`) because Astro scopes them. No BEM needed.
- **Variants:** props become `data-*` attributes, e.g. `<Button variant="secondary" size="s">` renders `data-variant="secondary" data-size="s"` and the CSS targets `[data-variant="secondary"]`. One class per component root.
- **Responsive:** intrinsic layout first (the primitives), then container queries inside components (`container-type: inline-size` on section wrappers). Media queries only for nav and the page shell.

#### 5.5.4 Components

All in `src/components/`, each with typed `Props` and a `/styleguide` entry.

- **UI** (`ui/`): Button, Icon, Logo, Chip, Breadcrumb, Avatar, Prose, PostCover, PostCard, StoryCard, IntegrationMark, IntegrationCard, LogoSphere, Painting, RiverCanvas, WaitlistForm, TocNav, ShowMore, MotionScript.
- **Product UI** (`product/`): InvoiceCard, ConversionCard, CrossingCard, PhoneMock, FeatureVignette, SyncLog, ChangeVisual and the step and problem screens.
- **Islands** (`islands/`, §5.6.1): MobileNav, FeatureTabs, BillingToggle, PlanTooltip, IntegrationFilter, FeeCalculator, FeeCalculatorCrossing, FaqTopics, SignupForm, ChipFilter.
- **Sections** (`sections/`): Section (wrapper with `theme`, `spacing`, `width`), SectionHeader, the heroes, FeatureGrid, FeatureBento, StatBand, ProblemList, StepCards, PricingTeaser, ComparePlans, FaqList, FaqTopicsSection, ClosingCta, CtaBand, SimpleCta, NewsletterBand, ListPanels, NoteCards, PageIntro, SeamStrip and the rest.
- **Shell** (`shell/`): BaseLayout (head, meta, canonical, JSON-LD slot, noindex, the `no-js` → `js` swap), Header, Footer, SkipLink, DemoBanner.

#### 5.5.5 Guardrails

- **Stylelint** (`npm run lint:css`), for `.css` files and Astro `<style>` blocks (via `postcss-html`):
  - `color-no-hex` and `color-named: "never"` everywhere except `tokens.css`
  - `stylelint-declaration-strict-value` requires `var(--…)` for `color`, `background-color`, `border-color`, `font-size`, `font-family`, `gap`, `margin*`, `padding*`, `border-radius`, `box-shadow`. Allowed exceptions: `0`, `auto`, `inherit`, `currentColor`, `100%`.
  - No `!important`, no IDs as selectors
- **Accessibility baseline:** visible focus ring from a token; `prefers-reduced-motion` respected in reset, in the Motion helpers and in the generators; colour pairs checked by `build-tokens.ts`; every Base UI island passes a keyboard and VoiceOver check.
- **Performance budget:** no client JS on pages without an island; React only on pages that have one; fonts self-hosted, subset, `font-display: swap`, at most two families. Record JS per page from the `astro build` output when it changes.

### 5.6 Libraries

Each library gets a job, a boundary and a verdict, so any one of them can be backed out.

| Library | Version | Job here | Allowed in | Status |
|---|---|---|---|---|
| Base UI (`@base-ui/react`) | 1.9.0 | Accessible interactive primitives | `src/components/islands/` only | Kept |
| Motion (`motion`) | 14.12.0 | Scroll reveals and island animation; `motion/mini` and `inView` where that's enough | `src/lib/motion/` and islands | Kept |
| Hugeicons free (`@hugeicons/core-free-icons`) | 4.4.0 | Icon drawings, stroke rounded, MIT | `src/lib/icons/` only; components use `ui/Icon.astro` or `islands/Icon.tsx` | Kept (2026-11-21, brand/rules.md "Icons"). Build-time data only: named imports are tree-shaken, so only the mapped icons ship |
| *next library* | | | | Add a row before installing |

**Trial checklist (every library):**
1. Add its row above with its job and where it's allowed.
2. Wrap it. Pages use our component or helper, never the library directly, so swapping it out touches one folder.
3. Measure before and after: JS per page from `astro build`.
4. Write one journal entry: setup friction and a verdict (keep, swap or drop).

#### 5.6.1 Base UI

| Our component | Base UI parts | Hydration | Page |
|---|---|---|---|
| MobileNav | Drawer | `client:media` below 1280 px | All |
| FeatureTabs | Tabs + Tabs.Indicator, `keepMounted`, `activateOnFocus` | `client:visible` | Home |
| BillingToggle | ToggleGroup (monthly / yearly) | `client:visible` | Home, Pricing |
| PlanTooltip | Popover (opens on tap, hover and keyboard) | `client:visible` | Pricing |
| IntegrationFilter | Input + ToggleGroup | `client:idle` | Integrations |
| FeeCalculator | NumberField + ToggleGroup (currency) | `client:visible` | Home, Pricing |
| FeeCalculatorCrossing | Same, laid out as a crossing over a painted panel | `client:load` (it holds the page's `h1`) | Calculator |
| FaqTopics | Tabs, `keepMounted` | `client:visible` | Pricing |
| SignupForm | Form, Field, Select, Combobox, Checkbox, Toast | `client:load` | Open an account |
| ChipFilter | ToggleGroup | `client:visible` | Stories, Changelog |

**Stays native:** the FAQ list uses `<details>`, so every answer is in the server HTML and the FAQ JSON-LD. The main nav is four plain links on wide screens.

**Styling:**
- Each island is a `.tsx` file with a CSS Module beside it, wrapped in `@layer components`. Tokens only; Stylelint covers these files too.
- Style states with Base UI's attributes: `[data-open]`, `[data-selected]`, `[data-highlighted]`, `[data-disabled]`, and `[data-starting-style]` / `[data-ending-style]` for enter and exit.
- An island's props mirror the `.astro` component it replaces. Copy comes in as props from strings or collections; never hardcode copy in an island.

**Cost:** any page with an island also loads React's runtime (about 65 KB gz). Keep islands off pages that don't need them.

#### 5.6.2 Motion

- **Plain JS** in `src/lib/motion/`, called from `<script>` tags. Elements opt in with `data-reveal`, `data-reveal-stagger`, `data-count-up`, `data-press`, `data-pill` and `data-dim-siblings`. CSS transitions do most of the animating; Motion's `inView` triggers them.
- **Timing from tokens:** `motion.duration.*`, `motion.ease.*` and `motion.spring.*` in `tokens.json`, written as CSS variables and TS values.
- **No hidden content:** an inline head script swaps `<html class="no-js">` to `js`. Reveal start states only apply after the script marks `<html data-motion="ready">`, on screens, with motion allowed.

### 5.7 Project skills (`.agents/skills/`)

- `add-component`: where it goes, typed `Props`, scoped styles with semantic tokens, variants as `data-*`, the `/styleguide` entry, lint.
- `add-token`: edit `tokens.json`, run `npm run tokens`, check contrast.
- `build-section`: compose sections from the `l-` primitives and UI components, with content from collections or strings.
- `stageshow`: faux product UI (its React kit needs lucide-react, which isn't in §5.6 yet).
- The brand system's skills are listed in brief §5.7.

---

## 6. Site map and page specs

### 6.1 Routes

English at `/`. One route map in `src/lib/routes.ts`; pages ask for a key, never a hard-coded path.

| Page | Route | Content source |
|---|---|---|
| Home | `/` | `pages/home.json` + collections |
| Product overview | `/product` | `pages/product.json`, `features` |
| Feature pages (4) | `/product/[slug]` | `features`, `faqs` |
| Pricing | `/pricing` | `pages/pricing.json`, `plans`, `faqs` |
| Fee calculator | `/calculator` | `pages/calculator.json`, `rates` |
| For clients | `/for-clients` | `pages/forClients.json` |
| Integrations | `/integrations`, `/integrations/[slug]` | `integrations`, `pages/integrations.json` |
| Stories | `/stories`, `/stories/[slug]` | `customers` |
| Blog | `/blog`, `/blog/[slug]`, `/blog/category/[cat]` | `blog`, `authors` |
| Changelog | `/changelog`, `/changelog/rss.xml` | `changelog` |
| Compare (3) | `/compare/[slug]` | `comparisons`. No real competitors: vs an international bank wire, vs keeping money in a foreign account, vs taxes in a spreadsheet. |
| Events (2) | `/events/[slug]` | `events` |
| About | `/about` | `pages/about.json` |
| Open an account | `/open-account` | `pages/openAccount.json` (waitlist; stores nothing, D18) |
| Legal | `/privacy`, `/terms` | `legal` |
| Style guide | `/styleguide` | tokens + components (D11) |
| Landing pages | `/[slug]` **[decide the prefix]** | `landing`, written by the brand system (brief §5.5) |
| Brand | `/brand` | generated from `brand/` (brief §9) |
| 404 | `/404` | `pages/notFound.json` |

### 6.2 Page specs

**Every page:** the fictional-company banner (D18) above the header, and again in the footer.

- **Home:** hero with the waitlist form and product UI over the river; logo strip; stats (bank against Travessia); fee calculator; feature cards; product tabs; integrations bento with the logo sphere; stories; pricing teaser; FAQ with FAQPage schema; closing CTA.
- **Pricing:** plan cards from `plans` with a monthly/annual toggle (BRL with a USD reference), a comparison table, the fee calculator, the FAQ by topic, and a CTA.
- **Fee calculator:** amount and currency in; reais out, with the rate, the fee and the arrival day. Rates come from `rates.json`, made-up values labelled as examples. A worked-examples table is computed from the same data.
- **For clients:** for the companies abroad that pay Travessia's users: how paying works, what the invoice looks like, payment methods, security and an FAQ.
- **Feature page template:** hero with product UI, the problem beside its fix, how it works (3 steps with a screen each), related integrations, FAQ, CTA.
- **Integration detail template:** logo, category, facts, setup steps, what gets sent (per category), related integrations, CTA.
- **Story template:** cover, facts about the freelancer or studio, the story, metrics, quote, CTA.
- **Blog post template:** cover, title, author, date, reading time, body with a table of contents, related posts, newsletter CTA.
- **Changelog:** reverse-chronological entries grouped by month, filterable by type and area, with an RSS feed.
- **Event page:** date and time (BRT), speakers, agenda, registration form (name and email only). It switches to a "watch the recording" state after the date, checked at build time.

### 6.3 SEO basics

- Title, description and canonical per page, all from content fields. Sitemap from `@astrojs/sitemap`, kept for structure even while noindex.
- JSON-LD: Organization, FAQPage, BlogPosting, Event, BreadcrumbList.
- One `h1` per page, clean heading order.

---

## 7. Content model

All collections are defined in `src/content.config.ts` with typed schemas (zod via `astro:content`). That file is the reference for every field; this section is a map.

| Collection | Files | Notes |
|---|---|---|
| `pages` | `pages/*.json` | One file per page, discriminated by `page` |
| `features` | `features/*.md` | 4 features; `key` is the stable id other entries use |
| `integrations` | `integrations/*.md` | 20 made-up integrations (D12) |
| `customers` | `customers/*.md` | 7 stories |
| `faqs` | `faqs.json` | Topics; `feature` ties a question to a feature page |
| `plans`, `rates`, `authors` | `*.json` | Rates are example values |
| `blog` | `blog/*.md` | 8 posts |
| `changelog` | `changelog/*.json` | 7 entries |
| `comparisons`, `events`, `legal` | `*/*.json`, `legal/*.md` | |
| `landing` | `landing/*.md` | Planned: written by the brand system (brief §5.5) |

UI strings that aren't page content (nav, buttons, a11y labels, the banner) live in `src/strings/strings.json`.

---

## 8. Brand context

From brief Phase 1, everything the brand system knows lives in `brand/` (brief §5.2): strategy, audience, product truths, proof points, voice, modes, imagery and rules. Site copy should follow `brand/voice.md` and use only claims from `brand/product-truths.md` and `brand/proof.md`.

---

## 9. Generators

### 9.1 Principles

Shared by the site's generators (`src/lib/generators/`) and the brand engine (`src/lib/brand/`, brief §5.5):

1. **Plain TypeScript engines.** No React or Astro imports, so the same engine runs in a page, a script or a CLI.
2. **Recipes, not just pixels.** Every saved output has a `recipe.json` beside it. A recipe can be re-rendered, diffed in git and reviewed.
3. **Tokens only.** Recipes store token names, never values. Change the brand and regenerate.
4. **Deterministic.** Seeded randomness: the same recipe always gives the same output.
5. **Accessible.** Alt text is required before saving an image.

### 9.2 The river generator

`src/lib/generators/river` is the home hero's river as a WebGL2 shader (shader lab tile 8i), with a CPU version (`still.ts`) for stills. `scripts/build-river-stills.ts` renders the stills into `src/assets/generated/river/` with a `recipe.json`. It never animates with reduced motion; without WebGL2 or JavaScript the hero stays plain rio-negro. The seam generator that stood here was retired on 2026-11-21.

### 9.3 Where output goes

- Site assets: `src/assets/generated/<type>/<id>/` with `recipe.json`.
- Brand system outputs: `brand/outputs/<format>/<id>/` (brief §5.2).

---

## 10. Journal (`docs/journal.md`)

Log what was built, what broke and what was decided:

| Date | Area | What I did | Expected | What happened | Severity (blocker/major/minor/nice) |
|---|---|---|---|---|---|

At the end of every brief phase, add a short entry: what worked, what didn't, what I'd charge a client for.

---

## 11. Risks

| Risk | Mitigation |
|---|---|
| A made-up fintech mistaken for a real one, or for a scam | D18: banner on every page, no sensitive form fields, forms post nowhere, noindex; check the name (D2) before sharing the URL widely |
| Fintech and tax copy read as real advice | Proof points and rates are labelled as examples; tax posts end with "talk to your accountant"; nothing claims a licence or a partner bank |
| Made-up names matching a real company | Check names before anything goes public |
| JavaScript creep from islands and libraries | Islands only where §5.6.1 lists them; JS per page recorded when it changes |
| Library churn (Base UI and Motion release often) | Pin exact versions; upgrade in its own commit, with a journal line |
| Binary assets bloating the repo | WebP/AVIF at fixed sizes; keep only current outputs (recipes keep history) |

---

## 12. References

- CSS system: [Astro styling](https://docs.astro.build/en/guides/styling/) · [cascade layers (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) · [Every Layout](https://every-layout.dev/) · [Utopia](https://utopia.fyi/) · [Design Tokens format (W3C community group)](https://www.designtokens.org/) · [Stylelint](https://stylelint.io/)
- Astro: [content collections](https://docs.astro.build/en/guides/content-collections/) · [islands](https://docs.astro.build/en/concepts/islands/) · [client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)
- Libraries: [Base UI](https://base-ui.com/) · [Motion](https://motion.dev/)
- Brand inspiration: the Amazônia territorial brand by FutureBrand São Paulo for RAI and Embratur. Write-ups: [PRINT](https://www.printmag.com/branding-identity-design/how-do-you-brand-a-living-ecosystem-brazils-new-amazon-identity-offers-an-answer/) (1 May 2026) and [VIVA](https://viva.com.br/cultura-e-lazer/amazonia-ganha-marca-com-tipografia-criada-a-partir-das-coordenadas-de-rios.html) (10 Apr 2026).
- Brand system: Paul Jun, [Brand as software](https://pauljun.substack.com/p/brand-as-software) and part 2.
- Hosting: [Cloudflare Pages: deploy an Astro site](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- Checks: [INPI](https://www.gov.br/inpi/) (Brazilian trademark search, D2)
