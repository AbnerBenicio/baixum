import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: 'html',
    force: true,
  },
  root: resolve(import.meta.url.replace('file://', ''), '../src')
});


