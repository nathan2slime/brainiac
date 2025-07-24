'use client'

import { Button } from '@iac/ui/button'
import { Modal, ModalContent } from '@iac/ui/modal'
import { useQuery } from '@tanstack/react-query'
import { ChartArea } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { searchTaskService } from '~/app/api/task/search/service'
import { Task } from '~/app/lib/models/task'

import { UserStats } from '~/components/user-stats'

export const UserStatsDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: tasks = [], refetch } = useQuery<Task[]>({
    queryKey: ['stats-tasks'],
    queryFn: async () => searchTaskService({})
  })

  const handleMyStats = async () => {
    setIsOpen(true)

    const toastId = toast.loading('Refreshing your stats...')
    await refetch()
    toast.dismiss(toastId)
    toast.success('Stats refreshed successfully!')
  }

  return (
    <>
      <Button onClick={handleMyStats} variant="outline" className="justify-start text-sm">
        <ChartArea className="w-5" />
        My Stats
      </Button>
      <Modal className="max-w-4xl" isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <UserStats tasks={tasks} onClose={() => setIsOpen(false)} />
        </ModalContent>
      </Modal>
    </>
  )
}
