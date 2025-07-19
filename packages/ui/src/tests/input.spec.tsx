import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from '../components/input'

describe('Input', () => {
  it('renders the input with placeholder', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Type here" />)

    expect(getByPlaceholderText('Type here')).toBeTruthy()
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()

    const { getByPlaceholderText } = render(<Input placeholder="Type here" onChange={onChange} />)
    await userEvent.type(getByPlaceholderText('Type here'), 'test')

    expect(onChange).toHaveBeenCalled()
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()

    const { getByRole } = render(<Input disabled onChange={onChange} />)
    await userEvent.type(getByRole('textbox'), 'any')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('accepts controlled value', () => {
    const { getByDisplayValue } = render(<Input value="value" />)

    expect(getByDisplayValue('value')).toBeTruthy()
  })

  it('renders with default value', () => {
    const { getByDisplayValue } = render(<Input defaultValue="initial" />)

    expect(getByDisplayValue('initial')).toBeTruthy()
  })

  it('calls onFocus when receives focus', async () => {
    const onFocus = vi.fn()

    const { getByPlaceholderText } = render(<Input placeholder="Focus" onFocus={onFocus} />)
    await userEvent.click(getByPlaceholderText('Focus'))

    expect(onFocus).toHaveBeenCalled()
  })

  it('calls onBlur when loses focus', async () => {
    const onBlur = vi.fn()

    const { getByPlaceholderText } = render(<Input placeholder="Blur" onBlur={onBlur} />)

    const input = getByPlaceholderText('Blur')
    await userEvent.click(input)
    await userEvent.tab()

    expect(onBlur).toHaveBeenCalled()
  })
})
