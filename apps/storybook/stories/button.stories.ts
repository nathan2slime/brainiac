import { Button } from '@iac/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

const meta = {
  component: Button,
  title: 'Components/Button',
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
    onClick: fn(),
    variant: 'primary'
  }
}
