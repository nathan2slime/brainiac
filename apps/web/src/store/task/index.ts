import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Task } from '~/app/lib/models/task'

export type TaskState = {
  data: Task[]
  addTask: (user: Task) => void
  removeTask: (taskId: string) => void
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void
  setTasks: (tasks: Task[]) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    set => ({
      data: [],
      addTask: user => set(state => ({ data: [...state.data, user] })),
      removeTask: taskId => set(state => ({ data: state.data.filter(task => task.id !== taskId) })),
      updateTask: (taskId, updatedTask) =>
        set(state => ({
          data: state.data.map(task => (task.id === taskId ? { ...task, ...updatedTask } : task))
        })),
      setTasks: tasks => set({ data: tasks })
    }),
    { name: 'task' }
  )
)
