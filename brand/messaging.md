# Messaging

> **Status:** v1.0 · 2026-11-20 · approved by Breno in round 3, with the recommendations as written and "tax invoice" in place of "nota fiscal". Playbook step 3 (`docs/brand-building-playbook.md`).
> **What this is:** what every page, deck and ad may say, and in what order. It sits under the promise in `brand/strategy.md` and above the voice rules (step 4) and the proof list (step 5).
> **Inputs:** `brand/strategy.md`, SPEC §4.1–4.2, the feature content (`src/content/features/*.md`), the Home, Product, For clients and Pricing pages, and the feature page template (`src/components/pages/FeaturePage.astro`).
> Where a choice is open, the recommendation comes first and the alternatives follow.
> **Terms:** the Brazilian service tax document is called the **tax invoice** ("tax invoice (nota fiscal)" on first mention per page); the document the client pays is the **invoice**. Rule in `brand/strategy.md`, "Will and won't say".

---

## The house

```
                      Paid abroad. Sorted at home.                       ← roof (promise)
    One account to get paid from abroad, from the invoice to the tax report.   ← platform claim
 ┌──────────── Paid abroad ────────────┐ ┌──────────── Sorted at home ────────────┐
 │ International      │ Get paid and   │ │ Automatic          │ Taxes up to date  │
 │ invoices           │ convert        │ │ tax invoices       │                   │
 └────────────────────┴────────────────┘ └────────────────────┴───────────────────┘
   Freelancers · Studios · Clients abroad · Accountants                  ← audiences
```

The promise's two halves sort the four features without forcing anything: invoices and conversion are how money gets **paid abroad**; the tax invoice and the monthly report are how it gets **sorted at home**. Every product page, deck and the Product overview can use the same split.

## Roof

**Paid abroad. Sorted at home.** From `brand/strategy.md`. It closes every page and deck; it is never a hero headline.

## Platform claim

One sentence for the whole product, used in the Product page hero, the footer, the first line of a deck and the app store description.

**Recommended:** **One account to get paid from abroad, from the invoice to the tax report.**

It uses the category word, names the two ends of the crossing (the client's invoice at the start, the month's tax report at the end), and is close to the current Product hero ("One account to get paid from abroad, start to finish"), so the change is small. Ending on "the tax invoice" would put two kinds of invoice in one sentence.

Alternatives:
- *Invoice in dollars, get reais by Pix, and the tax invoice issues itself.* Concrete, but a list of three features rather than a claim.
- *Everything between your client's payment and your accountant's report.* Good line, but "everything" is a promise the product can't fully keep (no credit, no cards).

**Product line** (stays as it is on Home): *Your client pays in dollars. You get paid in reais.* It is the most concrete version of the platform claim and stays as the Home hero.

## Pillars

Each pillar is a feature with one outcome headline, one plain description and one proof point. Headlines describe what changes for the freelancer, not what the feature is. The proof points are the current fictional ones from SPEC §4.1 and the feature content; step 5 gives each one a source in `brand/proof.md`.

### Paid abroad

| Pillar | Outcome headline | Plain description | Proof point |
|---|---|---|---|
| **International invoices** | Invoices your client understands and pays *(current, keep)* | In dollars, euros or pounds, in their language, with a link to pay by card or bank transfer. No account needed on their side. | *Missing.* Step 5 needs one; candidates: share of invoices paid on or before the due date, or days from sent to paid. |
| **Get paid and convert** | The rate and the fee, before you convert *(new; current: "Get paid in your client's currency and convert when it makes sense")* | Money waits in dollars, euros or pounds. Convert when you choose and get reais by Pix in 1 business day. | One 0.6% fee, shown before you convert. Reais by Pix in 1 business day. |

### Sorted at home

| Pillar | Outcome headline | Plain description | Proof point |
|---|---|---|---|
| **Automatic tax invoices** *(renamed; was "Automatic nota fiscal")* | Your tax invoice issues itself *(new; current: "The export nota fiscal issues itself")* | Every payment issues the export tax invoice (nota fiscal), Brazil's official record of a service sold, with the client's details filled in, and sends a copy to your accountant. | Issued in under 2 minutes (the page shows 1 min 48 s), against 15 to 30 minutes by hand. |
| **Taxes up to date** | The month closed, no spreadsheet *(current, keep)* | One report a month with everything that came in, was converted and was invoiced, in your regime's format: MEI, Simples Nacional or carnê-leão. | *Soft.* "Ready on the first business day" is the only fixed fact; step 5 could add one (for example, the MEI limit warning threshold). |

## Audiences

Five doors into the same house. Each one hears the roof and the platform claim; what changes is the lead pillar, the proof and the objection to answer first.

| Audience | What they hear first | Lead pillars | Objection to answer | Where |
|---|---|---|---|---|
| **Freelancers** (designers, developers, translators, video editors, writers; 1–5 foreign clients, usually MEI) | Your client pays in dollars. You get paid in reais. | Get paid and convert; Automatic tax invoices | "Will this complicate my taxes?" Answer with the tax invoice and the report, not with reassurance. | Home, features, pricing, blog |
| **Studios** (2–10 people, several foreign clients, a part-time accountant) | Every client's payments, tax invoices and month in one account. | Taxes up to date; International invoices | "Can more than one of us use it, and does it scale past one client?" Answer with the Studio plan (people on the account, accountant access). | Pricing (Studio plan), stories (Estúdio Caju, Moita Filmes) |
| **Clients abroad** (finance teams and founders paying a Brazilian freelancer) | Paying a freelancer in Brazil, like any other supplier. | International invoices only | "Is this legitimate, and will my finance team accept it?" Answer with the invoice, the payment methods and the receipt. | For clients |
| **Accountants** (the freelancer's or studio's contador) *(new door)* | Your client's foreign income, already in their regime's format. | Taxes up to date; Automatic tax invoices | "Do I have to learn another system?" Answer with read-only access and the PDF/XML they already use. | None yet (see site changes) |
| **People researching** (search and AI answers for "how to get paid from abroad as a Brazilian freelancer") | A plain answer first; Travessia second. | Depends on the question | "Is this an ad?" Answer by explaining the term before mentioning the product. | Blog, comparisons, calculator |

The roof is written from the freelancer's side. On the For clients page it still reads correctly (the client pays abroad; their freelancer is sorted at home), so it closes that page too.

## Product page template, in words

Travessia's equivalent of Ramp's product page order. The current feature pages already follow most of it; the differences are marked.

1. **Outcome headline.** What changes for the freelancer, not the feature name.
2. **Plain subhead** that names the feature and says how it works in one sentence.
3. **One primary call to action** (Open an account, in urucum) and one secondary link.
4. **The product card** in the hero, showing the page's proof point as a number (the fee, the time, the tax invoice).
5. **Proof strip** *(missing)*: the page's proof point in words, plus the studios logo strip from Home ("Studios already paid through Travessia").
6. **The bank next to Travessia**: three points, each a before and after. *(Current ProblemList. Ramp puts its comparison late; Travessia's tension is the bank, so it stays early.)*
7. **How it works**: three steps with a screen each. *(Current StepCards.)*
8. **A customer's words** *(missing)*: one quote from `src/content/customers`, led by a number, with a picture of their work or place rather than a face.
9. **FAQ** with related integrations. *(Current.)*
10. **The promise** *(changes)*: "Paid abroad. Sorted at home." as the closing title, with the current closing line, "Your next payment can arrive in reais.", as its lead.

## Site copy changes

What this page changes on the site. **The copy-only changes and the tax invoice sweep were applied on 2026-11-20** (the copy pass after step 4), along with a lead line in the closing call to action so the promise could become its title; the Product features block was retitled without a layout change. The component work below is still open. Copy-only changes touch `src/strings/strings.json` or `src/content/**`; the rest need component work.

**Copy only:**

| Where | Now | Change to |
|---|---|---|
| Closing call to action on every page (`strings.json`, `closingCta.title`) | Your next payment can arrive in reais. | Title: *Paid abroad. Sorted at home.* Current line moves to the lead. |
| Footer tagline (`strings.json`, `footer.tagline`) | An international account for Brazilian freelancers and studios who work for clients abroad. | An account for getting paid from abroad, for Brazilian freelancers and studios. |
| Product hero (`pages/product.json`, `hero.title`) | One account to get paid from abroad, start to finish | One account to get paid from abroad, from the invoice to the tax report |
| Product features block (`pages/product.json`, `features.title` and `lead`) | Four features, one account / Invoice, balance, nota fiscal and report. Each one has its own page. | Group the four under *Paid abroad* and *Sorted at home* (needs a small layout change if the groups get their own headings). |
| Get paid and convert hero (`features/receber-e-converter.md`, `hero.title`) | Get paid in your client's currency and convert when it makes sense | The rate and the fee, before you convert |
| Tax invoice feature (`features/nota-fiscal-automatica.md`, `name`, `hero.title`) and the footer link (`strings.json`) | Automatic nota fiscal / The export nota fiscal issues itself | Automatic tax invoices / Your tax invoice issues itself. The slug is already `automatic-tax-invoices`, so the URL doesn't change. |
| Every other mention (48 across 16 files in `src/content` and `strings.json`, including the blog, Home, Product, Pricing and the integrations) | "nota fiscal", "notas", "Nota fiscal #318" | "tax invoice" in copy, with "tax invoice (nota fiscal)" on first mention per page. Product UI mock-ups say "Tax invoice" too, since the app UI is in English. *(Done in the copy pass, 2026-11-20.)* |

**Component work:**

| Where | Change |
|---|---|
| Feature page (`FeaturePage.astro`) | Add a proof strip after the hero (proof point plus the studios logo strip). |
| Feature page | Add a customer quote section before the FAQ, fed by a `customer` field in each feature's content. |
| Accountants | A page for the fifth door, later. Not needed until step 12 shows whether it earns a place; until then the Taxes and Tax invoices pages carry it. |

## Decisions

Made by Breno on 2026-11-20:

1. **Platform claim:** "One account to get paid from abroad, from the invoice to the tax report."
2. **Structure:** the four features sit under *Paid abroad* (invoices, get paid and convert) and *Sorted at home* (tax invoices, taxes up to date).
3. **Audiences:** accountants are the fifth door; no page for them until step 12 shows it earns one.
4. **Terms:** "tax invoice" replaces "nota fiscal" in English copy (rule in `brand/strategy.md`).
5. **Site changes:** the copy-only changes and the tax invoice sweep are applied after step 4, so copy is edited once. When to do the component work (proof strip, customer quote) isn't decided yet.
