# Textures

Pattern stills from the Paper design. They are design assets, not generator output, so they live here and not in `src/assets/generated/`.

The dithered seam textures (`seam-40`, `seam-50`, `seam-cta`, `hseam`, `mobile-seam-v2`, `strip-tap-noite`) and the seam shader were retired on 2026-11-21 (playbook step 8): the paintings in `src/assets/imagery/` and the river replaced them. The scripts that made them are still in `docs/design/texture-lab/`, and the logo mark keeps its own exported seam square until the mark is redrawn.

## Blog covers (`covers/`)

One pattern per blog category (Exchange now uses the painted meeting from `src/assets/imagery/`), copied from the Paper page "Blog covers → Covers by category". The cover component (`PostCover.astro`) lays the post title over them in HTML until the brand system generates real per-post covers with a `recipe.json`.

| File | Category |
|---|---|
| `covers/taxes.png` | Impostos / Taxes: terraced halftone on mist |
| `covers/invoices.png` | Faturas / Invoices: dithered ledger bars on white |
| `covers/guides.png` | Guias / Guides: a halftone river on white |
| `covers/news.png` | Novidades / News: release streaks on rio-negro |
