import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'
import { searchTaskSchema } from '~/app/lib/schemas/task'

export const GET = async (req: NextRequest) => {
  const cookieStore = await cookies()

  const searchParams = new URLSearchParams(req.nextUrl.search)
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (sessionCookie) {
    const userId = sessionCookie.value
    const db = await getDatabase()

    const searchParamsStore = Object.fromEntries(searchParams.entries())
    const queryArgs = searchTaskSchema.safeParse(searchParamsStore)

    const tasks = db.data.tasks.filter(task => task.userId === userId)

    const results = Object.keys(searchParamsStore).length
      ? tasks.filter(task => {
          const filters = []

          if (queryArgs.success) {
            const { q: query, categories, priority, status } = queryArgs.data

            if (query) {
              const isTitleMatch = (task.title || '').toLowerCase().includes(query)

              if (isTitleMatch) {
                filters.push(isTitleMatch)
              } else if (task.description) {
                filters.push(task.description.toLowerCase().includes(query))
              }
            }

            if (status) {
              filters.push(task.status === status)
            }

            if (priority) {
              filters.push(task.priority === priority)
            }

            if (categories) {
              filters.push(categories.every(cat => (task.categories || []).includes(cat.toLowerCase())))
            }
          }

          return filters.length > 0 && filters.every(Boolean)
        })
      : tasks

    return NextResponse.json(results, { status: 200 })
  }

  return NextResponse.json('Unauthorized', { status: 401 })
}
