import { compare } from 'bcryptjs'
import ms from 'ms'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { EXPIRES_SESSION_TIME, IS_PRODUCTION, SESSION_COOKIE_NAME } from '~/app/lib/config'

import { getDatabase } from '~/app/lib/database'
import { signInSchema } from '~/app/lib/schemas/user'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const dto = signInSchema.safeParse(body)

  if (dto.success) {
    const db = await getDatabase()

    const user = db.data.users.find(user => user.email === dto.data.email)

    if (user) {
      const password = await compare(dto.data.password, user.password)

      if (password) {
        const cookieStore = await cookies()

        cookieStore.set({
          name: SESSION_COOKIE_NAME,
          value: user.id,
          expires: new Date(Date.now() + ms(EXPIRES_SESSION_TIME)),
          httpOnly: true,
          secure: IS_PRODUCTION
        })

        return NextResponse.json({ ...user, password: undefined }, { status: 200 })
      }
    }

    return NextResponse.json('Invalid credentials', { status: 409 })
  }

  return NextResponse.json(dto.error, { status: 400 })
}
