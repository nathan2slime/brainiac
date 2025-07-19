import userEvent from '@testing-library/user-event'

import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../components/button'

describe('Button', () => {
  it('renders the button text', () => {
    const { getByText } = render(<Button>Click</Button>)

    expect(getByText('Click')).toBeTruthy()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders as disabled when disabled prop is set', async () => {
    const onClick = vi.fn()

    const { getByRole } = render(<Button disabled>Disabled</Button>)

    await userEvent.click(getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
  })
})
