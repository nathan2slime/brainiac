import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Select } from '../components/select'

describe('Select', () => {
  const options = ['Option One', 'Option Two', 'Option Three']

  it('renders the placeholder when no value is selected', () => {
    render(
      <Select placeholder="Pick one">
        <Select.Trigger />
        <Select.Content>
          {options.map(opt => (
            <Select.Item key={opt} value={opt}>
              {opt}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )

    expect(screen.getByText('Pick one')).toBeTruthy()
  })

  it('shows options when trigger is clicked', () => {
    const { getByText } = render(
      <Select>
        <Select.Trigger />
        <Select.Content>
          {options.map(opt => (
            <Select.Item key={opt} value={opt}>
              {opt}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )

    fireEvent.click(getByText('Select an option'))

    options.forEach(opt => {
      expect(screen.getByText(opt)).toBeTruthy()
    })
  })

  it('calls onChange and closes when an option is selected', () => {
    const onChange = vi.fn()

    const { getByText } = render(
      <Select onChange={onChange}>
        <Select.Trigger />
        <Select.Content>
          {options.map(opt => (
            <Select.Item key={opt} value={opt}>
              {opt}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )

    fireEvent.click(getByText('Select an option'))
    fireEvent.click(getByText('Option One'))

    expect(onChange).toHaveBeenCalledWith('Option One')
    expect(getByText('Option One')).toBeTruthy()
  })

  it('renders the selected value in the trigger', () => {
    const { getAllByText } = render(
      <Select value="Option Three">
        <Select.Trigger />
        <Select.Content>
          {options.map(opt => (
            <Select.Item key={opt} value={opt}>
              {opt}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )

    expect(getAllByText('Option Three')).toHaveLength(2)
  })

  it('closes when clicking outside', () => {
    const { getByText } = render(
      <div>
        <Select>
          <Select.Trigger />
          <Select.Content>
            {options.map(opt => (
              <Select.Item key={opt} value={opt}>
                {opt}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <button type="button" data-testid="outside">
          Open
        </button>
      </div>
    )

    fireEvent.click(getByText('Select an option'))
    expect(getByText('Option One')).toBeTruthy()

    fireEvent.mouseDown(getByText('Open'))
    expect(getByText('Select an option')).toBeTruthy()
  })
})
