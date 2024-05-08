import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: 'html',
  },
  build: {
    outDir: 'build',
    assetsDir: '.',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})


