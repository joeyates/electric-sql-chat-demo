import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'ELECTRIC_',
  optimizeDeps: {
    exclude: ['wa-sqlite'],
  },
  server: {
    fs: {
      strict: false,
    }
  }
})
