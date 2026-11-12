/**
 * `data-count-up` counts a stat from zero to its value when it scrolls into view (SPEC §5.6.2).
 * Works on text with one plain number and an optional decimal part, in either locale:
 * "0,6%", "1 dia", "2 min". Anything else (thousand separators, several numbers) is left alone.
 * Screen readers get the final text at once; only the visible copy animates.
 * A plain requestAnimationFrame loop: Motion's value `animate` would pull in its full engine.
 */
import { cubicBezier, inView } from 'motion';
import { motion } from '../../tokens/tokens';

const NUMBER = /\d+(?:[.,]\d+)?/;
const ease = cubicBezier(...motion.ease.expo);

export function initCountUp(root: ParentNode = document): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (const el of root.querySelectorAll<HTMLElement>('[data-count-up]')) {
    const text = el.textContent?.trim() ?? '';
    const match = text.match(NUMBER);
    if (!match || match.index === undefined) continue;
    if ((text.match(/\d/g) ?? []).length !== match[0].replace(/\D/g, '').length) continue;

    const raw = match[0];
    const separator = raw.includes(',') ? ',' : '.';
    const decimals = raw.split(/[.,]/)[1]?.length ?? 0;
    const target = Number(raw.replace(',', '.'));
    const before = text.slice(0, match.index);
    const after = text.slice(match.index + raw.length);
    const format = (value: number) => before + value.toFixed(decimals).replace('.', separator) + after;

    const spoken = document.createElement('span');
    spoken.className = 'u-visually-hidden';
    spoken.textContent = text;
    const shown = document.createElement('span');
    shown.setAttribute('aria-hidden', 'true');
    shown.textContent = format(0);
    el.replaceChildren(spoken, shown);

    inView(
      el,
      () => {
        const start = performance.now();
        const duration = motion.duration.count * 1000;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          shown.textContent = format(target * ease(progress));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { amount: 'all' },
    );
  }
}
