// The product UI demo test (brand/motion.md, "Product UI in demos"). Built on the Stageshow kit in
// .agents/skills/stageshow/kit, with the site's tokens, Figtree and icons.
//   node_modules/.bin/vite --config docs/design/motion/ui-demo/vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const repo = fileURLToPath(new URL('../../../../', import.meta.url));

export default defineConfig({
  root: here,
  plugins: [react()],
  server: { host: '127.0.0.1', port: 4332, strictPort: true, fs: { allow: [repo] } },
  // The kit sits in the skill folder with its own node_modules (lucide-react); React comes from the site's.
  resolve: { dedupe: ['react', 'react-dom'] },
});
