import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/projects',
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects/ProjectsView.vue'),
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('../views/Projects/ProjectDetailView.vue'),
    props: true,
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
