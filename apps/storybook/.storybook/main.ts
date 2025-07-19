import type { StorybookConfig } from '@storybook/react-vite'

import { dirname, join } from 'node:path'

const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },
  features: {
    actions: true,
    argTypeTargetsV7: true,
    controls: true
  }
}

export default config
