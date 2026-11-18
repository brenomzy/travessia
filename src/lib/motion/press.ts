/**
 * Press feedback for keyboards and iOS (the look is in styles/base.css). Enter, and Space on a <button>, hold
 * [data-pressing] the way a pointer holds :active. iOS Safari only applies :active when a touchstart listener
 * exists, so this adds an empty passive one. No Motion import: it's two listeners and an attribute.
 */
const target = (e: Event) => (e.target as Element | null)?.closest?.<HTMLElement>('button, [data-press]') ?? null;

export function wirePress(root: Document = document) {
  root.addEventListener('keydown', (e) => {
    const el = target(e);
    if (el && !e.repeat && (e.key === 'Enter' || (e.key === ' ' && el.localName === 'button'))) el.setAttribute('data-pressing', '');
  });
  const release = (e: Event) => target(e)?.removeAttribute('data-pressing');
  root.addEventListener('keyup', release);
  root.addEventListener('focusout', release);
  root.addEventListener('touchstart', () => {}, { passive: true });
}
