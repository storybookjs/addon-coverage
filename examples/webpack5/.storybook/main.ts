export default {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-coverage",
    "@storybook/addon-webpack5-compiler-babel"
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};
