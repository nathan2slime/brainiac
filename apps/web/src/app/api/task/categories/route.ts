import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'

export const GET = async () => {
  const cookieStore = await cookies()

  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (sessionCookie) {
    const userId = sessionCookie.value
    const db = await getDatabase()

    const categories = new Set<string>(
      db.data.tasks.flatMap(task => {
        if (task.userId === userId) {
          return task.categories || []
        }

        return []
      })
    )

    return NextResponse.json(Array.from(categories), { status: 200 })
  }

  return NextResponse.json('Unauthorized', { status: 401 })
}
