export interface IAccount {
  id?: number
  label: []
  type: 'local' | 'LDAP'
  login: string
  password?: string
}
