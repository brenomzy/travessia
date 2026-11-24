# Motion tests (playbook step 11)

- `sting.html`: three 4-second logo stings (A waterline, B the crossing, C mark first), built from the site's wordmark. Open with the "motion-lab" server in `.claude/launch.json` (port 4331). `?t=1.2` freezes every sting at that time.
- `sting.template.html` + `build_sting.py`: the page source; the script copies the wordmark from `dist/index.html` (run `npm run build` first).
- `sting-A.mp4`, `sting-B.mp4`, `sting-C.mp4`: 1280 × 720, 30 fps, 5 s, rendered frame by frame from `sting.html` with Playwright and ffmpeg.
- `icon-512.png`: a copy of `public/icon-512.png` for sting C.
- `ui-demo/`: the product UI demo test (`brand/motion.md`, "Product UI in demos"). Start the "ui-demo" server in `.claude/launch.json` (port 4332); `?poster` shows the last frame. `record.mjs` steps the kit's virtual clock frame by frame and writes `ui-demo.mp4` (1920 × 1080, 60 fps); `REHEARSAL.md` lists what was checked.
