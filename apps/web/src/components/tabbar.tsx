'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { createTaskMutationOptions } from '~/app/api/task/create/query'
import { Task, UpdateTaskDto } from '~/app/lib/models/task'
import { AccountSetting } from '~/components/account-setting'
import { FilterTask } from '~/components/filter-task'
import { NewTask } from '~/components/new-task'
import { SearchTask } from '~/components/search-task'
import { useAuthStore } from '~/store/auth'

import { Button } from '@iac/ui/button'
import { Plus } from 'lucide-react'
import Brainiac from '~/assets/icons/brainiac.svg'

export const TabBar = () => {
  const [isOpenNewTask, setIsOpenNewTask] = useState(false)

  const userId = useAuthStore(state => String(state.user && state.user.id))
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status')

  const createTask = useMutation({
    ...createTaskMutationOptions,
    onSuccess: (data, args) => {
      queryClient.setQueryData<Task[]>(['search-tasks'], old => {
        return (old || []).map(task => {
          if (task.id === args.id) {
            return { ...task, ...data }
          }

          return task
        })
      })
      queryClient.invalidateQueries({ queryKey: ['task-categories'] })
    },

    onError: (...args) => {
      if (String(currentStatus) === 'pending') {
        const data = args[1]

        queryClient.setQueryData<Task[]>(['search-tasks'], old => {
          return (old || []).filter(task => task.id !== data.id)
        })
      }
    }
  })

  const handleNewTask = (data: UpdateTaskDto) => {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId
    }

    if (String(currentStatus) === 'pending' || !currentStatus) {
      queryClient.setQueryData<Task[]>(['search-tasks'], old => [newTask, ...(old || [])])
    }

    createTask.mutate({
      id: newTask.id,
      data
    })
  }

  return (
    <div className="bg-moon-surface/40 border-x-2 border-t-2 border-b-0 md:border-b-2 border-base-highlight-med fixed bottom-0 right-1/2 translate-x-1/2 rounded-t-3xl rounded-b-none md:bottom-4  md:max-w-2xl backdrop-blur-md w-full md:rounded-3xl p-4">
      <div className="w-full flex items-center gap-4 justify-between relative h-full">
        <Brainiac className="text-base-rose w-12 md:w-16 shrink-0 hidden md:block" />

        <SearchTask />

        <Button onClick={() => setIsOpenNewTask(true)} className="flex text-sm absolute right-0 -top-16 md:-top-10 items-center gap-1">
          <Plus className="w-5" />
          New Task
        </Button>

        <NewTask isOpen={isOpenNewTask} onSetIsOpen={setIsOpenNewTask} onSubmit={handleNewTask} isPending={createTask.isPending} />

        <div className="flex items-center gap-2">
          <FilterTask />

          <AccountSetting />
        </div>
      </div>
    </div>
  )
}
