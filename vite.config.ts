import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import veauryVitePlugins from 'veaury/vite/index.js'
// import checker from 'vite-plugin-checker';
// https://vitejs.dev/config/
const url = 'http://localhost:5173' || 'http://172.16.200.91:9999'
export default defineConfig({
  plugins: [
    // vue(),
    vueJsx(),
    veauryVitePlugins({
      type: 'vue'
    })
    // checker({
    //   vueTsc: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 1888,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
