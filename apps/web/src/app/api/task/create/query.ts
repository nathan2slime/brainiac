import { UseMutationOptions } from '@tanstack/react-query'
import { createTaskService } from '~/app/api/task/create/service'
import { Task, UpdateTaskDto } from '~/app/lib/models/task'

type CreateTaskMutationArgs = {
  id: string
  data: UpdateTaskDto
}

export const createTaskMutationOptions: UseMutationOptions<Task, Error, CreateTaskMutationArgs> = {
  mutationKey: ['create-task'],
  mutationFn: async (args: CreateTaskMutationArgs): Promise<Task> => createTaskService(args.data)
}
