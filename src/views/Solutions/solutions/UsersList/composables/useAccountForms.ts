import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { accountFields } from '../constants.ts'
import type { IAccount } from '@/interfaces/accounts'

/**
 * Composable для работы с формами учетных записей
 */
export function useAccountForms(currentAccounts: { value: IAccount[] }) {
  // Формы для каждой учетной записи
  const accountForms = reactive<Record<number, Record<string, any>>>({})
  const formRefs = reactive<Record<number, FormInstance>>({})

  /**
   * Получение правил валидации для формы
   */
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

  /**
   * Установка референса формы
   */
  const setFormRef = (accountId: number, el: FormInstance | null) => {
    if (el) {
      formRefs[accountId] = el
    }
  }

  /**
   * Инициализация формы для учетной записи
   */
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
                ? account.label.map(item => item.text).join(';')
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

  /**
   * Получение формы для конкретной записи
   */
  const getAccountForm = (accountId: number): Record<string, any> => {
    const account = currentAccounts.value.find(acc => acc.id === accountId)
    if (account && !accountForms[accountId]) {
      initAccountForm(account)
    }
    return accountForms[accountId] || {}
  }

  /**
   * Очистка формы и рефа для удаленной записи
   */
  const clearAccountForm = (accountId: number) => {
    delete accountForms[accountId]
    delete formRefs[accountId]
  }

  return {
    accountForms,
    formRefs,
    getFormRules,
    setFormRef,
    initAccountForm,
    getAccountForm,
    clearAccountForm,
  }
}
