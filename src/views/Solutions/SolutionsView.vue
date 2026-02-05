<template>
  <div class="projects-view">
    <h2>Решения задач</h2>
    <p>Выберите задачу, чтобы посмотреть её решение</p>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col v-for="project in projects" :key="project.id" :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="project-card" shadow="hover" @click="goToProject(project.id)">
          <template #header>
            <div class="card-header">
              <span>{{ project.title }}</span>
            </div>
          </template>
          <div class="card-body">
            <p>{{ project.description }}</p>
            <el-tag :type="project.status === 'completed' ? 'success' : 'info'">
              {{ project.status === 'completed' ? 'Готово' : 'В работе' }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Project {
  id: number
  title: string
  description: string
  status: 'completed' | 'in-progress'
}

const router = useRouter()

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Задача 1: Форма входа',
    description: 'Создание формы входа с валидацией',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Задача 2: Список пользователей',
    description: 'Отображение списка пользователей с фильтрацией',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Задача 3: Дашборд',
    description: 'Создание информационной панели с графиками',
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Задача 4: API интеграция',
    description: 'Интеграция с внешним API для получения данных',
    status: 'completed',
  },
])

const goToProject = (id: number) => {
  router.push(`/projects/${id}`)
}
</script>

<style scoped>
.projects-view {
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

.project-card:hover {
  transform: translateY(-5px);
}

.card-header {
  font-weight: 600;
  font-size: 16px;
}

.card-body {
  min-height: 80px;
}

.card-body p {
  color: #606266;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
