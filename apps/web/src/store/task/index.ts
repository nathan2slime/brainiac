import { create } from 'zustand'

import { Task } from '~/app/lib/models/task'

export type TaskState = {
  selected: Task | null
  setSelected: (task: Task | null) => void
}

export const useTaskStore = create<TaskState>(set => ({
  selected: null,
  setSelected: (task: Task | null) => set({ selected: task })
}))
