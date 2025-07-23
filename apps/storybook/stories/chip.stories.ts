import { Chip } from '@iac/ui/chip'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Chip,
  title: 'Components/Chip',
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary'],
      control: {
        type: 'select'
      },
      description: 'Variant of the chip',
      defaultValue: 'default'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Sugar' }
}
