import { Button } from '@iac/ui/button'
import { Filter, Plus } from 'lucide-react'

import Brainiac from '~/assets/icons/brainiac.svg'

export const Navbar = () => {
  return (
    <div className="bg-moon-surface/90 sticky top-1 backdrop-blur-md flex items-center gap-1 justify-between w-full rounded-3xl p-4">
      <Brainiac className="text-base-rose w-16" />
      <div className="flex items-center gap-2">
        <Button className="flex text-sm items-center gap-1">
          <Plus className="w-5" />
          New Task
        </Button>

        <Button size="icon" variant="outline">
          <Filter className="w-5" />
        </Button>
      </div>
    </div>
  )
}
