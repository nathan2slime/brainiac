import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'
import { updateTaskSchema } from '~/app/lib/schemas/task'

type Params = {
  id: string
}
type Args = {
  params: Promise<Params>
}

export const PUT = async (req: NextRequest, { params }: Args) => {
  const cookieStore = await cookies()
  const id = (await params).id
  const body = await req.json()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  const payload = updateTaskSchema.safeParse(body)

  if (payload.error) return NextResponse.json(payload.error.message, { status: 400 })

  if (sessionCookie) {
    const userId = sessionCookie.value
    const db = await getDatabase()

    const existingTaskIndex = db.data.tasks.findIndex(task => task.id === id && task.userId === userId)

    if (existingTaskIndex < 0) {
      return NextResponse.json('Task not found', { status: 404 })
    }

    if (existingTaskIndex >= 0) {
      const tasks = [...db.data.tasks]
      const existingTask = tasks[existingTaskIndex]

      if (existingTask) {
        tasks[existingTaskIndex] = {
          ...existingTask,
          ...payload.data,
          updatedAt: new Date()
        }

        db.data.tasks = tasks
      }
    }

    await db.write()

    return NextResponse.json({ ...payload.data, id }, { status: 201 })
  }

  return NextResponse.json('Unauthorized', { status: 401 })
}
