'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Masonry } from 'react-plock'

import { searchTaskService } from '~/app/api/task/search/service'
import { CardTask } from '~/components/card-task'

export const TaskList = () => {
  const searchParams = useSearchParams()

  const { data: tasks = [] } = useQuery({
    queryKey: ['search-tasks'],
    queryFn: () => searchTaskService(Object.fromEntries(searchParams.entries()))
  })

  if (tasks.length) {
    return (
      <Masonry
        config={{
          columns: [1, 2, 3, 1, 2, 3],
          media: [400, 600, 768, 880, 970, 1024],
          gap: [10, 12, 15, 15, 15, 15, 15]
        }}
        items={tasks}
        render={item => <CardTask key={item.id} data={item} />}
      />
    )
  }

  return <div>No tasks found</div>
}
