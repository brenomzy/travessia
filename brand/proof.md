# Proof

> **Status:** v1.0 · 2026-11-20 · approved by Breno in round 2, with the recommendations as written. Playbook step 5 (`docs/brand-building-playbook.md`).
> **What this is:** every number Travessia uses, where it comes from and where it may appear. Copy and agents take numbers from here or from `src/content/rates.json`, nowhere else (`brand/voice.md`, "Numbers").
> **Inputs:** an inventory of the 513 strings with a digit in `src/content/**` and `src/strings/strings.json` (2026-11-20), SPEC §4.1–4.2, `brand/messaging.md`.
> **Everything about Travessia is fictional** (brief D18). Real-world facts about Brazil are marked as such and need checking before they're stated as current.

---

## Three kinds of number

| Kind | What it is | Rule |
|---|---|---|
| **Claims** | What Travessia promises or reports about itself: the fee, the timing, the size of the company. | One value, everywhere. Listed below. Changing one means changing it here first, then every place it appears. |
| **Worked examples** | Amounts in product mock-ups, calculators and stories: US$ 2,000 → R$ 10,834.60. | Must be arithmetically right using the claims and the example rates. May differ between screens, as long as each is internally consistent. |
| **Real-world facts** | Brazilian rules and institutions: the MEI yearly limit, IOF, Pix. | True at the time of writing; checked before publishing and dated in `brand/sources.md`. |

## Claims

### The product

| Claim | Value | Where it may appear | Notes |
|---|---|---|---|
| Conversion fee | **0.6%** of the amount converted, on every plan, shown before you confirm | Anywhere | Consistent across the site today. |
| Fee to receive | **None** ("Getting paid is free") | Pricing, FAQ, Get paid and convert | Consistent. |
| Reais by Pix | **1 business day** after converting; conversions confirmed by 4 pm arrive the next business day | Anywhere | Always "1 business day", never "1 day" or "instant". The Home stat says "1 day": fix. The Stories page says "on average": drop it, because it's a commitment, not an average. |
| Tax invoice issued | **Under 2 minutes** from confirmed payment | Tax invoice pages, Home, stories | "1 min 48 s" is a worked example of it. |
| Client pays | By card or local bank transfer, no account needed. Card payments clear the same day; local transfers take 1 to 2 business days | For clients, invoices, FAQ | Consistent. |
| MEI warning | When you pass **80%** of the yearly MEI limit | Taxes up to date, FAQ, blog | In the FAQ today; not yet on the feature page. |
| Monthly report | Ready on the **first business day** of the month, in your regime's format | Taxes up to date | Consistent. |
| Account opening | About **10 minutes**, on your phone | Open an account | Consistent. |
| Rate alert | Notifies you when a currency reaches the rate you set | Get paid and convert, changelog | No number needed. |

### Against the bank

The comparison is always with **an international wire received at a Brazilian bank**, never with a named bank or competitor.

| Claim | Value | Where it may appear | Notes |
|---|---|---|---|
| Bank cost | **2% to 6%** in spread and fees together; "up to 6%" when only the worst case fits | Home stats, comparisons, feature problems, blog | Today the comparison page says "2% to 6% spread" and Home says "up to 6%", which agree. SPEC §4.2 says "4–6%": update SPEC. |
| Bank timing | **2 to 5 business days** from the client's payment to reais | Home stats, comparisons, stories | Home says "3 to 5", the comparison page "2 to 5": settle on 2 to 5. Home's "4 days sooner, at worst" still holds (5 − 1). Diego's "3 to 5" is his own experience and can stay. |
| Bank worked example | US$ 2,000 at a 4% spread and a US$ 45 fee leaves **R$ 10,228.56**, against Travessia's **R$ 10,834.60** | Comparison page, IOF blog post | Consistent in both places. |

### The company

| Claim | Value | Where it may appear | Notes |
|---|---|---|---|
| People | **14**, in São Paulo and Recife | About | SPEC §4.1 says "Series A, about 40 people, a marketing team of 4". **Recommended:** the site wins; SPEC becomes "seed stage, 14 people". The About page's founding story (founders still freelancers in 2025) fits a 14-person company better than a Series A one. |
| Accounts | **2,140** | About, Stories | Stories says "accounts opened since March", but customers date from November 2025: drop "since March". |
| Client countries | **31** | About, Stories | Consistent. |
| Launch | **November 2025** (earliest customer, Ana Ribeiro) | About, stories, the data report | Not stated anywhere yet; fixing it here keeps "customer since" dates consistent. |
| Founding story | A US$ 4,000 payment arrived **R$ 600** short of that day's commercial rate, in 2025 | About | Consistent with the bank range (R$ 600 on R$ 21,800 is 2.75%). |

### Missing proof points

Two pillars in `brand/messaging.md` have no number. Proposed, fictional:

| Pillar | Proposed claim | Why this one |
|---|---|---|
| International invoices | **8 in 10 invoices are paid by their due date** | Answers the freelancer's real worry about a foreign client (will they pay on time?) and credits the link and the card option, not a feature list. |
| Taxes up to date | **Report ready on the first business day; a warning at 80% of the MEI limit** | Both already exist in the product copy; this promotes them to the pillar's proof. No new number needed. |

## Worked examples

The canonical example, used across Home, Product, the closing section and the comparison page. Every other example should use the same arithmetic.

| Step | Value |
|---|---|
| Invoice #0042, Halden & Co., London | US$ 2,000.00 (US$ 1,600 + US$ 400) |
| 0.6% fee | − US$ 12.00 |
| Converted | US$ 1,988.00 at R$ 5.45 |
| Arrives by Pix | R$ 10,834.60, 1 business day later |
| Tax invoice | No. 318, issued in 1 min 48 s |

Example rates come from `src/content/rates.json`: US$ 5.45, € 6.30, £ 7.25. Other examples on the site (balances, MEI meters at 62% and 72%, the carnê-leão table) are separate scenarios and don't need to match each other, only to add up.

## The product ledger

Every product mock-up (site, Paper boards, social, decks) shows the same account, so a reader who looks closely finds one consistent story. Pick names, numbers and dates from here; add to it before inventing new ones. Set in November 2026, on the real 2026 calendar: payments clear and Pix arrives on business days only.

**The account:** Ana Ribeiro, product designer, MEI, Recife (her customer story is in `src/content/customers/ana-ribeiro.md`). Initials AR. Her accountant: Marta Lima (`contato@livrocaixa.example`).

**Clients:** Halden & Co., London (pays in US$, by card). Studio Vik, Oslo (€, bank transfer). Northfold, Toronto (US$, card). Marlow Press, Manchester (£).

**Invoices, November 2026** (example rates from `rates.json`; tax invoice amounts are the invoice at the rate, before Travessia's fee):

| Invoice | Client | Amount | What happened | Tax invoice |
|---|---|---|---|---|
| #0041 | Northfold | US$ 850.00 | Paid by card, Mon Nov 2 | No. 316, Nov 2, R$ 4,632.50 |
| #0042 | Halden & Co. | US$ 2,000.00 | Sent Tue Nov 10, 4:40 pm; viewed Wed Nov 11, 10:02 am; paid by card Thu Nov 12, 9:11 am; due Nov 14 | No. 318, Nov 12, 9:13 am (1 min 48 s), R$ 10,900.00 |
| #0043 | Studio Vik | € 1,380.00 | Paid by bank transfer, Mon Nov 9; still in the euro balance | No. 317, Nov 9, R$ 8,694.00 |
| #0044 | Marlow Press | £ 640.00 | Sent Thu Nov 5, due Mon Nov 30; open | none yet |
| #0045 | Studio Vik | € 1,500.00 | Draft, ready to send | none yet |

**The canonical crossing:** #0042's US$ 2,000.00, converted Thu Nov 12 at 9:20 am: − US$ 12.00 fee, US$ 1,988.00 at R$ 5.45 = R$ 10,834.60, which arrives by Pix on Fri Nov 13 at 9:12 am. "Paid in November": US$ 2,850.00 and € 1,380.00.

**Balances on Nov 13:** US$ 4,212.40 (≈ R$ 22,819.83 after the fee), € 1,380.00 (≈ R$ 8,641.84), £ 320.00 from an earlier payment (≈ R$ 2,306.08). The "≈ R$" notes are what she would receive today: amount × rate − 0.6%.

**Earlier months:** August R$ 18,924.12 (3 payments), September R$ 25,852.62 (4 payments); October is 22% up on September.

**October report** (sent Mon Nov 2, the first business day): tax invoices 311 to 315, revenue R$ 31,540.20 at each payment day's rate (October is the one place other rates are allowed), Travessia fees R$ 189.24 (0.6%), MEI at 62% (R$ 50,180 of R$ 81k), DAS R$ 76.90 due Nov 20.

**Open (2026-11-21):** Ana's revenue (about R$ 10,000 to R$ 31,000 a month) is far above the MEI yearly limit of R$ 81k, so she can't be an MEI as her customer story, the home showcase and this report say. Her regime needs deciding (Simples Nacional is the likely answer) before the tax figures here are final.

## Real-world facts

| Fact | Value used | Check |
|---|---|---|
| MEI yearly revenue limit | R$ 81,000 | Check before publishing; changes to the limit have been proposed. |
| Pix | Brazil's national bank transfer system, run by the Banco Central | Stable. |
| IOF on foreign exchange | Mentioned in the IOF blog post | Rates change; check the post before publishing. |

## Customer stories

The format already on the site works; this writes it down.

1. **Lead metric**: one number from the customer's own month, in the story's highlight (US$ 2,000 a month; £ 3,100 per project; 42 tax invoices in 2026). It has to be consistent with the claims above.
2. **Headline**: what changed, as an action ("Ana Ribeiro picks the day she converts").
3. **Three metrics**: one money, one time, one thing that stopped happening ("0 international wires").
4. **The customer's words**: one quote, under 20 words, in the voice of `brand/voice.md` but in their own words.
5. **Before and after**: two short sections. Before names the bank process, not a bank.
6. **Picture**: never a face. Until step 9, the textured covers; after it, a photograph of the work or the place.
7. **Facts**: craft, city, team size, client countries, customer since (no earlier than November 2025), features used.

## Signature data piece

The equivalent of Ramp's AI Index: something the blog, the press page and a campaign can be about.

**Title:** *What Brazilian freelancers earn from abroad, 2026.* Plain on purpose: it is also the search query.

**Outline:**
1. Who: crafts, cities, team sizes, tax regimes (MEI, Simples Nacional, carnê-leão).
2. Where the clients are: the 31 countries, the top five, currency split between dollars, euros and pounds.
3. How much: median invoice and median monthly income from abroad, by craft.
4. How fast clients pay: share paid by the due date (the 8 in 10), card against local transfer.
5. What the crossing used to cost: the bank's 2% to 6% applied to the year's volume, against 0.6%.
6. Taxes: share of tax invoices issued within a day of payment; how many MEIs passed 80% of the limit.
7. Method: what the numbers are drawn from and, prominently, that Travessia and all its data are fictional.

Published yearly as a report page with its method, not as a founder's letter. Charts follow the bank-versus-Travessia chart rule from step 8.

## Live number

**Reais sent to Pix keys today** *(fictional)*.

- **Where:** inside a product view on Home (the showcase or the stats band), not in the hero (step 1: the hero counter belongs to Ramp and Stripe).
- **How it moves:** starts at zero at midnight in São Paulo, rises through the business day at a fixed rate, pauses on weekends and holidays. Computed from the clock, so every visitor sees the same number.
- **The rate:** 2,140 accounts at an average of about R$ 14,000 a month is about R$ 30 million a month, or about R$ 1.4 million per business day.
- **Label:** "Reais sent to Pix keys today, in a fictional demo." The fictional label sits next to the number, not in a footnote.
- **When:** built with motion in step 11.

## Copy fixes this page asked for

Applied on 2026-11-20, when the page was approved. The "Notes" column in the tables above describes the site as it was before.

| Where | Now | Change to |
|---|---|---|
| Home stats (`home.json`, `outcomes.stats[1]`) | Bank "3 to 5 business days"; Travessia "1 day" | "2 to 5 business days"; "1 business day" |
| Stories stats (`stories.json`) | "accounts opened since March"; "1 business day · on average until the reais land" | "accounts opened"; "1 business day · from converting to reais in your Pix" |
| Invoices feature (`faturas-internacionais.md`) | No proof point | Add "8 in 10 invoices are paid by their due date" to the benefits or the problem section |
| Taxes feature (`impostos-em-dia.md`) | The 80% MEI warning is only in the FAQ | Say "a warning at 80% of the MEI limit" in the benefits |
| SPEC §4.1 and §4.2 | "Series A, about 40 people"; "4–6%" | "Seed stage, 14 people"; "2% to 6%" |

## Decisions

Made by Breno on 2026-11-20:

1. **Company:** seed stage, 14 people in São Paulo and Recife, 2,140 accounts, clients in 31 countries, launched November 2025. SPEC §4.1 updated.
2. **Bank comparison:** 2% to 6% in spread and fees ("up to 6%" for the worst case); 2 to 5 business days. SPEC §4.2 updated.
3. **New proof points:** "8 in 10 invoices are paid by their due date" (International invoices); the report on the first business day and the warning at 80% of the MEI limit (Taxes up to date).
4. **Data piece:** *What Brazilian freelancers earn from abroad, 2026*, with the outline above.
5. **Live number:** "Reais sent to Pix keys today", inside a product view on Home, built in step 11.
