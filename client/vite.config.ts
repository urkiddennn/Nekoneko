import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-codemirror': [
            '@codemirror/view',
            '@codemirror/state',
            '@codemirror/autocomplete',
            '@codemirror/language',
            '@uiw/react-codemirror',
            '@uiw/codemirror-themes-all'
          ],
          'vendor-lucide': ['lucide-react'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
