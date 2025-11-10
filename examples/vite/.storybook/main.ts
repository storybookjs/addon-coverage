export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-coverage'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
