import { computed, type ComputedRef } from 'vue'
import { parseStyleString } from '@/utils/styleUtils'

/**
 * Composable для вычисления стилей компонента
 * @param customStyle - кастомные стили (строка или объект)
 * @param baseStyle - базовые стили, которые будут объединены с кастомными
 * @returns ComputedRef с вычисленными стилями
 * @example
 * const computedStyle = useComputedStyle(props.customStyle, { margin: '10px' })
 */
export function useComputedStyle(
  customStyle: string | Record<string, string> | (() => Record<string, string>),
  baseStyle: Record<string, string> = {}
): ComputedRef<Record<string, string>> {
  return computed(() => {
    const resolvedBaseStyle = { ...baseStyle }

    if (typeof customStyle === 'string') {
      return { ...resolvedBaseStyle, ...parseStyleString(customStyle) }
    }

    if (typeof customStyle === 'function') {
      return { ...resolvedBaseStyle, ...customStyle() }
    }

    return { ...resolvedBaseStyle, ...customStyle }
  })
}
