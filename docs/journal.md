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

## Phase entries

<!-- At the end of every phase: what worked better, what was worse or missing, what I'd charge a client for, and what changed in the preview. -->
