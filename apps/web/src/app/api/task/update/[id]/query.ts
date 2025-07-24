import { UseMutationOptions } from '@tanstack/react-query'
import { updateTaskService } from '~/app/api/task/update/[id]/service'
import { Task } from '~/app/lib/models/task'
import { TaskStatus } from '~/app/lib/schemas/task'

type UpdateTaskStatusMutationArgs = {
  old: TaskStatus
  status: TaskStatus
  id: string
}

export const updateStatusMutationOptions: UseMutationOptions<Task, Error, UpdateTaskStatusMutationArgs> = {
  mutationKey: ['update-task-status'],
  mutationFn: async (data: UpdateTaskStatusMutationArgs): Promise<Task> => {
    return updateTaskService(data.id, { status: data.status })
  }
}

type UpdateTaskMutationArgs = {
  id: string
  data: Partial<Task>
}

export const updateTaskMutationOptions: UseMutationOptions<Task, Error, UpdateTaskMutationArgs> = {
  mutationKey: ['update-task'],
  mutationFn: async (args: UpdateTaskMutationArgs): Promise<Task> => {
    return updateTaskService(args.id, args.data)
  }
}
