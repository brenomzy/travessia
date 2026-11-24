// Product UI in a demo: one app window, the canonical crossing from brand/proof.md ("The product ledger").
// Thu Nov 12: Halden & Co. pays invoice #0042 (US$ 2,000.00, card, 9:11 am); tax invoice no. 318 is issued
// 1 min 48 s later; Ana converts (− US$ 12.00 fee, US$ 1,988.00 at R$ 5.45); R$ 10,834.60 lands by Pix on
// Fri Nov 13. The window is the site's Balance screen (FeatureTabs, app window v3), and the last frame is the
// state the site shows. The cursor appears once, for Convert, the only thing a person does.
import type { CSSProperties, ReactNode } from 'react';
import { Bar, Collapse, Count, Popover, Spinner, Stage, States, Check, type Act } from '../../../../.agents/skills/stageshow/kit';
import Icon from '../../../../src/components/islands/Icon';
import type { IconName } from '../../../../src/lib/icons';
import painting from '../../../../src/assets/imagery/clear-water-wide.png';
import { WORD, S, S1_X, S2_X } from '../v2/logo-paths.js';
import './demo.css';

type S = {
  paid: boolean; // the payment lands: a row, and the dollar balance rises
  tax: boolean; // tax invoice no. 318 issued
  sheet: boolean; // the Convert sheet is open
  phase: 'ready' | 'converting' | 'done';
  converted: boolean; // the dollars leave the balance
  pix: boolean; // the Pix arrives
};

const START: S = { paid: false, tax: false, sheet: false, phase: 'ready', converted: false, pix: false };
const END: S = { paid: true, tax: true, sheet: false, phase: 'done', converted: true, pix: true };

// Stage: 1440 × 810 (16:9), rendered at 4/3 for 1920 × 1080. One gutter (108) on every edge the frame shows:
// the floats' left edge, the window's right edge and its top. The floats straddle the window's left edge over
// the sidebar (chrome, never content), a third of their width outside.
const W = 1440, H = 810, G = 108, FLOAT = 312;
const WIN = { x: G + FLOAT / 3, y: G, w: W - 2 * G - FLOAT / 3 };

// "≈ R$" is what would arrive today: amount × rate − 0.6% (brand/proof.md).
const USD = 5.45;
// Older rows, as placeholder lines: the list runs on past the frame's foot.
const FILLER = [[92, 148, 40, 70], [78, 126, 44, 62], [96, 160, 38, 74], [84, 118, 42, 66], [90, 140, 40, 58]];
const usd = (s: S) => (s.paid && !s.converted ? 6212.4 : 4212.4);
const today = (n: number) => Math.round(n * USD * 0.994 * 100) / 100;
const money = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// spring.notification (stiffness 380, damping 30) as a CSS linear() curve, sampled at 60 fps until it settles.
function springCurve(k = 380, c = 30) {
  let x = 0, v = 0;
  const pts: number[] = [0];
  for (let i = 0; i < 240; i++) {
    for (let j = 0; j < 8; j++) { const a = -k * (x - 1) - c * v; v += (a * 1) / 480; x += (v * 1) / 480; }
    pts.push(x);
    if (i > 10 && Math.abs(x - 1) < 0.001 && Math.abs(v) < 0.01) break;
  }
  pts[pts.length - 1] = 1;
  return { ease: `linear(${pts.map((p) => +p.toFixed(4)).join(', ')})`, ms: Math.round(((pts.length - 1) * 1000) / 60) };
}
const SPRING = springCurve();

async function script(a: Act<S>) {
  // A calm opening frame: the Balance screen as the site shows it, before Thursday 9:11 am.
  await a.wait(900);
  a.mark('paid');
  await a.set({ paid: true });
  await a.wait(1500);
  a.mark('tax');
  await a.set({ tax: true });
  await a.wait(1100);
  // The one thing a person does: convert.
  a.mark('convert');
  await a.move({ at: 'convert', x: 0.82, y: 0.66 }, { duration: 1000 });
  await a.wait(180);
  await a.click({ at: 'convert', x: 0.82, y: 0.66 });
  await a.set({ sheet: true });
  await a.wait(1150); // reading time: what goes in, the fee, what arrives
  await a.move({ at: 'confirm', x: 0.86, y: 0.62 }, { duration: 650 });
  await a.wait(150);
  await a.click({ at: 'confirm', x: 0.86, y: 0.62 });
  await a.set({ phase: 'converting' });
  await a.wait(900);
  await a.set({ phase: 'done' });
  await a.wait(550);
  a.mark('converted');
  await a.set({ sheet: false, converted: true });
  a.move({ x: W + 60, y: H - 30 }, { duration: 900 }); // clear the way: out of the frame
  await a.wait(750);
  a.mark('pix');
  await a.set({ pix: true });
  await a.wait(2600); // the payoff holds
  a.mark('hold');
}

export function Demo({ poster = false }: { poster?: boolean }) {
  return (
    <Stage<S>
      width={W}
      height={H}
      initial={poster ? END : START}
      script={poster ? undefined : script}
      poster={END}
      play="once"
      cursor={{ at: { x: W + 60, y: H - 40 }, style: 'real', idle: false }}
      className="tv"
    >
      {(s) => (
        <div className="tv-scene" style={{ '--tv-spring': SPRING.ease, '--tv-spring-ms': `${SPRING.ms}ms` } as CSSProperties}>
          <img className="tv-ground" src={painting} alt="" />
          <AppWindow s={s} />
          <div className="tv-floats" style={{ left: G, top: WIN.y + 200, width: FLOAT }}>
            <Float show={s.tax} icon="tax-invoice" title="Tax invoice no. 318 issued" meta="Halden & Co. · R$ 10,900.00 · 1 min 48 s" />
            <Float show={s.pix} icon="bank" title="Pix received" meta="R$ 10,834.60 · Fri, Nov 13, 9:12 am" />
          </div>
        </div>
      )}
    </Stage>
  );
}

function AppWindow({ s }: { s: S }) {
  const n = usd(s);
  return (
    <div className="tv-window" data-theme="light" style={{ left: WIN.x, top: WIN.y, width: WIN.w }}>
      <div className="tv-chrome">
        <span className="tv-lights"><i /><i /><i /></span>
        <span className="tv-address">app.travessia.com</span>
      </div>
      <div className="tv-body">
        <aside className="tv-sidebar" data-theme="tint">
          <Wordmark />
          <ul className="tv-nav">
            {(
              [
                ['balance', 'Balance'],
                ['invoice', 'Invoices'],
                ['convert', 'Convert'],
                ['tax-invoice', 'Tax invoices'],
                ['report', 'Reports'],
                ['clients', 'Clients'],
              ] as [IconName, string][]
            ).map(([icon, label], i) => (
              <li key={label} data-current={i === 0 || undefined}>
                <Icon name={icon} className="tv-icon" />
                {label}
              </li>
            ))}
          </ul>
          <div className="tv-balances">
            <span className="tv-section">Balances</span>
            <ul>
              <li><span className="tv-code">USD</span><Count className="tv-num" value={n} format={money} duration={1200} /></li>
              <li><span className="tv-code">EUR</span><span className="tv-num">1,380.00</span></li>
              <li><span className="tv-code">GBP</span><span className="tv-num">320.00</span></li>
            </ul>
          </div>
        </aside>

        <section className="tv-main">
          <div className="tv-head">
            <div className="tv-title">Balance</div>
            <div className="tv-actions">
              <span className="tv-btn" data-variant="secondary">New invoice</span>
              <span className="tv-btn" data-variant="solid" data-target="convert" data-open={s.sheet || undefined}>Convert</span>
            </div>
          </div>

          <ul className="tv-stats">
            <Stat label="US dollar" sign="US$" highlight value={<Count value={n} format={money} duration={1200} />} note={<>≈ R$ <Count value={today(n)} format={money} duration={1200} /> today</>} />
            <Stat label="Euro" sign="€" value="1,380.00" note="≈ R$ 8,641.84 today" />
            <Stat label="Pound" sign="£" value="320.00" note="≈ R$ 2,306.08 today" />
          </ul>

          <div className="tv-list">
            <div className="tv-list-title">Recent activity</div>
            <Collapse open={s.pix} reveal="drop" className="tv-slot">
              <Row title="Pix sent to you" detail="Conversion of invoice #0042" date="Nov 13" amount="+ R$ 10,834.60" highlight />
            </Collapse>
            <Collapse open={s.paid} reveal="drop" className="tv-slot">
              <Row title="Invoice paid" detail="Halden & Co., London · card" date="Nov 12" amount="+ US$ 2,000.00" />
            </Collapse>
            <Row title="Invoice paid" detail="Studio Vik, Oslo · transfer" date="Nov 9" amount="+ € 1,380.00" />
            <Row title="Invoice sent" detail="Marlow Press, Manchester · due Nov 30" date="Nov 5" amount="£ 640.00" />
            <Row title="Invoice paid" detail="Northfold, Toronto · card" date="Nov 2" amount="+ US$ 850.00" />
            {FILLER.map(([a, b, c, d], i) => (
              <div key={i} className="tv-row" aria-hidden><Bar w={a} h={6} tone={2} /><Bar w={b} h={6} tone={1} /><Bar w={c} h={6} tone={1} /><Bar w={d} h={6} tone={2} /></div>
            ))}
          </div>

          <Popover show={s.sheet} origin="top right" className="tv-sheet">
            <ConvertSheet phase={s.phase} />
          </Popover>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, sign, value, note, highlight }: { label: string; sign: string; value: ReactNode; note: ReactNode; highlight?: boolean }) {
  return (
    <li className="tv-stat" data-highlight={highlight || undefined}>
      <span className="tv-stat-label">{label}</span>
      <strong className="tv-stat-value"><span className="tv-sign">{sign}</span>{value}</strong>
      <span className="tv-stat-note">{note}</span>
    </li>
  );
}

function Row({ title, detail, date, amount, highlight }: { title: string; detail: string; date: string; amount: string; highlight?: boolean }) {
  return (
    <div className="tv-row" data-highlight={highlight || undefined}>
      <strong className="tv-row-title">{title}</strong>
      <span className="tv-row-detail">{detail}</span>
      <span className="tv-row-date">{date}</span>
      <span className="tv-row-amount">{amount}</span>
    </div>
  );
}

function ConvertSheet({ phase }: { phase: S['phase'] }) {
  return (
    <div className="tv-sheet-body">
      <div className="tv-sheet-head">
        <span className="tv-sheet-title">Convert to reais</span>
        <span className="tv-tag">Invoice #0042</span>
      </div>
      <div className="tv-sheet-grid">
        <dl className="tv-quote">
          <div><dt>You convert</dt><dd>US$ 2,000.00</dd></div>
          <div><dt>Fee (0.6%)</dt><dd>− US$ 12.00</dd></div>
          <div><dt>Rate</dt><dd>R$ 5.45</dd></div>
        </dl>
        <div className="tv-receive">
          <span className="tv-receive-label">You receive</span>
          <strong className="tv-receive-value">R$ 10,834.60</strong>
          <span className="tv-receive-note">By Pix tomorrow, Fri Nov 13</span>
        </div>
      </div>
      <span className="tv-confirm" data-target="confirm" data-phase={phase}>
        <States
          value={phase}
          states={{
            ready: <span className="tv-confirm-label">Convert US$ 2,000.00</span>,
            converting: <span className="tv-confirm-label"><Spinner size={16} />Converting</span>,
            done: <span className="tv-confirm-label"><Check on size={16} />Converted</span>,
          }}
        />
      </span>
    </div>
  );
}

function Float({ show, icon, title, meta }: { show: boolean; icon: IconName; title: string; meta: string }) {
  return (
    <div className="tv-float" data-show={show || undefined} data-theme="light">
      <span className="tv-float-icon"><Icon name={icon} className="tv-icon" /></span>
      <span className="tv-float-text">
        <strong>{title}</strong>
        <span>{meta}</span>
      </span>
    </div>
  );
}

/** The wordmark from src/components/ui/Logo.astro (light tone), drawn with the same paths and weave. */
function Wordmark() {
  const halves = [
    ['tv-above', 'above', -1000, 777],
    ['tv-below', 'below', -185, 400],
  ] as const;
  return (
    <svg className="tv-logo" viewBox="-30 -790 3615 860" aria-label="Travessia" role="img">
      <defs>
        <path id="tv-s" d={S} />
        {halves.map(([id, , y, h]) => (
          <clipPath key={id} id={id}><rect x="-300" y={y} width="4155" height={h} /></clipPath>
        ))}
        <clipPath id="tv-top"><rect x="-300" y="-1000" width="4155" height="796" /></clipPath>
        <clipPath id="tv-bottom"><rect x="-300" y="-204" width="4155" height="600" /></clipPath>
        <mask id="tv-m1" maskUnits="userSpaceOnUse" x="-300" y="-1000" width="4155" height="1400">
          <rect x="-300" y="-1000" width="4155" height="1400" fill="white" />
          <g clipPath="url(#tv-bottom)"><use href="#tv-s" transform={`translate(${S2_X} 0)`} fill="black" stroke="black" strokeWidth="60" strokeLinejoin="round" /></g>
        </mask>
        <mask id="tv-m2" maskUnits="userSpaceOnUse" x="-300" y="-1000" width="4155" height="1400">
          <rect x="-300" y="-1000" width="4155" height="1400" fill="white" />
          <g clipPath="url(#tv-top)"><use href="#tv-s" transform={`translate(${S1_X} 0)`} fill="black" stroke="black" strokeWidth="60" strokeLinejoin="round" /></g>
        </mask>
      </defs>
      {halves.map(([id, part]) => (
        <g key={id} clipPath={`url(#${id})`} data-part={part}>
          <path d={WORD} />
          <g mask="url(#tv-m1)"><use href="#tv-s" transform={`translate(${S1_X} 0)`} /></g>
          <g mask="url(#tv-m2)"><use href="#tv-s" transform={`translate(${S2_X} 0)`} /></g>
        </g>
      ))}
    </svg>
  );
}
