<template>
  <div class="project-detail">
    <el-button :icon="ArrowLeft" style="margin-bottom: 20px" @click="goBack">
      Назад к проектам
    </el-button>

    <el-card v-if="solution">
      <template #header>
        <div class="card-header">
          <h2>{{ solution.title }}</h2>
        </div>
      </template>

      <div class="project-content">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="Описание">
            {{ solution.description }}
          </el-descriptions-item>
          <el-descriptions-item label="Статус">
            <el-tag :type="solution.status === 'completed' ? 'success' : 'info'">
              {{ solution.status === 'completed' ? 'Готово' : 'В работе' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Дата создания">
            {{ solution.createdAt }}
          </el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <div class="solution-section">
          <h3>Решение</h3>
          <div class="solution-content">
            <el-alert
              v-if="solution.solution.title"
              :title="solution.solution.title"
              :description="solution.solution.description"
              type="success"
              :closable="false"
              style="margin-bottom: 20px"
            />

            <!-- Динамическая загрузка модуля решения -->
            <solution-module-loader
              v-if="solution.solution.moduleName"
              :module-name="solution.solution.moduleName"
            />
            <!-- Router view для nested routes модуля -->
            <router-view v-if="solution.solution.moduleName" />

            <!-- Fallback: текстовое описание, если модуль не указан -->
            <template v-else>
              <div v-if="solution.solution.code" class="code-section">
                <h4>Пример кода:</h4>
                <pre><code>{{ solution.solution.code }}</code></pre>
              </div>

              <div v-if="solution.solution.features" class="features-section">
                <h4>Реализованные функции:</h4>
                <ul>
                  <li v-for="feature in solution.solution.features" :key="feature">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </el-card>

    <el-empty v-else description="Проект не найден" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { solutionsData } from '@/views/Solutions/constants.ts'
import type { ISolutionData } from '@/interfaces/solutions.ts'
import solutionModuleLoader from '@/components/SolutionModuleLoader/SolutionModuleLoader.vue'

const router = useRouter()
const route = useRoute()
const solution = ref<ISolutionData | null>(null)

onMounted(() => {
  const projectId = Number(route.params.id)
  solution.value = solutionsData.find(p => p.id === projectId) || null
})

const goBack = () => {
  router.push('/solutions')
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
