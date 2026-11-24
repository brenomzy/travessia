# Travessia brand system: brief

> **Status:** v0.3 · 2026-11-19 · Owner: Breno Daroz
> **What this is:** the main brief for Travessia. It turns the Travessia brand into a working system: context, approved examples, layouts, skills and checks that produce on-brand decks, one-pagers, landing pages, campaigns and product graphics on request. `SPEC.md` is the spec for the website itself; where the two disagree, this file wins.
> **v0.2:** decisions from the 2026-11-18 grilling session (§11). The earlier site-builder test is dropped, the site becomes English-only, Slack moves to Phase 6, and the brief gains approved examples, a gaps log and a consolidation phase.
> **v0.3:** Phase 1 becomes "Brand build and consolidation": the whole brand (strategy, messaging, voice, proof, identity, photography, motion, a launch campaign) is built and polished before the system encodes it, following `docs/brand-building-playbook.md`, with Ramp as the structural reference. Colour primitives will be named after Brazilian rivers and natural products (§11).
> **Origin:** Paul Jun, "Brand as software", part 1 (Sep 2026, https://pauljun.substack.com/p/brand-as-software) and part 2 (https://x.com/PaulJun_/status/2122714711095468195), which describes Ramp Creative, Ramp's internal Slack agent. Brainstorm notes: `~/Projects/Lab Ideas/context/memory/brand-as-software.md`.

---

## 1. Goals

1. **A public example of a service.** Breno offers "brand engineering" as a designer who also builds: he turns a company's brand into a system its whole team can use for repeatable work. Travessia is the detailed example on his site. It is not a product: no accounts, no hosting for others, no billing.
2. **Practise both roles.** Art direction (references, direction, choosing, the quality bar) and building the system (skills, engine, checks).
3. **A case study that sells the service** (§9), with honest numbers.

### Done when (v1 = Phases 0–3)
- [ ] A brief given as a message in Claude Code produces a deck (HTML and PDF) that passes the checks in §7 and needs no layout fixes.
- [ ] The 12-brief test set (§7.3) has been run, with the first-pass approval rate recorded, failures included.
- [ ] The same system produces a one-pager and a landing page inside the site.
- [ ] A rejected output becomes a rule, a fix, an approved example or a test case, and the test set shows the failure no longer happens.
- [ ] Changing a token or a mode definition and running one command regenerates every saved output in one reviewable change, with no Claude call.
- [ ] The case study is on Breno's portfolio and the `/brand` page is live on the Travessia site.

### Later (Phases 4–6)
Campaign and social kit, product graphics, the Slack bot, Google Slides export.

### Non-goals
- A product or SaaS.
- Dependence on any site builder. Webflow can be mentioned as a plus in the service pitch, never as a requirement.
- Hand-drawn assets. AI makes the drafts; Breno directs and chooses.
- A real company, real people or real customer data.
- Portuguese. The site and every output are in English.

---

## 2. Who the service is for

- **Main buyer:** Series A–C startups with a small brand team (1–3 designers) buried in requests from sales, marketing and support. The system takes the repeatable work off them so they can spend their time on work nobody has done before.
- **Second fit:** companies with no brand team, often Breno's Webflow clients, whose brand is scattered across old decks, the site, a Figma file and people's heads. The work starts by consolidating it (Phase 1 is the demo of that step), then systemising it.
- **Travessia:** a fictional fintech for Brazilian freelancers who work in English with clients abroad. Same product as before (invoices, nota fiscal, taxes, payouts in reais); the site is English-only. The Brazilian details stay as texture in the brand.

---

## 3. How the work is split

| Role | Who | What it means here |
|---|---|---|
| Art direction | Breno | Collects references, writes the direction, picks from batches of variants, sets the quality bar, approves layouts, examples and rules. |
| Making | AI (Claude, image models, Magnific) | Generates layout variants (~10 per layout, §6), copy, imagery, code. |
| System | Breno + Claude Code | Encodes approved decisions into tokens, templates, examples, skills, the engine and the checks. |
| Requests | Personas | Sales, marketing, support, founder. All played by Breno, with briefs written blind by a subagent (§7.3). |

Rules:
- Nothing becomes part of the system until Breno approves it. Agents can propose layouts, examples and rules; only approved ones are used for requests.
- Breno is the only tester. The case study says so and shows the numbers anyway.

---

## 4. Principles

- **The repo is the source of truth, not the design tool.** Tokens, context, templates, examples, recipes and rules are files in this repo. Paper is where options are explored and approved; Figma (or anything with an MCP) can take its place later.
- **Approved examples, not just templates.** Each format has 2–3 complete, approved outputs the agent reads before it plans. The case study calls them approved examples; people hear "template" as lower quality.
- **Coherence over consistency.** One recognisable centre, three modes (§5.3), each defined by tokens, allowed parts, voice and imagery.
- **Reliability is the price of entry.** An 80% result that someone has to rebuild under deadline is worse than no result. The system refuses what it shouldn't do and flags what it can't do well (§5.6).
- **Failures move upstream.** Every rejected output becomes a rule, a fix, an approved example or a test case.
- **Tokens only.** Recipes store token names, never values, so the whole brand can change and regenerate.
- **The engine knows nothing about Travessia.** Everything brand-specific lives in `brand/`, so the engine and skills can be lifted out for the next client.

---

## 5. The system

### 5.1 Repo layout

| Path | Contents |
|---|---|
| `brand/` | Travessia's brand pack: context files, modes, templates, approved examples, test set, outputs. |
| `src/lib/brand/` | The engine: framework-agnostic TypeScript, no React or Astro imports, no Travessia names, colours, copy or facts. If it needs to know something about the brand, it reads `brand/`. |
| `src/content/landing/` | Landing pages written by the system as content entries (§5.5). |
| `.agents/skills/` | Skills used by Breno in Claude Code (and later by the Slack bot). |

The engine moves to its own repo only when a second client exists.

### 5.2 Context layer (`brand/`)

What the agents know. Plain Markdown, versioned, short enough to load whole.

| File | Contents |
|---|---|
| `brand/sources.md` | Phase 1 output: every source consulted, the claims pulled from each, and the conflicts and gaps found. |
| `brand/references.md` | The reference brand teardowns (Ramp, Wise, Mercury, Nubank, Stripe) in one table. |
| `brand/strategy.md` | Tension, promise, category, beliefs, what Travessia will and won't say. |
| `brand/messaging.md` | The messaging house: promise, platform claim, feature pillars with proof, audiences, the page template in words. |
| `brand/audience.md` | Brazilian freelancers and studios with clients abroad, and those clients: their jobs and objections. |
| `brand/product-truths.md` | What the product does and doesn't do, per feature. The only source for product claims. |
| `brand/proof.md` | Approved numbers and proof points, with where each may be used. |
| `brand/voice.md` | Voice rules and vocabulary, with good and bad examples side by side. |
| `brand/modes.md` | The three modes (§5.3). |
| `brand/imagery.md` | Photography and illustration direction, references, and what imagery each mode allows. |
| `brand/rules.md` | Hard rules the checks enforce (contrast, accents per surface, logo use, lengths), and the graphic language (seam, product UI, charts, icons). |
| `brand/motion.md` | Motion principles, the logo sting, the seam in motion, product UI demos. |
| `brand/campaigns/` | Campaign concepts and executions; loud mode is written from the first one. |
| `brand/corrections.md` | Failures and the rule, fix, example or test case each one produced. |
| `brand/gaps.md` | Requests the system couldn't serve with an approved layout (§5.6), and how each was closed. |
| `brand/templates/` | Approved layouts (§5.4). |
| `brand/examples/<format>/` | Approved examples per format. |
| `brand/evals/` | The test set (§7.3). |
| `brand/outputs/<format>/<id>/` | Saved outputs, each next to its `recipe.json`. One-off requests go to a temp folder. |

Every product truth and proof point links back to its source in `sources.md`.

### 5.3 Modes

Each mode is a short list of rules the system can choose and check: background tokens, number of accents, allowed template parts, type sizes, voice rules and imagery. A mode is written down the first time an output needs it, not up front.

| Mode | Used for | Visual | Voice | Imagery | Defined in |
|---|---|---|---|---|---|
| Quiet | Decks, investor updates, sales and support one-pagers | White background, text first, one small igarapé accent, no seam texture, no illustration | Headlines state facts; every number has a source; no exclamation marks | Product UI, charts from `proof.md`. No photography. | Phase 2 |
| Standard | Feature one-pagers, landing pages, product graphics | Close to the site: seam texture band, one accent per surface, product UI vignettes | To be defined | Product UI, seam textures | Phase 3 |
| Loud | Launches, campaigns, social | Rio-negro or urucum fields, large type, the paintings and photographs (no illustration or 3D, step 10), motion allowed | Short imperative headlines allowed; one claim per surface | AI photography of Brazilian rivers and their crossings (step 9, `brand/imagery.md`). Never a face presented as a customer. | Phase 4 |

### 5.4 Templates and approved examples

- Each template has named slots with types and length limits (title max N characters, 3–5 bullets, one image of a given ratio) and lists the modes it supports.
- Location: `brand/templates/<family>/<name>/` with `template.html` (or a TS render function), `schema.ts`, a preview PNG, and `source.json` naming the Paper frame and the approval date.
- Families: deck slides (~8 layouts), one-pager (2), then social sizes and product graphic frames in later phases.
- Approved examples are complete outputs (recipe plus render) in `brand/examples/<format>/`. Outputs from the test set that Breno approves on the first pass can be promoted there.

### 5.5 Engine

```
brief (a message, Markdown, pasted Google Doc text)
  → plan      Claude: output type, mode, layout sequence; flags missing info; refuses or flags (§5.6)
  → recipe    Claude: fills slots from brand/ only, following the approved examples
  ─── everything below is a CLI, no Claude involved ───
  → validate  recipe against the template schemas
  → render    HTML with tokens
  → export    PDF (headless browser); PNG previews
  → check     §7.1; a failure goes back to the plan step once, then to Breno
```

- Claude does only the judgment steps (plan and recipe). The skills call the CLI: something like `npm run brand -- render|export|check <recipe>` and `npm run brand -- regen` to rebuild every saved output after a token or mode change.
- **Editing in v1** means changing the recipe (plain text fields) and re-rendering; the checks run again. The case study says this works for someone in Claude Code, not for a salesperson. PPTX and Google Slides come later.
- **Landing pages** are content entries in `src/content/landing/<slug>.md`: a list of sections and their fields. One Astro route renders them with the site's existing section components. A section catalogue lists each section with typed fields so Claude can choose from it the way it fills deck slots. The site's `check`, `lint:css` and `build` become checks for free.

### 5.6 Requests outside the system

- **Hard refusal**, with a reply that sends it to Breno: brand-defining work (a new logo, a campaign idea, a new identity) and claims with nothing in `proof.md` behind them.
- **Flagged draft** for anything else without an approved layout: the system makes an attempt, labels it as unapproved, never presents it as final, and logs the gap in `brand/gaps.md`. Breno closes the gap by approving a new layout or example (§6). This is the loop that grows the system, after Ramp Creative's version.

### 5.7 Skills (`.agents/skills/`)

- `consolidate-brand`: the Phase 1 method, reusable for a client: list sources, pull out claims, flag conflicts and gaps, write `brand/`.
- `brand-context`: loads `brand/` and the rules for a task.
- `make-deck`, `make-one-pager`, `make-landing-page` (v1); `make-campaign`, `make-product-graphic` (later): brief → output through the engine.
- `review-output`: runs the checks and writes a short review against `brand/`.
- `log-failure`: turns a rejected output into an entry in `corrections.md` plus a proposed rule, fix, example or test case, for Breno to approve.
- `propose-layouts`: makes ~10 variants of a layout in Paper from the references and direction.
- `design-sync`: reads an approved Paper frame into a template (one way).

### 5.8 Intake

- **v1:** a message in Claude Code. The brief is the same whether it arrives here or in Slack.
- **Phase 6:** a Slack app in a free test workspace, Bolt in Socket Mode on the Mac (no hosting). @mention with a brief or a file → at most one clarifying question → files in the thread with a one-line summary of mode and layouts used. A :x: reaction or a reply starting with "fix:" runs `log-failure`. The Agent SDK vs direct API decision is made then.

---

## 6. Design tools

- **Paper today.** References boards, layout variants, mode exploration and approval.
- **Variants in batches.** `propose-layouts` makes ~10 variants per layout; Breno marks each yes or no; only the yeses go through `design-sync`.
- **One-way sync for v1.** After approval, the template in the repo is the source of truth. Changes are made in code and reviewed through generated preview PNGs. Rendering back to Paper waits until it's needed.
- **Figma later** through a `design-sync` adapter using the Figma MCP. Nothing else changes.

---

## 7. Checks

### 7.1 Automatic (every output)
- Text fits its slot (no overflow, no clipping) at every export size; page dimensions are right; fonts loaded.
- Contrast at least WCAG AA (reuse the `npm run tokens` contrast logic).
- Tokens only: no raw colours in recipes or templates.
- Voice lint for the output's mode: banned words, sentence-case headings, the mode's voice rules.
- Claims: every number appears in `brand/proof.md`.
- Alt text present for images; decorative images marked.

### 7.2 Review
`review-output` writes a short review against `brand/` (mode fit, hierarchy, voice). It informs Breno; it doesn't block.

### 7.3 Test set (`brand/evals/`)
- 12 briefs for v1: 5 sales decks (a prospect studio or agency with clients abroad, a fee objection, a comparison with banks), 3 founder investor updates, 2 support one-pagers answering a specific question, 2 requests that must be refused (a new logo; a claim with no proof).
- Written by a Claude subagent that sees only the persona descriptions, not the templates, in realistic formats: a messy Slack message, a pasted Google Doc, a half-finished outline.
- Breno writes each brief's pass/fail checklist (mode, allowed layouts, must-include facts, must-not-say) before seeing the output.
- Run on every change to templates, rules, examples or skills. Every logged failure adds a case.
- Track: first-pass approval rate, requests served without Breno stepping in, rules that came from failures, cost per output (Claude tokens per request).

---

## 8. Phases

Each phase starts with art direction, then the build. Log each in the new `docs/journal.md`.

0. **Cleanup.** Done 2026-11-18: PT-BR dropped (English only at `/`), the earlier site-builder test removed from the code and docs, `SPEC.md` rewritten as the website spec, README, AGENTS.md and the journal updated, a fresh public repo (the old one is private as `travessia-archive`, to be deleted later), and the site live on Cloudflare Pages at `travessia.brenodaroz.com` (`noindex` and the fictional-company banner stay).
1. **Brand build and consolidation.** Build the whole brand before the system encodes it, following the 14 steps in `docs/brand-building-playbook.md`, with Ramp as the structural reference (same layers, nothing that looks or sounds like Ramp). Steps 1–13 are art direction: reference teardowns, strategy and the master promise, messaging house, voice, proof, the visual direction tested at campaign scale, the finished core identity (including the colour rename, §11), graphic language, photography, illustration and 3D, motion, twelve touchpoints on one wall, and one launch campaign. Step 14 is the consolidation: run `consolidate-brand` on the results and Travessia's existing sources (SPEC §4, `src/strings/strings.json`, the content collections, `tokens.json`, `rates.json`, the stats content, Paper) and write `brand/`. Done when `brand/` exists with every claim sourced, `sources.md` lists the conflicts found, and the touchpoints are approved; approved touchpoints become the first approved examples.
2. **Decks and one-pagers, quiet mode.** Define quiet mode. ~8 slide layouts and 2 one-pager layouts from batches of Paper variants; `design-sync`; the engine CLI through HTML and PDF; automatic checks; first approved examples; the 12-brief test set. Done when `make-deck` passes the test set's decks with no layout fixes and the refusals are refused.
3. **Landing pages, standard mode.** Define standard mode. Section catalogue, `src/content/landing/`, `make-landing-page`. Then publish the case study and the `/brand` page (§9).
4. **Campaign and social kit, loud mode.** Define loud mode. Reuse the cover and seam engines; AI photography within §5.3's limits.
5. **Product graphics.** Product UI frames (reuse the site's vignettes), small edits such as swapping a currency or a customer logo.
6. **Slack bot** (§5.8). Optional after it: Google Slides export.

The case study and `/brand` page are updated after each phase from 4 on.

---

## 9. Case study

- **On Breno's portfolio**, written for the Series A–C reader: the consolidation method, the system, the test results including failures, where a person still decides, the cost per output, and what it would cost a client. It credits Paul Jun's two essays as the starting point and says plainly that Breno was the only tester.
- **A `/brand` page on the Travessia site** that shows the live system: the modes, the layouts, sample outputs, and the corrections log ("this failure became this rule"). It is generated from `brand/`, so it is itself proof the system works.

---

## 10. Open items

- **[verify]** Google Slides: export PPTX and upload it through the Google Drive connector as Slides. Only after the deck layouts are stable.
- **[verify]** Paper → template: how close `get_jsx` and computed styles get to a token-only template.
- **[verify]** Claude API credits and cost per request, before Phase 6.
- **[decide]** Agent SDK vs direct API, at Phase 6.
- **[decided 2026-11-21]** The seam story: "two waters meeting" in general, rio-negro and igarapé. No sandy `solimoes` (playbook step 7, `brand/rules.md` Colour).
- **[decided 2026-11-20]** Typeface: Figtree stays, tuned to one scale (playbook step 6 and 7).
- **[decided 2026-11-24]** Illustration and 3D: no to both. Empty states use an icon, explainers use product UI, posts use the paintings or photographs; the paper-boat render is parked for the launch campaign (playbook step 10, `brand/imagery.md`).

---

## 11. Decisions (grilling session, 2026-11-18)

| Topic | Decision |
|---|---|
| What this is | A service Breno offers, not a product. Travessia is the public example. |
| Buyers | Series A–C startups with a small, overloaded brand team first; companies with scattered brands and no brand team (often Webflow clients) second. |
| Earlier plan | The site was first built to test an external site builder. That plan is dropped and removed from the code and docs; its useful build notes stay in the journal. |
| Deadline | None. Side project. |
| Testing | Breno is the only tester. Blind briefs from a subagent; checklists written before seeing outputs; honest numbers in the case study. |
| Modes | Defined when an output first needs them; quiet first. Each mode includes voice rules. |
| Repo | Everything stays in this repo. Engine free of Travessia specifics; brand pack in `brand/`. Extract when a second client exists. |
| Slack | Not in v1. Requests come as messages in Claude Code; the bot is Phase 6. |
| Phase 1 | A documented consolidation, including references, imagery and photography direction. Doubles as the demo for the second buyer. (Widened on 2026-11-19, below.) |
| Formats | HTML and PDF. PPTX later; Google Slides optional. |
| Editing | Change the recipe and re-render. |
| Language | English only. PT-BR is dropped. |
| Positioning | Same company and audience: Brazilian freelancers who work in English with clients abroad. |
| Main brief | This file. `SPEC.md` is the website spec. |
| Claude vs code | Claude plans and writes recipes; a CLI validates, renders, exports, checks and regenerates. |
| Landing pages | Content entries rendered from the site's existing sections. After decks, before campaigns. |
| Git history | Fresh public repo; the old one renamed, made private, deleted later. |
| Hosting | Cloudflare Pages, like the portfolio. |
| Imagery | No photography in quiet mode; AI photography in loud mode limited to places, objects, hands, work settings. Magnific is available. |
| Design sync | One way, Paper → code, for v1. Batches of ~10 variants per layout, approved yes or no. |
| Out-of-scope | Hard refusal for brand-defining work and unproven claims; flagged draft plus `gaps.md` for everything else. |
| Examples | 2–3 approved examples per format in `brand/examples/`; first-pass approvals get promoted. |
| Case study | Portfolio write-up plus a `/brand` page generated from `brand/`, published after Phase 3; credits Paul Jun. |

### Decisions, 2026-11-19

| Topic | Decision |
|---|---|
| Phase 1 | Becomes "Brand build and consolidation". The full brand is built and polished first (`docs/brand-building-playbook.md`, steps 1–13); consolidation into `brand/` is its last step. Phases 2–6 keep their numbers. |
| Structural reference | Ramp: the same layers (one promise, a small strict identity, product UI as illustration, proof as a programme, campaigns aimed at the pain), with nothing that looks or sounds like Ramp. |
| Central idea | The river crossing, from the name, runs through strategy, voice, colour names, graphic language, photography and the campaign. |
| Colour names | Primitives are named after Brazilian rivers and natural products from Brazil. Semantic tokens keep functional names. The old placeholder names (papel and others) are retired. |
| Launch campaign | Made in Phase 1 as art direction; loud mode's rules are still written in Phase 4, from it. |

### Decisions, 2026-11-20

| Topic | Decision |
|---|---|
| Colour names | Renamed in code: noite → rio-negro, agua → tapajos, cinza → neblina; urucum and white unchanged. Values unchanged. Texture file names keep their old names to match the texture-lab archive. |
| Palette | 2026-11-21, playbook step 7: the light water changed from tapajós (#13A7B5) to igarapé (#00C99B), and urucum got hotter (#FF4A1C) with rio-negro button text. Picked from five options on the Paper page "Brand · Colour options". Rules in `brand/rules.md`. |
| How Phase 1 is done | About 95% by directing agents (Paper, Magnific, Markdown, code), not by hand. Each step is brief → batch → pick and mark up → iterate → approve. `docs/direction-log.md` records rounds, time and what had to be done by hand, as evidence for the case study. |
