import { hash } from 'bcryptjs'
import ms from 'ms'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { EXPIRES_SESSION_TIME, IS_PRODUCTION, SESSION_COOKIE_NAME } from '~/app/lib/config'

import { getDatabase } from '~/app/lib/database'
import { createUserSchema } from '~/app/lib/schemas/user'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const dto = createUserSchema.safeParse(body)

  if (dto.success) {
    const db = await getDatabase()

    const emailAlreadyInUse = db.data.users.findIndex(user => user.email === dto.data.email)
    if (emailAlreadyInUse >= 0) return NextResponse.json('Email is already in use', { status: 409 })

    const password = await hash(dto.data.password, 10)
    dto.data.password = password

    const user = {
      ...dto.data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID()
    }

    db.data.users.push(user)
    db.write()

    const cookieStore = await cookies()

    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: user.id,
      expires: new Date(Date.now() + ms(EXPIRES_SESSION_TIME)),
      httpOnly: true,
      secure: IS_PRODUCTION
    })

    return NextResponse.json({ ...user, password: undefined }, { status: 201 })
  }

  return NextResponse.json(dto.error, { status: 400 })
}
