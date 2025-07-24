'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const badgeStyles = tv({
  base: 'inline-block w-5 h-5 text-xs rounded-full pointer-events-none absolute font-semibold bg-base-rose text-base-base -top-2 -right-2',
  variants: {
    visible: {
      true: 'opacity-100',
      false: 'opacity-0'
    }
  }
})

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  value: ReactNode
} & VariantProps<typeof badgeStyles>

export const Badge = ({ children, className, visible = true, value }: BadgeProps) => (
  <div className="w-fit relative">
    <div className={badgeStyles({ className, visible })} data-testid="badge">
      {value}
    </div>

    {children}
  </div>
)
