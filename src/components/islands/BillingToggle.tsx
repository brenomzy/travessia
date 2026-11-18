import { useRef, useState } from 'react';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import styles from './BillingToggle.module.css';

/**
 * Monthly / annual switch (SPEC §5.6.1). Both prices are already in the server HTML; this island only sets
 * data-billing on the closest [data-billing-scope], and CSS shows the matching price. Without JS, monthly shows.
 */
export interface BillingToggleProps {
  label: string;
  options: { monthly: string; annual: string };
}

type Billing = 'monthly' | 'annual';

export default function BillingToggle({ label, options }: BillingToggleProps) {
  const [value, setValue] = useState<Billing>('monthly');
  const ref = useRef<HTMLDivElement>(null);

  const change = (next: Billing[]) => {
    const picked = next[0];
    if (!picked) return; // a single-choice group: ignore deselecting the current option
    setValue(picked);
    ref.current?.closest<HTMLElement>('[data-billing-scope]')?.setAttribute('data-billing', picked);
  };

  return (
    <ToggleGroup ref={ref} className={styles.group} value={[value]} onValueChange={change} aria-label={label}>
      {(['monthly', 'annual'] as const).map((v) => (
        <Toggle key={v} value={v} className={styles.toggle}>
          {options[v]}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
