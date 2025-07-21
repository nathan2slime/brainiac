'use client'

import { AuthState } from '~/components/auth/auth-provider'
import { useAuthStore } from '~/store/auth'
import { AppChildren } from '~/types'

type Props = AppChildren<{ state: AuthState }>

export const LoadState = ({ state, children }: Props) => {
  const setUser = useAuthStore(state => state.setUser)
  const setLoggedIn = useAuthStore(state => state.setLoggedIn)

  if (state.isLoggedIn && state.user) {
    setUser(state.user)
    setLoggedIn(state.isLoggedIn)
  } else {
  }

  return <>{children}</>
}
