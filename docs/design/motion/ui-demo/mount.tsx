import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Demo } from './Demo';

function Page({ poster }: { poster: boolean }) {
  const [run, setRun] = useState(0);
  return (
    <main className="page">
      <div id="example">
        <Demo key={run} poster={poster} />
      </div>
      <button type="button" className="replay" onClick={() => setRun((n) => n + 1)}>
        Replay
      </button>
    </main>
  );
}

export function mount(el: HTMLElement, opts: { poster: boolean }) {
  createRoot(el).render(<Page poster={opts.poster} />);
}
