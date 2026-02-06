import type { IFormField } from '@/interfaces/formFields'

export const accountFields: IFormField[] = [
  {
    key: 'label',
    label: 'Метка',
    view_as: 'input',
    initial: '',
  },
  {
    key: 'type',
    label: 'Тип записи',
    view_as: 'select',
    initial: '',
    options: [
      { label: 'LDAP', value: 'ldap' },
      { label: 'Локальная', value: 'local' },
    ],
  },
  {
    key: 'login',
    label: 'Логин',
    view_as: 'input',
    initial: '',
    required: true,
  },
  {
    key: 'password',
    label: 'Пароль',
    view_as: 'input-password',
    initial: '',
  },
]
