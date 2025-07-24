import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Tabs } from '../components/tabs'

describe('Tabs', () => {
  it('renders the tabs', () => {
    const { getByTestId } = render(
      <Tabs>
        <Tabs.Tab index={0}>Tab One</Tabs.Tab>
      </Tabs>
    )

    expect(getByTestId('tabs')).toBeTruthy()
  })

  it('calls onChangeTab when a tab is clicked', () => {
    const onChangeTab = vi.fn()

    const { getByText } = render(
      <Tabs onChangeTab={onChangeTab}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab One</Tabs.Tab>
          <Tabs.Tab index={1}>Tab Two</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    )

    getByText('Tab Two').click()
    expect(onChangeTab).toHaveBeenCalledWith(1)
  })

  it('uses defaultIndex prop to set initial active tab', () => {
    const { getByText } = render(
      <Tabs defaultIndex={1}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab One</Tabs.Tab>
          <Tabs.Tab index={1}>Tab Two</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>Panel One</Tabs.Panel>
        <Tabs.Panel index={1}>Panel Two</Tabs.Panel>
      </Tabs>
    )

    expect(getByText('Panel Two')).toBeTruthy()
    expect(() => getByText('Panel One')).toThrow()
  })

  it('throws error if Tab is used outside Tabs', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Tabs.Tab index={0}>Tab</Tabs.Tab>)).toThrow()

    spy.mockRestore()
  })

  it('throws error if TabPanel is used outside Tabs', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Tabs.Panel index={0}>Panel</Tabs.Panel>)).toThrow()

    spy.mockRestore()
  })
})
