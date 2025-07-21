import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '~/app/lib/models/user'

export type AuthState = {
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User) => void
  logout: () => void
  setLoggedIn: (isLoggedIn: boolean) => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isLoggedIn: false,
      setUser: user => set({ user, isLoggedIn: !!user }),
      logout: () => set({ user: null, isLoggedIn: false }),
      setLoggedIn: isLoggedIn => set({ isLoggedIn }),
      updateUser: user => set(state => ({ user: { ...state.user, ...user } }))
    }),
    { name: 'auth' }
  )
)
