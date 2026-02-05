<template>
  <div class="projects-view">
    <h2>Решения задач</h2>
    <p>Выберите задачу, чтобы посмотреть её решение</p>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col v-for="solution in solutions" :key="solution.id" :xs="24" :sm="12" :md="8" :lg="6">
        <card shadow="hover" @click="goToSolution(solution.id)">
          <template #header>
            <div class="card-header">
              <span>{{ solution.title }}</span>
            </div>
          </template>
          <div class="card-body">
            <p>{{ solution.description }}</p>
            <el-tag :type="solution.status === 'completed' ? 'success' : 'info'">
              {{ solution.status === 'completed' ? 'Готово' : 'В работе' }}
            </el-tag>
          </div>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { solutions } from './constants.ts'
import { useRouter } from 'vue-router'
import Card from '@/components/Card/Card.vue'

const router = useRouter()

const goToSolution = (id: number) => {
  router.push(`/solutions/${id}`)
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
