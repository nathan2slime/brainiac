'use client'

import clsx from 'clsx'

import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  base: 'text-base text-base-text outline-none bg-moon-surface border h-10 py-2 px-3 rounded-lg',
  variants: {
    variant: {
      default: 'focus:border-moon-foam border-transparent',
      success: 'border-base-pine',
      destructive: 'border-base-love'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type InputProps = VariantProps<typeof styles> & ComponentProps<'input'>

export const Input = ({ className, ...props }: InputProps) => <input className={clsx(className, styles(props))} {...props} />
