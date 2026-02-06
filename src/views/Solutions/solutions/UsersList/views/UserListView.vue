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
              <div class="field-wrapper">
                <el-input
                  v-if="field.view_as === 'input'"
                  v-model="getAccountForm(row.id!)[field.key]"
                  size="small"
                  :placeholder="field.label"
                  :class="{ 'field-error': getFieldError(row.id!, field.key) }"
                  @blur="() => handleFieldBlur(row.id!, field.key)"
                />
                <el-input
                  v-else-if="
                    field.view_as === 'input-password' && getAccountForm(row.id!).type !== 'ldap'
                  "
                  v-model="getAccountForm(row.id!)[field.key]"
                  type="password"
                  size="small"
                  :placeholder="field.label"
                  show-password
                  :class="{ 'field-error': getFieldError(row.id!, field.key) }"
                  @blur="() => handleFieldBlur(row.id!, field.key)"
                />
                <el-select
                  v-else-if="field.view_as === 'select'"
                  v-model="getAccountForm(row.id!)[field.key]"
                  size="small"
                  :placeholder="field.label"
                  @change="(value: string) => handleTypeChange(row.id!, value)"
                >
                  <el-option
                    v-for="option in field.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <div v-if="getFieldError(row.id!, field.key)" class="error-message">
                  {{ getFieldError(row.id!, field.key) }}
                </div>
              </div>
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
import { ElMessage } from 'element-plus'
import { useAccountsStore } from '../store/index.ts'
import { accountFields } from '../constants.ts'
import type { IAccount } from '@/interfaces/accounts'

const store = useAccountsStore()
const accounts = computed(() => store.accounts)

// Формы для каждой учетной записи
const accountForms = reactive<Record<number, Record<string, any>>>({})
// Ошибки валидации для каждой записи
const fieldErrors = reactive<Record<number, Record<string, string>>>({})

const initAccountForm = (account: IAccount) => {
  if (!account.id) return

  if (!accountForms[account.id]) {
    const accountType = account.type === 'LDAP' ? 'ldap' : 'local'
    accountForms[account.id] = reactive(
      Object.fromEntries(
        accountFields.map(field => [
          field.key,
          field.key === 'label'
            ? account.label && account.label.length > 0
              ? account.label.join(', ')
              : ''
            : field.key === 'type'
              ? accountType
              : field.key === 'password'
                ? accountType === 'ldap'
                  ? null
                  : account[field.key as keyof IAccount] || field.initial || ''
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

// Получение ошибки для поля
const getFieldError = (accountId: number, fieldKey: string): string => {
  return fieldErrors[accountId]?.[fieldKey] || ''
}

// Валидация поля
const validateField = (accountId: number, fieldKey: string): boolean => {
  const form = getAccountForm(accountId)
  if (!form) return false

  // Инициализируем объект ошибок для записи, если его нет
  if (!fieldErrors[accountId]) {
    fieldErrors[accountId] = {}
  }

  // Проверка обязательных полей
  if (fieldKey === 'login') {
    const value = form.login
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      fieldErrors[accountId][fieldKey] = 'Поле "Логин" обязательно для заполнения'
      return false
    } else {
      delete fieldErrors[accountId][fieldKey]
    }
  }

  if (fieldKey === 'password') {
    const accountType = form.type
    // Пароль обязателен только если тип не ldap
    if (accountType !== 'ldap') {
      const value = form.password
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        fieldErrors[accountId][fieldKey] = 'Поле "Пароль" обязательно для заполнения'
        return false
      } else {
        delete fieldErrors[accountId][fieldKey]
      }
    } else {
      // Если тип ldap, убираем ошибку пароля
      delete fieldErrors[accountId][fieldKey]
    }
  }

  return true
}

// Валидация всей формы
const validateForm = (accountId: number): boolean => {
  let isValid = true
  const form = getAccountForm(accountId)

  // Валидация логина
  if (!validateField(accountId, 'login')) {
    isValid = false
  }

  // Валидация пароля (только если тип не ldap)
  if (form.type !== 'ldap') {
    if (!validateField(accountId, 'password')) {
      isValid = false
    }
  }

  return isValid
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

// Обработчик изменения типа записи
const handleTypeChange = (accountId: number, value: string) => {
  const form = getAccountForm(accountId)
  if (value === 'ldap') {
    form.password = null
  }
  saveAccountToStore(accountId)
}

// Обработчик потери фокуса для полей
const handleFieldBlur = (accountId: number, fieldKey: string) => {
  validateField(accountId, fieldKey)
  saveAccountToStore(accountId)
}

// Сохранение учетной записи в стор
const saveAccountToStore = (accountId: number) => {
  const form = getAccountForm(accountId)
  if (!form || Object.keys(form).length === 0) return

  // Валидация перед сохранением
  if (!validateForm(accountId)) {
    ElMessage.warning('Заполните все обязательные поля')
    return
  }

  // Преобразуем данные формы в IAccount
  const labelValue = form.label
  const labelArray: string[] = Array.isArray(labelValue)
    ? labelValue
    : labelValue
      ? [String(labelValue)]
      : []

  const accountData: Partial<IAccount> = {
    label: labelArray,
    type: (form.type === 'ldap' ? 'LDAP' : 'local') as 'local' | 'LDAP',
    login: form.login?.trim() || '',
    password: form.type === 'ldap' ? null : form.password || undefined,
  }

  store.updateAccount(accountId, accountData)
}

// Обработчик удаления записи
const handleRemoveAccount = (id: number) => {
  store.removeAccount(id)
  delete accountForms[id]
  delete fieldErrors[id]
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

.field-wrapper {
  position: relative;
}

.field-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}

.field-error :deep(.el-select__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 12px;
  color: #f56c6c;
  line-height: 1.2;
}
</style>
