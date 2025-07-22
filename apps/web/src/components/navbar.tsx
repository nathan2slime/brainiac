'use client'

import { Button } from '@iac/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Filter, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createTaskService } from '~/app/api/task/create/service'
import { Task } from '~/app/lib/models/task'

import Brainiac from '~/assets/icons/brainiac.svg'

export const Navbar = () => {
  const router = useRouter()
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
    <div className="bg-moon-surface/90 fixed bottom-4 max-w-lg backdrop-blur-md flex items-center gap-1 justify-between w-full rounded-3xl p-4">
      <Brainiac className="text-base-rose w-16" />
      <div className="flex items-center gap-2">
        <Button onClick={() => createTask()} className="flex text-sm items-center gap-1">
          <Plus className="w-5" />
          New Task
        </Button>

        <Button
          onClick={() => {
            router.push('/?title=teste')
          }}
          size="icon"
          variant="outline"
        >
          <Filter className="w-5" />
        </Button>
      </div>
    </div>
  )
}
