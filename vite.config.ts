import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Base URL для GitHub Pages
  // Для локальной разработки используем '/'
  // Для GitHub Pages используем имя репозитория (устанавливается через переменную окружения BASE_URL)
  const base = process.env.BASE_URL || '/'

  return {
    base,
    plugins: [vue(), vueDevTools()],
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
  }
})
