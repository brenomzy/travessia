import { Tabs } from '@base-ui/react/tabs';
import styles from './FaqTopics.module.css';

/**
 * FAQ grouped by topic, answers open (Paper: /precos → "FAQ B · Topics and open answers").
 * Base UI Tabs with keepMounted, so every topic's questions and answers are in the server HTML
 * (SPEC §5.6.1: answers stay crawlable). The FAQPage JSON-LD is written by the .astro section.
 */
export interface FaqTopicsProps {
  title: string;
  /** id for the heading, so the section can point aria-labelledby at it. */
  titleId: string;
  label: string;
  topics: { id: string; label: string; items: { id: string; question: string; answer: string }[] }[];
}

export default function FaqTopics({ title, titleId, label, topics }: FaqTopicsProps) {
  return (
    <Tabs.Root defaultValue={topics[0]?.id} className={styles.root}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <Tabs.List className={styles.list} aria-label={label} activateOnFocus>
        {topics.map((t) => (
          <Tabs.Tab key={t.id} value={t.id} className={styles.tab}>
            {t.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {topics.map((t) => (
        <Tabs.Panel key={t.id} value={t.id} keepMounted className={styles.panel}>
          <dl className={styles.items}>
            {t.items.map((item) => (
              <div key={item.id} className={styles.item}>
                <dt className={styles.question}>{item.question}</dt>
                <dd className={styles.answer}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
