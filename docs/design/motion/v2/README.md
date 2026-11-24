# Logo stings, round 2

Playbook step 11. Three stings built from the real wordmark (paths copied from `src/components/ui/Logo.astro` into `logo-paths.js`); decisions and rules in `brand/motion.md`.

- `index.html?s=c|d|e`: plays a sting live (motion-lab server, port 4331: `/v2/index.html`). `&t=2.5` shows one frame.
- `engine.js`: splits the wordmark into letters (the woven ss as one sprite), draws them into three mask layers, composites on the GPU and averages sub-frames for motion blur.
- `sting-c.js`, `sting-d.js`, `sting-e.js`: the choreography, one file each.
- `render.mjs`: renders an MP4 at 1920 × 1080, 60 fps, 12 sub-frames (needs Playwright and ffmpeg; see the header).
- `sting-C.mp4`, `sting-D.mp4`, `sting-E.mp4`: the renders.
- `clear-water-portrait.png`: a copy of `src/assets/imagery/clear-water-portrait.png` for sting C.
