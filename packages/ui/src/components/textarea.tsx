'use client'

import clsx from 'clsx'
import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const textareaStyles = tv({
  base: 'text-base text-base-text autofill:bg-transparent outline-none bg-moon-surface border-2 py-2 px-3 rounded-lg resize-none',
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

export type TextareaProps = VariantProps<typeof textareaStyles> & ComponentProps<'textarea'>

export const Textarea = ({ className, value, ...props }: TextareaProps) => <textarea className={clsx(className, textareaStyles(props))} value={value} {...props} />
