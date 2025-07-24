import { HTMLAttributes, type ReactNode, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { tv } from 'tailwind-variants'

const variants = tv({
  slots: {
    wrapper: 'fixed inset-0 z-[60] duration-150 transition-all flex items-center justify-center bg-dawn-iris/5 backdrop-blur-sm',
    base: 'relative w-full max-w-lg mx-4',
    content: 'w-full bg-moon-base border border-base-highlight-low rounded-lg h-fit p-4'
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
    }
  }
})

type ModalContextType = Partial<{
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}>

const ModalContext = createContext<ModalContextType | undefined>(undefined)

type ModalProps = Partial<{
  children: ReactNode
  defaultOpen: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}> &
  HTMLAttributes<HTMLDivElement>

const styles = variants()

const Modal = ({ children, isOpen, onOpenChange, ...props }: ModalProps) => {
  const value = { isOpen, onOpenChange }

  return createPortal(
    <ModalContext.Provider value={value}>
      <div onClick={() => onOpenChange && onOpenChange(false)} className={styles.wrapper({ isOpen })}>
        <div className={styles.base({ isOpen, ...props })}>{children}</div>
      </div>
    </ModalContext.Provider>,
    document.body
  )
}

type ModalContentProps = {
  children: ReactNode
}

const ModalContent = ({ children }: ModalContentProps) => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('ModalContent must be used within Modal')

  const { isOpen } = ctx

  return (
    <div onClick={e => e.stopPropagation()} className={styles.content({ isOpen })}>
      {children}
    </div>
  )
}

Modal.Content = ModalContent

export { Modal, ModalContent }
