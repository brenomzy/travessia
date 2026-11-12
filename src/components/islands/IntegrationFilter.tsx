import { useEffect, useId, useState } from 'react';
import { Input } from '@base-ui/react/input';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import styles from './IntegrationFilter.module.css';

/**
 * Search and category filter for /integracoes (SPEC §5.6.1). The cards are server-rendered
 * (IntegrationCard); this island only sets `hidden` on the ones that don't match, so every
 * integration stays in the HTML. Without JS the full list shows and the controls do nothing.
 */
export interface IntegrationFilterProps {
  /** id of the <ul> holding the cards; "<gridId>-empty" is the empty-state message. */
  gridId: string;
  categories: { id: string; label: string; count: number }[];
  total: number;
  labels: {
    search: string;
    group: string;
    all: string;
    /** "{count}" is replaced. */
    resultCount: string;
    resultOne: string;
  };
}

const ALL = 'all';
const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

export default function IntegrationFilter({ gridId, categories, total, labels }: IntegrationFilterProps) {
  const searchId = useId();
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const q = normalize(query);
    let shown = 0;
    for (const card of grid.querySelectorAll<HTMLElement>('[data-integration]')) {
      const match =
        (category === ALL || card.dataset.category === category) && (!q || (card.dataset.search ?? '').includes(q));
      card.hidden = !match;
      if (match) shown += 1;
    }
    const active = category !== ALL || q !== '';
    grid.toggleAttribute('data-filtered', active);
    const empty = document.getElementById(`${gridId}-empty`);
    if (empty) empty.hidden = shown > 0;
    // Announce the count only once someone has filtered, not on page load.
    setStatus(active ? (shown === 1 ? labels.resultOne : labels.resultCount.replace('{count}', String(shown))) : '');
  }, [category, query, gridId, labels.resultCount, labels.resultOne]);

  const pick = (next: string[]) => setCategory(next[0] ?? ALL);

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <label htmlFor={searchId} className="u-visually-hidden">
          {labels.search}
        </label>
        <svg className={styles.icon} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="6" />
          <path d="M12.5 12.5 16 16" />
        </svg>
        <Input
          id={searchId}
          type="search"
          className={styles.input}
          placeholder={labels.search}
          value={query}
          onValueChange={(v) => setQuery(String(v))}
          autoComplete="off"
        />
      </div>
      <ToggleGroup className={styles.groups} value={[category]} onValueChange={pick} aria-label={labels.group}>
        <Toggle value={ALL} className={styles.group}>
          {labels.all} · {total}
        </Toggle>
        {categories.map((c) => (
          <Toggle key={c.id} value={c.id} className={styles.group}>
            {c.label} · {c.count}
          </Toggle>
        ))}
      </ToggleGroup>
      <p className="u-visually-hidden" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
