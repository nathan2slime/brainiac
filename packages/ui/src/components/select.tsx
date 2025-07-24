import { ChevronDown } from 'lucide-react'
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'

type SelectContextType = Partial<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  value: string
  onChange: (value: string) => void
  position: 'top' | 'bottom'
  placeholder: string
}>

const SelectContext = createContext<SelectContextType>({})

const useSelectContext = () => {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error('Select compound components must be used within <Select>')

  return ctx
}

type SelectProps = Partial<{
  value: string
  onChange: (value: string) => void
  placeholder: string
  className: string
  position: 'top' | 'bottom'
}> & {
  children: ReactNode
}

const styles = tv({
  slots: {
    base: 'relative w-full max-w-xs',
    header:
      'flex items-center border-2 cursor-pointer border-base-highlight-med [&>svg]:text-base-muted [&>svg]:duration-150 [&>svg]:transition-all text-base-text text-sm duration-150 transition-all justify-between px-3 py-2 h-10 bg-moon-surface rounded-lg',
    content: 'absolute border-2 z-50 border-base-muted duration-150 transition-all w-full bg-moon-base rounded-lg max-h-36 overflow-y-auto',
    option: 'px-3 py-2 hover:bg-moon-surface text-sm hover:text-base-text duration-150 transition-all cursor-pointer h-10'
  },
  variants: {
    isOpen: {
      true: {
        header: 'border-moon-foam [&>svg]:rotate-180 z-10 [&>svg]:text-moon-foam',
        content: 'opacity-100 z-40 pointer-events-auto'
      },
      false: {
        header: 'border-transparent',
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
    },
    position: {
      top: {
        content: 'bottom-full left-0'
      },
      bottom: {
        content: 'top-full left-0'
      }
    }
  }
})

const { base, header, content, option } = styles()

export const Select = ({ value, onChange, placeholder = 'Select an option', className, position = 'bottom', children }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current

    const handleClickOutside = (event: MouseEvent) => {
      if (el && !el.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, value, onChange, position, placeholder }}>
      <div className={base({ className })} ref={ref}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}
Select.displayName = 'Select'

const SelectTrigger = () => {
  const { isOpen, setIsOpen, value, placeholder } = useSelectContext()
  return (
    <div className={header({ isOpen })} onClick={() => setIsOpen && setIsOpen(!isOpen)}>
      {value ? (
        <span className="truncate  w-40" data-testid="select">
          {value}
        </span>
      ) : (
        <span className="text-dawn-muted">{placeholder}</span>
      )}
      <ChevronDown className="w-5" />
    </div>
  )
}
SelectTrigger.displayName = 'Select.Trigger'

const SelectContent = ({ children }: { children: ReactNode }) => {
  const { isOpen, position } = useSelectContext()
  return <div className={content({ isOpen, position })}>{children}</div>
}
SelectContent.displayName = 'Select.Content'

type SelectItemProps = {
  value: string
  children: ReactNode
}

const SelectItem = ({ value: itemValue, children }: SelectItemProps) => {
  const { value, onChange, setIsOpen } = useSelectContext()
  const handleSelect = () => {
    onChange && onChange(itemValue)
    setIsOpen && setIsOpen(false)
  }
  return (
    <div className={option({ isSelected: value === itemValue })} onClick={handleSelect}>
      {children}
    </div>
  )
}
SelectItem.displayName = 'Select.Item'

Select.Trigger = SelectTrigger
Select.Content = SelectContent
Select.Item = SelectItem
