import { type ReactNode, createContext, useContext, useState } from 'react'
import { tv } from 'tailwind-variants'

const variants = tv({
  slots: {
    wrapper: 'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
    base: 'relative w-full max-w-lg mx-4',
    header:
      'flex items-center border-2 cursor-pointer border-base-highlight-med [&>svg]:text-base-muted [&>svg]:duration-150 [&>svg]:transition-all text-base-text text-sm duration-150 transition-all justify-between px-3 py-2 h-10 bg-moon-surface rounded-t-lg',
    content: 'w-full bg-moon-base rounded-b-lg max-h-[80vh] overflow-y-auto p-4',
    option: 'px-3 py-2 hover:bg-moon-surface text-sm hover:text-base-text duration-150 transition-all cursor-pointer h-10'
  },
  variants: {
    isOpen: {
      true: {
        wrapper: 'pointer-events-auto opacity-100',
        content: 'opacity-100 pointer-events-auto'
      },
      false: {
        wrapper: 'pointer-events-none opacity-0',
        content: 'opacity-0 pointer-events-none'
      }
    },
    isSelected: {
      true: {
        option: 'text-moon-foam font-bold underline'
      },
      false: {
        option: 'text-base-text'
      }
    }
  }
})

type ModalContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

type ModalProps = Partial<{
  children: ReactNode
  defaultOpen: boolean
}>

const styles = variants()

export const Modal = ({ children, defaultOpen = false }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const value = { isOpen, setIsOpen }

  return (
    <ModalContext.Provider value={value}>
      <div className={styles.wrapper({ isOpen })}>
        <div className={styles.base({ isOpen })}>{children}</div>
      </div>
    </ModalContext.Provider>
  )
}

type ModalContentProps = {
  children: ReactNode
}

export const ModalContent = ({ children }: ModalContentProps) => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('ModalContent must be used within Modal')

  const { isOpen } = ctx

  return <div className={styles.content({ isOpen })}>{children}</div>
}

Modal.Content = ModalContent
