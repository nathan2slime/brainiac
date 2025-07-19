import clsx from 'clsx'
import { HTMLAttributes } from 'react'

export type MessageProps = HTMLAttributes<HTMLParagraphElement>

export const Message = ({ className, ...props }: MessageProps) => <p data-testid="message" {...props} className={clsx(className, 'text-base-love text-sm')} />
