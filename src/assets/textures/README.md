# Textures

The approved seam and strip stills from the Paper design, copied unchanged from `docs/design/texture-lab/reference/` (they reproduce byte for byte from the scripts there). They are design assets, not generator output, so they live here and not in `src/assets/generated/`.

When the seam generator is ported to `src/lib/generators/` (V7), its outputs go to `src/assets/generated/` with a `recipe.json`, and these files can go.

| File | Used in |
|---|---|
| `seam-40.png` | Home hero, from 1024 px |
| `mobile-seam-v2.png` | Home hero seam band, below 1024 px |
| `seam-cta.png` | Final CTA, from 1024 px |
| `strip-tap-noite.png` | Final CTA strip below 1024 px (flipped) |
| `seam-50.png`, `hseam.png` | Not used yet: waitlist page, inner-page CTA |

## Blog covers (`covers/`)

One pattern per blog category, copied from the Paper page "Blog covers → Covers by category". The cover component (`PostCover.astro`) lays the post title over them in HTML until the Cover Studio (V1) generates real per-post covers with a `recipe.json`.

| File | Category |
|---|---|
| `covers/exchange.png` | Câmbio / Exchange: noite meets tapajós along a vertical seam |
| `covers/taxes.png` | Impostos / Taxes: terraced halftone on mist |
| `covers/invoices.png` | Faturas / Invoices: dithered ledger bars on white |
| `covers/guides.png` | Guias / Guides: a halftone river on white |
| `covers/news.png` | Novidades / News: release streaks on noite |
