import { ref } from 'vue'
import type { ISolutionData } from '@/interfaces/solutions.ts'

export const solutionsData: ISolutionData[] = [
  {
    id: 1,
    title: 'Задача 1: Форма входа',
    description: 'Создание формы входа с валидацией',
    status: 'completed',
    createdAt: '2026-02-06',
    solution: {
      moduleName: 'UsersList',
    },
  },
]

export const solutions = ref<ISolutionData[]>(solutionsData)
