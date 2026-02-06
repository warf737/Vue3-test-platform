import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useAccountsStore } from '../store/index.ts'
import type { IAccount } from '@/interfaces/accounts'
import { useAccountForms } from './useAccountForms'

/**
 * Composable для управления учетными записями
 */
export function useAccountsManagement() {
  const store = useAccountsStore()

  // Локальное состояние для отображения учетных записей
  const currentAccounts = ref<IAccount[]>([])

  // Инициализируем формы с доступом к currentAccounts
  const accountForms = useAccountForms(currentAccounts)

  /**
   * Инициализация данных из стора
   */
  const initializeAccounts = () => {
    currentAccounts.value = [...store.accounts]
    // Инициализируем формы для всех записей
    currentAccounts.value.forEach(account => {
      if (account.id) {
        accountForms.initAccountForm(account)
      }
    })
  }

  /**
   * Обработчик добавления новой записи
   */
  const handleAddAccount = () => {
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
      accountForms.initAccountForm(newAccount)
    }
  }

  /**
   * Обработчик изменения типа записи
   */
  const handleTypeChange = (accountId: number, value: string) => {
    const form = accountForms.getAccountForm(accountId)
    const formRef = accountForms.formRefs[accountId]

    if (value === 'ldap') {
      form.password = null
      // Убираем валидацию пароля для ldap
      if (formRef) {
        formRef.clearValidate('password')
      }
    }
    saveAccountToStore(accountId)
  }

  /**
   * Сохранение учетной записи в стор
   */
  const saveAccountToStore = async (accountId: number) => {
    const formRef = accountForms.formRefs[accountId]
    const form = accountForms.getAccountForm(accountId)

    if (!form || Object.keys(form).length === 0) return

    // Если форма еще не зарегистрирована, не сохраняем
    if (!formRef) {
      return
    }

    try {
      await formRef.validate()

      // Валидация прошла успешно, сохраняем
      // Обработка поля label: разбиваем строку по ; в массив объектов
      const labelArray =
        form.label && form.label.trim()
          ? form.label
              .split(';')
              .map((item: string) => item.trim())
              .filter((item: string) => item.length > 0)
              .map((item: string) => ({ text: item }))
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

  /**
   * Обработчик удаления записи
   */
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
    accountForms.clearAccountForm(id)
  }

  // Инициализация при монтировании
  onMounted(() => {
    initializeAccounts()
  })

  return {
    currentAccounts,
    accountForms,
    handleAddAccount,
    handleRemoveAccount,
    handleTypeChange,
    saveAccountToStore,
  }
}
