/**
 * Runs the river shader (src/lib/generators/river) on every `canvas[data-river]` on the page.
 *
 * The canvas fades in once its first frame is drawn; until then, and without WebGL2 or JavaScript, the section's own
 * rio-negro background shows. With reduced motion it draws one still frame and stops. It only animates while on screen
 * and while the tab is visible, at 30 frames a second, and time only advances while it runs.
 */
import { createRiverRenderer, type Rgb, type RiverRenderer } from '../generators/river';

const FPS = 30;
/** The lab's clock started at 40 s; starting there keeps the river exactly as it was chosen. */
const START = 40;

/** '#0F1C24' or 'rgb(15, 28, 36)' → [15, 28, 36] */
function rgb(value: string): Rgb {
  const v = value.trim();
  if (v.startsWith('#')) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join('') : v.slice(1, 7);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;
  }
  const m = v.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
  return [m[0], m[1], m[2]];
}

function start(canvas: HTMLCanvasElement): void {
  const css = getComputedStyle(canvas);
  const token = (name: string) => rgb(css.getPropertyValue(`--color-river-${name}`));
  const renderer: RiverRenderer | null = createRiverRenderer(canvas, {
    dark: token('land'),
    light: token('light'),
    foam: token('foam'),
    shallow: token('shallow'),
    deep: token('deep'),
    echo: token('echo'),
    at: Number(canvas.dataset.at ?? 0.66),
    dpr: Math.min(window.devicePixelRatio || 1, 1.5),
  });
  if (!renderer) return;

  let time = START;
  renderer.render(time);
  canvas.dataset.ready = '';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
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
    if (frame || !visible || document.hidden || reduce.matches) return;
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
  reduce.addEventListener('change', () => (reduce.matches ? stop() : run()));
  // Keep the still sharp when the box changes size while paused.
  new ResizeObserver(() => {
    if (!frame) renderer.render(time);
  }).observe(canvas);
}

export function initRivers(root: ParentNode = document): void {
  root.querySelectorAll<HTMLCanvasElement>('canvas[data-river]').forEach((c) => {
    if (c.dataset.riverInit) return;
    c.dataset.riverInit = '';
    // Rivers hidden at this width (display: none) start when they first get a box.
    if (c.getClientRects().length > 0) return start(c);
    const ro = new ResizeObserver(() => {
      if (c.getClientRects().length === 0) return;
      ro.disconnect();
      start(c);
    });
    ro.observe(c);
  });
}
