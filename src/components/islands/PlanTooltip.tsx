import { Popover } from '@base-ui/react/popover';
import styles from './PlanTooltip.module.css';

/**
 * A small "?" button that explains a row of the plan comparison (SPEC §5.6.1). Base UI Popover
 * rather than Tooltip, so it opens on tap and by keyboard as well as on hover.
 */
export interface PlanTooltipProps {
  /** Accessible name of the button, e.g. "What this means: People on the account". */
  label: string;
  text: string;
}

export default function PlanTooltip({ label, text }: PlanTooltipProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className={styles.trigger} aria-label={label} openOnHover delay={150}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M6.3 6.2a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.5-.7 1v.4" />
          <circle cx="8" cy="11.4" r="0.6" className={styles.dot} />
        </svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} className={styles.positioner}>
          <Popover.Popup className={styles.popup} data-theme="dark">
            <Popover.Arrow className={styles.arrow} />
            <Popover.Description className={styles.text}>{text}</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
