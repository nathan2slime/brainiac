'use client'

import { Badge } from '@iac/ui/badge'
import { Button } from '@iac/ui/button'
import { MultiSelect } from '@iac/ui/multi-select'
import { Popover, PopoverContent, PopoverTrigger } from '@iac/ui/popover'
import { Typography } from '@iac/ui/typography'
import { useQuery } from '@tanstack/react-query'
import { Filter } from 'lucide-react'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { useRouter, useSearchParams } from 'next/navigation'
import { getTaskCategories } from '~/app/api/task/categories/service'
import { TaskPriority } from '~/app/lib/schemas/task'

export const FilterTask = () => {
  const searchParams = useSearchParams()

  const query = Object.fromEntries(searchParams.entries())

  const router = useRouter()
  const { data: categories = [] } = useQuery({
    queryKey: ['task-categories'],
    queryFn: getTaskCategories
  })

  const selectedCategories: string[] = query.categories ? JSON.parse(decompressFromEncodedURIComponent(query.categories)) : []
  const selectedPriority = query.priority ? [query.priority] : []

  const onChangeFilter = (key: string, value: string) => {
    const newQuery = new URLSearchParams({ ...query, [key]: value })

    if (value.trim().length === 0) {
      newQuery.delete(key)
    }

    router.push('?'.concat(newQuery.toString()))
  }

  const handleCategories = (value: string[]) => {
    const encodedValue = value.length > 0 ? compressToEncodedURIComponent(JSON.stringify(value)) : ''
    onChangeFilter('categories', encodedValue)
  }

  const handlePriority = (value: string) => {
    onChangeFilter('priority', value)
  }

  const priority = Object.values(TaskPriority)

  const filtersCount = Object.keys(query).length

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Badge visible={filtersCount > 0} value={filtersCount}>
          <Button size="icon" variant="outline">
            <Filter className="w-5" />
          </Button>
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-60 bg-moon-highlight-low">
        <Typography.H5 className="mb-4 text-base-text">Filters</Typography.H5>

        <div className="flex flex-col gap-2">
          <MultiSelect className="text-sm" position="top" placeholder="Filter by category" onChange={handleCategories} values={selectedCategories} options={categories} />
          <MultiSelect className="text-sm" position="top" placeholder="Filter by priority" onSelect={handlePriority} values={selectedPriority} options={priority} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
