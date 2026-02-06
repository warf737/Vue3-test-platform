<template>
  <div class="home-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>Учетные записи</h3>
          <el-button :icon="Plus" @click="handleAddAccount" />
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
                v-model="getAccountForm(row.id!)[field.key]"
                size="small"
                :placeholder="field.label"
                clearable
              />
              <el-input
                v-else-if="field.view_as === 'input-password'"
                v-model="getAccountForm(row.id!)[field.key]"
                type="password"
                size="small"
                :placeholder="field.label"
                show-password
                clearable
              />
              <el-select
                v-else-if="field.view_as === 'select'"
                v-model="getAccountForm(row.id!)[field.key]"
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
              <el-button type="danger" size="small" @click="handleRemoveAccount(row.id!)">
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
import { reactive, computed, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useAccountsStore } from '../store/index.ts'
import { accountFields } from '../constants.ts'
import type { IAccount } from '@/interfaces/accounts'

const store = useAccountsStore()
const accounts = computed(() => store.accounts)

// Формы для каждой учетной записи
const accountForms = reactive<Record<number, Record<string, any>>>({})

const initAccountForm = (account: IAccount) => {
  if (!account.id) return

  if (!accountForms[account.id]) {
    accountForms[account.id] = reactive(
      Object.fromEntries(
        accountFields.map(field => [
          field.key,
          field.key === 'label'
            ? account.label && account.label.length > 0
              ? account.label.join(', ')
              : ''
            : field.key === 'type'
              ? account.type === 'LDAP'
                ? 'ldap'
                : 'local'
              : account[field.key as keyof IAccount] || field.initial || '',
        ])
      )
    )
  }
}

// Получение формы для конкретной записи
const getAccountForm = (accountId: number): Record<string, any> => {
  const account = store.getAccountById(accountId)
  if (account && !accountForms[accountId]) {
    initAccountForm(account)
  }
  return accountForms[accountId] || {}
}

// Инициализация всех форм при монтировании
onMounted(() => {
  accounts.value.forEach(account => {
    if (account.id) {
      initAccountForm(account)
    }
  })
})

// Обработчик добавления новой записи
const handleAddAccount = () => {
  const newAccount: IAccount = {
    label: [],
    type: 'local',
    login: '',
    password: '',
  }
  store.addAccount(newAccount)
  // Инициализируем форму для новой записи
  const addedAccount = accounts.value[accounts.value.length - 1]
  if (addedAccount && addedAccount.id) {
    initAccountForm(addedAccount)
  }
}

// Обработчик удаления записи
const handleRemoveAccount = (id: number) => {
  store.removeAccount(id)
  delete accountForms[id]
}
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
