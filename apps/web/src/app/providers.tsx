'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { getQueryClient } from '~/app/api/query'
import { AppChildren } from '~/types'

export const Providers = ({ children }: AppChildren) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {children}
    </QueryClientProvider>
  )
}
