<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Добро пожаловать!</span>
        </div>
      </template>
      <div>
        <h2>Vue 3 + Composition API + Pinia + TypeScript</h2>

        <el-divider />

        <h3>Пример использования Pinia Store:</h3>
        <div style="margin: 20px 0">
          <el-button :icon="Minus" circle @click="counterStore.decrement" />
          <span style="margin: 0 20px; font-size: 24px">{{ counterStore.count }}</span>
          <el-button :icon="Plus" circle @click="counterStore.increment" />
        </div>

        <el-divider />

        <h3>Пример формы Element Plus:</h3>
        <el-form :model="form" label-width="120px" style="max-width: 500px">
          <el-form-item label="Имя">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email" type="email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Сохранить</el-button>
            <el-button @click="onReset">Сбросить</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Minus } from '@element-plus/icons-vue'
import { useAccountsStore } from '@/stores/accounts.ts'

const counterStore = useAccountsStore()

const form = reactive({
  label: '',
  type: '',
  login: '',
  password: '',
})

const onSubmit = () => {
  ElMessage.success('Форма отправлена!')
  console.log('Form data:', form)
}

const onReset = () => {
  form.name = ''
  form.email = ''
  ElMessage.info('Форма сброшена')
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.box-card {
  margin-top: 20px;
}
</style>
