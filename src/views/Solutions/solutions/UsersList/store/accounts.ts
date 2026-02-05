import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IAccount } from '@/interfaces/accounts'

/**
 * Стор для управления учетными записями
 */
export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<IAccount[]>([])

  const addAccount = (account: IAccount): void => {
    accounts.value.push(account)
  }

  const removeAccount = (id: number): void => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  const getAccountById = (id: number): IAccount | undefined => {
    return accounts.value.find(account => account.id === id)
  }

  const updateAccount = (id: number, updatedAccount: Partial<IAccount>): void => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedAccount } as IAccount
    }
  }

  return { accounts, addAccount, removeAccount, getAccountById, updateAccount }
})
