'use client'

import { Button } from '@iac/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { createTaskService } from '~/app/api/task/create/service'
import { Task } from '~/app/lib/models/task'
import { AccountSetting } from '~/components/account-setting'
import { FilterTask } from '~/components/filter-task'
import { SearchTask } from '~/components/search-task'

import Brainiac from '~/assets/icons/brainiac.svg'

export const TabBar = () => {
  const queryClient = useQueryClient()

  const { mutate: createTask } = useMutation({
    mutationKey: ['create-task'],
    mutationFn: createTaskService,
    onSuccess: data => {
      if (data) {
        queryClient.setQueryData<Task[]>(['search-tasks'], old => [data, ...(old || [])])
      }
    }
  })

  return (
    <div className="bg-moon-surface/40 border-x-2 border-t-2 border-b-0 md:border-b-2 border-base-highlight-med fixed bottom-0 right-1/2 translate-x-1/2 rounded-t-3xl rounded-b-none md:bottom-4  md:max-w-2xl backdrop-blur-md w-full md:rounded-3xl p-4">
      <div className="w-full flex items-center gap-4 justify-between relative h-full">
        <Brainiac className="text-base-rose w-12 md:w-16 shrink-0 hidden md:block" />

        <SearchTask />

        <Button onClick={() => createTask()} className="flex text-sm absolute right-0 -top-16 md:-top-10 items-center gap-1">
          <Plus className="w-5" />
          New Task
        </Button>
        <div className="flex items-center gap-2">
          <FilterTask />

          <AccountSetting />
        </div>
      </div>
    </div>
  )
}
