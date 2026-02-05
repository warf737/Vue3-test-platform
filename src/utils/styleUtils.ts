/**
 * Парсит строку стилей CSS в объект
 * @param styleString - строка стилей в формате "key: value; key2: value2"
 * @returns объект со стилями в camelCase формате
 * @example
 * parseStyleString("color: red; font-size: 14px")
 * // returns { color: "red", fontSize: "14px" }
 */
export function parseStyleString(styleString: string): Record<string, string> {
  const styles: Record<string, string> = {}
  const pairs = styleString.split(';').filter(Boolean)

  pairs.forEach(pair => {
    const [key, value] = pair.split(':').map(s => s.trim())
    if (key && value) {
      const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      styles[camelKey] = value
    }
  })

  return styles
}
