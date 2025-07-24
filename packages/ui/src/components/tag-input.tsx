import clsx from 'clsx'
import { X } from 'lucide-react'
import { type ChangeEvent, type ComponentProps, KeyboardEvent, useRef, useState } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

import { Chip } from './chip'

const variants = tv({
  slots: {
    wrapper: 'flex flex-wrap gap-2 group items-center min-h-10 px-3 py-2 bg-moon-surface border-2 rounded-lg',
    input: 'flex-1 min-w-[80px] bg-transparent outline-none text-base text-base-text autofill:bg-transparent border-none p-0 m-0'
  },
  variants: {
    isFocused: {
      true: {
        wrapper: 'border-moon-foam'
      },
      false: {
        wrapper: 'border-transparent'
      }
    }
  },
  defaultVariants: {
    isFocused: false
  }
})

export type TagInputProps = Partial<VariantProps<typeof variants>> &
  Omit<ComponentProps<'input'>, 'value' | 'onChange'> &
  Partial<{
    value: string[]
    onChange: (tags: string[]) => void
  }>

export const TagInput = ({ className, value: tags = [], onChange, ...props }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = inputValue.trim()
    if (e.key === 'Enter' && value) {
      e.preventDefault()

      if (!tags.includes(value)) {
        const newTags = [...tags, value]

        onChange && onChange(newTags)
      }
      setInputValue('')
    }

    if (e.key === 'Backspace' && !inputValue && tags.length) {
      const newTags = tags.slice(0, -1)

      onChange && onChange(newTags)
    }
  }

  const handleRemove = (idx: number) => {
    const newTags = tags.filter((_, i) => i !== idx)

    onChange && onChange(newTags)
  }

  const input = inputRef.current
  const styles = variants({ isFocused })

  return (
    <div className={clsx(styles.wrapper({ isFocused }), className)} onClick={() => input && input.focus()}>
      {tags.map((tag, idx) => (
        <Chip key={tag + idx} className="flex items-center gap-1 pr-1">
          {tag}
          <X
            className="cursor-pointer w-3 text-base-text/60 hover:text-base-text"
            onClick={e => {
              e.stopPropagation()
              handleRemove(idx)
            }}
          />
        </Chip>
      ))}

      <input
        {...props}
        ref={inputRef}
        className={styles.input({ isFocused })}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}
