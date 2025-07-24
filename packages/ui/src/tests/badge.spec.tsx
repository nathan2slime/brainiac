import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from '../components/badge'

describe('Badge', () => {
  it('renders the badge', () => {
    const { getByTestId } = render(<Badge value={34} />)

    expect(getByTestId('badge')).toBeTruthy()
  })

  it('renders the value inside the badge', () => {
    const { getByTestId } = render(<Badge value={42} />)

    expect(getByTestId('badge').textContent).toBe('42')
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <Badge value="!">
        <span>Child Content</span>
      </Badge>
    )

    expect(getByText('Child Content')).toBeTruthy()
  })

  it('applies custom className to the badge', () => {
    const { getByTestId } = render(<Badge value="A" className="custom-class" />)
    expect(getByTestId('badge').className).toContain('custom-class')
  })
})
