import { Card } from '@iac/ui/card'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Card,
  title: 'Components/Card',

  tags: ['autodocs']
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
