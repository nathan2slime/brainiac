'use client'

import { usePathname } from 'next/navigation'

import { TabBar } from '~/components/tabbar'
import { AppChildren } from '~/types'

export const AppLayout = ({ children }: AppChildren) => {
  const pathname = usePathname()

  if (pathname.includes('auth')) return children

  return (
    <main className="bg-base-base tracking-wide w-screen md:pb-[200px] h-screen overflow-y-auto flex flex-col items-center md:pt-8 md:px-8 px-4 pt-4">
      <div className="w-full md:max-w-3xl mx-auto h-fit">
        {children}
        <TabBar />
      </div>
    </main>
  )
}
