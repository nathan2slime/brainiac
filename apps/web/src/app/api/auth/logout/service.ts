import { api } from '~/app/api'

export const logoutService = async () => {
  const { data } = await api.post('/auth/logout')

  return data
}
