'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { logoutService } from '~/app/api/auth/logout/service'
import { AuthState } from '~/components/auth/auth-provider'
import { useAuthStore } from '~/store/auth'
import { AppChildren } from '~/types'

type Props = AppChildren<{ state: AuthState }>

export const LoadState = ({ state, children }: Props) => {
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)
  const setLoggedIn = useAuthStore(state => state.setLoggedIn)
  const logout = useAuthStore(state => state.logout)

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      setUser(state.user)
      setLoggedIn(state.isLoggedIn)
    } else {
      logout()
      logoutService()
      router.push('/auth/login')
    }
  }, [])

  return <>{children}</>
}
