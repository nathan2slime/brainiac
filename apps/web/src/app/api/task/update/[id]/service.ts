import { api } from '~/app/api'
import { Task } from '~/app/lib/models/task'

export const updateTaskService = async (id: string, payload: Partial<Task>) => {
  const { data } = await api.put<Task>(`/task/update/${id}`, payload)

  return data
}
