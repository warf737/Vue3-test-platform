import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Composable для работы с роутингом модуля решения
 * Предоставляет базовый путь модуля и функции навигации
 */
export function useModuleRouter() {
  const route = useRoute()
  const router = useRouter()

  // Получаем ID решения из параметров роута
  const solutionId = computed(() => route.params.id as string)

  // Базовый путь модуля (например, /solutions/1)
  const basePath = computed(() => `/solutions/${solutionId.value}`)

  /**
   * Переход на указанный путь относительно базового пути модуля
   * @param path - путь относительно базового (например, 'create', 'edit', 'edit/123')
   */
  const navigateTo = (path: string = '') => {
    const targetPath = path ? `${basePath.value}/${path}` : basePath.value
    router.push(targetPath)
  }

  /**
   * Возврат на главную страницу модуля
   */
  const goHome = () => {
    router.push(basePath.value)
  }

  /**
   * Возврат назад (синоним для goHome)
   */
  const goBack = () => {
    goHome()
  }

  return {
    basePath,
    solutionId,
    navigateTo,
    goHome,
    goBack,
  }
}
