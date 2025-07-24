import z from 'zod'
import { searchTaskSchema, updateTaskSchema } from '~/app/lib/schemas/task'

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>

export type Task = UpdateTaskDto & {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type SearchTaskDto = Partial<
  z.infer<typeof searchTaskSchema> & {
    categories: string[]
  }
>
