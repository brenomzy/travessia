import { createElement } from 'react';
import { ICONS, type IconName } from '../../lib/icons';

/**
 * The React twin of ui/Icon.astro, for islands: the same Hugeicons drawing from src/lib/icons, stroked in
 * currentColor. Size and stroke come from the island's CSS (the svg's class).
 */
export default function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      {ICONS[name].map(([tag, attrs], i) => createElement(tag, { ...attrs, key: i }))}
    </svg>
  );
}
