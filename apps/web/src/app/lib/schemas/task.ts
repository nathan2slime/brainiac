import z from 'zod'

export enum TaskStatus {
  HIGHT = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
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
  title: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
  categories: z.array(z.string()).optional()
})

export type SearchTaskDto = z.infer<typeof searchTaskSchema>
