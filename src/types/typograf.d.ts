declare module 'typograf' {
  interface TypografOptions {
    locale?: string[]
    htmlEntity?: {
      type?: 'digit' | 'name'
    }
    enableRule?: string[]
    disableRule?: string[]
  }

  class Typograf {
    constructor(options?: TypografOptions)
    execute(text: string): string
    enableRule(rule: string): void
    disableRule(rule: string): void
  }

  export default Typograf
}
