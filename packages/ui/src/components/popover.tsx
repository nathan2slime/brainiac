'use client'

import { Anchor, Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import clsx from 'clsx'
import React from 'react'

const Popover = (props: React.ComponentProps<typeof Root>) => <Root data-slot="popover" {...props} />

const PopoverTrigger = (props: React.ComponentProps<typeof Trigger>) => <Trigger data-slot="popover-trigger" {...props} />

const PopoverContent = ({ className, align = 'center', sideOffset = 4, ...props }: React.ComponentProps<typeof Content>) => (
  <Portal>
    <Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={clsx(
        'text-base-text data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-lg p-4 outline-hidden',
        className
      )}
      {...props}
    />
  </Portal>
)

const PopoverAnchor = (props: React.ComponentProps<typeof Anchor>) => <Anchor data-slot="popover-anchor" {...props} />

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
