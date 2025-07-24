import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SESSION_COOKIE_NAME } from '~/app/lib/config'

export const POST = async () => {
  const cookieStore = await cookies()

  cookieStore.delete(SESSION_COOKIE_NAME)

  return NextResponse.json({ success: true })
}
