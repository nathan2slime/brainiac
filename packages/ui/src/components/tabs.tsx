'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

const tabListStyles = tv({
  base: 'flex border-b mx-auto border-base-highlight-med w-fit',
  variants: {
    variant: {
      underline: 'border-b-2'
    }
  },
  defaultVariants: {
    variant: 'underline'
  }
})

const tabStyles = tv({
  base: 'px-4 py-2 cursor-pointer focus:outline-none text-base-text',
  variants: {
    active: {
      true: 'border-b-2 text-base-rose border-base-rose font-semibold',
      false: 'hover:text-base-rose'
    }
  }
})

type TabContextType = {
  activeIndex: number
  setActiveIndex: (index: number) => void
  onChangeTab: (index: number) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

type TabsProps = Partial<{
  defaultIndex: number
  children: ReactNode
  onChangeTab: (index: number) => void
}>

export const Tabs = ({ defaultIndex = 0, children, onChangeTab }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex, onChangeTab: onChangeTab || (() => {}) }}>
      <div data-testid="tabs">{children}</div>
    </TabContext.Provider>
  )
}

type TabListProps = {
  children: ReactNode
} & VariantProps<typeof tabListStyles>

const TabList = ({ children, variant }: TabListProps) => <div className={tabListStyles({ variant })}>{children}</div>

type TabProps = {
  children: ReactNode
  index: number
}

const Tab = ({ children, index }: TabProps) => {
  const ctx = useContext(TabContext)
  if (!ctx) throw new Error('Tab must be used within Tabs')

  const { activeIndex, setActiveIndex, onChangeTab } = ctx

  return (
    <button
      className={tabStyles({ active: activeIndex === index })}
      onClick={() => {
        setActiveIndex(index)
        onChangeTab(index)
      }}
      type="button"
    >
      {children}
    </button>
  )
}

type TabPanelProps = {
  children: ReactNode
  index: number
}

const TabPanel = ({ children, index }: TabPanelProps) => {
  const ctx = useContext(TabContext)
  if (!ctx) throw new Error('TabPanel must be used within Tabs')

  return ctx.activeIndex === index ? <div>{children}</div> : null
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel
