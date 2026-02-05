<template>
  <div class="tasks-view">
    <h2>Задания</h2>
    <p>Выберите задание, чтобы посмотреть его описание</p>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col v-for="(task, index) in tasks" :key="index" :xs="24" :sm="12" :md="8" :lg="6">
        <card shadow="hover" @click="goToTask(task.id)">
          <template #header>
            <div class="card-header">
              <span>{{ task.title }}</span>
            </div>
          </template>
          <div class="card-body">
            <p>{{ task.shortDescription }}</p>

            <divider />
            <div class="tags-container">
              <el-tag
                v-for="(tech, techIndex) in getTechnologies(task.technology)"
                :key="techIndex"
                type="primary"
                style="margin-right: 8px; margin-bottom: 8px"
              >
                {{ tech }}
              </el-tag>
            </div>
          </div>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { tasks } from './constants.ts'
import { useRouter } from 'vue-router'
import divider from '@/components/Divider/Divider.vue'
import Card from '@/components/Card/Card.vue'

const router = useRouter()

const goToTask = (id: number) => {
  router.push(`/tasks/${id}`)
}

const getTechnologies = (technology: string): string[] => {
  if (!technology) return []
  return technology
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
}
</script>

<style scoped>
.tasks-view {
  max-width: 1200px;
  margin: 0 auto;
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

.tags-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
