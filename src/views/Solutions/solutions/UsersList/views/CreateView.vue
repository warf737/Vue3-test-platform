<template>
  <div class="create-view">
    <el-card>
      <template #header>
        <div class="header-content">
          <h3>Создание</h3>
          <el-button :icon="ArrowLeft" @click="goBack">Назад</el-button>
        </div>
      </template>
      <div class="content">
        <p>Страница создания в модуле UsersList</p>
        <el-form :model="form" label-width="120px" style="max-width: 500px">
          <el-form-item label="Название">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Описание">
            <el-input v-model="form.description" type="textarea" :rows="4" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">Создать</el-button>
            <el-button @click="goBack">Отмена</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useModuleRouter } from '@/composables/useModuleRouter.ts'

const { goBack } = useModuleRouter()

const form = reactive({
  name: '',
  description: '',
})

const handleSubmit = () => {
  ElMessage.success('Создано успешно!')
  goBack()
}
</script>

<style scoped>
.create-view {
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h3 {
  margin: 0;
}

.content {
  padding: 20px;
}

.content p {
  margin-bottom: 20px;
  color: #606266;
}
</style>
