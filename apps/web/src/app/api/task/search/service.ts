import { api } from '~/app/api'
import { Task } from '~/app/lib/models/task'
import { SearchTaskDto } from '~/app/lib/schemas/task'

export const searchTaskService = async (searchParams: SearchTaskDto) => {
  const { data } = await api.get<Task[]>('/task/search', { params: searchParams })

  return data
}
