import { useEffect, useRef, useState } from 'react';
import { tweenNumber } from '../../lib/motion/tween';

/**
 * The fee calculator's state and maths, shared by the two layouts: FeeCalculator (the card on
 * Home and Pricing) and FeeCalculatorSeam (/calculadora). Both stay in step by construction.
 */
export interface Currency {
  id: string;
  name: string;
  symbol: string;
  /** Reais per one unit. */
  rate: number;
}

export const MAX_AMOUNT = 1_000_000;

/** The next weekday after today: conversions settle on business days. */
function nextBusinessDay(today: Date) {
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  do day.setDate(day.getDate() + 1);
  while (day.getDay() === 0 || day.getDay() === 6);
  return day;
}

/** "amanhã" or a weekday, and "13 nov" / "Nov 13", for the next business day. */
export function arrivalParts(lang: string, today = new Date()) {
  const day = nextBusinessDay(today);
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const days = Math.round((day.getTime() - midnight.getTime()) / 86_400_000);
  const when =
    days === 1
      ? new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(1, 'day')
      : new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(day);
  // "15 de nov." → "15 nov", to match the design; English stays "Nov 15".
  const date = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short' })
    .format(day)
    .replace(' de ', ' ')
    .replace('.', '');
  return { when, date };
}

interface Options {
  lang: string;
  currencies: Currency[];
  feePercent: number;
  defaultAmount: number;
  brlSymbol: string;
  /** Used for the screen-reader announcement, e.g. "Você recebe por Pix". */
  resultLabel: string;
}

export function useFeeCalculator({ lang, currencies, feePercent, defaultAmount, brlSymbol, resultLabel }: Options) {
  const [amount, setAmount] = useState<number | null>(defaultAmount);
  const [currencyId, setCurrencyId] = useState(currencies[0].id);
  const [announcement, setAnnouncement] = useState('');
  // The arrival day depends on today's date, so it's only known after hydration.
  const [arrival, setArrival] = useState<{ when: string; date: string } | null>(null);
  useEffect(() => setArrival(arrivalParts(lang)), [lang]);

  const currency = currencies.find((c) => c.id === currencyId) ?? currencies[0];
  const money = new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const percent = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 });

  const value = Math.min(Math.max(amount ?? 0, 0), MAX_AMOUNT);
  const fee = value * (feePercent / 100);
  const converted = value - fee;
  const result = converted * currency.rate;

  // The visible result tweens to each new value; screen readers get the settled amount.
  const [shown, setShown] = useState(result);
  const shownRef = useRef(result);
  useEffect(
    () =>
      tweenNumber(shownRef.current, result, (v) => {
        shownRef.current = v;
        setShown(v);
      }),
    [result],
  );

  // Announce the new total once typing pauses, but not on page load.
  const settled = useRef(false);
  useEffect(() => {
    if (!settled.current) {
      settled.current = true;
      return;
    }
    const total = new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result);
    const timer = setTimeout(() => setAnnouncement(`${resultLabel}: ${brlSymbol} ${total}`), 700);
    return () => clearTimeout(timer);
  }, [result, resultLabel, brlSymbol, lang]);

  const pickCurrency = (next: string[]) => {
    if (next[0]) setCurrencyId(next[0]);
  };

  return {
    amount,
    setAmount,
    currency,
    currencyId,
    pickCurrency,
    money,
    feeText: percent.format(feePercent / 100),
    fee,
    converted,
    result,
    shown,
    arrival,
    announcement,
  };
}
