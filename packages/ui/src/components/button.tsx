'use client'

import clsx from 'clsx'

import { HTMLMotionProps, motion } from 'framer-motion'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  base: 'text-base font-semibold disabled:pointer-events-none disabled:opacity-30 cursor-pointer h-10 py-2 px-6 duration-150 transition-all rounded-lg',
  variants: {
    variant: {
      primary: 'bg-base-rose text-dawn-text hover:bg-base-rose/80',
      secondary: 'bg-base-surface text-base-text hover:bg-base-highlight-low',
      destructive: 'bg-base-love text-dawn-text hover:bg-base-love/80',
      outline: 'border border-base-muted text-base-muted hover:text-base-text hover:bg-base-muted',
      ghost: 'text-base-muted hover:bg-base-muted hover:text-base-text',
      link: 'text-link underline text-base-text hover:text-base-muted'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export type ButtonProps = VariantProps<typeof styles> & HTMLMotionProps<'button'>

export const Button = ({ className, disabled, ...props }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.03 }}
    transition={{ type: 'spring', duration: 0.15 }}
    className={clsx(className, styles(props))}
    disabled={disabled}
    {...props}
  />
)
