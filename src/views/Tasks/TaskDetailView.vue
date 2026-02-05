<template>
  <div class="task-detail">
    <el-button :icon="ArrowLeft" style="margin-bottom: 20px" @click="goBack">
      Назад к заданиям
    </el-button>

    <el-card v-if="task">
      <template #header>
        <div class="card-header">
          <h2>{{ task.title }}</h2>
          <el-button @click="gotoSolution">Перейти к решению</el-button>
        </div>
      </template>

      <el-form :model="taskForm" label-width="120px" label-position="top">
        <el-form-item label="Название задания">
          <el-input v-model="taskForm.title" disabled />
        </el-form-item>

        <el-form-item label="Описание задания">
          <el-card shadow="never" class="description-card">
            <pre class="description-text"><code>{{ tp(taskForm.description) }}</code></pre>
          </el-card>
        </el-form-item>

        <el-form-item v-if="taskForm.examples" label="Примеры">
          <el-card shadow="never" style="background-color: #f5f7fa">
            <pre>{{ taskForm.examples }}</pre>
          </el-card>
        </el-form-item>

        <el-divider />

        <el-form-item>
          <el-button @click="gotoSolution">Перейти к решению</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-empty v-else description="Задание не найдено" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { tasksData } from './constants.ts'
import type { ITaskData } from '@/interfaces/tasks.ts'
import { typography as tp } from '@/utils/typography'

const router = useRouter()
const route = useRoute()
const task = ref<ITaskData | null>(null)
const taskId = ref<number>(Number(route.params.id))

const taskForm = reactive({
  title: '',
  description: '',
  requirements: [] as string[],
  examples: '',
})

onMounted(() => {
  const foundTask = tasksData.find(t => t.id === taskId.value)

  if (foundTask) {
    task.value = foundTask
    taskForm.title = foundTask.title
    taskForm.description = foundTask.description
    taskForm.requirements = foundTask.requirements || []
    taskForm.examples = foundTask.examples || ''
  }
})

const goBack = () => {
  router.push('/tasks')
}

const gotoSolution = () => {
  router.push(`/solutions/${taskId.value}`)
}
</script>

<style scoped>
.task-detail {
  max-width: 900px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.requirements-list {
  margin: 10px 0;
  padding-left: 20px;
}

.requirements-list li {
  margin: 8px 0;
  color: #606266;
}

.requirements-list pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #303133;
}

.description-card {
  background-color: #f5f7fa;
}

.description-text {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #303133;
  max-width: 100%;
  overflow-x: hidden;
}

.description-text code {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: block;
}
</style>
