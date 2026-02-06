import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'users-list-home',
    component: () => import('../views/UserListView.vue'),
  },
]

/**
 * Функция для получения роутов модуля
 * Можно использовать для динамической загрузки роутов
 */
export function getModuleRoutes(): Array<RouteRecordRaw> {
  return routes
}
