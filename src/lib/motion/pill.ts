/**
 * The sliding hover pill, after the portfolio (its scripts/pill.ts). In a [data-pill] group, one fill slides to
 * whichever link or button the pointer or keyboard focus is on, fading in the first time. When the pointer leaves it
 * goes back to the current page's item ([aria-current]) or fades out where it is, and slides from there next time.
 * Items are the group's links and buttons, at any depth (a nav's <ul><li><a>). Styles in styles/base.css (.pill).
 *
 * The group gets [data-pill-ready] once wired, so its CSS can drop the no-JS current-page marker.
 */
export function wirePills(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-pill]:not([data-pill-ready])').forEach((group) => {
    const items = [...group.querySelectorAll<HTMLElement>('a, button')];
    if (!items.length) return;
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.setAttribute('aria-hidden', 'true');
    group.prepend(pill);

    let placed = false;
    let shown: HTMLElement | null = null;
    const to = (el: HTMLElement) => {
      // Measured against the group, so items inside list items still line up.
      const g = group.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      // A hidden group (the nav below 1280 px) is measured again when it gets a box, and placed without a slide.
      shown = el;
      if (g.width === 0) {
        placed = false;
        return;
      }
      // The first time it appears it's put in place, not slid in from the corner.
      pill.toggleAttribute('data-instant', !placed);
      pill.style.cssText = `--x:${r.left - g.left}px;--y:${r.top - g.top}px;--w:${r.width}px;--h:${r.height}px`;
      pill.setAttribute('data-on', '');
      placed = true;
    };
    const rest = () => {
      const current = items.find((el) => el.hasAttribute('aria-current'));
      if (current) to(current);
      else {
        pill.removeAttribute('data-on');
        shown = null;
      }
    };

    items.forEach((el) => {
      el.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse' || e.pointerType === 'pen') to(el);
      });
      el.addEventListener('focus', () => {
        if (el.matches(':focus-visible')) to(el);
      });
    });
    group.addEventListener('pointerleave', rest);
    group.addEventListener('focusout', (e) => {
      if (!group.contains(e.relatedTarget as Node | null)) rest();
    });
    // Fonts and resizes move the items; re-measure whatever the pill is on.
    new ResizeObserver(() => shown && to(shown)).observe(group);
    group.setAttribute('data-pill-ready', '');
    rest();
  });
}
