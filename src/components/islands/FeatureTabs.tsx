import type { ReactNode } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import styles from './FeatureTabs.module.css';

/** Product showcase (SPEC §5.6.1): one app window, four screens. Every panel stays in the server HTML. */
export interface FeatureTabsProps {
  label: string;
  nav: string[];
  user: { initials: string; name: string; meta: string };
  tabs: {
    id: string;
    label: string;
    nav: number;
    title: string;
    actions: [string, string];
    stats: { label: string; value: string; note: string; highlight: boolean }[];
    listTitle: string;
    rows: { title: string; detail: string; date: string; amount: string; tone: 'default' | 'highlight' | 'muted' }[];
  }[];
  /** The wordmark, passed from Astro as a named slot. */
  logo?: ReactNode;
}

export default function FeatureTabs({ label, nav, user, tabs, logo }: FeatureTabsProps) {
  return (
    <Tabs.Root className={styles.root} defaultValue={tabs[0]?.id}>
      <Tabs.List className={styles.list} aria-label={label}>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.id} value={tab.id} className={styles.tab}>
            {tab.label}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator className={styles.indicator} />
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel key={tab.id} value={tab.id} keepMounted className={styles.window} data-theme="light">
          <aside className={styles.sidebar} aria-hidden="true">
            <div className={styles.brand}>{logo}</div>
            <ul className={styles.nav} role="list">
              {nav.map((item, i) => (
                <li key={item} data-current={i === tab.nav ? '' : undefined}>
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.user}>
              <span className={styles.avatar}>{user.initials}</span>
              <span>
                <strong>{user.name}</strong>
                <small>{user.meta}</small>
              </span>
            </div>
          </aside>
          <div className={styles.main}>
            <div className={styles.head}>
              <h3 className={styles.title}>{tab.title}</h3>
              <div className={styles.actions} aria-hidden="true">
                <span data-variant="secondary">{tab.actions[0]}</span>
                <span data-variant="primary">{tab.actions[1]}</span>
              </div>
            </div>
            <ul className={styles.stats} role="list">
              {tab.stats.map((s) => (
                <li key={s.label} data-highlight={s.highlight ? '' : undefined} data-theme={s.highlight ? 'deep' : undefined}>
                  <span className={styles.statLabel}>{s.label}</span>
                  <strong className={styles.statValue}>{s.value}</strong>
                  <span className={styles.statNote}>{s.note}</span>
                </li>
              ))}
            </ul>
            <div>
              <h4 className={styles.listTitle}>{tab.listTitle}</h4>
              <ul className={styles.rows} role="list">
                {tab.rows.map((r) => (
                  <li key={r.title + r.date} className={styles.row} data-tone={r.tone}>
                    <strong className={styles.rowTitle}>{r.title}</strong>
                    <span className={styles.rowDetail}>{r.detail}</span>
                    <span className={styles.rowDate}>{r.date}</span>
                    <span className={styles.rowAmount}>{r.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
