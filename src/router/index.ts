import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { getModuleRoutes as getValidateUsersListRoutes } from '@/views/Solutions/solutions/UsersList/router/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/solutions',
  },
  {
    path: '/solutions',
    name: 'solutions',
    component: () => import('@/views/Solutions/SolutionsView.vue'),
  },
  {
    path: '/solutions/:id',
    name: 'solutions-detail',
    component: () => import('@/views/Solutions/SolutionDetailView.vue'),
    props: true,
    children: [...getValidateUsersListRoutes()],
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/Tasks/TasksView.vue'),
  },
  {
    path: '/tasks/:id',
    name: 'task-detail',
    component: () => import('../views/Tasks/TaskDetailView.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
