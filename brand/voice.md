# Voice

> **Status:** v1.0 · 2026-11-20 · approved by Breno in round 1. Playbook step 4 (`docs/brand-building-playbook.md`).
> **What this is:** how Travessia sounds, written so a writer or an agent can apply it without asking. It sits under `brand/strategy.md` (what Travessia says) and `brand/messaging.md` (in what order). Examples use real site copy where it exists.
> **Inputs:** SPEC §4.3, `brand/strategy.md` ("Will and won't say"), `brand/messaging.md`, the copy in `src/content/` and `src/strings/strings.json`.

---

## In one line

As clear as a bank statement, as friendly as someone who's done this before (SPEC §4.3).

## Traits

Five traits. Each has a pair: the first line is Travessia, the second is what it isn't.

### 1. Plain

Says what happens, in the order it happens, in words the reader already uses.

- **This:** Your client pays the invoice. The reais reach your Pix the next business day.
- **Not that:** Seamless cross-border payouts, end to end.

### 2. Exact

A number instead of an adjective, with its unit and its moment. If there's no number, describe the action, not its quality.

- **This:** One 0.6% fee, shown before you convert.
- **Not that:** Low, transparent fees.

### 3. Calm

No urgency, no fear, no exclamation marks, and no prohibitions or pressure aimed at the reader ("Stop…", "Don't…", "Never again", "before it's too late"). Inviting the reader to act is fine ("Keep the dollars until the rate suits you", "Convert today, or wait"). A risk is stated once, with what Travessia does about it. Banks and competitors are described by what they do, as a fact, never accused: "The bank converts on arrival" is calm; "Your bank is taking a cut and hoping you won't notice" is not.

- **This:** If you're MEI, Travessia warns you as you near the yearly limit.
- **Not that:** Don't get caught over the MEI limit!

### 4. Been there

Warm because it's experienced, not because it's chatty. It speaks like a freelancer who has sent this invoice before and remembers what was confusing.

- **This:** The first foreign invoice is the confusing one. Here's what goes on it.
- **Not that:** Hey there! Ready to take your freelance career global?

### 5. Quietly Brazilian

Brazil is where the reader lives and works, not a theme. Reais, Pix and business days are facts of life; nothing is explained to a foreigner unless the page is for clients abroad.

- **This:** Reais by Pix, one business day after your client pays.
- **Not that:** Bringing a little Brazilian sunshine to global payments.

## Humour

Rare, dry, one line, aimed at the process and never at a person.

| Can be the joke | Never the joke |
|---|---|
| Bank wires, SWIFT codes, intermediary banks | The freelancer or their work |
| The rate a bank shows you afterwards | The client |
| The month-end spreadsheet; the city hall tax portal | Taxes as a threat, the tax authority, fines |
| Waiting three to five business days | Money someone lost |
| Brazilian bank details on a foreign invoice | Brazil as a stereotype |

- At most one joke per page. None in product UI, errors, legal pages or anything about taxes owed.
- A joke still states a fact. "Bank 341 · Branch 1234 · Acct 56789-0 is not a payment method your client recognises" works; a pun doesn't.

## Numbers

- Every number comes from `brand/proof.md` (step 5) or `src/content/rates.json`, and is fictional and labelled as such.
- Figures, not words: 1 business day, 0.6%, 2 minutes.
- Currency as the site shows it: US$ 2,000.00, € 1,500.00, £ 900.00, R$ 10,834.60. Drop the cents in headlines when they are zero (US$ 2,000).
- Fee before result: wherever the rate, the fee and the amount that arrives appear together (a paragraph, a list, a UI screen), the rate and the fee come first. A headline may show the result on its own if the fee and rate follow on the same screen.
- "Up to" only with the bank's range ("up to 6%"); never with Travessia's own numbers.
- Time in business days for money ("1 business day"), in minutes for documents ("under 2 minutes"). Never "instant", "in seconds" or "real time" for money.

## Brazilian terms

Rule from `brand/strategy.md`: Portuguese only where English has no real equivalent.

| Term | How it appears |
|---|---|
| Pix | As is. A proper name, like a brand. No explanation on freelancer pages; on the For clients page, "Pix, Brazil's national bank transfer system" the first time. |
| MEI | "MEI, Brazil's simplified sole-trader regime" on first mention per page, then "MEI". |
| Simples Nacional | "Simples Nacional, the simplified tax regime for small companies" on first mention, then as is. |
| Carnê-leão | "carnê-leão, the monthly income tax individuals pay on money from abroad" on first mention, then as is. |
| Nota fiscal | **Tax invoice.** "tax invoice (nota fiscal)" on first mention per page, then "tax invoice". The client's document is always "invoice". Product UI mock-ups may keep "Nota fiscal no. 318" where a Brazilian app would show it. |
| Receita Federal | "Brazil's tax authority". Name it only when the sentence needs the institution. |
| Reais | Plural "reais", singular "real". Never "BRL" in copy; "BRL" only in UI where currency codes appear. |

## River words

The name means crossing, and copy can use it, sparingly.

- **Allowed:** crossing, cross, the other side. "Arrive", "land" and "reach" are plain words too and never count as river words.
- **Limit:** one river word per page across all headlines and leads; any number in body copy.
- **Never:** puns on water ("go with the flow", current as a play on currency, sink or swim, making waves, smooth sailing), and "bridge" (it isn't a river image Travessia uses). The words themselves are fine in their plain sense: "currency" means currency.
- The existing UI card titled "The crossing" stays; it's the one place the word labels something.

## Mechanics

- **Headlines** in sentence case. A headline of one sentence or phrase has no full stop ("Invoices your client understands and pays"). A headline of two or three sentences ends every sentence, fragments included, with a full stop ("Paid abroad. Sorted at home."). Never more than three sentences.
- **Short sentences.** One idea each. A lead is at most two sentences.
- **You and we.** "You" is the freelancer or studio; "your client" is the person paying. "We" only on the About page, in legal text and in support answers. Elsewhere Travessia does things in the third person ("Travessia issues the tax invoice"), or the product does ("The tax invoice issues itself").
- **No exclamation marks, no emoji, no ALL CAPS.** Bold for one phrase at most per paragraph.
- **Buttons** say what happens: "Convert US$ 2,000", "Send invoice", "Open an account". Never "Submit", "Click here" or "Learn more" on its own.
- **Errors** say what happened and what to do next, in that order, without blame: "The rate changed while you were deciding. Here's the new amount."

## Words

| Use | Instead of |
|---|---|
| get paid | receive funds, payout |
| invoice | bill (for the client's document) |
| tax invoice | nota fiscal, NF-e, fiscal note |
| exchange rate, rate | FX, forex |
| fee | charge, commission, cost |
| convert | exchange, swap, cash out |
| account | platform, solution, wallet |
| freelancer, studio | user, customer, creator |
| client | customer, buyer |
| 1 business day | fast, quick, instant |

**Never:** swipes at banks or competitors, solution, seamless, leverage, revolutionary, empower, unlock, game-changer, hassle-free, borderless, without borders, hidden fees, instant, in seconds, best rates, platform (in marketing copy), international account, cross-border account.

## The test

The playbook's test: 20 headlines for one feature in the voice and 5 deliberately off-voice, mixed. If someone else can sort them using only the rules above, the rules work.

Feature: **Get paid and convert.** The list is shuffled; the answers are in the collapsed block below it.

1. One 0.6% fee. You see it first.
2. Keep the dollars until the rate suits you
3. The reais reach your Pix the next business day
4. Low, transparent fees on every conversion
5. The rate and the fee, before you convert
6. Dollars, euros and pounds wait in their own balances
7. Convert today, or wait for R$ 5.50. Your call.
8. US$ 2,000 in, R$ 10,834.60 out, and every step shown in between
9. Stop letting the bank decide what your work is worth
10. Know what arrives before you convert
11. Your client paid. Now you choose when it becomes reais.
12. A rate alert, so you don't have to check every morning
13. Instant reais, wherever your client is
14. No fee to receive. 0.6% when you convert. That's all.
15. The bank converts on arrival. You convert when you choose.
16. Your balance stays in dollars until you say otherwise
17. See R$ 10,834.60 before you press convert
18. Go with the flow: convert when the current's in your favour
19. From your client's currency to your Pix in 1 business day
20. Every conversion shows the rate, the fee and the result on one screen
21. Paid in euros on Monday. Reais on Tuesday, if you want them.
22. Never get caught out by the exchange rate again
23. The exact amount in reais, before anything moves
24. Set the rate you want. Travessia tells you when it's there.
25. Reais on the other side, 1 business day later
<details>
<summary>Answers</summary>

Off-voice: **4** (an adjective where a number belongs: trait 2), **9** (an order aimed at the reader and an accusation of the bank: trait 3), **13** ("instant" is false and banned), **18** (water puns), **22** (fear framing: trait 3). The other twenty are on-voice.

</details>

### Result of the blind sort

Run twice on 2026-11-20 by a fresh agent that saw only the rules above and the shuffled list, not the answers.

| Run | Off-voice found | On-voice wrongly flagged | What it showed |
|---|---|---|---|
| 1 | 4 of 5 (missed 9) | 0 | The rule against swiping at banks lived only in `brand/strategy.md`. Also unclear: "instant" was banned but used to explain Pix; which river words count; "fee before result" in a single headline; headlines of three sentences. |
| 2, after fixes | 5 of 5 | 0 | Left small doubts about imperatives, literal "currency" and "three" without a unit. Those three lines were then tightened. |

The rules pass the playbook's test. Agents writing copy should get this file in full, not a summary of it.
