'use client'

import { Tabs } from '@iac/ui/tabs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Planet } from 'react-kawaii'
import { Masonry } from 'react-plock'

import { searchTaskService } from '~/app/api/task/search/service'
import { updateTaskMutationOptions } from '~/app/api/task/update/[id]/query'
import { Task, UpdateTaskDto } from '~/app/lib/models/task'
import { TaskStatus } from '~/app/lib/schemas/task'
import { CardTask } from '~/components/card-task'
import { NewTask } from '~/components/new-task'
import { useTaskStore } from '~/store/task'

import Brainiac from '~/assets/icons/brainiac.svg'

export const TaskList = () => {
  const currentTask = useTaskStore(state => state.selected)
  const setCurrentTask = useTaskStore(state => state.setSelected)
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = Object.fromEntries(searchParams.entries())

  const { data: tasks = [] } = useQuery({
    queryKey: ['search-tasks'],
    queryFn: () => searchTaskService(query)
  })

  const queryClient = useQueryClient()

  const updateTask = useMutation({
    ...updateTaskMutationOptions,
    onSuccess: () => {
      setCurrentTask(null)
      queryClient.invalidateQueries({ queryKey: ['task-categories'] })
    }
  })

  const taskStatuses: string[] = Object.values(TaskStatus)

  const onChangeStatus = (index: number) => {
    const status = taskStatuses[index]

    const newQuery = new URLSearchParams(status ? { ...query, status } : query)

    router.push('?'.concat(newQuery.toString()))
  }

  const defaultStatusIndex = query.status && taskStatuses.indexOf(query.status)

  const handleSaveTask = (data: UpdateTaskDto) => {
    if (currentTask) {
      queryClient.setQueryData<Task[]>(['search-tasks'], old => {
        return (old || []).map(task => {
          if (task.id === currentTask.id) {
            return { ...task, ...data }
          }

          return task
        })
      })

      updateTask.mutate({
        id: currentTask.id,
        data
      })
    }
  }

  return (
    <div>
      <NewTask
        isOpen={!!currentTask}
        onSetIsOpen={args => {
          if (!args) setCurrentTask(null)
        }}
        onSubmit={handleSaveTask}
        isPending={updateTask.isPending}
        data={currentTask}
      />

      <Brainiac className="text-base-rose w-14 mx-auto mb-4 shrink-0 block md:hidden" />

      <div className="flex flex-col gap-4">
        <div className="max-w-2xl w-full mx-auto">
          <div className="ml-auto w-fit">
            <Tabs defaultIndex={defaultStatusIndex || 0} onChangeTab={onChangeStatus}>
              <Tabs.List>
                {taskStatuses.map((status, index) => (
                  <Tabs.Tab key={status} index={index}>
                    {status}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>
          </div>
        </div>

        {tasks.length ? (
          <Masonry
            config={{
              columns: [1, 2, 3, 1, 2, 3],
              media: [400, 600, 768, 880, 970, 1024],
              gap: [10, 12, 15, 15, 15, 15, 15]
            }}
            items={tasks}
            render={item => <CardTask key={item.id} data={item} />}
          />
        ) : (
          <div className="flex justify-center flex-col items-center w-fit mx-auto">
            <Planet size={200} color="var(--color-base-muted)" />

            <p className="text-base-muted text-center mt-4">No tasks found. Try changing the status or creating a new task.</p>
          </div>
        )}
      </div>
    </div>
  )
}
