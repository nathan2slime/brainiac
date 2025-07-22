'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { searchTaskService } from '~/app/api/task/search/service'
import { CardTask } from '~/components/card-task'

export const ListTask = () => {
  const searchParams = useSearchParams()

  const { data: tasks = [] } = useQuery({
    queryKey: ['search-tasks'],
    queryFn: () => searchTaskService(Object.fromEntries(searchParams.entries()))
  })

  if (tasks.length) {
    return (
      <div>
        {tasks.map(task => (
          <CardTask key={task.id} data={task} />
        ))}
      </div>
    )
  }

  return <div>No tasks found</div>
}
