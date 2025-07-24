import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Modal } from '../components/modal'

describe('Modal', () => {
  it('renders children when open', () => {
    const { getByText } = render(
      <Modal defaultOpen>
        <div>Modal Content</div>
      </Modal>
    )
    expect(getByText('Modal Content')).toBeTruthy()
  })

  it('ModalContent throws error if not inside Modal', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Modal.Content>Test</Modal.Content>)).toThrow('ModalContent must be used within Modal')
    spy.mockRestore()
  })

  it('Modal.Content renders children', () => {
    const { getByText } = render(
      <Modal defaultOpen>
        <Modal.Content>Inner Content</Modal.Content>
      </Modal>
    )

    expect(getByText('Inner Content')).toBeTruthy()
  })
})
