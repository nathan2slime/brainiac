import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
    base: 'relative w-full max-w-xs',
    header:
      'flex items-center border-2 cursor-pointer border-base-highlight-med [&>svg]:text-base-muted [&>svg]:duration-150 [&>svg]:transition-all text-base-text text-sm duration-150 transition-all justify-between px-3 py-2 h-10 bg-moon-surface rounded-lg',
    content: 'absolute border-2 border-base-muted duration-150 transition-all w-full bg-moon-base rounded-lg max-h-52 overflow-y-auto',
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

  const onToggleOpen = () => setIsOpen(isOpen => !isOpen)

  const currentValues = values.filter(value => options.includes(value))

  return (
    <div ref={ref} data-testid="multi-select" className={base({ className })}>
      <div className={header({ isOpen })} onClick={onToggleOpen}>
        {currentValues.length > 0 ? (
          <span className="truncate w-40">{new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(currentValues)}</span>
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

        {options.length === 0 && <div className="px-3 py-2 text-sm text-base-text/70">No options available</div>}
      </div>
    </div>
  )
}
