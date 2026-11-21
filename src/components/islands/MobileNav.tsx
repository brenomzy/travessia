import { Drawer } from '@base-ui/react/drawer';
import styles from './MobileNav.module.css';
import Icon from './Icon';

/** Mirrors the props Header.astro passes; copy comes in as props, never hardcoded (SPEC §5.6.1). */
export interface MobileNavProps {
  items: { label: string; href: string; current?: boolean }[];
  cta: { label: string; href: string };
  labels: { open: string; close: string; title: string };
  bannerNote: string;
}

function MenuIcon({ name }: { name: 'menu' | 'close' }) {
  return <Icon name={name} className={styles.icon} />;
}

export default function MobileNav({ items, cta, labels, bannerNote }: MobileNavProps) {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className={styles.trigger} aria-label={labels.open}>
        <MenuIcon name="menu" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.backdrop} />
        <Drawer.Viewport className={styles.viewport}>
          <Drawer.Popup className={styles.popup} data-theme="dark">
            <Drawer.Content className={styles.content}>
              <div className={styles.top}>
                <Drawer.Title className={styles.title}>{labels.title}</Drawer.Title>
                <Drawer.Close className={styles.trigger} aria-label={labels.close}>
                  <MenuIcon name="close" />
                </Drawer.Close>
              </div>
              <nav aria-label={labels.title}>
                <ul className={styles.list} role="list">
                  {items.map((item) => (
                    <li key={item.href}>
                      <a className={styles.link} href={item.href} aria-current={item.current ? 'page' : undefined}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a className={styles.cta} href={cta.href}>
                {cta.label}
              </a>
              <div className={styles.footer}>
                <p className={styles.note}>{bannerNote}</p>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
