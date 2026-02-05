import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IAccount } from '@/interfaces/accounts'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<IAccount[]>([])

  function addAccount(account: IAccount): void {
    accounts.value.push(account)
  }

  function removeAccount(id: number): void {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  function getAccountById(id: number): IAccount | undefined {
    return accounts.value.find(account => account.id === id)
  }

  function updateAccount(id: number, updatedAccount: Partial<IAccount>): void {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedAccount } as IAccount
    }
  }

  return { accounts, addAccount, removeAccount, getAccountById, updateAccount }
})
