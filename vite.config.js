import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    middlewareMode: 'ssr',
    // Lida com SPA fallback
    fs: {
      strict: false,
    },
  },
});




