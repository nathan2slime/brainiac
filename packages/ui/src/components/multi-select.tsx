import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { tv } from 'tailwind-variants'

type Props = {
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
} & Partial<{
  placeholder: string
  className: string
}>

const styles = tv({
  slots: {
    wrapper: 'fixed top-0 w-screen h-screen right-0',
    base: 'relative w-full max-w-xs',
    header:
      'flex items-center [&>svg]:text-base-muted [&>svg]:duration-150 [&>svg]:transition-all text-base-text text-base duration-150 transition-all justify-between px-3 py-2 h-10 bg-moon-surface border-2 rounded-lg',
    content: 'absolute top-12 duration-150 transition-all w-full bg-moon-base rounded-lg max-h-40 overflow-y-auto',
    option: 'px-3 py-2 hover:bg-moon-surface text-sm hover:text-base-text duration-150 transition-all cursor-pointer h-10'
  },
  variants: {
    isOpen: {
      true: {
        header: 'border-moon-foam [&>svg]:rotate-180 [&>svg]:text-moon-foam',
        content: 'opacity-100 border-transparent pointer-events-auto'
      },
      false: {
        header: 'border-transparent',
        content: 'opacity-0 pointer-events-none'
      }
    },
    isSelected: {
      true: {
        option: 'bg-moon-foam text-moon-surface'
      },
      false: {
        option: 'text-base-text'
      }
    }
  }
})

const { base, header, content, option, wrapper } = styles()

export const MultiSelect = ({ options, values, onChange, placeholder, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter(currentValue => currentValue !== option))
    } else {
      onChange([...values, option])
    }
  }

  const onToggleOpen = () => setIsOpen(isOpen => !isOpen)

  return createPortal(
    <div data-testid="multi-select" onClick={onToggleOpen} className={wrapper({ className })}>
      <div className={base({ className })}>
        <div className={header({ isOpen })}>
          {values.length > 0 ? (
            <span className="truncate">{new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(values)}</span>
          ) : (
            <span className="text-dawn-muted">{placeholder}</span>
          )}
          <ChevronDown className="w-5" />
        </div>

        <div onClick={e => e.stopPropagation()} className={content({ isOpen })}>
          {options.map((value, index) => (
            <div key={value.concat(index.toString())} className={option({ isSelected: values.includes(value) })} onClick={() => handleSelect(value)}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}
