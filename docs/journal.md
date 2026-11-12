# Test journal

The format comes from SPEC §16. Note the Source build or milestone with every entry.

## Log

| Date | Area | What I tried | Expected | What happened | Severity (blocker/major/minor/nice) | Feedback sent? |
|---|---|---|---|---|---|---|
| 2026-11-11 | Setup | Scaffolded with `npm create astro@latest -- --template minimal`, added React, sitemap, Base UI, Motion and tooling | Clean build | | | |
| 2026-11-12 | Paper | Reorganized the Paper file: build pages first (Design system, Home, three page groups, Blog covers), then a divider and the exploration pages prefixed "Archive ·". Chosen boards renamed with "· chosen" / "· adopted" / "· shortlisted". | Designers and agents can tell finished design from history | Done | nice | No |
| 2026-11-12 | Tokens | `tokens.json` (DTCG style) from the Paper Design system; `npm run tokens` writes `tokens.css` + `tokens.ts` and checks WCAG AA for 5 section themes (light, tint, primary, deep, dark). Added `data-theme-laptop` so a block can change theme where the seam turns vertical. | One source of truth, contrast enforced | Works; all pairs pass | — | No |
| 2026-11-12 | Fonts | Astro 7's built-in Fonts API (Google provider) self-hosts Figtree and Geist Mono, so no font library was added to §5.6 | Self-hosted, subset, swap | Works; 3 font files at build | — | No |
| 2026-11-12 | Source | Source's own dev server (port 4321) returned 500 after `src/content.config.ts` was added: it kept the old content layer. `astro build` was fine. | Preview picks up outside edits (DX-03) | Needs a restart of Source's preview when collections are added. Didn't restart it from outside so Source keeps ownership of its process. | minor | No |
| 2026-11-12 | Base UI | MobileNav (Drawer) with `client:media="(width < 80rem)"`. Keyboard: Escape closes, focus returns to the trigger. The drawer needed `z-index` above the header. | Accessible drawer, no JS on wide screens | Works. Cost when it loads: React client 65.0 KB gz + react-dom 4.3 KB gz + MobileNav 30.6 KB gz. Nothing loads at 1280 px and up. | — | No |
| 2026-11-12 | Source | Source's preview kept the old content layer and served 500s; its dev server didn't react to config edits either. Stopped it with `astro dev stop` (with the user's OK). Source did not restart it by itself. | Preview follows outside edits | Has to be started again from Source after new content collections | minor | No |
| 2026-11-12 | Base UI | FeatureTabs (Tabs + Indicator, `keepMounted` so all four panels are in the server HTML) and BillingToggle (ToggleGroup that only flips `data-billing`; both prices are server-rendered). Indicator slides with a CSS transition, no Motion needed. | Accessible tabs and toggle, styled with tokens | Work at all widths; React runtime now loads on Home at every width because these are `client:visible` | — | No |
| 2026-11-12 | Motion | Reveal helper in `src/lib/motion/`, opted into with `data-reveal`, `data-reveal-stagger` and `data-count-up` plus `<MotionScript />`. First version used Motion's full `animate`: 26.5 KB gz. `motion/mini` + a requestAnimationFrame count-up: 4.9 KB gz (DX-26). | Small, token-timed, safe without JS | Kept the smaller version, then rewrote it (next row) | — | No |
| 2026-11-12 | Motion | Blur-in reveal after brenodaroz.com: opacity on `ease.fade` (300 ms), blur clearing over 700 ms, lift on `spring.crit` (800 ms), 80 ms stagger. Motion's mini `animate` can't take a CSS `linear()` spring string, so CSS transitions do the animating and Motion only supplies `inView`. Start state only applies after the script marks `<html data-motion="ready">`, on screens, with motion allowed. Elements get `data-reveal-done` when their transitions finish so component transitions (card hover shadow) work again. | Same feel as the personal site | Works; 2.3 KB gz on pages that use it | — | No |
| 2026-11-12 | Tokens | Easings and springs from brenodaroz.com, same names: `--ease-base`, `-out`, `-in`, `-expo`, `-fade`, `-hover`, `-reveal`, `--spring-base/-crit/-gentle/-bounce` (CSS `linear()`). New token type `easing` in `build-tokens.ts`. Components remapped: hover feedback on `ease-hover`, fades on `ease-fade`, drawer on `ease-expo`, tabs indicator on `spring-crit`. `tokens.ts` now exports `motion` on its own so client scripts don't bundle every token. | One motion vocabulary across both sites | Works | — | No |
| 2026-11-12 | Skills | Wrote `add-component`, `add-token` and `build-section` in `.agents/skills/` (SPEC §11.3). | Ready for DX-17 | Not yet tested with Source's agent | — | No |
| 2026-11-12 | Base UI | DX-24, keyboard part. MobileNav: opens on Enter, focus moves into the dialog, page behind is `aria-hidden`, Escape closes and focus returns to the trigger. Tab past the last link went to the skip link and logo for two stops before coming back to "Fechar menu". The browser pane was hidden at the time, which throttles frames, so this may be a test artefact. FeatureTabs: arrows, Home and End move and select; each tab's `aria-controls` points at its panel. VoiceOver not run yet. | No focus traps, focus returns, correct roles | Partly done: recheck the drawer's Tab wrap with a visible window, then VoiceOver | minor | No |
| 2026-11-12 | Base UI | MainNav (NavigationMenu with dropdowns, SPEC §5.6.1) not built: the Paper header is four flat links, which are plain `<a>` with no JS on wide screens. Revisit when Resources pages (blog, changelog) need a dropdown. | — | Deferred | — | No |

## Phase entries

<!-- At the end of every phase: what worked better, what was worse or missing, what I'd charge a client for, and what changed in the preview. -->

### Phase 1: Foundation (2026-11-12)

**Done:** tokens pipeline with WCAG check, CSS layers, layout primitives, Stylelint, BaseLayout, header, footer, banner, UI components, MobileNav, the Motion reveal helper, `/styleguide`, PT-BR and EN routing, the first three project skills. Home was also built in full, ahead of Phase 2.

**Not done:** `design.md` through Source (needs Source's agent, SPEC §8), the Brand System view check, MainNav dropdowns (not in the design), VoiceOver for DX-24.

**JS per page** (gzipped, everything that can load): Home 111.4 KB, of which React runtime 65 KB, MobileNav 26 KB (below 1280 px only), FeatureTabs 4.7 KB, BillingToggle 1.4 KB, Motion reveal 2.3 KB, shared Base UI chunks about 10 KB. At 1280 px and up MobileNav doesn't load, so about 85 KB.

- **Better than classic Webflow or my usual setup:** tokens as one JSON file with a contrast check that fails the build; section themes as a data attribute; Paper's code export gave exact values, so the hero matched on the first pass.
- **Worse or missing:** Source's preview didn't pick up a new content config and had to be restarted from Source; with Source holding port 4321, my own checks run on a production build at 4322 instead of a dev server. Motion's convenient API is heavy (26.5 KB gz for `animate`), so the reveal ended up mostly CSS.
- **What I'd charge a client for:** the token pipeline and contrast check, the layout primitives and the styleguide, about 3 days. The skills are what keep a client's agent edits in line later.
- **Preview changes since the last entry:** none seen in Source itself; the restart is still manual.
