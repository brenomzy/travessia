import { useId } from 'react';
import { NumberField } from '@base-ui/react/number-field';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import { MAX_AMOUNT, useFeeCalculator, type Currency } from './useFeeCalculator';
import styles from './FeeCalculator.module.css';

/**
 * "How much will I receive?" (SPEC §5.6.1, Paper: Home → Section · Calculator).
 * Amount (Base UI NumberField) and currency (ToggleGroup, as Paper draws it) in; reais out, with the
 * fee, the example rate and the arrival day. The server HTML shows the default amount in full.
 * Rates are made up (src/content/rates.json). Nothing is sent anywhere.
 */
export interface FeeCalculatorProps {
  /** BCP 47 tag for number and date formatting: "pt-BR" or "en". */
  lang: string;
  currencies: Currency[];
  /** Percent, e.g. 0.6. */
  feePercent: number;
  defaultAmount: number;
  brlSymbol: string;
  labels: {
    amount: string;
    currency: string;
    /** "{fee}" is replaced with the formatted fee. */
    fee: string;
    converted: string;
    rate: string;
    result: string;
    /** "{when}" and "{date}" are filled in on the client. */
    arrival: string;
    arrivalFallback: string;
    disclaimer: string;
  };
}

export default function FeeCalculator({
  lang,
  currencies,
  feePercent,
  defaultAmount,
  brlSymbol,
  labels,
}: FeeCalculatorProps) {
  const inputId = useId();
  const calc = useFeeCalculator({ lang, currencies, feePercent, defaultAmount, brlSymbol, resultLabel: labels.result });
  const { amount, setAmount, currency, currencyId, pickCurrency, money, fee, converted, result, shown, announcement } = calc;
  const arrival = calc.arrival
    ? labels.arrival.replace('{when}', calc.arrival.when).replace('{date}', calc.arrival.date)
    : labels.arrivalFallback;

  return (
    <div className={styles.card} data-theme="light">
      <ToggleGroup className={styles.currencies} value={[currencyId]} onValueChange={pickCurrency} aria-label={labels.currency}>
        {currencies.map((c) => (
          <Toggle key={c.id} value={c.id} className={styles.currency}>
            {c.name}
          </Toggle>
        ))}
      </ToggleGroup>

      <NumberField.Root
        id={inputId}
        className={styles.field}
        value={amount}
        onValueChange={(v) => setAmount(v)}
        locale={lang}
        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        min={0}
        max={MAX_AMOUNT}
        step="any"
        largeStep={100}
      >
        <label htmlFor={inputId} className={styles.label}>
          {labels.amount}
          <span className="u-visually-hidden"> ({currency.name})</span>
        </label>
        <NumberField.Group className={styles.group}>
          {/* decimal, not numeric: phone keypads then offer the separator for cents */}
          <NumberField.Input className={styles.input} inputMode="decimal" />
          <span className={styles.unit} aria-hidden="true">
            {currency.symbol}
          </span>
        </NumberField.Group>
      </NumberField.Root>

      <dl className={styles.rows}>
        <div>
          <dt>{labels.fee.replace('{fee}', calc.feeText)}</dt>
          <dd>
            − {currency.symbol} {money.format(fee)}
          </dd>
        </div>
        <div>
          <dt>{labels.converted}</dt>
          <dd>
            {currency.symbol} {money.format(converted)}
          </dd>
        </div>
        <div>
          <dt>{labels.rate}</dt>
          <dd>
            1 {currency.symbol} = {brlSymbol} {money.format(currency.rate)}
          </dd>
        </div>
      </dl>

      <div className={styles.result} data-theme="deep">
        <div>
          <p className={styles.label}>{labels.result}</p>
          <p className={styles.sum}>
            <span className="u-visually-hidden">
              {brlSymbol} {money.format(result)}
            </span>
            <span aria-hidden="true">
              <span className={styles.brl}>{brlSymbol}</span> {money.format(shown)}
            </span>
          </p>
        </div>
        <p className={styles.arrival}>{arrival}</p>
      </div>
      <p className="u-visually-hidden" aria-live="polite">
        {announcement}
      </p>

      <p className={styles.disclaimer}>{labels.disclaimer}</p>
    </div>
  );
}
