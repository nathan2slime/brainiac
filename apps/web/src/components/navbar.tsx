'use client'

import { Button } from '@iac/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Filter, Plus } from 'lucide-react'
import { createTaskService } from '~/app/api/task/create/service'
import { Task } from '~/app/lib/models/task'

import Brainiac from '~/assets/icons/brainiac.svg'

export const Navbar = () => {
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
    <div className="bg-moon-surface/40 fixed bottom-0 right-0 md:right-1/2 md:translate-x-1/2 rounded-t-3xl rounded-b-none md:bottom-4  md:max-w-2xl backdrop-blur-md w-full md:rounded-3xl p-4">
      <div className="w-full flex items-center gap-1 justify-between relative h-full">
        <Brainiac className="text-base-rose w-16" />
        <Button onClick={() => createTask()} className="flex text-sm absolute right-0 -top-10 items-center gap-1">
          <Plus className="w-5" />
          New Task
        </Button>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <Filter className="w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
