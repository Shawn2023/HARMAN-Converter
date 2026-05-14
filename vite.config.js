import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/HARMAN-Converter/',
  server: {
    proxy: {
      '/proxy/appstorage': {
        target: 'https://appstorage-dev.onecloud.harman.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/appstorage/, ''),
      },
      '/proxy/tools': {
        target: 'https://tools.onecloud.harman.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/tools/, ''),
      },
    }
  }
})
