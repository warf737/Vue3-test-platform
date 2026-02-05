import { ref } from 'vue'
import type { ISolution, ISolutionData } from '@/interfaces/solutions.ts'

export const solutions = ref<ISolution[]>([
  {
    id: 1,
    title: 'Задача 1: Форма входа',
    description: 'Создание формы входа с валидацией',
    status: 'completed',
  },
])

export const solutionsData: ISolutionData[] = [
  {
    id: 1,
    title: 'Задача 1: Форма входа',
    description: 'Создание формы входа с валидацией',
    status: 'completed',
    createdAt: '2026-02-06',
    solution: {
      moduleName: 'ValidateUsersList',
    },
  },
]
