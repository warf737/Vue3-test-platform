import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IAccount } from '@/interfaces/accounts'

const STORAGE_KEY = 'accounts'

/**
 * Функция для загрузки данных из localStorage
 */
const loadFromStorage = (): IAccount[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as IAccount[]
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных из localStorage:', error)
  }
  return []
}

/**
 * Функция для сохранения данных в localStorage
 */
const saveToStorage = (accounts: IAccount[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
  } catch (error) {
    console.error('Ошибка при сохранении данных в localStorage:', error)
  }
}

/**
 * Стор для управления учетными записями
 */
export const useAccountsStore = defineStore('accounts', () => {
  // Инициализация из localStorage
  const accounts = ref<IAccount[]>(loadFromStorage())

  const addAccount = (account: IAccount): void => {
    const accountWithId: IAccount = {
      ...account,
      id: account.id || Date.now(),
    }
    accounts.value.push(accountWithId)
    saveToStorage(accounts.value)
  }

  const removeAccount = (id?: number): void => {
    if (id) {
      const index = accounts.value.findIndex(account => account.id === id)
      if (index !== -1) {
        accounts.value.splice(index, 1)
        saveToStorage(accounts.value)
      }
    } else {
      console.warn('Не удалось определить id удаляемой записи')
    }
  }

  const getAccountById = (id: number): IAccount | undefined => {
    return accounts.value.find(account => account.id === id)
  }

  const updateAccount = (id: number, updatedAccount: Partial<IAccount>): void => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedAccount } as IAccount
      saveToStorage(accounts.value)
    }
  }

  return { accounts, addAccount, removeAccount, getAccountById, updateAccount }
})
