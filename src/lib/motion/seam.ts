/**
 * Runs the seam shaders (src/lib/generators/seam) on every `canvas[data-seam]` on the page.
 *
 * The PNG under the canvas is the still and the fallback. The canvas only shows once its first frame is drawn, and
 * that frame matches the PNG, so the swap can't be seen. Nothing runs with reduced motion, without WebGL2, or while
 * the seam is off screen or the tab is hidden; time only advances while it runs, so it resumes where it stopped.
 * Frames step at 15 per second: pixel art reads better stepped, and it's a quarter of the GPU work.
 */
import { createSeamRenderer, MOTION_PRESETS, type SeamRenderer } from '../generators/seam';

const FPS = 15;

/** '#0F1C24' or 'rgb(15, 28, 36)' → [15, 28, 36] */
function rgb(value: string): [number, number, number] {
  const v = value.trim();
  if (v.startsWith('#')) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join('') : v.slice(1, 7);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
  }
  const m = v.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
  return [m[0], m[1], m[2]];
}

function start(canvas: HTMLCanvasElement): void {
  const d = canvas.dataset;
  const css = getComputedStyle(canvas);
  const renderer: SeamRenderer | null = createSeamRenderer(canvas, {
    width: Number(d.width),
    height: Number(d.height),
    cell: Number(d.cell ?? 6),
    at: Number(d.at),
    amp: Number(d.amp),
    dark: rgb(css.getPropertyValue('--color-seam-dark')),
    light: rgb(css.getPropertyValue('--color-seam-light')),
    motion: MOTION_PRESETS[d.seam ?? 'river'] ?? MOTION_PRESETS.river,
  });
  if (!renderer) return;

  renderer.render(0);
  canvas.dataset.ready = '';

  let time = 0;
  let last = 0;
  let frame = 0;
  let visible = false;

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    if (now - last < 1000 / FPS) return;
    time += Math.min(now - last, 250) / 1000;
    last = now;
    renderer.render(time);
  };
  const run = () => {
    if (frame || !visible || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) run();
    else stop();
  }).observe(canvas.parentElement ?? canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : run()));

  // Turning reduced motion on mid-visit drops back to the PNG.
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (!e.matches) return;
    stop();
    delete canvas.dataset.ready;
    renderer.destroy();
  });
}

export function initSeams(root: ParentNode = document): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.querySelectorAll<HTMLCanvasElement>('canvas[data-seam]').forEach((c) => {
    // Seams hidden at this width (display: none) start when they first get a box.
    if (c.getClientRects().length > 0) return start(c);
    const ro = new ResizeObserver(() => {
      if (c.getClientRects().length === 0) return;
      ro.disconnect();
      start(c);
    });
    ro.observe(c);
  });
}
