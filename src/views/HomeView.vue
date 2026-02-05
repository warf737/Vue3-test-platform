<template>
  <div class="home">
    <el-card class="box-card">
      <div>
        <div class="header__wrapper">
          <h3>Учетные записи</h3>
          <el-button :icon="Plus" @click="counterStore.increment" />
        </div>
        <!--        <el-form :model="form" label-width="120px" style="max-width: 500px">-->
        <!--          <el-form-item label="Имя">-->
        <!--            <el-input v-model="form.name" />-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="Email">-->
        <!--            <el-input v-model="form.email" type="email" />-->
        <!--          </el-form-item>-->
        <!--          <el-form-item>-->
        <!--            <el-button type="primary" @click="onSubmit">Сохранить</el-button>-->
        <!--            <el-button @click="onReset">Сбросить</el-button>-->
        <!--          </el-form-item>-->
        <!--        </el-form>-->
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useAccountsStore } from '@/stores/accounts.ts'

const counterStore = useAccountsStore()

const form = reactive({
  label: '',
  type: '',
  login: '',
  password: '',
  name: '',
})

const onSubmit = () => {
  ElMessage.success('Форма отправлена!')
  console.log('Form data:', form)
}

const onReset = () => {
  form.label = ''
  form.type = ''
  form.login = ''
  form.password = ''
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

.header__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
