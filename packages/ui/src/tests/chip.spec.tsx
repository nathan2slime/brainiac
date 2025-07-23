import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Chip } from '../components/chip'

describe('Chip', () => {
  it('renders the chip', () => {
    const { getByTestId } = render(<Chip />)

    expect(getByTestId('chip')).toBeTruthy()
  })
})
