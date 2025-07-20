import clsx from 'clsx'
import { JSX, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  variants: {
    variant: {
      h1: 'text-3xl font-extrabold',
      h2: 'text-2xl font-bold',
      h3: 'text-xl font-semibold',
      h4: 'text-lg font-semibold',
      h5: 'text-base font-semibold',
      body: 'text-base font-normal',
      caption: 'text-sm fon-normal',
      button: 'text-sm font-semibold uppercase',
      link: 'text-sm font-normal underline cursor-pointer',
      placeholder: 'text-sm font-normal italic'
    }
  }
})

type TypographyVariant = VariantProps<typeof styles>['variant']

export type TypographyBaseProps = Partial<{
  children: ReactNode
  className: string
}>

const createTypographyComponent = (tag: keyof JSX.IntrinsicElements, variant: TypographyVariant) => {
  const Base = ({ children, className }: TypographyBaseProps) => {
    const Component = tag

    return <Component className={clsx(styles({ variant }), className)}>{children}</Component>
  }

  return Base
}

export const Typography = {
  /**
   * 40px, extrabold
   */
  H1: createTypographyComponent('h1', 'h1'),
  /**
   * 32px, bold
   */
  H2: createTypographyComponent('h2', 'h2'),
  /**
   * 24px, semibold
   */
  H3: createTypographyComponent('h3', 'h3'),
  /**
   * 18px, semibold
   */
  H4: createTypographyComponent('h4', 'h4'),
  /**
   * 16px, semibold
   */
  H5: createTypographyComponent('h5', 'h5'),
  /**
   * 14px, normal
   */
  Body: createTypographyComponent('p', 'body'),
  /**
   * 16px, normal
   */
  Caption: createTypographyComponent('span', 'caption'),
  /**
   * 14px, semibold, uppercase
   */
  Button: createTypographyComponent('span', 'button'),
  /**
   * 14px, normal, underline
   */
  Link: createTypographyComponent('a', 'link'),
  /**
   * 12px, normal, italic
   */
  Placeholder: createTypographyComponent('span', 'placeholder')
}
