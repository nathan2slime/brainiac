import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Message } from '../components/message'

describe('Message', () => {
  it('renders the message', () => {
    const { getByTestId } = render(<Message>Field is required</Message>)

    expect(getByTestId('message')).toBeTruthy()
  })
})
