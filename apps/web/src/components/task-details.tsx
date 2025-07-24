'use client'

import { Button } from '@iac/ui/button'
import { Chip } from '@iac/ui/chip'
import { Typography } from '@iac/ui/typography'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Task } from '~/app/lib/models/task'
import { TaskPriority } from '~/app/lib/schemas/task'
import { PRIORITY_STYLES } from '~/components/card-task'

type Props = {
  task: Task
  isOpen: boolean
  onClose: () => void
}

const Modal = dynamic(async () => (await import('@iac/ui/modal')).Modal, {
  ssr: false
})

const ModalContent = dynamic(async () => (await import('@iac/ui/modal')).ModalContent, {
  ssr: false
})

export const TaskDetails = ({ task, isOpen, onClose }: Props) => {
  const priorityStyle = PRIORITY_STYLES[task.priority || TaskPriority.MEDIUM]

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <div className="flex items-start justify-between">
          <Typography.H4 className=" text-base-rose">{task.title}</Typography.H4>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="size-5" />
          </Button>
        </div>

        <Typography.Body className="mt-2 text-base-text">{task.description}</Typography.Body>

        <div className="flex border-t border-base-highlight-high pt-4 flex-wrap mt-2 gap-1">
          <Chip className="gap-0" variant={priorityStyle.variant}>
            {priorityStyle.icon}
            {task.priority}
          </Chip>
          {(task.categories || []).map((category, index) => (
            <Chip key={category.concat('details').concat(task.id).concat(index.toString())} variant="default">
              #{category}
            </Chip>
          ))}
        </div>
      </ModalContent>
    </Modal>
  )
}
