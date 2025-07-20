import { api } from '~/app/api'
import { CreateUserDto } from '~/app/lib/models/user'

export const signUpService = async (payload: CreateUserDto) => {
  const { data } = await api.post<CreateUserDto>('/auth/signup', payload)

  return data
}
