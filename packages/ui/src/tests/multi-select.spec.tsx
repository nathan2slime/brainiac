import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { MultiSelect } from '../components/multi-select'

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node
  }
})

describe('MultiSelect', () => {
  const options = ['Apple', 'Banana', 'Cherry']

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders placeholder when no value is selected', () => {
    const onChange = vi.fn()

    const { getByText } = render(<MultiSelect options={options} values={[]} onChange={onChange} placeholder="Select fruits" />)

    expect(getByText('Select fruits')).not.toBeNull()
  })

  it('renders selected values as a list', () => {
    const onChange = vi.fn()

    const { getByText } = render(<MultiSelect options={options} values={['Apple', 'Banana']} onChange={onChange} placeholder="Select fruits" />)
    expect(getByText('Apple and Banana')).not.toBeNull()
  })

  it('calls onChange with selected value when option is clicked', () => {
    const onChange = vi.fn()
    const { getByText } = render(<MultiSelect options={options} values={[]} onChange={onChange} placeholder="Select fruits" />)
    fireEvent.click(getByText('Select fruits'))

    fireEvent.click(getByText('Banana'))
    expect(onChange).toHaveBeenCalledWith(['Banana'])
  })

  it('removes value from selection when selected option is clicked again', () => {
    const onChange = vi.fn()

    const { getByText } = render(<MultiSelect options={options} values={['Banana']} onChange={onChange} placeholder="Select fruits" />)
    fireEvent.click(getByText('Banana', { selector: 'div' }))
    fireEvent.click(getByText('Banana', { selector: 'div' }))

    expect(onChange).toHaveBeenCalledWith([])
  })

  it('applies custom className if provided', () => {
    const onChange = vi.fn()

    const { getByTestId } = render(<MultiSelect options={options} values={[]} onChange={onChange} className="custom" />)
    const element = getByTestId('multi-select')

    expect(element.classList.contains('custom')).toBe(true)
  })
})
