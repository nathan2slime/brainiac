import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '../components/card'

describe('Card', () => {
  it('renders the card', () => {
    const { getByTestId } = render(<Card />)

    expect(getByTestId('card')).toBeTruthy()
  })
})
