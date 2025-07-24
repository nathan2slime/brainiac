import { Button } from '@iac/ui/button'
import { Card } from '@iac/ui/card'
import { Typography } from '@iac/ui/typography'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { searchTaskService } from '~/app/api/task/search/service'
import { Task } from '~/app/lib/models/task'
import { TaskStatus } from '~/app/lib/schemas/task'
import { TooltipChart } from '~/components/tooltip-chart'

const STATUS_COLORS = {
  [TaskStatus.PENDING]: '#8884d8',
  [TaskStatus.IN_PROGRESS]: '#82ca9d',
  [TaskStatus.COMPLETED]: '#ffc658'
}

const CATEGORY_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6699']

type Props = Partial<{
  onClose: () => void
}>

export const UserStats = ({ onClose }: Props) => {
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['stats-tasks'],
    queryFn: async () => searchTaskService({}),
    refetchInterval: 1000 * 60 * 1
  })

  const statusData = [
    { name: TaskStatus.PENDING, value: tasks.filter(t => t.status === TaskStatus.PENDING).length },
    { name: TaskStatus.IN_PROGRESS, value: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length },
    { name: TaskStatus.COMPLETED, value: tasks.filter(t => t.status === TaskStatus.COMPLETED).length }
  ]

  const categoryMap: Record<string, number> = {}

  tasks.forEach(task => {
    if (Array.isArray(task.categories)) {
      task.categories.forEach(category => {
        categoryMap[category] = (categoryMap[category] || 0) + 1
      })
    }
  })

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }))

  return (
    <div className="flex flex-col gap-4 w-full md:p-4">
      <div className="w-full flex mb-4 justify-between items-center">
        <Typography.H4 className="text-base-rose">Your Statistics</Typography.H4>

        {onClose && (
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="w-5" />
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Card className="w-full">
          <Typography.H5 className="text-base-text mb-3">Task Distribution by Status</Typography.H5>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label stroke="none">
                  {statusData.map((entry, idx) => (
                    <Cell key={'status'.concat(idx.toString())} fill={STATUS_COLORS[entry.name as TaskStatus]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return <TooltipChart value={String(payload[0].value)} label={String(payload[0].name)} />
                    }

                    return null
                  }}
                />
                <Legend style={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="w-full h-[300px]">
          <Typography.H5 className="text-base-text">Task Distribution by Category</Typography.H5>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} dataKey="value" stroke="none" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {categoryData.map((...args) => (
                  <Cell style={{ fontSize: 11 }} key={'category'.concat(args[1].toString())} fill={CATEGORY_COLORS[args[1] % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return <TooltipChart value={String(payload[0].value)} label={String(payload[0].name)} />
                  }

                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
