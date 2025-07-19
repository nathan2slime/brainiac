import { Message } from '@iac/ui/message'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Message,
  title: 'Components/Message',
  tags: ['autodocs']
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Field is required'
  }
}
