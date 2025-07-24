import type { Metadata } from 'next'
import { Comic_Relief } from 'next/font/google'

import { Providers } from '~/app/providers'
import { AppLayout } from '~/components/app-layout'
import { AuthProvider } from '~/components/auth/auth-provider'
import { AppChildren } from '~/types'

import '~/app/globals.css'

const base = Comic_Relief({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'Brainiac'
}

const RootLayout = ({ children }: Readonly<AppChildren>) => {
  return (
    <html lang="en">
      <body className={`${base.className} antialiased`}>
        <AuthProvider>
          <Providers>
            <AppLayout>{children}</AppLayout>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
