import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { getDatabase } from '~/app/lib/database'
import { createUserSchema } from '~/app/lib/schemas/user'

export const POST = async (req: NextRequest) => {
  const dto = createUserSchema.safeParse(req.body)

  if (dto.success) {
    const db = await getDatabase()

    const emailAlreadyInUse = db.data.users.findIndex(user => user.email === dto.data.email)
    if (emailAlreadyInUse >= 0) return NextResponse.json({ error: 'Email is already in use' }, { status: 409 })

    const password = await hash(dto.data.password, 10)
    dto.data.password = password

    const user = { ...dto.data, createdAt: new Date(), updatedAt: new Date(), id: crypto.randomUUID() }

    db.data.users.push(user)
    db.write()

    return NextResponse.json({ ...user, password: undefined }, { status: 201 })
  }

  return NextResponse.json(dto.error, { status: 400 })
}
