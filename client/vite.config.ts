import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Content Security Policy - helps prevent XSS attacks
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud;",
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      // Prevent clickjacking
      'X-Frame-Options': 'DENY',
      // Control referrer information
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Restrict browser features
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      // XSS protection (legacy but still useful)
      'X-XSS-Protection': '1; mode=block',
    }
  },
  preview: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud;",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'X-XSS-Protection': '1; mode=block',
      // HSTS for production (31536000 = 1 year)
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    }
  },
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
