import { api } from '~/app/api'

export const deleteTaskService = async (id: string) => {
  const { data } = await api.delete<boolean>(`/task/delete/${id}`)

  return data
}
