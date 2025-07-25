import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { searchTaskService } from '~/app/api/task/search/service'
import { TaskList } from '~/components/task-list'

type Props = {
  searchParams: Promise<Record<string, string>>
}

const Home = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient()
  const params = await searchParams

  await queryClient.fetchQuery({
    queryKey: ['search-tasks'],
    queryFn: () => searchTaskService(params)
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <TaskList />
    </HydrationBoundary>
  )
}

export default Home
