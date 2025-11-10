export default {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-webpack5-compiler-babel', '@storybook/addon-coverage'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};
