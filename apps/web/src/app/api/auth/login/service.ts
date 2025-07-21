import { api } from '~/app/api'
import { SignInDto, User } from '~/app/lib/models/user'

export const signInService = async (payload: SignInDto) => {
  const { data } = await api.post<User>('/auth/login', payload)

  return data
}
