import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webfontDownload from 'vite-plugin-webfont-dl'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'


// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    plugins: [
      react(),
      isBuild && webfontDownload(
        [],
        {
          injectAsStyleTag: true,
          async: true,
          cache: true,
        }
      ),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
        exclude: undefined,
        include: undefined,
        includePublic: true,
        logStats: true,
        ansiColors: true,
        svg: {
          multipass: true,
          plugins: [
            'preset-default',
            'sortAttrs',
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
              },
            },
          ],
        },
        png: {
          // https://sharp.pixelplumbing.com/api-output#png
          quality: 70,
        },
        jpeg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 70,
        },
        jpg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 70,
        },
        webp: {
          // https://sharp.pixelplumbing.com/api-output#webp
          lossless: true,
        },
        avif: {
          // https://sharp.pixelplumbing.com/api-output#avif
          lossless: true,
        },
      }),
    ].filter(Boolean),
    server: {
      headers: {
        // Content Security Policy - helps prevent XSS attacks
        // Allow Google Fonts in dev so they work when self-hosting is disabled
        'Content-Security-Policy': command === 'serve'
          ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud; frame-src 'self' http://*.localhost:5173 http://*.localhost:5174;"
          : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud; frame-src 'self';",
        // Prevent MIME type sniffing
        'X-Content-Type-Options': 'nosniff',
        // Prevent clickjacking - SAMEORIGIN in dev to allow localhost subdomains
        'X-Frame-Options': command === 'serve' ? 'SAMEORIGIN' : 'DENY',
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
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud;",
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
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
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
  }
})
