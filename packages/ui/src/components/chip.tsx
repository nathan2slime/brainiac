import { HTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  base: 'py-1 px-3 text-xs h-6 rounded-full w-fit items-center bg-base-base flex justify-start',
  variants: {
    variant: {
      default: 'bg-base-highlight-high text-base-text',
      primary: 'bg-base-pine text-base-surface',
      secondary: 'bg-base-love text-base-surface'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type ChipProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof styles>

export const Chip = ({ className, variant, ...props }: ChipProps) => {
  return <div {...props} data-testid="chip" className={styles({ variant })} />
}
