import { Loading } from '@iac/ui/loading'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Loading,
  title: 'Components/Loading',
  tags: ['autodocs']
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: '35',
    speed: '1',
    color: '#5F6AB1'
  }
}
