import { api } from '~/app/api'
import { Task, UpdateTaskDto } from '~/app/lib/models/task'

export const createTaskService = async (payload: UpdateTaskDto) => {
  const { data } = await api.post<Task>('/task/create', payload)

  return data
}
