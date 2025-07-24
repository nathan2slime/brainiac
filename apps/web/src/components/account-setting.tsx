'use client'

import { Button } from '@iac/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@iac/ui/popover'
import { Typography } from '@iac/ui/typography'
import Avatar from 'avvvatars-react'
import { ChartArea, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { logoutService } from '~/app/api/auth/logout/service'
import { useAuthStore } from '~/store/auth'

export const AccountSetting = () => {
  const user = useAuthStore(state => state.user)
  const router = useRouter()

  const onLogout = async () => {
    await logoutService()
    router.replace('/auth/login')
  }

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Button size="icon" variant="outline">
          <Settings className="w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-60 bg-moon-surface">
        <div className="flex items-center gap-2 mb-6">
          <Avatar size={45} value={user?.username || ''} style="character" />

          <div className="flex flex-col justify-start items-start">
            <Typography.Body className="w-40 truncate">{user?.username}</Typography.Body>

            <Typography.Caption className="text-base-muted w-44 truncate line-clamp-1">{user?.email}</Typography.Caption>
          </div>
        </div>

        <div className="flex flex-col pl-4 gap-2">
          <Button variant="outline" className="justify-start text-sm">
            <ChartArea className="w-5" />
            My Stats
          </Button>
          <Button variant="destructive" className="justify-start text-sm" onClick={onLogout}>
            <LogOut className="w-5" />
            Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
