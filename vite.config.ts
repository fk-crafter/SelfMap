import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    proxy: {
      '/api': {
        target: 'https://selfmap-bck.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/users': {
        target: 'https://selfmap-bck.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    nitro({
      routeRules: {
        '/api/**': { proxy: 'https://selfmap-bck.onrender.com/api/**' },
        '/users/**': { proxy: 'https://selfmap-bck.onrender.com/users/**' },
      },
    }),
    viteReact(),
  ],
  preview: {
    allowedHosts: true,
  },
})

export default config
