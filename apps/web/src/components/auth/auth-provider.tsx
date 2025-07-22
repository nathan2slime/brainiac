import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'
import { User } from '~/app/lib/models/user'
import { LoadState } from '~/components/load-state'
import { AppChildren } from '~/types'

export type AuthState = {
  user: User | null
  isLoggedIn: boolean
}

export const AuthProvider = async ({ children }: AppChildren) => {
  const cookieStore = await cookies()

  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  const state: AuthState = {
    user: null,
    isLoggedIn: false
  }

  if (sessionCookie) {
    const userId = sessionCookie.value

    const db = await getDatabase()
    const user = db.data.users.find(user => user.id === userId)

    if (user) {
      delete user.password
      state.user = user
      state.isLoggedIn = true
    }
  }

  return <LoadState state={state}>{children}</LoadState>
}
