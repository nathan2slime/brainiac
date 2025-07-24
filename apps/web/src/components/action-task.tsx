'use client'

import { Button } from '@iac/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@iac/ui/popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronRight, Edit2, Ellipsis, Trash } from 'lucide-react'
import { useState } from 'react'
import { deleteTaskService } from '~/app/api/task/delete/[id]/service'
import { updateTaskService } from '~/app/api/task/update/[id]/service'
import { Task } from '~/app/lib/models/task'
import { TaskStatus } from '~/app/lib/schemas/task'

type Props = {
  id: string
  status: TaskStatus
}

export const ActionCardTask = ({ id, status }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: deleteTask } = useMutation({
    mutationKey: ['delete-task'],
    mutationFn: () => deleteTaskService(id),
    onSuccess: () => {
      queryClient.setQueryData<Task[]>(['search-tasks'], old => {
        return (old || []).filter(task => task.id !== id)
      })
    },
    onMutate: () => {
      setIsOpen(false)
    }
  })

  const { mutate: changeStatus } = useMutation({
    mutationKey: ['update-task'],
    mutationFn: (status: TaskStatus) => {
      return updateTaskService(id, { status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-tasks'] })
    },
    onMutate: () => {
      setIsOpen(false)
    }
  })

  const handleChangeStatus = () => {
    const statuses = Object.values(TaskStatus)
    const currentIndex = statuses.indexOf(status)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]

    if (nextStatus) {
      changeStatus(nextStatus)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Ellipsis className="w-5 cursor-pointer text-base-muted group-hover:text-base-rose transition-all duration-150" />
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-20 bg-base-overlay flex flex-col gap-2 overflow-hidden">
        <Button variant="outline" className="w-full justify-start items-center gap-2 text-xs">
          <Edit2 className="w-4" />
          Edit
        </Button>

        <Button onClick={() => deleteTask()} variant="destructive" className="w-full justify-start items-center gap-2 text-xs">
          <Trash className="w-4" />
          Delete
        </Button>

        {status !== TaskStatus.COMPLETED && (
          <Button variant="secondary" className="w-full justify-start items-center gap-2 text-xs" onClick={handleChangeStatus}>
            <ChevronRight className="w-4" />
            Next
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
