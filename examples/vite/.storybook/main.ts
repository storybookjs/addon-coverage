export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [{ name: '../../../dist/preset.js' }],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
