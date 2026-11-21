import type { ReactNode } from 'react';
import { useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import styles from './FeatureTabs.module.css';
import Icon from './Icon';
import type { IconName } from '../../lib/icons';

/**
 * Product showcase (SPEC §5.6.1): one app window, four screens. Every panel stays in the server HTML.
 * Styled after the app window v3 on the Paper page "Brand · Graphic language" (2026-11-21): a browser bar, a mist
 * sidebar with icons and currency balances, ring-edged cards and status tags trimmed to cap height.
 */
export interface FeatureTabsProps {
  label: string;
  app: {
    address: string;
    nav: string[];
    user: { initials: string; name: string; meta: string };
    balancesLabel: string;
    balances: { code: string; amount: string }[];
  };
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

/** Sidebar icons, in nav order: balance, invoices, convert, tax invoices, reports, clients. */
const NAV_ICONS: IconName[] = ['balance', 'invoice', 'convert', 'tax-invoice', 'report', 'clients'];

export default function FeatureTabs({ label, app, tabs, logo }: FeatureTabsProps) {
  const [value, setValue] = useState(tabs[0]?.id ?? '');
  const current = tabs.find((t) => t.id === value) ?? tabs[0];
  return (
    <Tabs.Root className={styles.root} value={value} onValueChange={(v) => setValue(String(v))}>
      <Tabs.List className={styles.list} aria-label={label} activateOnFocus>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.id} value={tab.id} className={styles.tab}>
            {tab.label}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator className={styles.indicator} />
      </Tabs.List>

      {/* One window: the sidebar renders once (so the logo's SVG ids stay unique); the panels are its main area. */}
      <div className={styles.window} data-theme="light">
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.lights}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.address}>{app.address}</span>
        </div>
        <div className={styles.body}>
          <aside className={styles.sidebar} data-theme="tint" aria-hidden="true">
            <div className={styles.brand}>{logo}</div>
            <ul className={styles.nav} role="list">
              {app.nav.map((item, i) => (
                <li key={item} data-current={i === current.nav ? '' : undefined}>
                  <Icon name={NAV_ICONS[i % NAV_ICONS.length]} />
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.balances}>
              <span className={styles.sectionLabel}>{app.balancesLabel}</span>
              <ul role="list">
                {app.balances.map((b) => (
                  <li key={b.code}>
                    <span className={styles.code}>{b.code}</span>
                    <span className={styles.balance}>{b.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.user}>
              <span className={styles.avatar}>{app.user.initials}</span>
              <span>
                <strong>{app.user.name}</strong>
                <small>{app.user.meta}</small>
              </span>
            </div>
          </aside>
          {tabs.map((tab) => (
            <Tabs.Panel key={tab.id} value={tab.id} keepMounted className={styles.main}>
              <div className={styles.head}>
                <h3 className={styles.title}>{tab.title}</h3>
                <div className={styles.actions} aria-hidden="true">
                  <span data-variant="secondary">{tab.actions[0]}</span>
                  <span data-variant="primary">{tab.actions[1]}</span>
                </div>
              </div>
              <ul className={styles.stats} role="list">
                {tab.stats.map((s) => (
                  <li key={s.label} data-highlight={s.highlight ? '' : undefined}>
                    <span className={styles.statLabel}>{s.label}</span>
                    <strong className={styles.statValue}>{s.value}</strong>
                    <span className={styles.statNote}>{s.note}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.listCard}>
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
            </Tabs.Panel>
          ))}
        </div>
      </div>
    </Tabs.Root>
  );
}
