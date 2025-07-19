import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Input } from '@iac/ui/input'

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      options: ['default', 'success', 'destructive'],
      control: {
        type: 'select'
      },
      description: 'Variant of the input',
      defaultValue: 'primary'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'success',
    value: 'Discord',
    onChange: fn()
  }
}
