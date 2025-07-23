import { api } from '~/app/api'
import { Task } from '~/app/lib/models/task'

export const createTaskService = async () => {
  const { data } = await api.post<Task>('/task/create')

  return data
}
