// ?record installs the kit's virtual clock before any scene code runs, so record.mjs can step the demo frame by
// frame (60 fps, every frame the same on every render). Without it the demo plays in real time.
import { installVirtualClock } from '../../../../.agents/skills/stageshow/kit/clock';

const q = new URLSearchParams(location.search);
if (q.has('record')) {
  installVirtualClock({ fps: 60 });
  document.documentElement.dataset.record = '';
}

const { mount } = await import('./mount');
mount(document.getElementById('root')!, { poster: q.has('poster') });
