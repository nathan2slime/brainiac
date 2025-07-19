'use client'

import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    root: 'bg-moon-surface border border-base-highlight-med rounded-xl p-4'
  }
})

const { root } = styles()

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props} className={clsx(root(), className)} />
