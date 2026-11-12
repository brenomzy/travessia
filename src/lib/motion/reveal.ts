/**
 * Blur-in scroll reveals (SPEC §5.6.2), after brenodaroz.com. Opt in with attributes:
 * - `data-reveal` on a block reveals it when it scrolls into view.
 * - `data-reveal-stagger` on a list reveals each child in turn, `duration.stagger` apart.
 *
 * CSS does the animating (src/styles/motion.css), timed by the `reveal.*`, `ease.fade` and
 * `spring.crit` tokens. Motion only supplies `inView`, so this costs about 1 KB.
 */
import { inView } from 'motion';

/** Children after this many start together, so long lists don't drag. */
const MAX_STAGGER = 8;

export function initReveal(root: ParentNode = document): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]');
  if (targets.length === 0) return;

  for (const group of root.querySelectorAll<HTMLElement>('[data-reveal-stagger]')) {
    Array.from(group.children).forEach((child, i) => {
      (child as HTMLElement).style.setProperty('--reveal-index', String(Math.min(i, MAX_STAGGER)));
    });
  }
  document.documentElement.dataset.motion = 'ready';

  inView(
    targets,
    (el) => {
      el.setAttribute('data-revealed', '');
      const items = el.hasAttribute('data-reveal-stagger') ? Array.from(el.children) : [el];
      for (const item of items) {
        getComputedStyle(item).opacity; // flush styles so the transitions exist before we wait on them
        Promise.all(item.getAnimations().map((a) => a.finished))
          .catch(() => undefined)
          .then(() => item.setAttribute('data-reveal-done', ''));
      }
    },
    { margin: '0px 0px -10% 0px' },
  );
}
