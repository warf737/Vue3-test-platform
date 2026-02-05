<template>
  <div class="home-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>Учетные записи</h3>
          <el-button :icon="Plus" @click="navigateTo('create')" />
        </div>
      </template>
      <div class="content">
        <p>Это изолированный Vue-модуль с собственным роутингом, store и компонентами.</p>
        <div class="actions">
          <el-button type="default" @click="navigateTo('edit')">
            Перейти к редактированию
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useModuleRouter } from '@/composables/useModuleRouter.ts'
import { Plus } from '@element-plus/icons-vue'
import { useAccountsStore } from '../store/index.ts'

const store = useAccountsStore()
const accounts = store.accounts

console.log({ accounts })

const { navigateTo } = useModuleRouter()
</script>

<style scoped>
.home-view {
  width: 100%;
}

.header {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.content {
  padding: 20px;
}

.content p {
  margin-bottom: 20px;
  color: #606266;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
