import { MultiSelect } from '@iac/ui/multi-select'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

const options = ['Banana', 'Apple', 'Orange']

const meta = {
  component: MultiSelect,
  title: 'Components/MultiSelect',
  tags: ['autodocs'],
  argTypes: {
    options: {
      options: options,

      control: {
        type: 'multi-select',
        labels: options
      }
    },
    values: {
      options: options,
      control: {
        type: 'multi-select',
        labels: options
      }
    }
  }
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options,
    onChange: fn(),
    placeholder: 'Select options',
    values: options.slice(0, 1)
  }
}
