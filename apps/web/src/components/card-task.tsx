'use client'

import { Card } from '@iac/ui/card'
import { Chip, ChipProps } from '@iac/ui/chip'
import { Typography } from '@iac/ui/typography'
import clsx from 'clsx'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

import { Task } from '~/app/lib/models/task'
import { TaskPriority } from '~/app/lib/schemas/task'
import { ActionCardTask } from '~/components/action-task'

type Props = {
  data: Task
}

type TaskPriorityStyle = {
  icon: React.ReactNode
} & Pick<ChipProps, 'variant'>

const PRIORITY_STYLES: Record<TaskPriority, TaskPriorityStyle> = {
  [TaskPriority.HIGH]: {
    icon: <ArrowUp className="w-4" />,
    variant: 'secondary'
  },
  [TaskPriority.MEDIUM]: {
    icon: <Minus className="w-4" />,
    variant: 'primary'
  },
  [TaskPriority.LOW]: {
    icon: <ArrowDown className="w-4" />,
    variant: 'default'
  }
}

export const CardTask = ({ data: task }: Props) => {
  const { id, title, description, priority, categories = [] } = task
  const priorityStyle = PRIORITY_STYLES[priority || TaskPriority.MEDIUM]

  return (
    <Card className="group cursor-pointer pr-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-1">
          <Typography.H5
            className={clsx('text-base-text break-words duration-150 transition-all outline-none', {
              'group-hover:opacity-100 opacity-0': (title || '').length === 0
            })}
            dangerouslySetInnerHTML={{ __html: title || 'No title' }}
          />

          <ActionCardTask task={task} />
        </div>
        <Typography.Body
          className={clsx('text-base-text/70 mt-2 duration-150 transition-all outline-none line-clamp-4', {
            'group-hover:opacity-100 opacity-0': (description || '').length === 0
          })}
          dangerouslySetInnerHTML={{ __html: description || 'Empty description' }}
        />
      </div>

      <div className="flex flex-wrap mt-2 gap-1">
        <Chip className="gap-0" variant={priorityStyle.variant}>
          {priorityStyle.icon}
          {priority}
        </Chip>
        {categories.slice(0, 4).map((category, index) => (
          <Chip key={category.concat(id).concat(index.toString())} variant="default">
            #{category}
          </Chip>
        ))}
      </div>
    </Card>
  )
}
