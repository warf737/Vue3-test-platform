<template>
  <div class="home-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>Учетные записи</h3>
          <el-button
            :icon="Plus"
            @click="addAccount({ label: [], type: 'local', login: '', password: '' })"
          />
        </div>
      </template>
      <div class="content">
        <el-table :data="accounts" class="accounts-table" style="width: 100%">
          <el-table-column
            v-for="field in accountFields"
            :key="field.key"
            :prop="field.key"
            :label="field.label"
          >
            <template #default="{ row }">
              <el-input
                v-if="field.view_as === 'input'"
                v-model="formInline[field.key]"
                size="small"
                :placeholder="field.label"
                clearable
              />
              <el-input
                v-else-if="field.view_as === 'input-password'"
                v-model="formInline[field.key]"
                type="password"
                size="small"
                :placeholder="field.label"
                show-password
                clearable
              />
              <el-select
                v-else-if="field.view_as === 'select'"
                v-model="formInline[field.key]"
                size="small"
                :placeholder="field.label"
              >
                <el-option
                  v-for="option in field.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template #default="{ row }">
              <el-button type="danger" size="small" @click="removeAccount(row.id!)">
                Удалить
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useAccountsStore } from '../store/index.ts'
import { accountFields } from '../constants.ts'

const { addAccount, removeAccount, accounts } = useAccountsStore()

const formInline = reactive<Record<string, any>>({
  label: '',
  login: '',
  type: '',
  password: '',
})

// // Функция для получения ширины столбца
// const getColumnWidth = (key: string): number => {
//   const widths: Record<string, number> = {
//     label: 200,
//     type: 150,
//     login: 200,
//     password: 200,
//   }
//   return widths[key] || 150
// }
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
</style>
