export interface IAccount {
  id?: number
  label: string[]
  type: 'local' | 'LDAP'
  login: string
  password?: string
}
