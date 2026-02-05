export interface ITask {
  id: number
  title: string
  shortDescription: string
  customer: string
  technology: string
}

export interface ITaskData {
  id: number
  title: string
  stack: string[]
  description: string
  requirements?: string[]
  examples?: string
}
