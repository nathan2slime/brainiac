import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../components/button'

describe('Button', () => {
  it('renders the button text', () => {
    const { getByText } = render(<Button>Click</Button>)
    expect(getByText('Click')).toBeTruthy()
  })
})
