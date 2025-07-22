import path from 'node:path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import { Task } from '~/app/lib/models/task'
import { User } from '~/app/lib/models/user'

type Data = { users: User[]; tasks: Task[] }

const file = path.join(process.cwd(), 'db.json')

const adapter = new JSONFile<Data>(file)

const db = new Low<Data>(adapter, { users: [], tasks: [] })

export const getDatabase = async () => {
  await db.read()

  return db
}
