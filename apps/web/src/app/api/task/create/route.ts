import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'
import { Task } from '~/app/lib/models/task'
import { updateTaskSchema } from '~/app/lib/schemas/task'

export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  const body = await req.json()

  const data = updateTaskSchema.safeParse(body)
  if (data.error) return NextResponse.json(data.error, { status: 400 })

  if (sessionCookie) {
    const userId = sessionCookie.value
    const db = await getDatabase()
    const task: Task = {
      ...data.data,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
      id: crypto.randomUUID()
    }

    db.data.tasks.push(task)
    await db.write()

    return NextResponse.json(task, { status: 201 })
  }

  return NextResponse.json('Unauthorized', { status: 401 })
}
