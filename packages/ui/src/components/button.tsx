'use client'

import clsx from 'clsx'

import { HTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  base: 'bg-base-gold text-white font-semibold py-2 px-4 rounded'
})

export type ButtonProps = {} & VariantProps<typeof styles> & HTMLAttributes<HTMLButtonElement>

export const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={clsx(className, styles(props))} {...props} />
}
