import { useId } from 'react';
import { NumberField } from '@base-ui/react/number-field';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import { MAX_AMOUNT, useFeeCalculator, type Currency } from './useFeeCalculator';
import styles from './FeeCalculatorSeam.module.css';

/**
 * The fee calculator laid across the seam (Paper: /calculadora → "Calculator B · On the seam"):
 * what the client pays on noite, the fee and rate on a card riding the seam, what you receive on
 * tapajós. Same maths as FeeCalculator (useFeeCalculator). The page's <h1> is rendered here so it
 * shares the grid; it's in the server HTML like everything else.
 */
export interface FeeCalculatorSeamProps {
  lang: string;
  currencies: Currency[];
  feePercent: number;
  defaultAmount: number;
  brlSymbol: string;
  /** h1 on /calculadora; h2 where the page already has an h1 (the styleguide). */
  headingLevel?: 'h1' | 'h2';
  titleId?: string;
  labels: {
    title: string;
    currency: string;
    amount: string;
    /** "{fee}" is replaced. */
    fee: string;
    rate: string;
    arrives: string;
    arrivesFallback: string;
    result: string;
    disclaimer: string;
  };
}

export default function FeeCalculatorSeam({
  lang,
  currencies,
  feePercent,
  defaultAmount,
  brlSymbol,
  headingLevel = 'h1',
  titleId = 'page-title',
  labels,
}: FeeCalculatorSeamProps) {
  const inputId = useId();
  const Heading = headingLevel;
  const calc = useFeeCalculator({ lang, currencies, feePercent, defaultAmount, brlSymbol, resultLabel: labels.result });
  const { amount, setAmount, currency, currencyId, pickCurrency, money, fee, result, shown, announcement } = calc;

  return (
    <div className={styles.calculator}>
      <div className={styles.pay} data-theme="dark">
        <Heading id={titleId} className={styles.title}>
          {labels.title}
        </Heading>
        <div className={styles.controls}>
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
              <span className={styles.symbol} aria-hidden="true">
                {currency.symbol}
              </span>
              {/* decimal, not numeric: phone keypads then offer the separator for cents */}
              <NumberField.Input className={styles.input} inputMode="decimal" />
            </NumberField.Group>
          </NumberField.Root>
        </div>
      </div>

      <div className={styles.band}>
        <dl className={styles.card} data-theme="light">
          <div>
            <dt>{labels.fee.replace('{fee}', calc.feeText)}</dt>
            <dd>
              − {currency.symbol} {money.format(fee)}
            </dd>
          </div>
          <div>
            <dt>{labels.rate}</dt>
            <dd>
              {brlSymbol} {money.format(currency.rate)}
            </dd>
          </div>
          <div>
            <dt>{labels.arrives}</dt>
            <dd className={styles.when}>{calc.arrival?.when ?? labels.arrivesFallback}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.receive} data-theme="primary">
        <p className={styles.label}>{labels.result}</p>
        <p className={styles.sum}>
          <span className="u-visually-hidden">
            {brlSymbol} {money.format(result)}
          </span>
          <span aria-hidden="true" className={styles.sumRow}>
            <span className={styles.symbol}>{brlSymbol}</span>
            <span>{money.format(shown)}</span>
          </span>
        </p>
        <p className={styles.disclaimer}>{labels.disclaimer}</p>
      </div>

      <p className="u-visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
