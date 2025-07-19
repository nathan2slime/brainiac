import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@iac/ui/button'

const meta = {
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      control: {
        type: 'select'
      },
      description: 'The variant of the button',
      defaultValue: 'primary'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Confirm',
    variant: 'primary'
  }
}
