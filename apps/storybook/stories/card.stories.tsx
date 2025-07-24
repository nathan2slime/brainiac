import { Card } from '@iac/ui/card'
import { Typography } from '@iac/ui/typography'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs']
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Card {...args} className="max-w-xs">
      <Typography.H3 className="text-base-text">Akira</Typography.H3>
      <div style={{ marginBottom: 6 }} />
      <Typography.Body className="text-base-text">
        Em Neo-Tokyo, gangues de motoqueiros percorrem ruas iluminadas por néon enquanto poderes psíquicos ameaçam mudar o destino da humanidade
      </Typography.Body>
      <div style={{ marginBottom: 6 }} />
      <Typography.Caption className="text-base-muted">Inspirado por: Akira (1988)</Typography.Caption>
    </Card>
  ),
  args: {}
}
