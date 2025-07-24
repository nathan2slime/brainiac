'use client'

import { Tabs } from '@iac/ui/tabs'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Masonry } from 'react-plock'

import { searchTaskService } from '~/app/api/task/search/service'
import { TaskStatus } from '~/app/lib/schemas/task'
import { CardTask } from '~/components/card-task'

import Brainiac from '~/assets/icons/brainiac.svg'

export const TaskList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = Object.fromEntries(searchParams.entries())

  const { data: tasks = [] } = useQuery({
    queryKey: ['search-tasks'],
    queryFn: () => searchTaskService(query)
  })

  const taskStatuses: string[] = Object.values(TaskStatus)

  const onChangeStatus = (index: number) => {
    const status = taskStatuses[index]

    const newQuery = new URLSearchParams(status ? { ...query, status } : query)

    router.push('?'.concat(newQuery.toString()))
  }

  const defaultStatusIndex = query.status && taskStatuses.indexOf(query.status)

  return (
    <div>
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
          <div />
        )}
      </div>
    </div>
  )
}
