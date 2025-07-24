'use client'

import { Button } from '@iac/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@iac/ui/popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronRight, Edit2, Ellipsis, Trash } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { deleteTaskService } from '~/app/api/task/delete/[id]/service'
import { updateStatusMutationOptions } from '~/app/api/task/update/[id]/query'
import { Task } from '~/app/lib/models/task'
import { TaskStatus } from '~/app/lib/schemas/task'
import { useTaskStore } from '~/store/task'

type Props = {
  task: Task
}

export const ActionCardTask = ({ task }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const setCurrentTask = useTaskStore(state => state.setSelected)

  const { mutate: deleteTask } = useMutation({
    mutationKey: ['delete-task'],
    mutationFn: (task: Task) => deleteTaskService(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-categories'] })
    },
    onError: (...args) => {
      const data = args[1]

      queryClient.setQueryData<Task[]>(['search-tasks'], old => {
        return [...(old || []), data].filter(task => task.status === query.status)
      })
    },
    onMutate: () => {
      queryClient.setQueryData<Task[]>(['search-tasks'], old => {
        return (old || []).filter(currentTask => currentTask.id !== task.id)
      })

      setIsOpen(false)
    }
  })

  const { mutate: changeStatus } = useMutation({
    ...updateStatusMutationOptions,
    onError: (...args) => {
      const data = args[1]

      queryClient.setQueryData<Task[]>(['search-tasks'], old => {
        return (old || [])
          .map(currentTask => {
            if (currentTask.id === task.id) {
              return { ...currentTask, status: data.old }
            }

            return currentTask
          })
          .filter(task => task.status === query.status)
      })
    }
  })

  const handleChangeStatus = () => {
    const statuses = Object.values(TaskStatus)
    const status = task.status || TaskStatus.PENDING

    const currentIndex = statuses.indexOf(status)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]

    if (nextStatus) {
      queryClient.setQueryData<Task[]>(['search-tasks'], old => {
        return (old || [])
          .map(currentTask => {
            if (currentTask.id === task.id) {
              return { ...currentTask, status: nextStatus }
            }
            return currentTask
          })
          .filter(task => task.status === query.status)
      })

      changeStatus({ id: task.id, old: status, status: nextStatus })
      setIsOpen(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Ellipsis onClick={e => e.stopPropagation()} className="w-5 shrink-0 cursor-pointer text-base-muted group-hover:text-base-rose transition-all duration-150" />
      </PopoverTrigger>
      <PopoverContent onClick={e => e.stopPropagation()} className="w-full min-w-20 bg-base-overlay flex flex-col gap-2 overflow-hidden">
        <Button
          onClick={() => {
            setCurrentTask(task)
            setIsOpen(false)
          }}
          variant="outline"
          className="w-full justify-start items-center gap-2 text-xs"
        >
          <Edit2 className="w-4" />
          Edit
        </Button>

        <Button onClick={() => deleteTask(task)} variant="destructive" className="w-full justify-start items-center gap-2 text-xs">
          <Trash className="w-4" />
          Delete
        </Button>

        {task.status !== TaskStatus.COMPLETED && (
          <Button variant="secondary" className="w-full justify-start items-center gap-2 text-xs" onClick={handleChangeStatus}>
            <ChevronRight className="w-4" />
            Next
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
