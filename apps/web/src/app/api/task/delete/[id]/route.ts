import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'

type Params = {
  id: string
}
type Args = {
  params: Promise<Params>
}

export const DELETE = async (_req: NextRequest, { params }: Args) => {
  const cookieStore = await cookies()
  const id = (await params).id
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (sessionCookie) {
    const userId = sessionCookie.value
    const db = await getDatabase()

    db.data.tasks = db.data.tasks.filter(task => {
      if (task.userId === userId && task.id === id) {
        return false
      }

      return true
    })

    await db.write()

    return NextResponse.json(true, { status: 200 })
  }

  return NextResponse.json('Unauthorized', { status: 401 })
}
