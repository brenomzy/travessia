/**
 * Blur-in scroll reveals (SPEC §5.6.2), after brenodaroz.com. Opt in with attributes:
 * - `data-reveal` on a block reveals it when it scrolls into view.
 * - `data-reveal-stagger` on a container reveals each child in turn.
 * - `data-reveal-intro` on an ancestor (the hero) makes reveals inside it slower and softer.
 *
 * Stagger runs across the page, not per group: everything that comes into view in the same frame
 * is queued in document order, so a section's heading, lead and cards cascade one after another
 * instead of each group starting at zero together.
 *
 * CSS does the animating (src/styles/motion.css), timed by the `reveal.*`, `ease.fade` and
 * `spring.crit` tokens. Motion only supplies `inView`.
 */
import { inView } from 'motion';

/** Items after this many in one batch start together, so long cascades don't drag. */
const MAX_STAGGER = 8;

const isRendered = (el: Element) => el.getClientRects().length > 0;

export function initReveal(root: ParentNode = document): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]');
  if (targets.length === 0) return;
  document.documentElement.dataset.motion = 'ready';

  let batch: Element[] = [];

  const flush = () => {
    const items = batch
      .flatMap((el) => (el.hasAttribute('data-reveal-stagger') ? Array.from(el.children) : [el]))
      .filter(isRendered)
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    for (const el of batch) el.setAttribute('data-revealed', '');
    batch = [];

    items.forEach((item, i) => {
      (item as HTMLElement).style.setProperty('--reveal-index', String(Math.min(i, MAX_STAGGER)));
      getComputedStyle(item).opacity; // flush styles so the transitions exist before we wait on them
      // When it has settled, let go so the component's own transitions (hover and so on) apply again.
      Promise.all(item.getAnimations().map((a) => a.finished))
        .catch(() => undefined)
        .then(() => item.setAttribute('data-reveal-done', ''));
    });
  };

  inView(
    targets,
    (el) => {
      if (batch.length === 0) requestAnimationFrame(flush);
      batch.push(el);
    },
    { margin: '0px 0px -8% 0px' },
  );
}
