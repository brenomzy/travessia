// Renders a sting to MP4, frame by frame, with sub-frame motion blur.
// Needs the motion-lab server (.claude/launch.json, port 4331), Playwright and ffmpeg:
//   PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node docs/design/motion/v2/render.mjs d [subframes] [out-dir]
//   ... render.mjs d --stills 0.5,1,1.5   (PNG stills only)
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright');

const [id = 'd', a2 = '12', a3] = process.argv.slice(2);
const stills = a2 === '--stills' ? a3.split(',').map(Number) : null;
const n = stills ? 12 : +a2;
const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = (!stills && a3) || here;
const frames = path.join(process.env.TMPDIR || '/tmp', `sting-${id}-frames`);
const fps = 60;

const browser = await chromium.launch({ executablePath: process.env.CHROME, args: ['--use-angle=metal', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('console', (m) => m.type() === 'error' && console.error(m.text()));
page.on('pageerror', (e) => console.error(e.message));
await page.goto(`http://localhost:4331/v2/index.html?s=${id}&render=1`);
await page.waitForFunction(() => window.ready === true, null, { timeout: 30000 });
const duration = await page.evaluate(() => window.player.duration);
const shot = (file) => page.locator('canvas').screenshot({ path: file });

if (stills) {
  for (const t of stills) { await page.evaluate(([t, n]) => window.player.frame(t, n), [t, n]); await shot(path.join(here, `still-${id}-${t}.png`)); }
} else {
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });
  const total = Math.round(duration * fps);
  for (let f = 0; f <= total; f++) {
    await page.evaluate(([t, n]) => window.player.frame(t, n), [f / fps, n]);
    await shot(path.join(frames, String(f).padStart(4, '0') + '.png'));
    if (f % 60 === 0) process.stdout.write(`${f}/${total} `);
  }
  const mp4 = path.join(outDir, `sting-${id.toUpperCase()}.mp4`);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(fps), '-i', path.join(frames, '%04d.png'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
  console.log('\nwrote', mp4);
}
await browser.close();
