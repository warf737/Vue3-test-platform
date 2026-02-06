export interface IAccount {
  id?: number
  label: Array<{ text: string }>
  type: 'local' | 'LDAP'
  login: string
  password?: string
}
