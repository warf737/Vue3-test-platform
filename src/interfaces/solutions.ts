export interface ISolution {
  id: number
  title: string
  description: string
  status: 'completed' | 'in-progress'
}

export interface ISolutionData {
  id: number
  title: string
  description: string
  status: 'completed' | 'in-progress'
  createdAt: string
  solution: {
    title?: string
    description?: string
    code?: string
    features?: string[]
    moduleName?: string
  }
}
