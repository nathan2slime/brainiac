'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@iac/ui/button'
import { Input } from '@iac/ui/input'
import { Message } from '@iac/ui/message'
import { Select } from '@iac/ui/select'
import { TagInput } from '@iac/ui/tag-input'
import { Textarea } from '@iac/ui/textarea'
import { Typography } from '@iac/ui/typography'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import z from 'zod'

import { Task, UpdateTaskDto } from '~/app/lib/models/task'
import { TaskPriority, TaskStatus, updateTaskSchema } from '~/app/lib/schemas/task'

const Loading = dynamic(async () => (await import('@iac/ui/loading')).Loading, {
  ssr: false
})

const Modal = dynamic(async () => (await import('@iac/ui/modal')).Modal, {
  ssr: false
})

const ModalContent = dynamic(async () => (await import('@iac/ui/modal')).ModalContent, {
  ssr: false
})

type Props = {
  onSubmit: (data: UpdateTaskDto) => void
  isPending: boolean
  isOpen: boolean
  onSetIsOpen: (isOpen: boolean) => void
} & Partial<{
  data: Task | null
}>

export const NewTask = ({ isPending, onSubmit, data, isOpen, onSetIsOpen }: Props) => {
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(
      updateTaskSchema.extend({
        categories: z.array(z.string()).max(4, 'Categories must be at most 4 items').optional()
      })
    ),
    defaultValues: data || {
      title: '',
      description: '',
      categories: [],
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.PENDING
    }
  })

  const { isValid } = form.formState

  const handleSubmit = (values: UpdateTaskDto) => {
    onSubmit(values)
    onSetIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen])

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])

  return (
    <Modal isOpen={isOpen} onOpenChange={onSetIsOpen}>
      <ModalContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4">
            <Typography.H4 className="text-base-rose font-bold">{data ? 'Edit Task' : 'Create New Task'}</Typography.H4>

            <div className="my-6 flex flex-col gap-3">
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <Typography.Body className="text-base-text">Title</Typography.Body>

                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <Typography.Body className="text-base-text">Description</Typography.Body>

                    <Textarea {...field} />
                  </div>
                )}
              />

              <Controller
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2 w-full">
                    <Typography.Body className="text-base-text">Priority</Typography.Body>

                    <Select className="max-w-full" value={field.value} onChange={field.onChange} placeholder="Pick one">
                      <Select.Trigger />
                      <Select.Content>
                        {Object.values(TaskPriority).map(priority => (
                          <Select.Item key={priority} value={priority}>
                            {priority}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                )}
              />

              <Controller
                name="categories"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                  <div className="flex flex-col gap-2">
                    <Typography.Body className="text-base-text">Categories</Typography.Body>

                    <TagInput {...field} />

                    {error && <Message>{error.message}</Message>}

                    <Typography.Caption className="text-base-text italic">
                      Press <span className="text-base-rose">ENTER</span> to add a category
                    </Typography.Caption>
                  </div>
                )}
              />
            </div>
            <div className="flex justify-end w-full gap-2 items-center">
              <Button variant="destructive" type="button" onClick={() => onSetIsOpen(false)}>
                <Typography.Button>Cancel</Typography.Button>
              </Button>
              <Button className="w-20" disabled={!isValid}>
                {isPending ? <Loading /> : <Typography.Button>Save</Typography.Button>}
              </Button>
            </div>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}
