'use client'

import { usePathname } from 'next/navigation'

import { Navbar } from '~/components/navbar'
import { AppChildren } from '~/types'

export const AppLayout = ({ children }: AppChildren) => {
  const pathname = usePathname()

  if (pathname.includes('auth')) return children

  return (
    <main className="bg-base-base tracking-wide w-screen h-screen flex flex-col items-center p-2 md:p-6">
      <div className="w-full md:max-w-lg mx-auto">
        <Navbar />
        {children}
      </div>
    </main>
  )
}
