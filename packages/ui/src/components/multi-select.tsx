import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { tv } from 'tailwind-variants'

type Props = {
  options: string[]
  values: string[]
} & Partial<{
  onChange: (values: string[]) => void
  onSelect: (option: string) => void
  position: 'top' | 'bottom'
  placeholder: string
  className: string
}>

const styles = tv({
  slots: {
    wrapper: 'fixed top-0 w-screen h-screen right-0',
    base: 'relative w-full max-w-xs',
    header:
      'flex items-center border-2 cursor-pointer border-base-highlight-med [&>svg]:text-base-muted [&>svg]:duration-150 [&>svg]:transition-all text-base-text text-sm duration-150 transition-all justify-between px-3 py-2 h-10 bg-moon-surface rounded-lg',
    content: 'absolute border border-base-highlight-high duration-150 transition-all w-full bg-moon-base rounded-lg max-h-40 overflow-y-auto',
    option: 'px-3 py-2 hover:bg-moon-surface text-sm hover:text-base-text duration-150 transition-all cursor-pointer h-10'
  },
  variants: {
    isOpen: {
      true: {
        header: 'border-moon-foam [&>svg]:rotate-180 z-10 [&>svg]:text-moon-foam',
        wrapper: 'z-50 pointer-events-auto',
        content: 'opacity-100 z-40 border-transparent pointer-events-auto'
      },
      false: {
        wrapper: '-z-50 pointer-events-none',
        header: 'border-transparent',
        content: 'opacity-0 pointer-events-none'
      }
    },
    isSelected: {
      true: {
        option: 'text-moon-foam'
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

const { base, header, content, option, wrapper } = styles()

export const MultiSelect = ({ options, values, onChange, onSelect, position, placeholder, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    if (values.includes(option)) {
      onSelect && onSelect('')
      onChange && onChange(values.filter(currentValue => currentValue !== option))
    } else {
      onSelect && onSelect(option)
      onChange && onChange([...values, option])
    }
  }

  const onToggleOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <>
      {createPortal(<div data-testid="multi-select" onClick={() => setIsOpen(false)} className={wrapper({ className, isOpen })} />, document.body)}

      <div className={base({ className })}>
        <div className={header({ isOpen })} onClick={onToggleOpen}>
          {values.length > 0 ? (
            <span className="truncate w-40">{new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(values)}</span>
          ) : (
            <span className="text-dawn-muted">{placeholder}</span>
          )}
          <ChevronDown className="w-5" />
        </div>

        <div onClick={e => e.stopPropagation()} className={content({ isOpen, position })}>
          {options.map((value, index) => (
            <div key={value.concat(index.toString())} className={option({ isSelected: values.includes(value) })} onClick={() => handleSelect(value)}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
