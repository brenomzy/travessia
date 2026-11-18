import { useEffect, useState } from 'react';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import styles from './ChipFilter.module.css';

/**
 * Chip filters for server-rendered lists (stories by craft, changelog by type and area).
 * Each item carries data-filter-<group>="value value…"; this island only sets `hidden` on items
 * that don't match every group, so everything stays in the HTML. Without JS the full list shows.
 */
export interface ChipFilterProps {
  /** id of the element holding the items. */
  targetId: string;
  groups: { id: string; label: string; all: string; options: { value: string; label: string }[]; showLabel?: boolean }[];
  /** "{count}" is replaced; announced politely after filtering. */
  resultCount: string;
  /** light: chips on a light section. dark: chips on noite. */
  tone?: 'light' | 'dark';
}

const ALL = 'all';

export default function ChipFilter({ targetId, groups, resultCount, tone = 'light' }: ChipFilterProps) {
  const [picked, setPicked] = useState<Record<string, string>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, ALL])),
  );
  const [status, setStatus] = useState('');

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let shown = 0;
    for (const item of target.querySelectorAll<HTMLElement>('[data-filter-item]')) {
      const match = groups.every((g) => {
        const want = picked[g.id];
        return want === ALL || (item.dataset[`filter${g.id[0].toUpperCase()}${g.id.slice(1)}`] ?? '').split(' ').includes(want);
      });
      item.hidden = !match;
      if (match) shown += 1;
    }
    // Empty groups (a month with nothing left) hide too.
    for (const group of target.querySelectorAll<HTMLElement>('[data-filter-group]')) {
      group.hidden = !group.querySelector('[data-filter-item]:not([hidden])');
    }
    const active = Object.values(picked).some((v) => v !== ALL);
    target.toggleAttribute('data-filtered', active);
    setStatus(active ? resultCount.replace('{count}', String(shown)) : '');
  }, [picked, targetId, groups, resultCount]);

  return (
    <div className={styles.filter} data-tone={tone}>
      {groups.map((g) => (
        <div key={g.id} className={styles.group}>
          {g.showLabel && (
            <span className={styles.groupLabel} aria-hidden="true">
              {g.label}
            </span>
          )}
          <ToggleGroup
            className={styles.chips}
            value={[picked[g.id]]}
            onValueChange={(next: string[]) => setPicked((p) => ({ ...p, [g.id]: next[0] ?? ALL }))}
            aria-label={g.label}
          >
            <Toggle value={ALL} className={styles.chip}>
              {g.all}
            </Toggle>
            {g.options.map((o) => (
              <Toggle key={o.value} value={o.value} className={styles.chip}>
                {o.label}
              </Toggle>
            ))}
          </ToggleGroup>
        </div>
      ))}
      <p className="u-visually-hidden" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
