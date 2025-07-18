import type { StorybookConfig } from "@storybook/react-vite";

import { join, dirname } from "node:path";


const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
};

export default config;
