import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '~/app/lib/config'
import { getDatabase } from '~/app/lib/database'
import { Task } from '~/app/lib/models/task'
import { TaskPriority, TaskStatus } from '~/app/lib/schemas/task'

export const POST = async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (sessionCookie) {
    const userId = sessionCookie.value
    const db = await getDatabase()

    const task: Task = {
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
      categories: [],
      id: crypto.randomUUID(),
      description: '',
      title: 'New Task',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.MEDIUM
    }

    db.data.tasks.push(task)
    await db.write()

    return NextResponse.json(task, { status: 201 })
  }

  return NextResponse.json('Unauthorized', { status: 401 })
}
