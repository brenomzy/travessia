# Building the Travessia brand: a playbook

> **Status:** v0.3 · 2026-11-20 · Owner: Breno Daroz. v0.2 added the river idea, the colour names and the decision that this is brief Phase 1. v0.3: colours renamed in code, and how the steps are run through agents.
> **What this is:** the steps for building the whole Travessia brand (strategy, messaging, voice, proof, identity, imagery, motion, campaigns) to a finished standard before the brand system in `docs/brand-system-brief.md` encodes it. Ramp is the structural reference: Travessia should have the same layers Ramp has, with nothing that looks or sounds like Ramp.
> **Research date:** 2026-11-19. Ramp facts below come from public sources, linked in "Sources". Anything marked *(measured)* was read from ramp.com's live CSS or HTML that day; *(reading)* marks interpretation, not a sourced fact.

---

## How this fits with the brand system

The brief's Phase 1 ("Consolidation") assumes the brand already exists in scattered pieces and only needs gathering. Most of the visual layer does exist (tokens, seam textures, product UI vignettes, a designed site). The strategy, messaging, proof, photography, motion and campaign layers mostly don't. Ramp's experience says the order matters: their identity has been stable since about 2022, and the system (Ramp Creative) came years later, on top of a brand that was already proven in campaigns.

So brief Phase 1 is now "Brand build and consolidation" (brief §8, decided 2026-11-19):

1. Build the brand with steps 1–13 below, as art direction.
2. Write each step's output into `brand/` (step 14). That writing-down is the consolidation.
3. Then Phase 2 builds the system on top.

---

## What Ramp's brand is made of

Ramp has no public brand guidelines (ramp.com/brand returns a 404), so this is put together from the site, agency case studies, Fonts In Use, campaign coverage and Paul Jun's essays.

### Strategy and messaging

| Layer | What Ramp has |
|---|---|
| Founding tension | Corporate cards earn more when customers spend more. Ramp launched in 2020 as the card that helps you spend less. |
| Master promise | "Time is money. Save both." It is the home hero and the closing call to action on every product and customer page. |
| Category framing | Widened in three steps while the promise stayed: corporate card (2020), finance automation platform (2023), AI agents for finance (2026, "One platform for all of finance"). |
| Internal rule that matches the promise | "If it doesn't save you time or money, we don't build it" (careers page). |
| Audiences | By company size (startups, small business, mid market, enterprise), plus partner groups (accounting firms, PE, VC) and free-tool audiences (founders, accountants, operators). Executives get control language; employees get relief from busywork *(reading)*. |
| Product page template | Outcome headline ("A month of AP done in minutes"), plain subhead naming the product with a speed multiple, email field plus "Get started for free", logo strip with customer count, feature blocks with short punchy heads over one-line subheads, one named customer quote, head-to-head stats against a named competitor, FAQ, then the master promise as the closing CTA. |
| Voice | Short declaratives, often a twist on a stock phrase ("We've got the receipts."). Numbers in the headline. Puns on finance terms. The humour is aimed at busywork, never at the customer *(reading)*. No public voice guide exists. |
| Proof | Customer count, growth multiple, integrations and currencies on the home page; savings percentages and hours saved on the savings pages; customer stories that lead with a metric ("30+ hours back monthly"); head-to-head numbers against Bill.com. |
| Proof as a programme | The Ramp Economics Lab publishes the Ramp AI Index and spend reports from its own card and bill-pay data, cited by the NYT, WSJ, FT and Bloomberg. A weekly data newsletter (Leading Indicators) reports a 58% open rate. |
| Culture as brand | "Builders", "velocity", "high agency and high urgency". Speed is both the product promise and the marketing method: a Super Bowl ad made in under a week, a reply video in a day, a launch site in 48 hours. |

### Visual and campaign layer

| Layer | What Ramp has |
|---|---|
| Wordmark | Lowercase "ramp", custom-drawn from TWK Lausanne, with a small angled mark. Unchanged since at least 2022. Red Antler did strategy, identity, messaging, art direction and card packaging; nobody is publicly credited with drawing the logo. Red Antler's stated idea: "a new kind of status symbol", "modern boldness" with "sophisticated restraint". |
| Colour | One acid accent, `solar` #E4F222, used for primary buttons and highlights. Warm near-black text (#0C0A08), warm off-white surfaces (#F4F2F0), warm grey borders. Secondary colours (a blue, a deep green, an orange) and three sky gradients exist in the CSS but don't appear on the home page. On the home page, `black` is referenced 817 times and `solar` 30 *(measured)*. In short: mostly white and black, very little yellow, and the yellow means "act here". |
| Type | One typeface for everything: TWK Lausanne (Weltkern), weights 300 to 700, stylistic set `ss01` on for the whole site. Headlines in regular weight at large sizes, often two-tone: a black first sentence and a grey second *(measured)*. Numbers aren't given their own face; IBM Plex Mono appears only on chart axes. |
| Product depiction | A bento grid of rounded cards on warm grey, each with a two-tone headline and a cropped, simplified product screen. Bakken & Bæck built this "bento box" product-graphic system, with motion rules and sound. INK made a set of 3D renders of the card and devices. |
| Live numbers | A ticking strip ("US corporate payments processed by Ramp", "agents at work today") used as a design element, not just as a stat. |
| Photography | Two kinds. Customer stories: real named finance teams at work, natural light, customer logo in white top-left. Campaigns: staged and slightly surreal scenes of finance people doing the opposite of what you'd expect (Fuzzco's "Doing Finance": ice cream, a miniature horse, a pool). |
| Campaigns | Out-of-home in yellow and black (Miami boats and buses in 2022, then Boston, New York, Atlanta, Chicago; a 3D billboard on Madison Square Garden). Super Bowl LIX (2025, Saquon Barkley buried in expense reports, made in-house in under a week). A 2025 stunt: Brian Baumgartner doing expense reports by hand in a glass box in Flatiron Plaza for hours, livestreamed on X, next to a live counter of Ramp processing receipts. Super Bowl LX (2026, "Multiply What's Possible", a crowd of Brians clearing receipts; directed by Randall Einhorn, VFX by Framestore). |
| Who does the work | An in-house brand team of about 10 (designers, writers, motion, illustration, producers) under the VP of Design, with five focus areas: story, AI, operations, craft and people. Specialist partners for each layer: Red Antler (identity), Bakken & Bæck (product graphics), INK (3D), Fuzzco (out-of-home), Where Giants Roam (3D billboard), RadicalMedia and Framestore (film), Tinuiti (media). |
| The system | Ramp Creative, an internal Slack agent named in Paul Jun's follow-up essay "Brand as infrastructure". One approved skill per format, "10/10" reference examples designed in Figma, a renderer, automated checks for dimensions, fonts and overflow. Unknown formats get an attempt, an automatic flag, and a designer makes a reference example within 24 to 48 hours. Over 80% of UK launch assets came through it. |

### What to take from Ramp (structure, not look)

- **One promise, said the same way everywhere.** "Time is money. Save both." ends every page. Travessia needs its one line before anything else.
- **The promise comes from a tension with the incumbent.** Cards reward spending; Ramp helps you spend less. Banks profit from the wire and the spread; Travessia's equivalent tension is already in SPEC §4.2 (4–6% lost to wires and bad rates).
- **The identity is small and strict.** One typeface, one accent that means "act here", warm neutrals. Variety comes from campaigns, product graphics and photography, not from the core.
- **The product is the main illustration.** Cropped, simplified UI in a repeatable grid.
- **Numbers are a visual asset.** Live counters, stats in headlines, a data programme the press quotes.
- **Humour is aimed at the pain.** Expense reports and receipts are the villain in every big campaign. The customer is never the joke.
- **Specialists for each layer, one owner for the whole.** Travessia's equivalent is Breno directing and AI tools making (brief §3).

### Where Travessia has to differ

- **No faces presented as customers** (brief §5.3). Ramp's customer photography relies on real named people. Travessia's stories need another device: work settings, hands, places, objects, the work itself (a translated manuscript, a video timeline, a design file), plus the customer's own words.
- **Fictional proof.** Every number is made up and has to stay consistent and labelled as fictional (D18). A data programme can exist, but only as an obviously fictional demo.
- **Calm, not loud, at the core.** SPEC §4.3 sets the personality as calm, trustworthy and warm. Ramp's stunts work because their audience is CFOs who enjoy a joke about expense reports. Travessia's loud mode can borrow the stunt structure (show the old way failing next to the new way, live) without the celebrity.

---

## What Travessia has today

| Layer | Travessia now | Gap |
|---|---|---|
| Founding tension | Implied in SPEC §4.2 (4–6% lost, slow wires, tax spreadsheets). | Not written as one sentence. |
| Master promise | None. The site has page headlines but no line that closes every page. | The biggest gap. |
| Category framing | "A cross-border account for Brazilian freelancers" (SPEC §4.1). | Decide the category word and whether it should widen later. |
| Messaging architecture | Four feature pages, For clients, comparisons, stories. | No messaging house; no fixed page template in words. |
| Voice | Rules and vocabulary in SPEC §4.3. | No traits with do/don't pairs, no humour rule, no tested headline sets. |
| Proof | Three made-up proof points (1 business day, 0.6%, under 2 minutes), customer stories, stats band. | No `proof.md`, no rule for where each number may appear, no data programme. |
| Logo | 18 directions plus a second round explored in Paper. | Confirm the final mark and write its rules (construction, clear space, smallest size, app icon, favicon, on textures). |
| Colour | Primitives rio-negro, neblina, tapajos, urucum and white (renamed 2026-11-20, see "Colour names"); themes light, tint, primary, dark, deep (`src/tokens/tokens.json`). Urucum is already reserved for primary buttons, one per view, which is the same idea as Ramp's yellow. | No written proportions. |
| Type | Figtree and Geist Mono. | Figtree is a common free face; Ramp's single licensed grotesque with `ss01` is part of what makes it recognisable. Decide whether Figtree stays (step 7). |
| Signature graphic | Seam textures from the *Encontro das Águas*, final (texture-lab). | Rules for when and how much; motion version later. |
| Product depiction | Vignettes, ProblemFix, StepScreen, FeatureTabs. | Write the rules (crop, density, which currencies and names appear). |
| Live numbers | Stats band on Home. | No live-counter device. |
| Photography | None. | Direction, references, test set, prompt recipe. |
| Illustration and 3D | Described in SPEC §4.3 (route arcs, river segments, checks); `src/assets/illustration-kit/` is empty. | Decide if Travessia needs illustration at all, or only product UI and seams. |
| Motion and sound | CSS reveals, Motion helper. | No principles, no logo sting, no seam animation. |
| Campaigns | None. | One launch campaign as the proving ground. |
| Content programme | Blog with five category covers, changelog, events. | No signature content (a report, an index, a newsletter with a point of view). |

---

## The river idea runs through every step

Ramp's whole brand hangs on one idea, saving time and money. Travessia's equivalent is already in its name: *travessia* means a crossing, as in a river crossing. Money crosses a border the way boats cross rivers every day in the Amazon. The seam texture already uses the idea, after the *Encontro das Águas*. It hasn't been used yet in the strategy, the copy, the photography, the colour names or a campaign. Carry it through every step:

| Step | Where the river idea can show up |
|---|---|
| 2. Strategy | The promise can be about a crossing: short, regular, safe, with the price agreed before you board. Test lines that use the image and lines that don't. |
| 4. Voice | A small set of river words allowed in headlines (crossing, the other side, current, arrive) and a limit on how often, so it never turns into a pun machine. |
| 7. Colour | Name every colour after a Brazilian river or a natural product (below). |
| 8. Graphic language | The seam is two waters meeting. The route arcs and river segments in SPEC §4.3 can become the line that joins the steps in the product UI. |
| 9. Photography | The second register: still lifes of the crossing itself (a ferry ticket, a mooring rope, a river meeting from above, a boat's painted hull) next to work settings. |
| 13. Campaign | A crossing timed against a bank wire. |

### Colour names

**Rule:** every primitive is named after a Brazilian river or a natural product from Brazil. Semantic tokens (`color.accent.primary`, `color.text.base` and so on) keep their functional names, so components never see the poetic ones.

Renamed on 2026-11-20 (same hex values; the generated CSS was checked to be identical apart from the names):

| Was | Values | Now | Why |
|---|---|---|---|
| `noite` | #2A3E48 to #0F1C24, blue-black | `rio-negro` | The Rio Negro's dark water, one side of the *Encontro das Águas*. |
| `agua` | #EAF8F8 to #0B4456, teal | `tapajos` | The Tapajós is known for its clear blue-green water. Token names drop the accent; labels keep "tapajós". |
| `urucum` | #F2542D, #D63F1A | `urucum` | Annatto seed, the red dye used in body paint and in *colorau*. Unchanged. |
| `tapajos` | #13A7B5 and its ramp | `igarape` (2026-11-21) | Not a rename: a new colour, #00C99B, picked in step 7 because tapajós read muted. An *igarapé* is a small, clear forest stream. Urucum moved to #FF4A1C at the same time. |
| `cinza` | #E1E7E8 to #2E3B42, cool grey | `neblina` | The mist over the river in the morning. |
| `white` | #FFFFFF | `white` | Pure white stays plain. If a warm off-white is added later, it becomes `algodao` (cotton) or `tabatinga` (the pale riverbank clay used to paint houses in the Amazon). |

CSS variables follow the names: `--rio-negro-900`, `--igarape-500`, `--neblina-600`, `--urucum-600`. Texture file names (`strip-tap-noite.png`, `dither-noite.png`) keep their old names so they still match the texture-lab archive. The Paper file's "Design system" page still shows the old names.

**Decided 2026-11-21: "two waters meeting" in general.** The seam now pairs rio-negro with igarapé and doesn't depict a real confluence. Original note: the seam pairs the dark with the teal, so with these names it reads as Rio Negro meeting Tapajós, and those two rivers don't meet. The *Encontro das Águas* is Rio Negro and Solimões (dark and sandy) at Manaus; the Tapajós meets the Amazonas at Santarém. Either the story becomes "two waters meeting" in general, or the seam's light side shifts toward a sandy `solimoes`. Brazilian readers will notice, so decide it on purpose.

**Names held for campaign colours** (loud mode), used only if a colour is added: `acai` (deep purple), `buriti` (orange-red), `cupuacu` (cream), `castanha` (Brazil nut brown), `jenipapo` (the blue-black fruit dye), `cacau`, `mate` (green), `jambu` (yellow flower), `solimoes` (sand).

---

## How the steps are run: directed, not drawn

Breno does about 95% of this playbook by directing agents rather than making things by hand, and part of the point is to find out how far design direction alone can go. Each step is a loop:

1. **Brief.** Breno writes the direction: what the step must produce, references, constraints from this playbook and the brief, and what "good" looks like.
2. **Batch.** Agents produce options: text in Markdown, layouts and boards in Paper (through the Paper MCP), images in Magnific, code in the repo.
3. **Pick and mark up.** Breno chooses, rejects with a reason, and comments on what to push.
4. **Iterate** until it's at a point he likes.
5. **Approve.** The result is written to its file; rejected directions stay on archive pages in Paper.

| Step | Where the agents work | What stays hands-on |
|---|---|---|
| 1. References | Web research agents; Paper for the boards | Choosing which brands and what matters in each |
| 2–5. Strategy, messaging, voice, proof | Markdown in the repo | Choosing the promise; judging the voice |
| 6–8. Direction, identity, graphic language | Paper | Judging at campaign scale; licensing a typeface if one is bought |
| 9–10. Photography, illustration | Magnific; Paper for the selects | Choosing the selects |
| 11. Motion | Code (Motion, shaders), Magnific video | Judging timing |
| 12–13. Touchpoints, campaign | Paper | The campaign idea itself, if no agent's idea is good enough |
| 14. Write it down | The repo | Approving each `brand/` file |

**Record what happens** in `docs/direction-log.md`, one row per step: rounds of prompting, time spent, what had to be done by hand and why. That log is the evidence for the case study's question of how much a brand can be directed rather than drawn.

---

## The steps

The order matters: each step uses the previous one's output. Each step ends with something you approve and a file that will later move into `brand/`.

### 1. Tear down five reference brands

**Goal:** see the full set of layers a finished brand has, and where Travessia should sit among them.

**Which brands:** Ramp (structure), Wise (closest product: cross-border money with the fee shown up front), Mercury (calm, premium fintech for startups), Nubank (Brazilian, and the bar every Brazilian user carries in their head), Stripe (proof and content as brand: Stripe Press, its docs, its annual letter). Keep the Amazônia territorial brand as the geography reference it already is.

**How:** for each brand, fill in the same table as the Ramp one above. Methods that worked for the Ramp research:
- The live site's CSS for colour tokens, type and usage counts (open dev tools, or ask an agent to extract and count them).
- The Wayback Machine for when the identity changed.
- Agency case studies (find the agency through Fonts In Use, Brand New and the agency's own site).
- Fonts In Use for typefaces and campaign photos.
- The press or media kit for official logos and photography.
- Meta Ad Library and LinkedIn's ad library for current ads; YouTube and Ads of the World for films.
- Job postings for team structure and what the brand team is measured on.
- Founder interviews for the founding tension in their own words.

**Inspiration sources beyond these five:** Savee, Are.na and Cosmos for mood; Mobbin for product UI; Brand New and It's Nice That for identities; The Brand Identity; Ads of the World for campaigns.

**Output:** a "References" page in Paper (one row per brand, same columns) and `brand/references.md` with the table and links.

**Done when:** you can name, for each brand, its promise, its accent and what it means, its type, how it shows the product, its photography and its biggest campaign.

### 2. Write the strategy on one page

**Goal:** the sentence everything else is checked against.

Write, in this order:
- **Tension:** what's wrong with how Brazilian freelancers get paid from abroad today, in one sentence with a number. (Ramp: cards reward spending more.)
- **Promise:** what Travessia changes, in one sentence. Then cut it to a line that can close every page. Write 30 candidates before choosing; Ramp's works because it bends a phrase everyone already knows.
- **Category word:** what Travessia is, in the words the audience would search for.
- **Beliefs:** three to five things Travessia believes that a bank wouldn't say.
- **Will and won't say:** the edges (no tax scare copy, no "hidden fees" outrage, no hype).

**Starting material:** SPEC §4.1–4.3, the "crossing" meaning of the name, the *Encontro das Águas* idea.

**Test:** read the promise next to Wise's and Nubank's. If it could belong to either, it isn't done.

**Output:** `brand/strategy.md`.

### 3. Build the messaging house

**Goal:** every page, deck and ad knows what it's allowed to say and in what order.

- **Roof:** the master promise from step 2.
- **Platform claim:** one sentence for the whole product.
- **Pillars:** the four features (international invoices, get paid and convert, automatic tax invoices, tax reports), each with an outcome headline, a plain one-line description and its proof point.
- **Audiences:** freelancers, studios, clients abroad, and accountants. Ramp treats accounting firms as a partner audience; Travessia's tax reports make accountants a natural fifth door.
- **Page template in words:** write Travessia's equivalent of Ramp's product page order (outcome head, plain subhead, CTA, proof strip, feature blocks, a customer's words, a comparison with the bank, FAQ, master promise). Compare it with the site's current feature pages and note what changes.

**Output:** `brand/messaging.md` (new file; add it to the brief's §5.2 table) and a list of site copy changes.

### 4. Write the voice with examples

**Goal:** a voice that a writer, or an agent, can apply without asking you.

- Three to five traits, each with a "this, not that" pair written in Travessia's own copy.
- The humour rule: what can be a joke (bank wires, SWIFT codes, the spreadsheet in January) and what never is (the freelancer, taxes as a threat, Brazil as a stereotype).
- How numbers appear (in headlines, always with a source in `proof.md`).
- How Portuguese terms appear (Pix, MEI, nota fiscal, carnê-leão with a short explanation the first time).
- **Test:** write 20 headlines for one feature in the voice, and 5 deliberately off-voice. If someone else can sort them correctly, the rules work.

**Output:** `brand/voice.md`.

### 5. Design the proof system

**Goal:** numbers that are consistent everywhere and work as visual material.

- List every number the brand uses, where it came from (made up, labelled fictional) and where it may appear.
- Customer story format without faces: lead metric, the customer's words, a picture of their work or place.
- One signature data piece, the equivalent of the Ramp AI Index: for example a yearly "what Brazilian freelancers earn from abroad" report, clearly fictional. It gives the blog, the press page and loud mode something to be about.
- A live-number device for the site, the equivalent of Ramp's ticking strip (for example reais delivered by Pix today), fictional and labelled.

**Output:** `brand/proof.md`, a customer story template, an outline of the data piece.

### 6. Choose the visual direction at campaign scale

**Goal:** check that the existing visual direction holds beyond the website before polishing it.

The site direction was decided page by page. Ramp's identity proves itself on buses and billboards. Make two or three territories in Paper, one of them the current direction pushed further. Apply each to the same three tests:
- a billboard with only the promise and the logo,
- a social post announcing one proof point,
- a deck cover.

Pick one territory. If the current one wins, this step costs a day and gives you confidence; if it loses, you've found out before encoding it.

**Output:** a Paper page "Direction · campaign scale" and a short written decision.

**Decided (2026-11-20, approved by Breno as the initial direction; polish comes in the next steps):**
- **Direction:** territory B's photography with territory A's waterline device. Three territories were tested (A Encontro, B Margem, C Urucum); the round 2 row on the Paper page "Brand · Direction at campaign scale" is the reference.
- **Photography:** close still lifes and aerials of the crossing, overcast and documentary; water always clean and clear. The aerial of two waters with one boat crossing the seam is the hero image.
- **Headline device, the waterline:** the promise split across dark and light. On a photo or the seam, the first half sits on dark water in white and the second on light water in rio-negro. On white, the first half is rio-negro and the second tapajós-700.
- **Seam texture:** stays, for product surfaces (product posts, cards riding the seam).
- **Type:** Figtree only, no serifs, no second face. The scale on the Paper page "Brand · Type study" ("One face, one rule"): every heading 600; leading falls from 1.53 (body) to 0.88 (200 px); tracking from 0 to −0.06em; amounts 500 with tabular figures. Encoded in tokens in step 7.
- **Loud mode (territory C):** urucum as a surface is kept for launches only; it stays one-per-view everywhere else.

### 7. Finish the core identity

**Goal:** a small, strict core, the way Ramp's is.

- **Logo:** pick the final mark from the Paper rounds. Draw construction, clear space, smallest sizes, the mark alone (app icon, favicon, avatar), and its use on every theme and on the seam texture.
- **Colour:**
  - Confirm what the accent means. Urucum is already "primary buttons only, one per view", like Ramp's yellow meaning "act here". Decide whether it can also mark money arriving, or whether that's tapajós's job.
  - Write proportions per surface (for example: neutrals 80%, rio-negro 15%, accent under 5%) and check them against the built site, the way the Ramp research counted class references.
  - Name the campaign-only colours separately from the core, from the held names above.
- **Type:**
  - Decide whether Figtree stays. A licensed grotesque with a stylistic set gives a stronger signature (TWK Lausanne for Ramp); the costs are the licence and replacing a face the whole site is tuned to.
  - If it changes, test three candidates on the billboard, the home hero and a dense table before choosing.
  - Either way, decide the headline device. Ramp's is the black-then-grey two-tone headline; Travessia needs one of its own.
  - Decide how numbers are set: tabular figures, and whether Geist Mono appears outside data.

**Output:** a "Core identity" page in Paper, token changes in `tokens.json`, and `brand/rules.md` (logo and colour rules).

**Decided (2026-11-20 to 2026-11-21, approved by Breno on 2026-11-21 as a base to keep refining):**
- **Type:** Figtree only; each size carries its own leading and tracking (`--leading-*`, `--tracking-*`). Headline device: the waterline.
- **Logo:** the woven ss wordmark cut by the waterline; clear space one x-height; 96 px minimum. The mark is the woven ss on the seam, seam version only, at every size.
- **Colour:** rio-negro and igarapé (#00C99B, new), with igarapé as the one accent for "act here" (one igarapé button per view, rio-negro text on it). Urucum left the core for campaigns after the accent study. Açaí dropped, no solimões, the seam is "two waters meeting". Picked from five palettes on the Paper page "Brand · Colour options".
- **Interface parts:** headings and button labels at 500; two-tone headlines with a solid lighter second line; tinted secondary buttons; rings inside soft shadows instead of borders; mist panels; radii 8, 12 and 20 px. Studied on the Paper page "Brand · Accent and UI study".
- **Hero:** the animated river from the shader lab (tile 8i), replacing the half-and-half seam from 1024 px.
- All in `brand/rules.md` and the tokens.

### 8. Write the graphic language rules

**Goal:** the parts that make a layout recognisable without the logo.

- **Seam texture:** when it appears, how much of a surface it may cover, which modes allow it, how it crops.
- **Product UI:** the crop, the density, the grid (Ramp's is the bento), which names, currencies and amounts appear, and that every amount comes from `proof.md` or `rates.json`.
- **Data visualisation:** the bank-versus-Travessia bars from the Home stats are already a signature; write them up as a reusable chart rule.
- **Icons:** pick a set or draw one, and write sizes and stroke.

- **Image treatments:** Ramp uses a lot of effects around its imagery: gradients, solid fields of light and textures behind product and photography. Research how Ramp (and the other references) build these, then define Travessia's own set (for example light across the waterline, seam-derived textures, solid fields in rio-negro or tapajós) and when each is allowed. Requested by Breno, 2026-11-20. Also (2026-11-21): **product UI over imagery**, as Notion does: an app window or cards floating over a painterly or photographic background, so the product sits inside the brand's world instead of on a flat colour. Candidates: the river shader, the step 6 photography, the seam.

**Output:** a "Graphic language" section in `brand/rules.md`.

**Decided (2026-11-21, approved by Breno):** imagery with a job each (the river for the hero and motion, painted clear water and the painted meeting for product shots and moments, photography for specific uses, mist for dense explanations); the seam retired everywhere, the mark redrawn on painted water; product UI on one ledger with crop and density rules; four chart forms; Hugeicons; "ring, lit" buttons; ciliar as a second campaign colour. Everything is in `brand/rules.md` and live on the site. Step 9 (photography) picks up the About photo's muddy water and the story and blog covers still on halftone and dither.

**Progress (2026-11-21):** image treatments drafted and written up in `brand/rules.md` ("Graphic language: imagery"). Five kinds of imagery with a job each: the river, painted clear water, painted meeting, photography, mist. Product UI only over paintings or the river. Four type-on-image approaches kept, chosen by format: quiet zone, copy outside the image, soft scrim, frosted plate (not on paintings). Boards on the Paper page "Brand · Graphic language". The river now also renders as stills (`scripts/build-river-stills.ts`). App window v3 polished in Paper and brought to the site (tags trimmed to cap height). **Seam retired (2026-11-21):** after a review of its 13 surfaces (Paper "5 · Seam review"), every seam band on the site moved to a painting, the river or photography, and the seam engine was deleted; rules in `brand/rules.md` ("The seam is retired"). The mark followed: Breno picked A1 from the Paper board "Logo · the mark without the dither" (the ss on painted clear water with a soft tint above, a flat split at 48 px and below); new icons in `public/`. Product UI rules written (crops, density, the bento grid) and a product ledger added to `brand/proof.md`; the site's mock-ups were brought in line with it (amounts, invoice numbers, clients, and dates moved onto 2026 business days). Chart rules written (four forms, colour follows the entity, validated for colour blindness; Paper "6 · Charts"); the home comparison now draws the bank's range. Ana moved to Simples Nacional (her revenue is far above the MEI limit); her story, the showcase report and the taxes feature page follow. Icons: Hugeicons stroke rounded, picked by Breno from six sets (Paper "7 · Icons"). Buttons: "Ring, lit", picked from four (Paper "8 · Buttons"). Both built into the site, buttons with optical alignment for icons. Ciliar (#D2F08C), a riverbank lime, added as a campaign-only colour like urucum (Paper "9 · Lime study"). Step 8 is ready for review. Still to do outside step 8: the story and blog covers still on halftone and dither.

### 9. Direct the photography

**Goal:** a photography style that is Travessia's and works within the brief's limits.

1. Write the direction: subjects (work settings, hands, objects, places along rivers and in Brazilian cities, the work itself), light, colour grade, framing, and what is never shown (faces presented as customers, banknotes, bank or card logos, stereotypes).
2. Pick a second register like Ramp's staged campaign photos. Ramp shows finance people doing the opposite of finance; Travessia could show the crossing itself (a boat, a bridge, a ferry ticket, a river meeting) as still lifes.
3. Collect 30 reference photos, then generate a test set of about 40 with Magnific from a single prompt recipe. Choose 10 and adjust the recipe until a new batch gives mostly yeses.
4. Check them against the palette: do they sit on papel and on noite?

**Output:** `brand/imagery.md` with the direction, references, the prompt recipe and the 10 approved images.

**Decided (2026-11-21, approved by Breno):** one register, not two: Brazilian rivers and what crosses them (aerials of two waters meeting, boats and ferries, bridges from below, docks, flooded and riverbank forest), with people only far away. The still-life and work-setting references were dropped as stock photography. One prompt recipe (overcast, clean dark green-teal water, a quiet dark third, the sky low or out, a named Brazilian tropical setting, boats that differ). Three batches with Nano Banana 2.1 through Magnific (36 images, 1,830 credits); 21 approved, and the last batch gave five yeses out of six. The white and rio-negro check led to one rule: every photo carries the theme ring inside its edge. Photographs now carry the About hero, seven story covers, four blog categories and their hero panels; the halftone and dither covers are gone. Everything is in `brand/imagery.md` and live on the site.

### 10. Decide illustration and 3D

**Goal:** a clear yes or no on each.

Ramp uses 3D renders of its card. Travessia has no card; its object is the invoice and the payment link. Options: a 3D invoice or phone render set, flat route-and-river illustration (SPEC §4.3), or neither, relying on product UI, seams and photography. Make a small test of each and decide. Less is better here: every extra style is something the system has to keep consistent.

**Output:** a decision in `brand/imagery.md`; assets in `src/assets/illustration-kit/` only if the answer is yes.

**Decided (2026-11-24, approved by Breno):** no to both. One test of each option on the same three jobs (an app empty state, a three-step explainer, a launch post; Paper "Brand · Illustration and 3D"). The 3D invoice and phone read as stock and fought a white app screen; flat illustration said less than the product UI with real ledger numbers, and would have been a fifth style. Empty states use an icon on an igarapé-50 disc, explainers use product UI, posts use the paintings or photographs. The paper-boat render (an invoice folded into a boat, crossing the two waters) is parked for step 13 as a campaign idea. No `src/assets/illustration-kit/`. Written up in `brand/imagery.md`.

### 11. Set motion and sound

**Goal:** how the brand moves.

- Principles: speed, easing, what moves and what never does, reduced-motion behaviour.
- A 3–5 second logo sting.
- The seam texture in motion (the shader idea already noted for texture-lab).
- How product UI animates in demos (Ramp's hero is a UI demo with a cursor and live counters).

**Output:** `brand/motion.md`, the sting, one seam animation test.

**Progress (2026-11-24):** the sting is decided: C1 · From the mark (`docs/design/motion/v2/sting-C1.mp4`), after three rounds and an easing pass read off a speed graph. The seam animation test is replaced by the river, since the seam was retired in step 8. Still open: product UI in demos, and sound.

### 12. Apply it to twelve touchpoints

**Goal:** see the whole brand at once and fix what doesn't hold. This is where it gets polished.

Make each one in Paper and put them on one wall:
1. Home hero
2. One feature page, top to bottom
3. A sales deck: cover and three slides
4. A one-pager
5. A billboard
6. A bus side or a vertical street poster
7. Three social posts (a proof point, a customer story, a product feature)
8. A launch email
9. A product notification (money arrived)
10. App icon and favicon
11. One piece of merchandise
12. A storyboard for a 30-second film

Review the wall for one question at a time: is the promise there, is the accent used for one thing, is the voice the same, does the photography belong. Every fix goes back into the file from the step it came from.

**Output:** a Paper page "Touchpoints". Approved pieces become the first approved examples (brief §5.4).

### 13. Make one launch campaign

**Goal:** the brand at full volume, which is how Ramp's became known.

Ramp's campaigns share a structure: the old way shown as a physical burden (a pile of receipts, a glass box), the product shown removing it, and a live element. Write one concept for Travessia on the same structure, for example a bank wire and a Travessia payment racing in real time, with the wire's fees and days counted on a public screen. Deliver the line, three out-of-home executions, the film storyboard from step 12, a social plan and the live element's mechanics.

One idea is waiting from step 10: the paper boat, an invoice folded into a boat crossing from dark water into clear igarapé (`docs/design/illustration/3d/`). Consider it as the campaign's single image; it is not a system style.

**Output:** `brand/campaigns/launch.md` and a Paper page. This is art direction, not a system mode: loud mode's rules are still written in brief Phase 4, from this campaign.

### 14. Write it all down

**Goal:** the brand in files an agent can read, which is the start of the system.

| Step | File |
|---|---|
| 1. References | `brand/references.md` |
| 2. Strategy | `brand/strategy.md` |
| 3. Messaging | `brand/messaging.md` |
| 4. Voice | `brand/voice.md` |
| 5. Proof | `brand/proof.md` |
| 6–8. Identity and graphic language | `brand/rules.md`, `tokens.json` |
| 9–10. Imagery | `brand/imagery.md` |
| 11. Motion | `brand/motion.md` |
| 12. Touchpoints | `brand/examples/<format>/` |
| 13. Campaign | `brand/campaigns/` (loud mode is written from it in Phase 4) |
| Audience (from steps 2–3) | `brand/audience.md` |
| Product truths (from SPEC §4.1 and the site) | `brand/product-truths.md` |

`brand/sources.md` records where each claim came from, as the brief already asks.

---

## Open decisions

- ~~**The seam story.**~~ Decided 2026-11-21: "two waters meeting" in general (rio-negro and igarapé); no `solimoes`.
- ~~**Typeface.**~~ Decided 2026-11-20: Figtree stays.
- ~~**Illustration.**~~ Decided 2026-11-24 (step 10): no illustration style and no 3D.
- ~~**Step 7 accent and UI direction**~~ (Breno, 2026-11-21, done: from the Paper page "Brand · Accent and UI study" and `brand/references.md` "Accent use and UI craft"). Agreed: one accent, igarapé, for "act here", with rio-negro sharing the primary buttons; urucum leaves the core for campaigns. Headlines use the two-tone (second half in 60% rio-negro) at weight 500, −0.02em. Button labels 500. No borders: a faint 1 px ring inside a very soft shadow. Neutral panels instead of mint. Hero, decided for now (2026-11-21): the river from the shader lab, tile 8i in `docs/design/shader-lab/river5.html` (shader saved as `docs/design/shader-lab/hero-river-8i.frag`). A single igarapé river with drifting white streaks on a dark field, clean one-pixel echo lines along its banks, and a width that slowly swells and narrows. It replaces the half-and-half seam, so the igarapé button no longer sits next to a wall of igarapé. Reached in six lab rounds (shader lab, then river labs 1 to 5). The headline's second line still needs a solid colour instead of 55% white (lab buttons: fog, silver, igarapé-100, igarapé-300). Built into the site on 2026-11-21.
- **Button styling experiment.** Breno likes some of Cloudflare's and Nucleo Icons' buttons. Try them as a variant once the core parts are in code (step 8 or a UI polish pass).

Raised by step 1 (`brand/references.md`, "Where Travessia overlaps", 2026-11-20). These are notes, not blockers: Travessia is fictional, and the outputs and the system behind them are what the project is for (Breno, 2026-11-20). Act on one when it's cheap or when it makes the work better, not to avoid a competitor.
- **Where the promise comes from.** Wise already sells BRL balances and Pix payouts in Brazil and has a freelancer segment; Nubank has multi-currency accounts. Fee and speed can't carry the strategy; the export tax invoice and the accountant's report are unclaimed (step 2).
- **The bank-versus-Travessia bars.** Wise's green-versus-grey comparison bars are one of its signature images. Keep the comparison, find another form (step 8).
- ~~**The held `acai` colour.**~~ Dropped 2026-11-21 (step 7): a deep purple reads as Nubank to Brazilian readers.
- **River photography.** Mercury's hero is a misty river valley and its 2026 campaign art is a canoe crossing. Keep river imagery to close, water-level objects (step 9). Step 9 went further than this note (aerials and wide river views too), on the view that Travessia is fictional and the system matters more than the overlap; the quiet-third framing and the Brazilian setting keep it apart from Mercury's misty valleys.
- ~~**A sandy `solimoes`.**~~ Not added 2026-11-21 (step 7): the seam stays dark and clear.

Decided on 2026-11-19: this playbook is brief Phase 1, "Brand build and consolidation" (brief §8).

---

## Sources

Strategy, messaging and campaigns:
- TechCrunch, launch, Feb 2020: https://techcrunch.com/2020/02/12/ramp-is-a-corporate-card-focused-on-helping-you-spend-less
- Ramp blog, 2023 platform framing: https://ramp.com/blog/future-of-finance-running-on-ramp
- ramp.com home, product pages and customers (read 2026-11-19): https://ramp.com, https://ramp.com/expense-management, https://ramp.com/accounts-payable, https://ramp.com/customers
- Ramp careers: https://ramp.com/careers
- Ramp data and AI Index: https://ramp.com/data
- State of Brand on Ramp's B2B brand strategy: https://www.thestateofbrand.com/news/ramp-b2b-saas-brand-strategy
- Marketing Brew on the Baumgartner livestream: https://marketingbrew.com/stories/2025/10/22/ramp-viral-livestream-brian-baumgartner
- Ads of the World, "Multiply What's Possible": https://www.adsoftheworld.com/campaigns/multiply-what-s-possible
- Ramp blog on the Saquon Barkley ad: https://ramp.com/blog/welcoming-the-nfls-saquon-barkley-to-the-ramp-roster
- beehiiv case study (Leading Indicators): https://www.beehiiv.com/case-studies/ramp
- Exit Five on Ramp's marketers as builders: https://exitfive.com/newsletter/how-ramp-is-turning-its-marketers-into-builders-with-ai3/
- Head of Brand posting: https://www.builtinnyc.com/job/head-brand/10030506

Identity and visual system:
- Red Antler: https://redantler.com/work/ramp
- Bakken & Bæck: https://bakkenbaeck.com/case/ramp
- INK: https://weareink.co.uk/work/ramp
- Fuzzco, "Doing Finance": https://www.fuzzco.com/work/ramp-doing-finance-campaign
- Fonts In Use, 2023 campaign: https://fontsinuse.com/uses/56961/ramp-2023-campaign
- Fonts In Use, "Doing Finance": https://www.fontsinuse.com/uses/56962/doing-finance-campaign-by-ramp
- Framestore, Super Bowl LX VFX: https://framestore.com/news/ramp-brian-baumgartner-are-all-about-multiplication
- Wayback Machine, ramp.com in June 2022: http://web.archive.org/web/20220601113847/https://ramp.com/
- Ramp press and media kit: https://ramp.com/press

The system:
- Paul Jun, "Brand as software": https://pauljun.substack.com/p/brand-as-software
- Paul Jun, "Brand as infrastructure" (17 Nov 2026): https://pauljun.substack.com/p/brand-as-infrastructure
- State of Brand on Paul Jun and Ramp: https://www.thestateofbrand.com/news/ramp-brand-as-software-paul-jun
- Notion customer story (Ramp's "Creative Chris" request agent): https://www.notion.com/customers/ramp
