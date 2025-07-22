import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'
import { searchTaskSchema } from '~/app/lib/schemas/task'

export const GET = async (req: NextRequest) => {
  const cookieStore = await cookies()
  console.log(req.nextUrl.search)

  const searchParams = new URLSearchParams(req.nextUrl.search)
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (sessionCookie) {
    const userId = sessionCookie.value
    const db = await getDatabase()

    const query = searchTaskSchema.safeParse(Object.fromEntries(searchParams.entries()))

    const tasks = db.data.tasks.filter(task => {
      const filters = [task.userId === userId]

      if (query.success) {
        if (query.data.title && task.title) {
          filters.push(task.title.toLowerCase().includes(query.data.title.toLowerCase()))
        }

        if (query.data.status) {
          filters.push(task.status === query.data.status)
        }

        if (query.data.priority) {
          filters.push(task.priority === query.data.priority)
        }

        if (query.data.categories) {
          filters.push(query.data.categories.every(cat => (task.categories || []).includes(cat)))
        }
      }

      return filters.every(Boolean)
    })

    return NextResponse.json(tasks, { status: 200 })
  }

  return NextResponse.json('Unauthorized', { status: 401 })
}
