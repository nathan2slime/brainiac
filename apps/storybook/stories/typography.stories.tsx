import { Typography, TypographyBaseProps } from '@iac/ui/typography'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Typography.Body> = {
  title: 'Components/Typography',
  tags: ['autodocs']
}

export default meta

export const H1: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Heading 1 - 40px extrabold'
  },
  render: (args: TypographyBaseProps) => <Typography.H1 {...args} />
}

export const H2: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Heading 2 - 32px bold'
  },
  render: (args: TypographyBaseProps) => <Typography.H2 {...args} />
}

export const H3: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Heading 3 - 24px semibold'
  },
  render: (args: TypographyBaseProps) => <Typography.H3 {...args} />
}

export const H4: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Heading 4 - 18px semibold'
  },
  render: (args: TypographyBaseProps) => <Typography.H4 {...args} />
}

export const H5: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Heading 5 - 16px semibold'
  },
  render: (args: TypographyBaseProps) => <Typography.H5 {...args} />
}

export const Body: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Body Text - 16px normal'
  },
  render: (args: TypographyBaseProps) => <Typography.Body {...args} />
}

export const Caption: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Caption Text - 14px normal'
  },
  render: (args: TypographyBaseProps) => <Typography.Caption {...args} />
}

export const Button: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Button Text'
  },
  render: (args: TypographyBaseProps) => <Typography.Button {...args} />
}

export const Link: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Link Text'
  },
  render: (args: TypographyBaseProps) => <Typography.Link {...args} />
}

export const Placeholder: StoryObj<TypographyBaseProps> = {
  args: {
    children: 'Placeholder Text'
  },
  render: (args: TypographyBaseProps) => <Typography.Placeholder {...args} />
}
