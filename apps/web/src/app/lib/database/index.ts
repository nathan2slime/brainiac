import path from 'node:path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import { User } from '~/app/lib/models/user'

type Data = { users: User[] }

const file = path.join(process.cwd(), 'db.json')

const adapter = new JSONFile<Data>(file)

const db = new Low<Data>(adapter, { users: [] })

export const getDatabase = async () => {
  await db.read()

  return db
}
