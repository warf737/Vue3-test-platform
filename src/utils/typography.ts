import Typograf from 'typograf'

// Создаем экземпляр Typograf с настройками для русского языка
const tp = new Typograf({ locale: ['ru', 'en-US'] })

// Включаем правила для русского языка
tp.enableRule('common/punctuation/quote')
tp.enableRule('common/punctuation/dash')
tp.enableRule('common/nbsp/afterShortWord')
tp.enableRule('common/nbsp/beforeShortLastWord')
tp.enableRule('common/nbsp/nowrap')

/**
 * Применяет типографирование к тексту
 * Заменяет кавычки, дефисы на тире, добавляет неразрывные пробелы и т.д.
 * @param text - текст для типографирования
 * @returns отформатированный текст
 * @example
 * typography('Он сказал "привет" и ушел.')
 * // returns 'Он сказал «привет» и ушёл.'
 */
export function typography(text: string): string {
  if (!text) return text
  return tp.execute(text)
}

/**
 * Composable для использования типографирования в компонентах Vue
 * @returns функция для типографирования текста
 */
export function useTypography() {
  return {
    typography,
  }
}
