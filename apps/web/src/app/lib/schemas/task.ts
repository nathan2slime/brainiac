import { decompressFromEncodedURIComponent } from 'lz-string'
import z from 'zod'

export enum TaskStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending'
}

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
  categories: z.array(z.string()).optional(),
  priority: z.enum(TaskPriority).optional()
})

export const searchTaskSchema = z.object({
  q: z
    .string()
    .transform(value => {
      if (value) {
        value.toLowerCase()
      }

      return value
    })
    .optional(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
  categories: z
    .string()
    .transform<string[]>(value => {
      try {
        const categories = JSON.parse(decompressFromEncodedURIComponent(value))
        return Array.isArray(categories) ? categories : []
      } catch {
        return []
      }
    })
    .optional()
})

export type SearchTaskDto = Partial<
  z.infer<typeof searchTaskSchema> & {
    categories: string[]
  }
>
