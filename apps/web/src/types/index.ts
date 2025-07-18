import { type ReactNode } from 'react'

export type AppChildren<T extends object = {}> = T & {
  children: ReactNode
}
