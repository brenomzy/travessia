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
