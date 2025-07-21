import { api } from '~/app/api'
import { CreateUserDto, User } from '~/app/lib/models/user'

export const signUpService = async (payload: CreateUserDto) => {
  const { data } = await api.post<User>('/auth/signup', payload)

  return data
}
