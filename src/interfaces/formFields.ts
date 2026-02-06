export interface IFormField {
  key: string
  label?: string
  view_as: 'input' | 'input-password' | 'input-textarea' | 'select' | 'icon' | 'delete'
  initial?: string | number | null
  options?: Array<{ label: string; value: string }>
  icon?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  width?: number
  maxLength?: number
}
