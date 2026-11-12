import { useEffect, useId, useRef, useState } from 'react';
import { Form } from '@base-ui/react/form';
import { Field } from '@base-ui/react/field';
import { Select } from '@base-ui/react/select';
import { Combobox } from '@base-ui/react/combobox';
import { Checkbox } from '@base-ui/react/checkbox';
import { Toast } from '@base-ui/react/toast';
import styles from './SignupForm.module.css';

/**
 * The waitlist form on /abrir-conta (SPEC §5.6.1: Form, Field, Select, Combobox, Toast).
 * Name and email are required; how you work and your main client's country are optional.
 * Nothing is sent anywhere (SPEC D18): submitting swaps the form for a success message and shows a
 * toast. Never add fields for passwords, CPF/CNPJ, bank or card details.
 */
type Option = { value: string; label: string };
export interface SignupFormProps {
  /** BCP 47 tag, for formatting the queue position. */
  lang: string;
  privacyHref: string;
  labels: {
    title: string;
    note: string;
    name: { label: string; placeholder: string; missing: string };
    email: { label: string; placeholder: string; missing: string; invalid: string };
    work: { label: string; placeholder: string; options: Option[] };
    country: { label: string; placeholder: string; empty: string; clear: string; open: string; options: Option[] };
    newsletter: string;
    submit: string;
    privacy: string;
    privacyLink: string;
    success: { title: string; text: string; again: string };
    toast: { title: string; description: string; close: string };
  };
}

/** A stable, made-up queue position from what was typed, so it doesn't change on re-render. */
function queuePosition(text: string) {
  let hash = 0;
  for (const ch of text) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return 1000 + (hash % 2000);
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className={styles.chevron}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className={styles.check}>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function SignupFormInner({ lang, privacyHref, labels: l }: SignupFormProps) {
  const toast = Toast.useToastManager();
  // Base UI gives the combobox input and its trigger the same generated id; set both explicitly.
  const countryId = useId();
  const [done, setDone] = useState<{ name: string; position: number } | null>(null);
  // The form is replaced on submit, so move focus to the message instead of losing it.
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);
  const [privacyBefore, privacyAfter] = l.privacy.split('{link}');

  if (done) {
    return (
      <div className={styles.success} role="status" tabIndex={-1} ref={successRef}>
        <span className={styles.successIcon} aria-hidden="true">
          <Check />
        </span>
        <div>
          <p className={styles.successTitle}>
            {l.success.title.replace('{name}', done.name).replace('{position}', done.position.toLocaleString(lang))}
          </p>
          <p className={styles.successText}>{l.success.text}</p>
          <button type="button" className={styles.again} onClick={() => setDone(null)}>
            {l.success.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Form
      className={styles.form}
      onFormSubmit={(values) => {
        const name = String(values.name ?? '').trim().split(/\s+/)[0] ?? '';
        setDone({ name, position: queuePosition(`${values.name}${values.email}`) });
        toast.add({ title: l.toast.title, description: l.toast.description });
      }}
    >
      <div className={styles.head}>
        <h2 className={styles.title}>{l.title}</h2>
        <p className={styles.note}>{l.note}</p>
      </div>

      <Field.Root name="name" className={styles.field}>
        <Field.Label className={styles.label}>{l.name.label}</Field.Label>
        <Field.Control required autoComplete="given-name" placeholder={l.name.placeholder} className={styles.input} />
        <Field.Error match="valueMissing" className={styles.error}>
          {l.name.missing}
        </Field.Error>
      </Field.Root>

      <Field.Root name="email" className={styles.field}>
        <Field.Label className={styles.label}>{l.email.label}</Field.Label>
        <Field.Control required type="email" autoComplete="email" placeholder={l.email.placeholder} className={styles.input} />
        <Field.Error match="valueMissing" className={styles.error}>
          {l.email.missing}
        </Field.Error>
        <Field.Error match="typeMismatch" className={styles.error}>
          {l.email.invalid}
        </Field.Error>
      </Field.Root>

      <Field.Root name="work" className={styles.field}>
        <Select.Root items={l.work.options}>
          <Select.Label className={styles.label}>{l.work.label}</Select.Label>
          <Select.Trigger className={styles.trigger}>
            <Select.Value placeholder={l.work.placeholder} className={styles.value} />
            <Select.Icon className={styles.icon}>
              <Chevron />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner sideOffset={6} className={styles.positioner} alignItemWithTrigger={false}>
              <Select.Popup className={styles.popup}>
                <Select.List className={styles.list}>
                  {l.work.options.map((o) => (
                    <Select.Item key={o.value} value={o.value} className={styles.item}>
                      <Select.ItemIndicator className={styles.indicator}>
                        <Check />
                      </Select.ItemIndicator>
                      <Select.ItemText>{o.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </Field.Root>

      {/* No Field.Root here: inside a Field, the input and its trigger button get the same id. */}
      <div className={styles.field}>
        <Combobox.Root name="country" items={l.country.options} itemToStringLabel={(o: Option) => o.label}>
          <label htmlFor={countryId} className={styles.label}>
            {l.country.label}
          </label>
          <Combobox.InputGroup className={styles.comboGroup}>
            <Combobox.Input id={countryId} placeholder={l.country.placeholder} className={styles.comboInput} />
            <Combobox.Clear className={styles.comboButton} aria-label={l.country.clear}>
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className={styles.chevron}>
                <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
              </svg>
            </Combobox.Clear>
            <Combobox.Trigger id={`${countryId}-trigger`} className={styles.comboButton} aria-label={l.country.open}>
              <Chevron />
            </Combobox.Trigger>
          </Combobox.InputGroup>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={6} className={styles.positioner}>
              <Combobox.Popup className={styles.popup}>
                <Combobox.Empty className={styles.empty}>{l.country.empty}</Combobox.Empty>
                <Combobox.List className={styles.list}>
                  {(o: Option) => (
                    <Combobox.Item key={o.value} value={o} className={styles.item}>
                      <Combobox.ItemIndicator className={styles.indicator}>
                        <Check />
                      </Combobox.ItemIndicator>
                      <span>{o.label}</span>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      <Field.Root name="newsletter" className={styles.checkField}>
        <Field.Label className={styles.checkLabel}>
          <Checkbox.Root className={styles.checkbox} defaultChecked>
            <Checkbox.Indicator className={styles.checkIndicator}>
              <Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          {l.newsletter}
        </Field.Label>
      </Field.Root>

      <button type="submit" className={styles.submit}>
        {l.submit}
      </button>

      <p className={styles.privacy}>
        {privacyBefore}
        <a href={privacyHref}>{l.privacyLink}</a>
        {privacyAfter}
      </p>
    </Form>
  );
}

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = Toast.useToastManager();
  return toasts.map((t) => (
    <Toast.Root key={t.id} toast={t} className={styles.toast}>
      <Toast.Content className={styles.toastContent}>
        <Toast.Title className={styles.toastTitle} />
        <Toast.Description className={styles.toastText} />
      </Toast.Content>
      <Toast.Close className={styles.toastClose} aria-label={closeLabel}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className={styles.chevron}>
          <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
        </svg>
      </Toast.Close>
    </Toast.Root>
  ));
}

export default function SignupForm(props: SignupFormProps) {
  return (
    <Toast.Provider>
      <SignupFormInner {...props} />
      <Toast.Portal>
        <Toast.Viewport className={styles.viewport} data-theme="dark">
          <ToastList closeLabel={props.labels.toast.close} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
