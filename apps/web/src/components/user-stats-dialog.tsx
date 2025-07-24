'use client'

import { Button } from '@iac/ui/button'
import { Modal, ModalContent } from '@iac/ui/modal'
import { ChartArea } from 'lucide-react'
import { useState } from 'react'

import { UserStats } from '~/components/user-stats'

export const UserStatsDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" className="justify-start text-sm">
        <ChartArea className="w-5" />
        My Stats
      </Button>
      <Modal className="max-w-4xl" isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <UserStats onClose={() => setIsOpen(false)} />
        </ModalContent>
      </Modal>
    </>
  )
}
