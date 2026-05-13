export default {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-webpack5-compiler-babel', { name: '../../../dist/preset.js' }],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};
