import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { SESSION_COOKIE_NAME } from '~/app/lib/config'

const middleware = async (req: NextRequest) => {
  const headers = new Headers(req.headers)
  const cookieStore = req.cookies
  const isLogged = cookieStore.has(SESSION_COOKIE_NAME)

  const url = req.nextUrl

  headers.set('x-pathname', url.pathname)
  headers.set('x-search-params', url.searchParams.toString())

  if (isLogged || url.pathname.startsWith('/auth')) {
    return NextResponse.next({ headers, request: { headers } })
  }

  return NextResponse.redirect(new URL('/auth/login', req.url))
}

export const config = {
  matcher: [
    {
      source: '/((?!api/|_next/static|_next/image|favicon.ico|[\\w-]+\\.\\w+).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'next-action' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}

export default middleware
