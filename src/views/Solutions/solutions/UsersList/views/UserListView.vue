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
        <div class="form-header">
          <div class="header-cell">Метка</div>
          <div class="header-cell">Тип записи</div>
          <div class="header-cell">Логин</div>
          <div class="header-cell">Пароль</div>
          <div class="header-cell" />
        </div>

        <el-form
          v-for="account in currentAccounts"
          :key="account.id"
          :ref="(el: FormInstance | null) => setFormRef(account.id!, el)"
          :model="getAccountForm(account.id!)"
          :rules="getFormRules(account.id!)"
          inline
          class="account-form"
        >
          <el-form-item
            v-for="field in accountFields"
            :key="field.key"
            :prop="field.key"
            class="form-cell"
          >
            <el-input
              v-if="field.view_as === 'input'"
              v-model="getAccountForm(account.id!)[field.key]"
              size="small"
              :placeholder="field.label"
              :maxlength="field.maxLength"
              @blur="() => saveAccountToStore(account.id!)"
            />

            <el-input
              v-if="
                field.view_as === 'input-password' && getAccountForm(account.id!).type !== 'ldap'
              "
              v-model="getAccountForm(account.id!)[field.key]"
              type="password"
              size="small"
              :placeholder="field.label"
              :maxlength="field.maxLength"
              show-password
              @blur="() => saveAccountToStore(account.id!)"
            />

            <el-select
              v-if="field.view_as === 'select'"
              v-model="getAccountForm(account.id!)[field.key]"
              size="small"
              :placeholder="field.label"
              @change="(value: string) => handleTypeChange(account.id!, value)"
            >
              <el-option
                v-for="option in field.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item class="form-cell actions-cell">
            <el-button
              :icon="Delete"
              link
              type="danger"
              @click="handleRemoveAccount(account.id!)"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useAccountsStore } from '../store/index.ts'
import { accountFields } from '../constants.ts'
import type { IAccount } from '@/interfaces/accounts'

const store = useAccountsStore()

// Локальное состояние для отображения учетных записей
const currentAccounts = ref<IAccount[]>([])

// Формы для каждой учетной записи
const accountForms = reactive<Record<number, Record<string, any>>>({})
const formRefs = reactive<Record<number, FormInstance>>({})

const getFormRules = (accountId: number): FormRules => {
  const form = getAccountForm(accountId)
  const isLdap = form.type === 'ldap'

  return {
    login: [
      { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
      { max: 100, message: 'Максимальная длина 100 символов', trigger: 'blur' },
    ],
    password: isLdap
      ? [{ max: 100, message: 'Максимальная длина 100 символов', trigger: 'blur' }]
      : [
          { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          { max: 100, message: 'Максимальная длина 100 символов', trigger: 'blur' },
        ],
    label: [{ max: 50, message: 'Максимальная длина 50 символов', trigger: 'blur' }],
  }
}

const setFormRef = (accountId: number, el: FormInstance | null) => {
  if (el) {
    formRefs[accountId] = el
  }
}

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
              ? account.label.join(';')
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
  const account = currentAccounts.value.find(acc => acc.id === accountId)
  if (account && !accountForms[accountId]) {
    initAccountForm(account)
  }
  return accountForms[accountId] || {}
}

// Инициализация всех форм при монтировании
onMounted(() => {
  // Загружаем данные из стора в локальное состояние
  currentAccounts.value = [...store.accounts]

  // Инициализируем формы для всех записей
  currentAccounts.value.forEach(account => {
    if (account.id) {
      initAccountForm(account)
    }
  })
})

// Обработчик добавления новой записи
const handleAddAccount = () => {
  // Создаем новую запись и добавляем только в локальное состояние
  const newAccount: IAccount = {
    id: Date.now(),
    label: [],
    type: 'local',
    login: '',
    password: '',
  }

  // Добавляем запись только в currentAccounts
  currentAccounts.value.push(newAccount)

  // Инициализируем форму для новой записи
  if (newAccount.id) {
    initAccountForm(newAccount)
  }
}

// Обработчик изменения типа записи
const handleTypeChange = (accountId: number, value: string) => {
  const form = getAccountForm(accountId)
  const formRef = formRefs[accountId]

  if (value === 'ldap') {
    form.password = null
    // Убираем валидацию пароля для ldap
    if (formRef) {
      formRef.clearValidate('password')
    }
  }
  saveAccountToStore(accountId)
}

// Сохранение учетной записи в стор
const saveAccountToStore = async (accountId: number) => {
  const formRef = formRefs[accountId]
  const form = getAccountForm(accountId)

  if (!form || Object.keys(form).length === 0) return

  // Если форма еще не зарегистрирована, не сохраняем
  if (!formRef) {
    return
  }

  try {
    await formRef.validate()

    // Валидация прошла успешно, сохраняем
    // Обработка поля label: разбиваем строку по ; в массив
    const labelArray =
      form.label && form.label.trim()
        ? form.label
            .split(';')
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0)
        : []

    const accountData: IAccount = {
      id: accountId,
      type: (form.type === 'ldap' ? 'LDAP' : 'local') as 'local' | 'LDAP',
      login: form.login?.trim() || '',
      password: form.type === 'ldap' ? null : form.password || undefined,
      label: labelArray,
    }

    // Обновляем запись в currentAccounts
    const accountIndex = currentAccounts.value.findIndex(acc => acc.id === accountId)
    if (accountIndex !== -1) {
      currentAccounts.value[accountIndex] = accountData
    }

    // Проверяем, существует ли запись в сторе
    const existingAccount = store.getAccountById(accountId)
    if (existingAccount) {
      // Обновляем существующую запись в сторе
      store.updateAccount(accountId, accountData)
    } else {
      // Добавляем новую запись в стор
      store.addAccount(accountData)
    }

    ElNotification({
      message: 'Изменения успешно сохранены',
      type: 'success',
    })
  } catch (error) {
    console.log({ error })
  }
}

// Обработчик удаления записи
const handleRemoveAccount = (id: number) => {
  // Удаляем из локального состояния
  const accountIndex = currentAccounts.value.findIndex(acc => acc.id === id)
  if (accountIndex !== -1) {
    currentAccounts.value.splice(accountIndex, 1)
  }

  // Удаляем из стора, если запись там есть
  const existingAccount = store.getAccountById(id)
  if (existingAccount) {
    store.removeAccount(id)
  }

  // Очищаем формы и рефы
  delete accountForms[id]
  delete formRefs[id]
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

.form-header {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background-color: #f5f7fa;
  border-bottom: 2px solid #e4e7ed;
  font-weight: 600;
  color: #606266;
  font-size: 14px;
}

.header-cell {
  text-align: left;
}

.account-form {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #e4e7ed;
  align-items: flex-start;
}

.account-form:hover {
  background-color: #fafafa;
}

.form-cell {
  margin-bottom: 0;
  width: 100%;
}

.actions-cell {
  display: flex;
  justify-content: center;
}

:deep(.el-form-item__error) {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.2;
}
</style>
