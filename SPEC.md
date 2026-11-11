# Source by Webflow test project: spec and brief

> **Status:** v1.3 draft · 2026-11-11 · Owner: Breno Daroz
> **v1.1:** Lumos dropped. The site is plain Astro with a CSS system and components built from scratch (§5.5).
> **v1.2:** Libraries under test (§5.6): Base UI for accessible primitives, Motion instead of GSAP, and a trial process for adding more.
> **v1.3:** New client: Travessia, a made-up Brazilian fintech for freelancers paid from abroad (§4). PT-BR is now the default language.
> **What this is:** everything needed to start a new project folder, scaffold the site, build custom Views and run a simulated client handoff in Source by Webflow (research preview).
> **Client:** Travessia (a made-up company, see §4)

---

## 0. How to use this file

- Put this file at the project root as `SPEC.md`. Point `AGENTS.md` / `CLAUDE.md` at it so every agent (Claude Code, the Source agent, the View Builder) reads it.
- The Source facts in §2 were checked on 2026-11-10/11 against Webflow's posts and the first two "View Source" livestreams. The preview ships a new milestone every few weeks, so re-check §2 before you rely on it.
- **[verify]** marks something not confirmed yet. Test it in your build and log the answer in the journal (§16).
- **[decide]** marks a choice to confirm before or during Phase 0–1. §3 lists the big ones with a recommendation; a few smaller ones sit next to the topic (§5.5, §6).
- Work in phases (§15). Each phase ends with a short journal entry.

---

## 1. Goals

### 1.1 Why this project exists

1. **Learn Source as a developer.** That means the code-first workflow, the visual editor, the Brand System, and especially custom Views. Views are the new primitive and the thing an agency can sell.
2. **Rehearse a client handoff.** Give a made-up client team Views shaped around their jobs. Then do their jobs as them, to see what is smooth, what is confusing, and what breaks.
3. **Build a reusable agency playbook.** The deliverables are a generator engine, a set of Views, handoff docs and a guardrail matrix that can be reused on real client work.
4. **Collect feedback for Webflow.** The research preview explicitly asks for it.

### 1.2 Done when

- [ ] The site is live on Webflow Cloud, deployed from the GitHub repo, in **Portuguese (PT-BR, the default) and English**.
- [ ] At least **3 custom Views** (the P1 set in §10) work, and a "client" persona has used each one end to end.
- [ ] **Blog Cover Studio:** a marketer persona makes a cover for a new post without touching code or Figma. The cover and its recipe are saved in the repo. After a brand token changes, "regenerate all" rebuilds every cover in one reviewable change.
- [ ] The handoff script (§14) has been run end to end, with every task logged and friction noted.
- [ ] A one-page verdict: *Would I sell Source work to a client today? What would I package, and at what price?*

### 1.3 Non-goals

- A final, polished brand. A good-enough brand is enough to test the tools.
- Production-quality copy. Seed content can be agent-written and lightly edited.
- Real third-party integrations. At most one API experiment (§10, V3 stretch).
- A real company or real people. Everything is fictional, and the site stays `noindex`.

---

## 2. Source by Webflow: what we know (as of 2026-11-11)

### 2.1 Status

- Source has been in a limited **research preview** since Webflow Conf (2 Sep 2026). A new milestone ships every few weeks.
- No GA date has been announced. On the 2 Nov stream, Webflow staff said "likely Q1" 2027.
- No pricing yet. The stated direction is a **platform fee plus usage-based AI credits**. Existing Webflow plans don't change.
- Classic Webflow continues as its own product. **Existing Webflow sites are not connected live.** The planned migration path converts them into an Astro or Next.js codebase.

### 2.2 Vocabulary

| Term | Meaning in Source |
|---|---|
| Workspace | Container for people, tools and work. Deliberately loose. |
| Project | Built around an outcome, with a **goal and a brief**. Can nest, e.g. Brand → Campaigns. |
| Session | A chat with an agent. Modes: default and plan. You can attach images, skills and brand systems. |
| View | A dedicated, customizable surface for a job. Some are built in; others you build. Made of blocks. |
| Block | A piece of a View ("Lego pieces"). Made by Webflow, partners, or you. |
| Agent | The default Source agent, the **View Builder**, and (coming) a site builder plus your own custom agents. |
| Inbox | Where agents surface work they have already drafted. |
| Brand System | Built-in View that reads and writes `design.md` in the repo. |
| Extensions | Views, blocks, tools, agents and skills that you or partners add. |
| Blueprint | Source's own UI system. Views made by the View Builder use it, so they look native. |

### 2.3 What the app does today (seen on the streams)

- **Start screen.** Open a local folder (Astro or Next.js), which starts a *local* session. Or connect a GitHub repo, which starts a *cloud* session with no local setup.
- **Sidebar.** New Session, Site, Content, Brand System, Agents. A newer build also showed AEO and Workflows. Below that: saved Views, Sessions, Settings (skills, integrations), dark mode, and a Publish button.
- **Site view.**
  - Live preview with a page list, navigator and breakpoints.
  - Select an element to get a style panel: a curated subset, or all CSS.
  - Visual edits are **staged** and only written when you apply them (Stage → Review → Apply).
  - **Code mode** shows the selected element in its file (e.g. `index.astro`) and writes straight to disk, with no agent involved.
- **Code view.** The project files.
- **Content view.**
  - Shows Astro content collections and Sanity, both **read-only**. The banner reads: "Edit it in the connected content system, then refresh."
  - Webflow's new **agentic CMS** is editable: collections, items, typed fields, Save and Discard. It's on the internal nightly build and is due in the next preview milestone.
- **Brand System view.**
  - Sections: Overview, Rules · Mission, Vision, Strategy · Voice, Vocabulary · Color, Typography, Spacing, Sizing, Shape.
  - It reads `design.md` and shows the token JSON, which you can edit there.
- **Agents view.** A list of agents, each with details and a chat.
- **Custom Views.**
  - You build them with the **View Builder** agent: @-mention it in a session. It can also make a throwaway View on the fly, which you can save if it's useful.
  - Or you build them with an external agent (Claude Code, Codex) through the **Source CLI**.
  - Views can read and write project files, render live components, and call APIs. API keys are stored as Webflow Cloud secrets; for now that is a manual setup.
  - Views live in the project and can be **shared**: teammates get your updates.
  - Planned: per-View and per-field access, e.g. "only Timothy can edit price".
- **Shipping.** Publish to the app's branch on GitHub, then deploy to **Webflow Cloud**.
- **External agents.** Point Claude Code at the same folder. Source's preview reflects changes made outside Source.

### 2.4 Not shipped yet (as of the 2 Nov stream)

- **Roles and permissions** ("a future update of the research preview"), so access can't be enforced yet.
- Sharing private custom Views with teammates; custom agents; team skills. All are planned for the next milestone.
- Agentic CMS (next milestone).
- One-click connectors, a GSAP interactions panel (after the initial release), and a one-click "new project from scratch".

### 2.5 What this means for this project

- **Scaffold the repo ourselves** with Claude Code, then open it in Source. Source works best with an existing codebase.
- **Clients can't edit content in the Content view yet.** For now, editing happens through custom Views that write to content files. Plan to move one collection into the agentic CMS when it lands (Phase 7).
- **Write the guardrail matrix now (§12.3) and enforce it when roles ship.** Until then, role-play the personas and note where enforcement would have mattered.

---

## 3. Decisions to confirm [decide]

| # | Decision | Recommendation | Why |
|---|---|---|---|
| D1 | Client concept | Made-up Brazilian fintech: a cross-border account for freelancers and small studios paid by clients abroad (§4) | Uses every marketing job Source targets (campaigns, AEO, CRO, localization), has catalog-style data, and has two real audiences in two languages |
| D2 | Name | **Travessia**. Two web searches on 2026-11-11 found no fintech or payments app with this name. It's a common Portuguese word and a well-known Milton Nascimento song, so search INPI (Brazil's trademark office) and domains before using it anywhere public. | Avoids accidentally impersonating a real company |
| D3 | Framework | **Plain Astro** from the minimal template (`npm create astro@latest -- --template minimal`). No CSS framework, UI kit or starter. | Source only opens Astro or Next.js projects, so Astro stays. Everything above it is built by hand, so every class, token and component is ours. That makes Source's visual edits easy to judge against our own conventions (DX-04). |
| D4 | Languages | **PT-BR** (default, no prefix) + **EN** (`/en/`). Localized slugs through a route map (`/precos` ↔ `/en/pricing`) **[decide]** | It's a Brazilian company, so PT-BR first is the honest default, and a non-English default is a better localization test for Source. You can review both languages yourself. |
| D5 | Repo | **Public** GitHub repo, `brenomzy/travessia`. `main` = production. Source publishes to its branch. Never commit secrets: they live in Webflow Cloud. | Matches Source's shipping flow; public so the experiment can be shared |
| D6 | Hosting | **Webflow Cloud** | Matches Source's shipping flow; also holds secrets |
| D7 | Indexing | `noindex` sitewide + `robots.txt` disallow until the test ends | Keeps a made-up company out of search |
| D8 | Package manager | npm | Least friction with `create astro` and Webflow Cloud |
| D9 | Where covers render | In the browser, inside the View and the lab, saved as files. No headless canvas at build time. | Keeps builds simple. The saved recipe makes covers reproducible. |
| D10 | Generator sandbox | Toolcraft app in `tools/cover-lab/` with its own `package.json`, importing the shared engine | Explore freely without adding React and Tailwind to the site |
| D11 | Style guide | Build our own `/styleguide` (noindex) that renders every token and component from the real CSS | One page to check the system, to point Source's agent at, and to show the client |
| D12 | Integration and customer names | Made-up names, with logos from the logo generator. No real banks, platforms, card networks or the Pix logo. | Avoids implying real partnerships; gives the logo sphere real input |
| D13 | CSS approach | Plain CSS: cascade layers, design tokens as custom properties, scoped component styles, a few layout primitives. No Tailwind, no Sass. Stylelint rejects raw values outside the token file. (§5.5) | Small enough to own fully; nothing for agents to confuse with other frameworks |
| D14 | Token source of truth | `src/tokens/tokens.json` generates `src/styles/tokens.css` (site) and `src/tokens/tokens.ts` (generator engines). `design.md` mirrors it. Re-decide after DX-07: if the Brand System view edits tokens reliably, `design.md` could become the source instead. | One place to change a value; engines and CSS can't drift apart |
| D15 | Accessible primitives | **Base UI** (`@base-ui/react`) for interactive pieces native HTML doesn't cover well: nav, drawer, tabs, select, tooltip, toast. Unstyled, so it's styled with our tokens. Native HTML stays where it's enough (FAQ `<details>`, links, buttons, plain inputs). (§5.6.1) | Tests a headless library on top of a hand-built CSS system. Toolcraft is built on Base UI too, so the site and the lab share primitives. |
| D16 | Animation | **Motion** (`motion`) instead of GSAP: the plain JS API in Astro scripts, `motion/react` inside islands. Timing comes from tokens. (§5.6.2) | Small, MIT, works with and without React. Trade-off: Source's planned GSAP interactions panel (§2) won't see these animations. Try that panel on a branch when it ships. |
| D17 | Libraries in general | This project doubles as a library lab: every library gets a row in §5.6 and a trial before it's used | Keeps experiments comparable and easy to back out |
| D18 | Fictional-company safeguards | A "demo site, fictional company" banner on every page and in the footer. Forms ask for name and email only: never passwords, CPF/CNPJ, bank or card details. They post nowhere. Plus `noindex` (D7). | A made-up fintech must never pass for a real one or look like a phishing page |

---

## 4. The made-up client: Travessia

> **Fictional.** Travessia is invented for this test. The site says so on every page (D18), and nothing on it collects real personal or financial data.

### 4.1 Company

- **What it sells:** a cross-border account for Brazilian freelancers and small studios who work for clients abroad.
  - Send invoices in USD, EUR or GBP, with a payment link the client pays by card or bank transfer.
  - Hold the money in a multi-currency balance, see the exact rate and fee before converting, and receive reais by Pix.
  - Issue the export service invoice (*nota fiscal de exportação*) automatically for each payment.
  - Keep a monthly tax report ready for the accountant (MEI, Simples Nacional, or an individual using carnê-leão).
- **Features (one page each):**
  - Faturas internacionais (international invoices)
  - Receber e converter (get paid and convert)
  - Nota fiscal automática (automatic tax invoices)
  - Impostos em dia (tax reports)
- **Markets and languages:**
  - **Brazil, in PT-BR (the default):** the freelancers and studios.
  - **English (`/en/`):** their clients abroad (companies and agencies in the US, UK and Europe) who need to trust the invoice and pay easily, plus international readers. EN gets one page aimed at them: "For clients", which explains how paying a Brazilian freelancer through Travessia works.
- **Stage:** Series A, about 40 people in São Paulo and remote, a marketing team of 4 plus an agency (you).
- **What the site is for:**
  - Primary: account sign-ups. In this test it's a waitlist form that stores nothing.
  - Secondary: be **cited in AI answers** for questions like "como receber pagamento do exterior sendo MEI" and "how to pay a contractor in Brazil".
- **Proof points (made up, used in copy):** reais in your account by Pix in 1 business day; one 0.6% fee, shown before you convert; export tax invoice issued in under 2 minutes.

### 4.2 Audience

- **Freelancers** (designers, developers, translators, video editors, writers) billing 1–5 foreign clients, usually as MEI or a small company.
- **Small studios** (2–10 people) with several foreign clients and a part-time accountant.
- **Their clients abroad** (EN), who want a professional invoice and an easy way to pay.
- Their jobs: get paid on time, stop losing 4–6% to bank wires and bad rates, know the rate before converting, and keep taxes right without a spreadsheet.

### 4.3 Brand direction (a starting point; the brand designer persona finalizes it)

- **Name:** *travessia* means "crossing", as in a river crossing. Money crosses borders the way boats cross rivers every day in the Amazon. It's easy to say in English too.
- **Personality:** calm, trustworthy, warm, quietly proud of being Brazilian. As clear as a bank statement, as friendly as someone who's done this before.
- **Voice:** plain and specific. Short sentences. Numbers instead of adjectives. Explain a tax term the first time it appears. No hype, and no scare tactics about taxes or fees.
- **Vocabulary:**
  - Use (PT-BR): receber, cliente, fatura, câmbio, taxa, nota fiscal, Pix, conta, saldo.
  - Avoid (PT-BR): "solução", "revolucionário", "sem burocracia", "taxa zero", and English buzzwords when a Portuguese word works.
  - Use (EN): get paid, invoice, client, exchange rate, fee, freelancer, studio.
  - Avoid (EN): solution, seamless, leverage, revolutionary, empower, "hidden fees" scare copy.
  - Keep in Portuguese in both languages: Pix, MEI, nota fiscal, carnê-leão (with a short explanation in EN).
- **Visual inspiration: the Amazônia territorial brand.** FutureBrand São Paulo made it for RAI (Rotas Amazônicas Integradas) and Embratur, and it launched in April 2026. Borrow the ideas, not the look:
  - **Geography as the generator.** Its alphabet was built from real river curves found in satellite images. Travessia's signature visual (V7) does the same with lines. It's based on the *Encontro das Águas* near Manaus, where the dark Rio Negro and the sandy Solimões run side by side for kilometres before they mix: two currencies meeting. The lines come from rules, or from public-domain river geometry such as Natural Earth.
  - **An elastic system.** Its colours and illustrations change with the context. Here, that means a fixed core palette plus one context accent per campaign or section, all from tokens.
  - **A tool people can use.** It ships a type tool where anyone can type text and download the result. That's the same idea as the client generator Views (V1, V5, V7).
  - **Don't take:** its wordmark, typeface, seal or palette, or anything that suggests a link to Embratur, RAI or a government. Travessia is a national fintech, not a regional brand.
- **Palette starting point (names are placeholders):**
  - Base: rio-negro (deep tea-black), solimões (sandy ochre), mata (deep green) and papel (warm off-white)
  - Main accent: urucum (red-orange)
  - Second accent: açaí (deep purple)
  - Calm base, one energetic accent per section, generous whitespace.
- **Illustration style:** a kit of flat, layered SVG parts that combine into scenes (V4):
  - UI cards for invoice, balance and rate
  - a phone
  - abstract coins and documents
  - route arcs, river segments and a boat
  - check marks, clocks and arrows
  - No real banknotes, and no bank, card-network or Pix logos.

---

## 5. Tech stack and repo

### 5.1 Stack

- **Astro 7, plain.** Scaffold with `npm create astro@latest Travessia -- --template minimal` (Astro 7.4.10 on npm as of 2026-11-11). It needs Node ≥ 22.23.4. There's no starter, CSS framework or component library: §5.5 defines what we build ourselves.
- **Add by hand (Phase 0):**
  - `@astrojs/sitemap`
  - `@astrojs/react`, for islands only
  - `@astrojs/check` + `typescript`, with strict TypeScript
  - Prettier + `prettier-plugin-astro`
  - Stylelint + `stylelint-declaration-strict-value`, to enforce tokens (§5.5.5)
- **Astro content collections** for all content, defined in `src/content.config.ts`. **Astro i18n routing** for EN and PT-BR.
- **React islands** only where needed: generators and the Base UI components listed in §5.6.1. Everything else is `.astro` components with zero client JS by default.
- **Libraries under test (§5.6):**
  - Base UI, `@base-ui/react` 1.9.0, for accessible primitives
  - Motion, `motion` 14.12.0, for animation
  - React 19 (19.3.1), for the islands
  - Pin exact versions. More libraries get added through §5.6.
- **Toolcraft** by Pixel Point for the generator sandbox: `npx @pixel-point/toolcraft create`. It's built on React, TanStack Router, Tailwind, Base UI and TypeScript, and ships AI skills plus performance and visual checks. Tailwind stays inside `tools/cover-lab` and never reaches the site; Base UI is shared.
- **Hosting:** Webflow Cloud. Add the adapter and config from Webflow Cloud's current Astro guide, or let Source set them up on first publish **[verify]**.
- **Scripts:** `dev`, `build`, `check` (astro check), `lint:css` (Stylelint), `tokens` (rebuild token files, §5.5.2), `format`.

### 5.2 Target repo layout

```
Travessia/
├─ SPEC.md                         ← this file
├─ AGENTS.md  (+ CLAUDE.md)        ← project rules (§5.4)
├─ design.md                       ← brand system, read by Source's Brand System view (§8)
├─ astro.config.mjs                ← i18n, sitemap, React, adapter for Webflow Cloud
├─ stylelint.config.mjs            ← token enforcement (§5.5.5)
├─ scripts/build-tokens.ts         ← tokens.json → tokens.css + tokens.ts (§5.5.2)
├─ .agents/skills/                 ← project skills (§11.3)
├─ src/
│  ├─ tokens/
│  │  ├─ tokens.json               ← source of truth for every token (D14)
│  │  └─ tokens.ts                 ← generated; imported by generator engines
│  ├─ styles/
│  │  ├─ global.css                ← declares layer order, imports the rest
│  │  ├─ tokens.css                ← generated custom properties
│  │  ├─ reset.css  base.css  layout.css  utilities.css
│  ├─ content.config.ts            ← collection schemas (§7)
│  ├─ content/
│  │  ├─ blog/{pt-br,en}/*.md
│  │  ├─ changelog/{pt-br,en}/*.md
│  │  ├─ integrations/{pt-br,en}/*.md
│  │  ├─ customers/{pt-br,en}/*.md
│  │  ├─ features/{pt-br,en}/*.md
│  │  ├─ events/{pt-br,en}/*.md
│  │  ├─ faqs/{pt-br,en}.json
│  │  ├─ plans.json
│  │  └─ authors.json
│  ├─ i18n/{pt-br,en}.json         ← UI strings (nav, buttons, labels)
│  ├─ components/
│  │  ├─ ui/                       ← Button, Card, Badge, Accordion… (§5.5.4)
│  │  ├─ islands/                  ← React + Base UI components, each with a .module.css (§5.6.1)
│  │  └─ sections/                 ← Hero, FeatureGrid, PricingTable, CtaBand…
│  ├─ lib/motion/                  ← Motion helpers: reveal, stagger, count-up, scroll (§5.6.2)
│  ├─ layouts/ pages/ utils/
│  ├─ lib/generators/              ← shared engines (§9)
│  │  ├─ cover/  scene/  social/  logo/  signature/
│  └─ assets/
│     ├─ illustration-kit/         ← SVG parts for the scene composer (V4)
│     └─ generated/                ← generator output + recipe.json (never hand-edit)
├─ tools/
│  └─ cover-lab/                   ← Toolcraft sandbox, its own package.json (D10)
└─ docs/
   ├─ journal.md                   ← test journal (§16)
   └─ handoff/                     ← role guides, View catalog, guardrails (§14.4)
```

Source stores custom Views inside the project **[verify where]**. Keep them in git and note the path here once known.

### 5.3 Branches and environments

- `main` deploys to production on Webflow Cloud.
- Source publishes to its app branch **[verify branch name and flow]**. Review as a PR, then merge to `main`, or deploy from Source if that's the supported path.
- You can work locally in Claude Code alongside Source. Rule: **one writer per file at a time.** DX-19 deliberately tests a conflict.

### 5.4 Project rules for agents (copy into `AGENTS.md`)

1. Read `SPEC.md` before building anything (§5.5 for styling). There is no CSS framework: don't add Tailwind, Bootstrap, Sass, a UI kit or another framework's class names.
2. Colours, type, spacing, sizes, radii, shadows and motion come **only from tokens** (`var(--…)` from `src/styles/tokens.css`). No raw hex, rgb or px values outside that file. `npm run lint:css` must pass. To add or change a token, edit `src/tokens/tokens.json` and run `npm run tokens`; never edit the generated files.
3. All copy lives in `src/content/**` or `src/i18n/*.json`. Never hardcode copy in pages or components.
4. Every page and content entry exists in `pt-br` (the default) and `en`. Entries share a filename and `translationKey`. Flag missing translations; never silently fall back.
5. Files in `src/assets/generated/**` are written **only by generators**. Never hand-edit them. Every output sits next to a `recipe.json`.
6. Every image needs alt text in both languages. Decorative images use empty alt and are marked decorative.
7. Engines in `src/lib/generators/**` are framework-agnostic TypeScript, with no React or Astro imports.
8. Don't change Toolcraft's bundled components in `tools/cover-lab` unless asked.
9. JSON-LD and meta tags come from content fields, never from hand-written strings.
10. Keep `noindex` until §1.2 says otherwise, and keep the fictional-company banner on every page (D18). Forms never ask for passwords, CPF/CNPJ, bank or card details.
11. Component styles live in the component's scoped `<style>` block (or, for a React island, a CSS Module next to it) and use semantic tokens only. Layout comes from the `l-` primitives before any new layout CSS. Variants are props mapped to `data-*` attributes, not extra modifier classes (§5.5.3).
12. Every new UI component gets an entry on `/styleguide` in the same change.
13. Only use libraries listed in §5.6. To try a new one, add its row there first. Pages never import Base UI or Motion directly: they use the wrappers in `src/components/islands/` and `src/lib/motion/`.
14. CSS first for hover, focus and simple transitions. Use Motion only for sequencing, scroll-linked effects, springs and exit animations. Every animation respects `prefers-reduced-motion`.

### 5.5 CSS system and components (built from scratch)

Goal: a small system one person can hold in their head, that agents can follow, and that makes Source's visual edits easy to judge.

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

Astro's scoped styles aren't inside a layer, so they beat every layer above, utilities included. That's fine because utilities stay tiny. If it bites, wrap component styles in `@layer components { … }` **[decide in Phase 1]**.

#### 5.5.2 Tokens

- **Two tiers.**
  - *Primitives* hold raw values, e.g. `--rio-negro-50…900`, `--solimoes-50…900`, `--mata-50…900`, `--urucum-500`, `--acai-500`, `--size-1…12`, `--font-sans`, `--font-display`. The colour names are placeholders until the palette is chosen (Tomás, §12).
  - *Semantic* tokens point at primitives: `--color-bg`, `--color-surface-base`, `--color-surface-deep`, `--color-text-base`, `--color-text-muted`, `--color-border`, `--color-accent-primary` (plus 2–3 more `--color-accent-*` that the generators offer as brand accents), `--color-on-accent`, `--space-s…3xl`, `--space-section`, `--text-sm…4xl`, `--radius-s/m/l/pill`, `--shadow-1/2`, `--ease-out`, `--duration-fast/base`.
  - Components use **semantic tokens only**.
- **Fluid type and space** with `clamp()`, generated from a min/max viewport and a ratio, the way Utopia does it. `build-tokens.ts` writes the clamps, so nobody hand-tunes breakpoints.
- **Section themes, not a site-wide dark mode.** `data-theme="light|tint|dark"` on a section swaps the semantic colour tokens. That gives alternating section backgrounds and a dark hero or CTA band without a dark-mode toggle. A full dark mode is out of scope **[decide]**.
- **Pipeline (D14).** `src/tokens/tokens.json` uses W3C design-token (DTCG) style: `$value`, `$type`, aliases like `{teal.600}`. `npm run tokens` runs `scripts/build-tokens.ts`, about 100 lines with no dependencies, which writes:
  - `src/styles/tokens.css` with custom properties, fluid clamps and section themes
  - `src/tokens/tokens.ts`, a typed object the generator engines and the Motion helpers import (§9, §5.6.2). Durations come out in seconds and easings as cubic-bezier arrays.
  - a check that every semantic colour pair (text on bg, on-accent on each accent) passes WCAG AA, failing the run if not
- Token names map 1:1 across the three files: `color.accent.primary` ↔ `--color-accent-primary` ↔ `tokens.color.accent.primary`. Generator recipes store the dotted name (§8, §9). In `tokens.json` a name is either a group or a token, never both, so defaults are called `base` (`color.text.base`, not `color.text`).

#### 5.5.3 Layout primitives

Small, composable classes in the spirit of Every Layout. They're the only global layout classes, prefixed `l-`. Each takes options through custom properties, for example `style="--gap: var(--space-l)"`, so no modifier classes are needed.

| Class | Does | Options |
|---|---|---|
| `l-container` | Centred max width with side gutters | `--measure`, or `data-width="narrow\|wide"` |
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

#### 5.5.4 Components to build

All in `src/components/ui/` and `src/components/sections/`, each with typed `Props` and a `/styleguide` entry.

- **UI:** Button (primary, secondary, ghost; s/m/l; link or button), Link (inline, arrow), Icon (inline SVG sprite), Badge, Card (with a media slot), Media (Astro `<Image>`, required alt, decorative flag), Accordion (`<details>`/`<summary>`, no JS), LanguageSwitcher (plain links, no JS), Logo, Prose (styles rendered Markdown).
- **Islands (Base UI, §5.6.1):** MainNav, MobileNav, FeatureTabs, BillingToggle, PlanTooltip, IntegrationFilter, FeeCalculator, SignupForm (with Toast).
- **Sections:** Section (wrapper with `theme`, `spacing`, `width` props), Hero (with a signature-visual slot), LogoCloud, FeatureGrid, FeatureSplit, StatBand (the proof points), Testimonial, PricingTable, FaqList (+ FAQ JSON-LD), CtaBand, BlogCard + BlogList, ChangelogEntry, IntegrationCard + IntegrationGrid, CustomerStoryHeader.
- **Shell:** BaseLayout (head, meta, `hreflang`, JSON-LD slot, noindex, the `no-js` → `js` swap), Header (holds MainNav and MobileNav), Footer, SkipLink.
- Building the shell and UI components by hand in Phase 1 is part of the test: it gives a clean baseline before Source's agent touches anything.

#### 5.5.5 Guardrails

- **Stylelint** (`npm run lint:css`), for `.css` files and Astro `<style>` blocks (via the `postcss-html` custom syntax):
  - `color-no-hex` and `color-named: "never"` everywhere except `tokens.css`
  - `stylelint-declaration-strict-value` requires `var(--…)` for `color`, `background-color`, `border-color`, `font-size`, `font-family`, `gap`, `margin*`, `padding*`, `border-radius`, `box-shadow`. Allowed exceptions: `0`, `auto`, `inherit`, `currentColor`, `100%`.
  - No `!important`, no IDs as selectors
- Run it before every commit (a simple git hook or `npm run check`). Run it on every Source diff in DX-04.
- **Accessibility baseline:** visible focus ring from a token; `prefers-reduced-motion` respected in reset, in the Motion helpers and in the generators; colour pairs checked by `build-tokens.ts`; every Base UI island passes a keyboard and VoiceOver check (DX-24).
- **Performance budget:** no client JS on pages without an island; React only on pages that have one; one CSS file per page; fonts self-hosted, subset, `font-display: swap`, at most two families. Record JS per page from the `astro build` output at the end of every phase.

### 5.6 Libraries under test

Part of the point of this project is trying libraries. Each one gets a job, a boundary and a verdict, so the results are comparable and any library can be backed out.

| Library | Version (2026-11-11) | Job here | Allowed in | Judged on | Status |
|---|---|---|---|---|---|
| Base UI (`@base-ui/react`) | 1.9.0 | Accessible interactive primitives | `src/components/islands/` only | Keyboard and screen-reader behaviour; JS per page; how easy it is to style with our tokens; how Source's Site view and agent handle islands | Trial |
| Motion (`motion`) | 14.12.0 | Entrances, scroll effects, micro-interactions, island open/close | `src/lib/motion/` and islands | Bytes shipped; reduced motion; smoothness; how well Source's agent edits an animation from a prompt | Trial |
| *next library* | | | | | Add a row before installing |

**Trial checklist (every library):**
1. Add its row above with its job and where it's allowed.
2. Wrap it. Pages use our component or helper, never the library directly, so swapping it out touches one folder.
3. Measure before and after: JS per page from `astro build`, plus Lighthouse on one page.
4. Write one journal entry: setup friction, how Source's agent and visual editor coped, and a verdict (keep, swap or drop).

#### 5.6.1 Base UI

**Where it's used:**

| Our component | Base UI parts | Hydration | Page |
|---|---|---|---|
| MainNav | NavigationMenu (Product and Resources dropdowns) | `client:idle` | All |
| MobileNav | Drawer | `client:media` at the nav breakpoint | All |
| FeatureTabs | Tabs + Tabs.Indicator | `client:visible` | Home, Product |
| BillingToggle | ToggleGroup (monthly / yearly) | `client:visible` | Pricing |
| PlanTooltip | Tooltip, or Popover for touch | `client:visible` | Pricing |
| IntegrationFilter | Combobox or ToggleGroup (category + search) | `client:visible` | Integrations |
| FeeCalculator | NumberField + Select (currency); the result animates with Motion | `client:visible` | Home, Pricing, Calculator |
| SignupForm | Form, Field, Select (how you work: MEI, company, individual), Combobox (main client's country), Toast | `client:visible` | Open an account |

**Stays native:**
- The FAQ uses `<details>`, so every answer is in the server HTML for AEO and FAQ JSON-LD.
- Optional comparison on `/styleguide`: build the same FAQ with Base UI Accordion. Check whether the answers reach the server HTML (`keepMounted`, `hiddenUntilFound`) and what it costs in JS.

**Styling:**
- Each island is a `.tsx` file with a CSS Module beside it, wrapped in `@layer components`. Tokens only; Stylelint covers these files too.
- Style states with Base UI's attributes: `[data-open]`, `[data-selected]`, `[data-highlighted]`, `[data-disabled]`, and for enter/exit `[data-starting-style]` / `[data-ending-style]`. Use its CSS variables for popup sizing and positioning.
- The same `data-*` variant rule applies as for `.astro` components (§5.5.3).

**Props and content:**
- An island's props mirror the `.astro` component it replaces, so pages don't care which one they get.
- Copy comes in as props from i18n or collections. Never hardcode copy in an island.

**Cost:** any page with an island also loads React's runtime. Measure it in Phase 1 and keep islands off pages that don't need them.

#### 5.6.2 Motion

**Two ways in:**
- **Plain JS** (`animate`, `inView`, `scroll`, `stagger` from `motion`) in `src/lib/motion/`, called from `<script>` tags in `.astro` components. Elements opt in with attributes such as `data-reveal`, `data-reveal-stagger`, `data-count-up` and `data-parallax`.
- **`motion/react`** inside islands, for the drawer and nav open/close, the tabs indicator and the toast. Follow Base UI's animation guide for wiring Motion to its parts **[verify the current pattern]**.

**Timing from tokens:**
- `tokens.json` holds `motion.duration.*` and `motion.ease.*`.
- `build-tokens.ts` writes them as CSS variables (`--duration-base`, `--ease-out`) and as TS values (seconds, cubic-bezier arrays), so CSS transitions and Motion share the same timing.

**No hidden content:**
- An inline head script swaps `<html class="no-js">` to `js`.
- Reveal start states apply only under `.js` and `(prefers-reduced-motion: no-preference)`, so content is never hidden when JS fails or motion is reduced.
- Islands wrap in `<MotionConfig reducedMotion="user">`.

**Where it's used:**
- Hero entrance and the signature visual's intro
- Section reveals and card staggers
- StatBand count-up
- Pricing numbers changing with the billing toggle, and the FeeCalculator result counting to the new amount
- Nav and drawer
- Tabs indicator
- Section Tuner (V8) settings: stagger, spring and scroll offsets are saved as JSON that the helpers read

**Experiments:**
- Animate the drawer two ways, with Base UI's CSS enter/exit attributes and with Motion, and compare bytes, code and feel (DX-27).
- Try `motion/mini` where only `animate` is needed (DX-26).
- When Source's GSAP interactions panel ships, rebuild one section's animation with it on a branch and compare.

---

## 6. Site map and page specs

### 6.1 Routes

PT-BR is the default, at `/` with no prefix. EN lives under `/en/`.
- Astro i18n settings: `defaultLocale: "pt-br"`, `locales: ["pt-br", "en"]`, `prefixDefaultLocale: false`.
- `<html lang>` is `pt-BR` or `en`.
- Each page links its translation and has `hreflang` alternates, with `x-default` pointing at the PT-BR page.
- Slugs are localized through one route map in `src/i18n/routes.ts` (D4) **[decide]**. The fallback is the same slugs in both languages.

| Page | PT-BR route | EN route | Content source | Main things it tests |
|---|---|---|---|---|
| Home | `/` | `/en/` | page file + collections | Visual editing, signature visual, logo sphere, FeeCalculator |
| Product overview | `/produto` | `/en/product` | `features` | Component reuse |
| Feature pages (4) | `/produto/[slug]` | `/en/product/[slug]` | `features` | Collection-driven pages |
| Pricing | `/precos` | `/en/pricing` | `plans`, `faqs` | Approval-gated page, FAQ schema, testing variants |
| Fee calculator | `/calculadora` | `/en/calculator` | page file + mock rates | Island + Motion; optional mock rate API (DX-16) |
| For clients | `/para-clientes` | `/en/for-clients` | page file | The second audience; the one page written EN-first |
| Integrations | `/integracoes`, `/integracoes/[slug]` | `/en/integrations`, `/en/integrations/[slug]` | `integrations` | Catalog View (V3) |
| Stories | `/historias`, `/historias/[slug]` | `/en/stories`, `/en/stories/[slug]` | `customers` | Story template, generated covers |
| Blog | `/blog`, `/blog/[slug]`, `/blog/categoria/[cat]` | `/en/blog`, `/en/blog/[slug]`, `/en/blog/category/[cat]` | `blog`, `authors` | Cover Studio (V1), brand voice |
| Changelog | `/novidades` (anchors per entry) | `/en/changelog` | `changelog` | Changelog Composer (V2) |
| Compare | `/comparar/[slug]` | `/en/compare/[slug]` | page files | AEO-style pages: vs international bank wire, vs keeping money in a foreign account, vs doing taxes in a spreadsheet. No real competitors. |
| Webinar campaign | `/eventos/[slug]` | `/en/events/[slug]` | `events` | Campaign Kit (V5), nested project |
| About | `/sobre` | `/en/about` | page file | Simple editing |
| Open an account | `/abrir-conta` | `/en/open-account` | page file | SignupForm island (waitlist; stores nothing, D18) |
| Legal | `/privacidade`, `/termos` | `/en/privacy`, `/en/terms` | page files | n/a |
| Style guide | `/styleguide` | (none) | tokens + components | Tokens and every component, built by us (D11) |
| 404 | `/404` | `/en/404` | page file | n/a |

### 6.2 Page specs

**Every page:** the fictional-company banner (D18) above the header, and again in the footer.

**Home**
1. Hero: headline, subhead, two CTAs (open an account; see fees). The signature visual (V7 output, static first) sits in the background.
2. Logo strip: made-up companies whose freelancers get paid through Travessia.
3. Problem → outcome trio, with proof points:
   - bank fees and bad rates → one 0.6% fee
   - money stuck for days → reais by Pix in 1 business day
   - tax paperwork → export invoice in under 2 minutes
4. FeeCalculator: "How much will I receive?"
5. Feature grid: 4 cards from `features`.
6. Product showcase: FeatureTabs with placeholder UI made with the scene composer.
7. Integrations bento card with the **logo sphere** (data from `integrations`, tuned in V3).
8. Stories from `customers`.
9. Pricing teaser from `plans`.
10. FAQ from `faqs` (topic: general), with FAQPage schema.
11. Final CTA.

**Pricing:**
- Plan cards from `plans` (Grátis, Pro, Estúdio) with a monthly/annual toggle. PT-BR shows BRL; EN shows BRL with a USD reference.
- A fee table per plan, the FeeCalculator, a comparison table, the FAQ (topics: pricing and taxes) and a CTA.
- Any change needs Head of Marketing approval (§12.3).

**Fee calculator:**
- Amount and currency in; reais out, with the rate, the fee and the arrival day.
- Rates come from a JSON file of made-up mock rates, labelled as examples.
- Stretch: read the rates from a mock API through a Webflow Cloud secret (DX-16).

**For clients:** how paying through Travessia works, what the invoice looks like, payment methods, security and an FAQ. It's written in English first and translated to PT-BR (the reverse of every other page), which tests V9 in both directions.

**Feature page template:** hero with a scene illustration (V4), problem, how it works (3 steps), benefits, related integrations, FAQ, CTA.

**Integration detail template:** logo, category, status badge, short description, setup steps, related integrations, CTA.

**Story template:** generated cover; facts about the freelancer or studio (craft, city, client countries); challenge → solution → results with metrics; quote; CTA.

**Blog post template:** cover (V1 output), title, author, date, reading time, body, related posts, newsletter CTA.

**Changelog:** reverse-chronological entries grouped by month, filterable by type (new, improved, fixed) and area.

**Webinar campaign page:** hero (V5 output), date with timezone (BRT by default), speakers, agenda, registration form (name and email only), OG image. It switches automatically to a "watch the recording" state after the date.

### 6.3 SEO and AEO basics

- Title, description and OG image per page, all from content fields. OG images are generated (V1, V5).
- `hreflang` alternates; sitemap from `@astrojs/sitemap`, kept for structure even while noindex.
- JSON-LD: Organization, SoftwareApplication (Pricing page), FAQPage, Article (blog), BreadcrumbList.
- Clean heading order. The accessibility View (V6) checks it.
- Optional: `llms.txt` with a short company summary and key URLs.

---

## 7. Content model

All collections are defined in `src/content.config.ts` with typed schemas (zod via `astro:content`). Translations live in per-locale folders, share a filename, and carry a `translationKey`.

### 7.1 Collections

**`blog`** (`blog/{pt-br,en}/*.md`)
- `title` (string, max 90 chars), `excerpt` (string, max 180)
- `publishDate` (date), `updatedDate` (date, optional)
- `author` (reference to `authors`)
- `category` (enum: guides, taxes, getting-paid, product, stories)
- `tags` (string[])
- `cover` (image, written by V1), `coverAlt` (string), `coverRecipe` (path, written by V1)
- `draft` (bool)
- `seo` ({ title?, description? })
- `translationKey` (string)

**`changelog`** (`changelog/{pt-br,en}/*.md`)
- `title` (max 70), `date` (date)
- `type` (enum: new, improved, fixed)
- `areas` (enum[]: invoices, payments, exchange, pix, tax-invoices, reports, app)
- `summary` (max 160), body (markdown)
- `image` (optional, with `imageAlt`)
- `translationKey`

**`integrations`** (`integrations/{pt-br,en}/*.md`)
- `name`, `slug`
- `logo` (svg path, written by the logo generator or uploaded)
- `category` (enum: freelance-platforms, invoicing, time-tracking, accounting, payments, productivity)
- `status` (enum: live, beta, coming-soon)
- `shortDescription` (max 140), body
- `setupSteps` ({ title, detail }[]); note that V3's feedback loop (H-11) restructures this field
- `docsUrl` (url, optional)
- `featured` (bool)
- `sphere` ({ weight: number, include: bool }), used by the logo sphere
- `translationKey`

**`features`** (`features/{pt-br,en}/*.md`)
- `name`, `tagline`, `problem`
- `steps` ({ title, detail }[])
- `benefits` (string[])
- `scene` (path to a V4 scene recipe)
- `faqTopic`, `order`, `translationKey`

**`customers`** (`customers/{pt-br,en}/*.md`)
- `name` (freelancer or studio, made up), `craft` (enum: design, development, translation, video, writing), `city`, `teamSize`, `clientCountries` (string[])
- `person` ({ name, role, photo? }), `quote`
- `metrics` ({ label, value }[])
- `challenge`, `solution`, `results` (markdown sections)
- `cover`, `coverAlt`, `coverRecipe`
- `featured`, `translationKey`

**`events`** (`events/{pt-br,en}/*.md`)
- `title`, `date` (datetime), `timezone`
- `speakers` ({ name, role, photo? }[])
- `agenda` (string[])
- `registrationUrl` (optional)
- `status` (enum: upcoming, live, recorded), `recordingUrl` (optional)
- `heroRecipe`, `ogRecipe` (paths, written by V5)
- `translationKey`

**`faqs`** (`faqs/{pt-br,en}.json`): `{ id, question, answer, topics: (general|pricing|taxes|product|security)[], order }[]`

**`plans`** (`plans.json`)
- `{ id, name: {en, pt-br}, price: { monthly: {brl, usd}, annual: {brl, usd} }, fee: number (conversion fee, %), seats, features: {en: string[], pt-br: string[]}, highlight: bool, cta: {en, pt-br}, order }[]`

**`authors`** (`authors.json`): `{ id, name, role: {en, pt-br}, avatar, bio: {en, pt-br} }[]`

### 7.2 Seed content (agent-drafted; you edit both, PT-BR first)

| Collection | PT-BR (default) | EN |
|---|---|---|
| blog | 6 posts (e.g. how to receive as MEI, carnê-leão explained, invoicing a US client) | 3 posts (the rest show as "missing" in V9 on purpose) |
| changelog | 12 entries over 3 months | 12 |
| integrations | 20 (made-up names, generated logos) | 20 |
| features | 4 | 4 |
| customers | 4 (a designer, a dev studio, a translator, a video editor) | 4 |
| events | 1 upcoming ("Imposto de renda 2027 para quem recebe do exterior", for tax season), 1 recorded | 2 |
| faqs | 15 | 15 |
| plans | 3 | in the same file |
| authors | 3 | in the same file |

---

## 8. Brand system (`design.md`)

- Source's Brand System view reads and writes `design.md`. The exact format isn't public: the stream showed Markdown sections plus a JSON block for tokens. **Let Source define the format:**
  1. Build the first `src/tokens/tokens.json` and run `npm run tokens` (§5.5.2).
  2. Open the project in Source and ask the Source agent to create `design.md` from `tokens.json`, keeping the same token names.
  3. Fill in the strategic and verbal sections from §4.3.
  4. Check that every section renders in the Brand System view.
- Fill every section: Overview, Rules, Mission, Vision, Strategy, Voice, Vocabulary, Color, Typography, Spacing, Sizing, Shape.
- **Keeping tokens in sync** **[verify]:** edit a colour token in the Brand System view, then check what changes: only `design.md`, or also `tokens.json` / `tokens.css`?
  - If only `design.md` changes: extend `build-tokens.ts` to read the token block in `design.md` and report drift, or let `design.md` become the source (D14). Note the choice here.
  - Either way, one file wins and the other is generated. Never keep two hand-edited copies.
- Example rules for the Rules section:
  - One accent colour per section.
  - Text contrast at least WCAG AA.
  - Sentence-case headings.
  - Never recolour or stretch the logo.
  - Covers and social images only use approved templates (V1, V5).
  - Illustrations only use parts from the kit (V4).
- Generators read token names (e.g. `color.accent.primary`), never hex values. That's what lets "change a token, regenerate everything" work (§9).

---

## 9. Generator architecture (shared by every asset View)

Inspired by Pixel Point's practice: open-ended tools for designers to find the look, locked-down tools for clients to produce on-brand assets.

### 9.1 Principles

1. **One engine, many surfaces.** The engine is plain TypeScript. Three places use it:
   - the Toolcraft lab (explore)
   - the Source View (produce, plus explore for the agency)
   - an Astro component, when a live or animated version belongs on the site
2. **Recipes, not just pixels.** Every output has a `recipe.json` beside it. A recipe can be re-rendered, diffed in git and reviewed.
3. **Tokens only.** Recipes store token names. Change the brand and regenerate.
4. **Explore vs produce.** The agency gets every control. The client gets presets, a short list of brand accents, text fields with length limits, and fixed image-effect options.
5. **Deterministic.** Seeded randomness: the same recipe always gives the same image.
6. **Accessible.** Alt text is required (EN and PT-BR) before saving.
7. **Fast.** Sliders must stay smooth. Follow Toolcraft's performance rules and measure in the View (DX-14).

### 9.2 Engine contract (each `src/lib/generators/<name>/`)

```ts
// index.ts
export const schema;           // zod schema for the recipe
export const defaults;         // default recipe
export const presets;          // approved presets (written by "Save as preset")
export function render(recipe, target, tokens, opts): Promise<void>;     // target = canvas
export function exportImage(recipe, tokens, size, format): Promise<Blob>;
```

### 9.3 Recipe example (cover)

```json
{
  "generator": "cover",
  "version": 1,
  "preset": "guide-split",
  "seed": 48213,
  "palette": { "background": "color.surface.deep", "accent": "color.accent.primary" },
  "text": {
    "pt-br": { "eyebrow": "Guias", "title": "Como receber de clientes no exterior sendo MEI" },
    "en": { "eyebrow": "Guides", "title": "How Brazilian freelancers get paid from abroad" }
  },
  "illustration": { "scene": "rate-locked" },
  "image": null,
  "effect": null,
  "outputs": [
    { "file": "cover-pt-br-1600x900.webp", "size": [1600, 900], "lang": "pt-br" },
    { "file": "cover-en-1600x900.webp", "size": [1600, 900], "lang": "en" },
    { "file": "og-pt-br-1200x630.png", "size": [1200, 630], "lang": "pt-br" },
    { "file": "og-en-1200x630.png", "size": [1200, 630], "lang": "en" }
  ],
  "alt": {
    "pt-br": "Ilustração de uma fatura em dólar convertida em reais",
    "en": "Illustration of a dollar invoice converted into reais"
  }
}
```

### 9.4 Where output goes

- Blog: `src/assets/generated/covers/<translationKey>/{cover-<lang>-1600x900.webp, og-<lang>-1200x630.png, recipe.json}`
- One recipe per post, shared by both languages. Presets with text render one image per language from `text.<lang>`. Text-free presets render a single shared image.
- The View then sets `cover`, `coverAlt` and `coverRecipe` on **both** language entries, each pointing at its own language's image and alt text.
- Campaigns, social and scenes follow the same pattern under `generated/<type>/<id>/`.

### 9.5 Regenerating everything

The "Regenerate all" action in V1 and V5 loops over every recipe, re-renders with the current tokens and rewrites the files. Everything lands as **one reviewable change**. This is the demo moment in H-08.

### 9.6 From explore to produce

1. Explore in the Toolcraft lab (`tools/cover-lab`), or in the View's agency mode.
2. "Save as preset" writes to `src/lib/generators/<name>/presets.json`. It's a reviewed change, so only approved presets reach clients.
3. Client mode only offers presets.

---

## 10. Custom Views

Each spec lists the persona, the job, what the View reads and writes, its controls, guardrails, how to build it, and when it's done. Build methods deliberately alternate between the **View Builder** (inside Source) and **Claude Code + Source CLI** so you can compare them (DX-09, DX-10).

### Priorities

| ID | View | Priority | Main persona | Build method |
|---|---|---|---|---|
| V1 | Blog Cover Studio | P1 | Content marketer | Toolcraft lab for the engine → Claude Code + Source CLI for the View |
| V2 | Changelog Composer | P1 | Content marketer | View Builder only |
| V3 | Integrations Manager (+ logo sphere tuner) | P1 | Growth marketer | Claude Code + Source CLI |
| V4 | Illustration Kit & Scene Composer | P2 | Brand designer → marketers | Claude Code + CLI, refined with View Builder |
| V5 | Campaign Kit | P2 | Growth marketer | View Builder, reusing the V1 engine |
| V6 | Site Health (components + accessibility/SEO/AEO audit) | P2 | Agency, Head of Marketing | View Builder |
| V9 | Translation Desk | P2 | Content marketer, Head of Marketing | View Builder |
| V7 | Brand Visual Lab | P3 | Agency, brand designer | Toolcraft lab → View |
| V8 | Section Tuner | P3 | Brand designer, agency | Claude Code + CLI |

### V1: Blog Cover Studio (P1), the one to build first

- **Job:** "I wrote a post and need an on-brand cover in 2 minutes, without Figma."
- **Reads:** the `blog` collection (both languages), `presets.json`, tokens from `src/tokens/tokens.ts` (generated, D14), the illustration kit (V4) once it exists.
- **Writes:**
  - `src/assets/generated/covers/<key>/*` (cover, OG image, recipe)
  - `cover`, `coverAlt` and `coverRecipe` on both language entries
- **Layout:**
  - Left: a post picker (search, plus filters for "missing cover" and "outdated recipe").
  - Centre: the canvas at real size, with toggles to preview it **on the blog card and on the post page**.
  - Right: the controls.
- **Client controls:**
  - Preset (5–6 templates: text only, split with illustration, photo with effect, quote, data highlight)
  - Accent (3–4 brand accents, shown as swatches)
  - Eyebrow (filled from the category)
  - Title per language (filled from each entry, max 60 characters, with a fit warning for each)
  - Illustration scene (from V4), or an uploaded image with a fixed effect (duotone, halftone, grain)
  - Alt text in PT-BR and EN (required)
- **Agency controls (explore mode):** every engine parameter, "Save as preset", and "Regenerate all".
- **Guardrails:**
  - Tokens only. A save is blocked without alt text or if the title overflows.
  - Shows a before/after diff of changed fields and images before saving.
  - Saves go through Source's review step.
- **Done when:**
  - [ ] Caio makes a cover for a new post in under 2 minutes (H-02).
  - [ ] Files and frontmatter update in one save (DX-12).
  - [ ] Changing a token, then "Regenerate all", updates every cover in one change (H-08).
  - [ ] The recipe re-renders the exact same image.
- **Source features tested:** writing binary files from a View, canvas/WebGL performance, image changes in review, the explore/produce split, and (later) per-View access.

### V2: Changelog Composer (P1)

- **Job:** "Ship today's release notes in both languages in 5 minutes."
- **Reads:** the `changelog` collection. Optional: a pasted list of PR titles or commits.
- **Writes:** new entries in `changelog/pt-br` and `changelog/en`.
- **Controls:**
  - Type (new, improved, fixed), areas, title (max 70), summary (max 160), body, optional image.
  - An "Ask the agent to draft from the PR list" button.
  - "Translate to EN" (the agent drafts it; you review).
- **Preview:** the entry exactly as it appears on `/changelog`, in both languages.
- **Guardrails:** both languages are required before publishing; voice check against Vocabulary (warn on banned words).
- **Done when:** H-01 runs end to end with no code touched.
- **Tests:** the View Builder alone (no CLI), agent actions inside a View, and the simplest daily handoff job.

### V3: Integrations Manager and logo sphere tuner (P1)

- **Job:** "Add or update an integration, and see it on the site before it goes live." This copies the Product Navigator View from the 2 Nov merch-store stream.
- **Reads:** the `integrations` collection, logo files, and the logo sphere settings.
- **Writes:** integration entries (both languages), logos (uploaded, or made by the logo generator), and the sphere settings file.
- **Layout:** searchable list with status badges on the left; a form in the centre; a live preview of the detail page **and** the home bento sphere on the right.
- **Flow:** edit → save draft → **before/after diff** → publish. Copy Diego's diff step from the stream.
- **Sphere tuner (agency/designer):** density, logo size, gap, rotation speed, tilt, and shadow. Saves to the component's settings and previews the bento card live.
- **Stretch:** read from a mock external API ("partner directory") through a Webflow Cloud secret (DX-16).
- **Done when:** H-04 passes, and H-11 restructures the `setupSteps` editing UI from client feedback through the View Builder.
- **Tests:** catalog editing, drafts and diffs, one data set driving two surfaces, and evolving a View from feedback.

### V4: Illustration Kit and Scene Composer (P2), for the "complex illustrations" case

- **Job (designer):** "Add a new part to the illustration kit so marketers can use it."
- **Job (marketer):** "Make a feature-page or cover illustration from approved parts."
- **Kit:**
  - SVG parts in `src/assets/illustration-kit/<category>/<part>.svg`, with a `kit.json` manifest.
  - Each part declares: id, name, tags, recolourable fills (bound to token names), anchor points, allowed scale range, and z-order hints.
  - Categories:
    - UI cards (invoice, balance, rate, Pix-style arrival notice with no Pix logo)
    - devices
    - money and documents (abstract coins, nota fiscal, receipt; no real banknotes)
    - geography (river segments, route arcs, globe, boat)
    - symbols (check, clock, arrow)
    - shapes
- **Composer:**
  - Canvas with snapping and a grid; the parts library on the left; layers on the right.
  - Per-part controls: position, scale (within limits), rotation, and colour role.
  - Scene presets (e.g. "invoice-paid", "rate-locked", "reais-arrived", "tax-ready", "river-crossing").
  - Saves `scene.json` plus an SVG export. Covers (V1) and feature pages read scenes by id.
- **Guardrails:** only kit parts are allowed; colours are tokens only; parts can't be distorted (aspect ratio is locked).
- **Done when:** H-09 passes. A scene placed in V1 renders identically on the feature page.
- **Tests:** a heavier editing UI inside a View, SVG writing, and reuse across Views.

### V5: Campaign Kit (P2)

- **Job:** "Launch the webinar: landing page hero, OG image and social posts, all matching."
- **Reads:** the `events` entry and the V1/V4 engines.
- **Writes:**
  - hero and OG recipes and images
  - social sizes: 1200×630 (link), 1080×1080 and 1080×1350 (feed), 1920×1080 (video cover)
  - the event entry's `heroRecipe` and `ogRecipe`
- **Controls:** a campaign preset; title, date and speakers pulled from the event; accent; scene; per-size layout checks.
- **Done when:** H-05 passes, run inside a **nested project** ("Q1 webinar" inside "Travessia site").
- **Tests:** one recipe producing many outputs, nested projects, and the agent creating a page from a brief.

### V6: Site Health (P2)

- **Job (agency):** "Know where the site is drifting." **Job (Head of Marketing):** "Is anything broken or off-brand?"
- **Panels:**
  1. **Component inventory:** each component, its instances per page and its variants, rendered live. Also flags pages built without components.
  2. **Accessibility:** headings, alt text, landmarks, contrast. Group by page or by issue, and re-scan.
  3. **SEO/AEO:** missing meta, missing OG image, `hreflang` pairs, JSON-LD present and valid, FAQ coverage.
  4. **Generated assets:** recipes older than the current tokens ("outdated"), and images without alt text.
- **Done when:** it catches the problems planted in DX-18.
- **Tests:** Views that audit rather than edit. This copies Matthew's accessibility View from the first stream.

### V9: Translation Desk (P2)

- **Job:** "Which content is missing or outdated in EN (or, for the For clients page, in PT-BR), and how do I fix it?"
- **Reads:** every collection and `i18n/*.json`, matched by `translationKey`.
- **Shows:** a table of entry × language with a status for each (missing, outdated (the source language changed after the translation), or OK. The source language is PT-BR, except for the For clients page.). Opening a row shows both languages side by side.
- **Actions:** "Draft translation" (the agent uses Vocabulary), then edit and save.
- **Done when:** H-07 clears every "missing" item seeded in §7.2.
- **Tests:** agent localization, comparing content across collections, and a View aimed at the Head of Marketing.

### V7: Brand Visual Lab (P3)

- **Job (agency or brand designer):** "Find and lock Travessia's signature visual": two-tone flow lines that run side by side and slowly merge, like the Encontro das Águas (§4.3).
- **Inputs:** seeded rules (line count, spacing, turbulence, how long the two colours stay apart, where they meet). Optionally, simplified public-domain river geometry (Natural Earth) for the Negro and Solimões.
- **Client mode:** pick a preset, an accent, an aspect ratio and a crop, then export. This is the same idea as the Amazônia brand's public type tool.
- **Approach:**
  1. Build it as a Toolcraft app first, with a reference and a prompt in the style of Pixel Point's case studies.
  2. Move the engine to `src/lib/generators/signature/`.
  3. Wrap it in a View.
- **Outputs:**
  - Still images for hero backgrounds
  - Presets saved for clients
  - Optionally, an Astro component that renders it live on the home hero
- **Tests:** how heavy a WebGL or shader UI a View can carry (DX-14), and whether Toolcraft components can run inside a View (DX-11).

### V8: Section Tuner (P3)

- **Job:** "Tune an interactive section on the real page, then save the settings." For example, the logo sphere's motion, a hover effect on the testimonials, or a section's Motion settings (stagger, spring, scroll offsets) that the helpers in `src/lib/motion/` read (§5.6.2).
- **How:** the View renders the real section with sliders bound to its settings. "Save" writes them to the section's settings file, and the change goes through review.
- **Tests:** Pixel Point's "design it directly on the site" pattern inside Source.

---

## 11. Agents and skills

### 11.1 Try what exists now

- **Source agent:** scaffold pages from briefs (use plan mode first), translate a page, fix issues the audits find.
- **View Builder:** create V2, V6 and V9, and evolve V3 (H-11).
- **AEO:** if your build has the AEO View or agent, try it on Pricing and the compare pages.
- **Inbox:** note what the agents surface without being asked.
- **Project skills:** does the Source agent pick up `.agents/skills` **[verify]**? If not, attach the skills in the session or add them through Settings.

### 11.2 Custom agents to create when they ship

| Agent | Trigger | Does | Output |
|---|---|---|---|
| Brand Voice Reviewer | Before a blog post or changelog entry is submitted for review | Checks against Voice, Vocabulary and Rules | Comments, or a list of suggested edits |
| Changelog Writer | A PR list is pasted, or a merge to `main` | Drafts EN entries grouped by type and area | Draft entries in V2 |
| Localizer | A missing or outdated item in V9 | Drafts the missing language (usually EN) using Vocabulary | A draft for human review |
| Cover Assistant | A post is saved without a cover | Suggests a preset and scene from the post | A pre-filled V1 recipe |
| Release Guard | Before publishing | Runs the V6 checks on changed pages | Blocks, or warns |

### 11.3 Project skills to add (in `.agents/skills/`)

With no framework, these skills carry the house conventions. Write the first three in Phase 1.

- `add-component`: where it goes, typed `Props`, scoped styles with semantic tokens, variants as `data-*`, the `/styleguide` entry, lint.
- `add-token`: edit `tokens.json`, run `npm run tokens`, check contrast, update `design.md`.
- `build-section`: compose sections from the `l-` primitives and UI components; content from collections or i18n; both languages.
- `generate-cover`: how to create or regenerate covers with the engine and save recipes.
- `add-integration`: the fields, logo rules and both languages.
- `translate-entry`: Vocabulary, tone, and what stays in English (product names, feature names).

---

## 12. Personas and access (the made-up client team)

### 12.1 Personas

| Persona | Role | Uses Views | Main jobs |
|---|---|---|---|
| **Helena** | Head of Marketing (approver) | Inbox, Review, Site Health, Translation Desk | Approves pricing, home and nav changes; watches site health |
| **Caio** | Content marketer | Content, Cover Studio, Changelog Composer, Translation Desk | Blog, changelog, translations |
| **Bruna** | Growth marketer | Campaign Kit, Integrations Manager, AEO, Site (limited) | Campaigns, integrations, AEO fixes |
| **Tomás** | Brand designer (client side) | Brand System, Brand Visual Lab, Illustration Kit (explore), Section Tuner | Brand tokens, kit parts, presets |
| **You** | Agency developer | Everything + code | Views, guardrails, releases, support |

### 12.2 Accounts

If the preview lets you invite teammates **[verify]**, create one account per persona with plus-addresses on your own email (e.g. `you+helena@…`). If not, play all the roles from one account, label each session with the persona, and note in the journal where real access control would have mattered.

### 12.3 Guardrail matrix (target; enforce when roles ship)

| Change | Who can make it | Ships automatically? | Approval needed from |
|---|---|---|---|
| Changelog entry (both languages) | Caio, You | Yes, once the voice check passes | — |
| Blog post (new or edited) | Caio | No | Helena |
| Cover or social image from a preset | Caio, Bruna | Yes (on a post that is still a draft) | Helena reviews with the post |
| New preset or scene part | Tomás, You | No | You (code review) |
| Brand token change | Tomás | No | You + Helena |
| Integration entry | Bruna | No | Helena (status changes); You (logos) |
| Campaign page | Bruna | No | Helena |
| Pricing, home or navigation | Helena, You | No | Helena + You |
| Translation (EN, or PT-BR for For clients) | Caio, the Localizer agent | No | Caio reviews agent drafts |
| Fictional-company banner and form fields (D18) | You only | No | You |
| Code, components, Views | You | No | Self-review via PR |
| Fixes from agents (Inbox) | Agents | Low risk (alt text, meta): yes. Everything else: no | Owner of the area |

---

## 13. Developer-experience test plan

Log results in `docs/journal.md`. "Expected" describes the happy path; anything else is a finding.

| ID | Test | How | Expected |
|---|---|---|---|
| DX-01 | Local session | Open the folder in Source | It detects Astro, and the preview runs |
| DX-02 | Cloud session | Connect the GitHub repo | Same project, no local setup |
| DX-03 | External agent → Source | Edit a section in Claude Code | Source's preview updates |
| DX-04 | Visual edit → code quality | Change type, spacing and colour in the Site view, apply, read the git diff, run `npm run lint:css` | Edits land in the component's scoped style using our tokens; no inline styles, raw values or new framework-style classes; lint passes |
| DX-05 | Stage → Review → Apply | Make 3 visual edits, review, apply 2, discard 1 | Only the applied edits are written |
| DX-06 | Code mode | Change a component prop in code mode | Written straight to the file; preview updates; no agent involved |
| DX-07 | Brand tokens | Change an accent in the Brand System view | `design.md` changes; CSS sync behaviour noted (§8) |
| DX-08 | Content view | Open collections | Read-only, as reported; banner wording noted |
| DX-09 | View Builder | Build V2 from a prompt | A usable View in a few sessions |
| DX-10 | Source CLI | Build V3 with Claude Code + the CLI | Scaffold from the CLI; last-mile fixes in Source |
| DX-11 | Toolcraft inside a View | Try mounting one Toolcraft control or canvas in a View | Works, or you're told to use Blueprint (record which) |
| DX-12 | Writing files from a View | One V1 save | Images + recipe + frontmatter in one change |
| DX-13 | Image changes in review | Review a regenerate-all change | Images show before/after (record how) |
| DX-14 | Performance | Drag V1/V7 sliders | Smooth (aim for 60 fps on simple presets) |
| DX-15 | Shipping | Publish to the GitHub branch → Webflow Cloud | Live URL; deploy time noted |
| DX-16 | Secrets + API | Store a Webflow Cloud secret; call a mock API from V3 | Key never reaches the browser |
| DX-17 | Project skills + conventions | Ask the Source agent to build a new Testimonial variant using `add-component` | Skill recognized (or the workaround noted); result follows §5.5 without being reminded |
| DX-18 | Break it on purpose | As Bruna, remove the analytics snippet and a JSON-LD block | V6 or review catches it; rollback path noted |
| DX-19 | Conflict | Edit the same component in Claude Code and in Source | Conflict surfaced (record how it's resolved) |
| DX-20 | Localization | Ask the Source agent to translate Pricing to EN, then translate the For clients page from EN to PT-BR | Correct localized routes, `hreflang` + `x-default`, Vocabulary respected, Pix/MEI/nota fiscal kept in Portuguese |
| DX-21 | Sharing a View | Share V1 with a second account (when shipped) | The other account gets updates |
| DX-22 | Audit trail | After H-script, inspect who or what changed what | Human and agent changes attributed |
| DX-23 | Islands in the Site view | Select and restyle FeatureTabs in the Site view, then ask the Source agent to change its layout | Record whether Source can select inside a React island and where edits land (CSS Module, tokens, lint passes) |
| DX-24 | Base UI accessibility | Keyboard only, then VoiceOver, through MainNav, MobileNav, FeatureTabs, the SignupForm select and combobox, FeeCalculator and the toast | No focus traps; focus returns on close; roles and announcements are correct |
| DX-25 | Motion through the agent | Ask the Source agent: "make the stats count up more slowly and stagger the feature cards" | Edits the Motion helpers or `data-*` attributes using motion tokens; reduced motion still works |
| DX-26 | Library swap cost | Swap `motion` for `motion/mini` in one helper, and swap PlanTooltip from Tooltip to Popover | Only the wrapper changes; bytes before and after recorded |
| DX-27 | CSS vs Motion | Animate MobileNav with Base UI's enter/exit attributes, then with Motion | Bytes, code size and feel compared; one approach chosen and noted in §5.6 |

---

## 14. Handoff simulation

### 14.1 Setup

1. Create Source projects: **Travessia site** (the main goal and brief: §1, §4), with **Q1 webinar** nested inside it.
2. Set up personas (§12.2). Save each persona's Views in their sidebar.
3. Write a one-page quick guide per persona *before* the run (§14.4), then test whether the guide alone is enough.

### 14.2 Script

Run each task as the persona, using only their Views. Don't open code unless the task says to.

| ID | Persona | Task | View(s) | Done when |
|---|---|---|---|---|
| H-01 | Caio | Publish this week's changelog (3 entries, PT-BR + EN) | V2 | Live on `/changelog` in both languages |
| H-02 | Caio | Draft a blog post with the agent, make its cover, submit for review | Session, V1 | Post + cover in review |
| H-03 | Helena | Review and approve H-02; check the diff and the cover in context | Review | Published |
| H-04 | Bruna | Add a new integration with a logo; check the sphere | V3 | Detail page and sphere updated |
| H-05 | Bruna | Launch the webinar page and social images inside the Q1 webinar project | V5, Session | Page live, OG checked, social files ready |
| H-06 | Bruna | Act on one AEO recommendation (if available) | AEO / Inbox | Fix applied and reviewed |
| H-07 | Caio | Clear the missing EN blog posts | V9 | No "missing" rows left |
| H-08 | Tomás → You → Helena | Change the primary accent; regenerate all covers; approve | Brand System, V1 | One change; every cover updated |
| H-09 | Tomás → Caio | Add a new kit part; Caio uses it in a cover | V4, V1 | Part available and used |
| H-10 | Helena | Change a price on Pricing | Site | Needs approval (once roles ship); until then, note that it would |
| H-11 | You | Client feedback: "editing integration setup steps is awkward." Restructure the V3 form with the View Builder. | Session, V3 | Bruna sees the new form without reinstalling |
| H-12 | Helena | Leave a canvas comment on the home hero; it becomes an agent task | Site, Inbox | Change drafted for review |

### 14.3 What to watch for

- Where a persona needed you (each one is a handoff failure).
- How many clicks or minutes each task took. Compare that with how you'd do it on classic Webflow plus Figma.
- What the persona could see that they shouldn't (each one is a guardrail gap).
- Whether the agent's work was on brand without being corrected.

### 14.4 Handoff deliverables (in `docs/handoff/`)

- [ ] One-page quick guide per persona: their Views, their jobs, what needs approval
- [ ] A short recorded walkthrough per persona (≤ 5 min each)
- [ ] View catalog: each View's purpose, owner, version and change log
- [ ] Guardrail matrix (§12.3) as delivered
- [ ] "How covers and illustrations work": presets, scenes, regenerating
- [ ] Rollback and emergency procedure
- [ ] Ownership-transfer checklist: workspace, repo, Webflow Cloud, secrets, domains **[verify how Source transfers ownership]**

---

## 15. Phases and timeline (about 3½ weeks of part-time work)

| Phase | Days | Scope | Exit |
|---|---|---|---|
| 0. Setup | 1 | `npm create astro@latest -- --template minimal`, add the integrations and tooling (§5.1), git, public GitHub repo (D5), add this spec, `AGENTS.md` rules, open in Source (DX-01/02), Webflow Cloud "hello world" deploy (DX-15), noindex | Live URL from Source |
| 1. Foundation (by hand) | 2–5 | `tokens.json` + `build-tokens.ts` (including motion tokens), the CSS layers, layout primitives, Stylelint, BaseLayout, header, footer, UI components, MainNav + MobileNav (first Base UI islands), the Motion reveal helper, `/styleguide`, i18n routing, the first project skills (§11.3), then `design.md` via Source (§8) | `/styleguide` shows every token and UI component; lint passes; nav passes DX-24; React's runtime cost recorded; Brand System view complete; EN/PT-BR routing works |
| 2. Content and pages | 6–8 | Collections + schemas, seed content, section components, all page templates, the remaining islands (§5.6.1) and Motion uses (§5.6.2), SEO/JSON-LD | Every route renders in both languages; DX-23 to DX-27 run |
| 3. P1 Views | 9–13 | Cover engine in the Toolcraft lab → V1; V2 with the View Builder; V3 with the CLI | V1–V3 meet their "done when" checks |
| 4. P2 Views + agents | 14–16 | V4, V5, V6, V9; the agents available now (§11.1) | Ready to run H-01 to H-12 |
| 5. Handoff simulation | 17–18 | §14 end to end; deliverables | Every H-task logged |
| 6. Retro and verdict | 19 | Journal review, feedback to Webflow, the one-page verdict | Verdict written |
| 7. Next milestone | when it ships | Move `integrations` into the agentic CMS; enforce the guardrail matrix with roles; share Views (DX-21); create custom agents (§11.2); re-run H-script | Comparison: before vs after |

P3 Views (V7, V8) fit in whenever there's time. They are the fun stretch, not the critical path.

---

## 16. Test journal (`docs/journal.md`)

### 16.1 Log format

| Date | Area | What I tried | Expected | What happened | Severity (blocker/major/minor/nice) | Feedback sent? |
|---|---|---|---|---|---|---|

### 16.2 Feedback template for Webflow

```
Title:
Build / milestone:
Area: (Site view, Views, View Builder, CLI, Brand System, Content, Publish, ...)
Steps:
Expected:
Actual:
Screen recording:
Why it matters for agencies/clients:
```

### 16.3 Phase entry (end of every phase)

- What worked better than classic Webflow or my usual Claude Code setup?
- What was worse or missing?
- What would I charge a client for?
- What changed in the preview since the last entry?

---

## 17. Open questions [verify]

1. Where does Source store custom Views in the repo, and are they plain files you can review in git?
2. Do Views have to use Blueprint UI, or can they mount any React (Toolcraft, Base UI, Motion, three.js, shaders)? (DX-11)
3. Can one View action write binary files *and* update content fields in one change? (DX-12)
4. How do image changes appear in Source's review step and in the GitHub PR? (DX-13)
5. Does editing tokens in the Brand System view update the CSS, or only `design.md`? (§8)
6. What's the branch name and flow for "publish to the app's branch", and who can deploy to Webflow Cloud?
7. Can you invite extra accounts in the preview (for personas)?
8. Does the Source agent load `.agents/skills` from the repo?
9. What does Webflow Cloud need in an Astro project (adapter, config file, base path), and does Source add it on first publish?
10. How will the agentic CMS coexist with Astro collections, and is there a migration path from files?
11. How does workspace and project ownership transfer to a client?
12. Is there a View marketplace or install flow yet (Webflow mentioned "publish once, install on every project")?
13. Can the Site view select and style elements inside React islands, or only `.astro` markup? (DX-23)
14. When the GSAP interactions panel ships, does it only touch GSAP code, and does it get in the way of Motion animations already in the project?

---

## 18. Risks and how to handle them

| Risk | Mitigation |
|---|---|
| Preview builds change or break mid-project | Note the build or milestone with every journal entry; keep work in git; don't fight a broken feature, log it and move on |
| Generator scope creep (the fun part eats the project) | Time-box V1 to 3 days; P3 Views are optional |
| The hand-built CSS system eats the schedule | Build only what §5.5.4 lists, in Phase 1, time-boxed to 4 days. Add components when a page needs them, not ahead. |
| Source's visual editor fights the conventions (inline styles, new classes, raw values) | That's a finding, not a failure: log it under DX-04, tighten `AGENTS.md` and the skills, and re-test |
| Binary assets bloating the repo | WebP/AVIF at fixed sizes; keep only the current outputs (recipes keep history) |
| Two languages doubling the content work | Seed EN selectively (§7.2); let V9 + the Localizer handle the rest |
| A made-up fintech mistaken for a real one, or for a scam | D18: banner on every page, no sensitive form fields, forms post nowhere, noindex; check the name (D2) before sharing the URL |
| Fintech and tax copy read as real advice | Proof points and rates are labelled as examples; tax posts end with "talk to your accountant"; nothing claims a licence or a partner bank |
| Missing roles make the handoff feel fake | Role-play and log where enforcement mattered; re-run in Phase 7 |
| Made-up brand accidentally matching a real company | Check names before anything goes public; keep noindex |
| JavaScript creep from islands and libraries | Islands only where §5.6.1 lists them; JS per page recorded every phase; `motion/mini` where it's enough |
| Library churn mid-project (Base UI and Motion release often) | Pin exact versions; upgrade at most once per phase, in its own commit, with a journal line |

---

## 19. References

- Webflow: [Introducing Source by Webflow](https://webflow.com/blog/introducing-source-by-webflow) (2 Sep 2026)
- Webflow: [Source Notes: updates from the research preview](https://webflow.com/blog/source-notes) (28 Oct 2026)
- Webflow: [Source sign-up and livestream hub](https://webflow.com/source) · [livestreams](https://webflow.com/source/livestreams)
- Livestream: [View Source: Building with the Source research preview](https://www.youtube.com/live/7SSjF_Fq09E) (27 Oct 2026). Covers: terminology at 5:46; app tour at 8:23; Content, Brand and Site views at 13:28; Component Navigator View at 18:58; accessibility and component Views at 22:20; icon builder and social graphics at 28:27; shader logo tool at 31:02.
- Livestream: [View Source: Building Webflow's Merch Store](https://www.youtube.com/watch?v=lggz1NlytE0) (2 Nov 2026). Covers: agentic CMS at 9:35; who Source is for and handoff at 12:54; shop rebuilt on Astro at 24:55; Product Navigator View at 29:29; evolving a View live at 36:25; governance at 41:09; Lumos and Claude Q&A at 45:31.
- CSS system: [Astro styling](https://docs.astro.build/en/guides/styling/) · [cascade layers (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) · [Every Layout](https://every-layout.dev/) (layout primitives) · [Utopia](https://utopia.fyi/) (fluid type and space) · [Design Tokens format (W3C community group)](https://www.designtokens.org/) · [Stylelint](https://stylelint.io/)
- Pixel Point: [Build personal design tools with AI using Toolcraft](https://pixelpoint.io/blog/how-to-craft-personal-design-tools-with-toolcraft/)
- Toolcraft: [site and case studies](https://toolcraft.sh/) · [GitHub](https://github.com/pixel-point/toolcraft). Relevant case studies:
  - [procedural brand graphics](https://toolcraft.sh/case-studies/procedural-brand-graphics)
  - [signature brand visual](https://toolcraft.sh/case-studies/signature-brand-visual)
  - [rotating logo sphere](https://toolcraft.sh/case-studies/rotating-logo-sphere)
  - [interactive call to action](https://toolcraft.sh/case-studies/interactive-call-to-action)
  - [Neon iceberg reel](https://toolcraft.sh/case-studies/neon-iceberg)
- Pixel Point: [Neon case study](https://pixelpoint.io/case-studies/neon/)
- Astro: [content collections](https://docs.astro.build/en/guides/content-collections/) · [internationalization](https://docs.astro.build/en/guides/internationalization/) · [islands](https://docs.astro.build/en/concepts/islands/) · [client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)
- Libraries: [Base UI](https://base-ui.com/) (see its styling and animation guides) · [Motion](https://motion.dev/) (plain JS and React docs)
- Brand inspiration: the Amazônia territorial brand by FutureBrand São Paulo for RAI and Embratur. Write-ups: [PRINT](https://www.printmag.com/branding-identity-design/how-do-you-brand-a-living-ecosystem-brazils-new-amazon-identity-offers-an-answer/) (1 May 2026) and [VIVA](https://viva.com.br/cultura-e-lazer/amazonia-ganha-marca-com-tipografia-criada-a-partir-das-coordenadas-de-rios.html) (10 Apr 2026). These explain the river-curve type and the public type tool.
- Data and checks: [Natural Earth](https://www.naturalearthdata.com/) (public-domain river geometry for V7) · [INPI](https://www.gov.br/inpi/) (Brazilian trademark search, D2)
