import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'users-list-home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: 'create',
    name: 'users-list-create',
    component: () => import('../views/CreateView.vue'),
  },
  {
    path: 'edit',
    name: 'users-list-edit',
    component: () => import('../views/EditView.vue'),
  },
]

/**
 * Функция для получения роутов модуля
 * Можно использовать для динамической загрузки роутов
 */
export function getModuleRoutes(): Array<RouteRecordRaw> {
  return routes
}
