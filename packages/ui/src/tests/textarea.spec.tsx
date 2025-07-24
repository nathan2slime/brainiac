import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Textarea } from '../components/textarea'

describe('Textarea', () => {
  it('renders the textarea with placeholder', () => {
    const onChange = vi.fn()
    const { getByPlaceholderText } = render(<Textarea placeholder="Type here" onChange={onChange} />)
    expect(getByPlaceholderText('Type here')).toBeTruthy()
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    const { getByPlaceholderText } = render(<Textarea placeholder="Type here" onChange={onChange} />)
    await userEvent.type(getByPlaceholderText('Type here'), 'test')
    expect(onChange).toHaveBeenCalled()
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    const { getByRole } = render(<Textarea disabled onChange={onChange} />)
    await userEvent.type(getByRole('textbox'), 'any')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('accepts controlled value', () => {
    const onChange = vi.fn()
    const { getByDisplayValue } = render(<Textarea value="value" onChange={onChange} />)
    expect(getByDisplayValue('value')).toBeTruthy()
  })

  it('renders with default value', () => {
    const onChange = vi.fn()
    const { getByDisplayValue } = render(<Textarea value="initial" onChange={onChange} />)
    expect(getByDisplayValue('initial')).toBeTruthy()
  })

  it('calls onFocus when receives focus', async () => {
    const onFocus = vi.fn()
    const onChange = vi.fn()

    const { getByPlaceholderText } = render(<Textarea placeholder="Focus" onChange={onChange} onFocus={onFocus} />)
    await userEvent.click(getByPlaceholderText('Focus'))

    expect(onFocus).toHaveBeenCalled()
  })

  it('calls onBlur when loses focus', async () => {
    const onBlur = vi.fn()
    const onChange = vi.fn()

    const { getByPlaceholderText } = render(<Textarea placeholder="Blur" onChange={onChange} onBlur={onBlur} />)

    const textarea = getByPlaceholderText('Blur')
    await userEvent.click(textarea)
    await userEvent.tab()

    expect(onBlur).toHaveBeenCalled()
  })

  it('applies the default variant styles', () => {
    const { getByRole } = render(<Textarea />)
    const textarea = getByRole('textbox')
    expect(textarea.className).toMatch(/bg-moon-surface/)
  })

  it('applies the success variant styles', () => {
    const { getByRole } = render(<Textarea variant="success" />)
    const textarea = getByRole('textbox')
    expect(textarea.className).toMatch(/border-base-pine/)
  })

  it('applies the destructive variant styles', () => {
    const { getByRole } = render(<Textarea variant="destructive" />)
    const textarea = getByRole('textbox')
    expect(textarea.className).toMatch(/border-base-love/)
  })

  it('accepts custom className', () => {
    const { getByRole } = render(<Textarea className="custom-class" />)
    const textarea = getByRole('textbox')
    expect(textarea.className).toMatch(/custom-class/)
  })
})
