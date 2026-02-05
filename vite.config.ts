import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: false,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    hmr: {
      overlay: true, // Показывать overlay с ошибками
    },
    // Автоматическое открытие браузера
    open: false,
    // Порт для dev сервера
    port: 4000,
    // Хост
    host: true,
    // Настройки для более быстрого обновления
    watch: {
      usePolling: false,
      interval: 100,
    },
  },
  // Оптимизация для быстрого HMR
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'element-plus'],
  },
})
