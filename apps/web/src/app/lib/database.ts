import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'node:path'

type User = { id: number; name: string }
type Data = { users: User[] }

const file = path.join(process.cwd(), 'db.json')

const adapter = new JSONFile<Data>(file)

const db = new Low<Data>(adapter, { users: [] })

export const getDatabase = async () => {
  await db.read()

  return db
}
