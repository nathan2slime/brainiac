import { api } from '~/app/api'

export const getTaskCategories = async () => {
  const { data } = await api.get<string[]>('/task/categories')

  return data
}
