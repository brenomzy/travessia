// Records the product UI demo to MP4 at 1920 × 1080, 60 fps, by stepping the kit's virtual clock one frame at a
// time (every render is identical, nothing drops). Needs the ui-demo server (.claude/launch.json, port 4332),
// Playwright and ffmpeg:
//   PLAYWRIGHT=/path/to/playwright/index.mjs node docs/design/motion/ui-demo/record.mjs [seconds]
//   ... record.mjs --stills 1,4.5,9 [out-dir]     (PNG stills at those times)
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright');

const args = process.argv.slice(2);
const stills = args[0] === '--stills' ? args[1].split(',').map(Number) : null;
const seconds = stills ? Math.max(...stills) : +(args[0] || 12.5);
const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = stills ? args[2] || here : here;
const frames = path.join(process.env.TMPDIR || '/tmp', 'ui-demo-frames');
const fps = 60;

const browser = await chromium.launch({ executablePath: process.env.CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 4 / 3 });
page.on('console', (m) => m.type() === 'error' && console.error(m.text()));
page.on('pageerror', (e) => console.error(e.message));
await page.goto('http://localhost:4332/?record');
await page.waitForFunction(() => window.__stageshow?.clock, null, { timeout: 30000 });
const step = () =>
  page.evaluate(async () => {
    const c = window.__stageshow.clock;
    await c.step(1);
    for (let i = 0; i < 4 && c.layoutPending; i++) await c.flushLayout();
  });
// Time stands still until stepped, so the first render waits on a few frames; then frame 0 is the scene's start.
await page.evaluate(() => document.fonts.ready);
for (let i = 0; i < 600 && !(await page.$('.ss-stage')); i++) await step();
const stage = page.locator('.ss-stage');

if (stills) {
  let f = 0;
  for (const t of [...stills].sort((a, b) => a - b)) {
    for (; f < Math.round(t * fps); f++) await step();
    await stage.screenshot({ path: path.join(outDir, `ui-${t}.png`) });
  }
} else {
  rmSync(frames, { recursive: true, force: true });
  mkdirSync(frames, { recursive: true });
  const total = Math.round(seconds * fps);
  for (let f = 0; f < total; f++) {
    await step();
    await stage.screenshot({ path: path.join(frames, String(f).padStart(4, '0') + '.png') });
    if (f % 60 === 0) process.stdout.write(`${f}/${total} `);
  }
  const mp4 = path.join(outDir, 'ui-demo.mp4');
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(fps), '-i', path.join(frames, '%04d.png'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
  console.log('\nwrote', mp4);
}
await browser.close();
