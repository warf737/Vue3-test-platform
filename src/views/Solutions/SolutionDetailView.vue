<template>
  <div class="project-detail">
    <el-button @click="goBack" :icon="ArrowLeft" style="margin-bottom: 20px">
      Назад к проектам
    </el-button>

    <el-card v-if="project">
      <template #header>
        <div class="card-header">
          <h2>{{ project.title }}</h2>
        </div>
      </template>

      <div class="project-content">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="Описание">
            {{ project.description }}
          </el-descriptions-item>
          <el-descriptions-item label="Статус">
            <el-tag :type="project.status === 'completed' ? 'success' : 'info'">
              {{ project.status === 'completed' ? 'Готово' : 'В работе' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Дата создания">
            {{ project.createdAt }}
          </el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <div class="solution-section">
          <h3>Решение</h3>
          <div class="solution-content">
            <el-alert
              :title="project.solution.title"
              :description="project.solution.description"
              type="success"
              :closable="false"
              style="margin-bottom: 20px"
            />

            <div v-if="project.solution.code" class="code-section">
              <h4>Пример кода:</h4>
              <pre><code>{{ project.solution.code }}</code></pre>
            </div>

            <div v-if="project.solution.features" class="features-section">
              <h4>Реализованные функции:</h4>
              <ul>
                <li v-for="feature in project.solution.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-empty v-else description="Проект не найден" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

interface Project {
  id: number
  title: string
  description: string
  status: 'completed' | 'in-progress'
  createdAt: string
  solution: {
    title: string
    description: string
    code?: string
    features?: string[]
  }
}

const router = useRouter()
const route = useRoute()
const project = ref<Project | null>(null)

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Задача 1: Форма входа',
    description: 'Создание формы входа с валидацией',
    status: 'completed',
    createdAt: '2024-01-15',
    solution: {
      title: 'Решение реализовано',
      description:
        'Форма входа создана с использованием Element Plus компонентов. Реализована валидация полей email и пароля.',
      code: `// Пример валидации формы
const validateEmail = (email: string) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
}`,
      features: [
        'Валидация email',
        'Валидация пароля (минимум 8 символов)',
        'Обработка ошибок',
        'Анимация загрузки',
      ],
    },
  },
  {
    id: 2,
    title: 'Задача 2: Список пользователей',
    description: 'Отображение списка пользователей с фильтрацией',
    status: 'completed',
    createdAt: '2024-01-20',
    solution: {
      title: 'Решение реализовано',
      description:
        'Создан компонент списка пользователей с возможностью фильтрации по имени и email.',
      features: [
        'Отображение списка пользователей',
        'Поиск по имени',
        'Фильтрация по статусу',
        'Пагинация',
      ],
    },
  },
  {
    id: 3,
    title: 'Задача 3: Дашборд',
    description: 'Создание информационной панели с графиками',
    status: 'in-progress',
    createdAt: '2024-02-01',
    solution: {
      title: 'В разработке',
      description: 'Дашборд находится в стадии разработки. Планируется интеграция с библиотекой графиков.',
      features: ['Базовая структура', 'Макет компонентов'],
    },
  },
  {
    id: 4,
    title: 'Задача 4: API интеграция',
    description: 'Интеграция с внешним API для получения данных',
    status: 'completed',
    createdAt: '2024-02-10',
    solution: {
      title: 'Решение реализовано',
      description:
        'Реализована интеграция с REST API. Использованы axios для HTTP запросов и Pinia для управления состоянием.',
      code: `// Пример API запроса
const fetchData = async () => {
  const response = await axios.get('/api/data')
  return response.data
}`,
      features: [
        'HTTP запросы через axios',
        'Обработка ошибок',
        'Кэширование данных',
        'Обновление состояния через Pinia',
      ],
    },
  },
]

onMounted(() => {
  const projectId = Number(route.params.id)
  project.value = projectsData.find((p) => p.id === projectId) || null
})

const goBack = () => {
  router.push('/projects')
}
</script>

<style scoped>
.project-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.project-content {
  margin-top: 20px;
}

.solution-section {
  margin-top: 30px;
}

.solution-section h3 {
  color: #303133;
  margin-bottom: 20px;
}

.solution-section h4 {
  color: #606266;
  margin-top: 20px;
  margin-bottom: 10px;
}

.code-section {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  margin-top: 15px;
}

.code-section pre {
  margin: 0;
  overflow-x: auto;
}

.code-section code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #303133;
}

.features-section ul {
  margin: 10px 0;
  padding-left: 20px;
}

.features-section li {
  margin: 8px 0;
  color: #606266;
}
</style>
