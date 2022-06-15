module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    {
      name: "../preset.js",
      options: { useExternalInstrumentation: false }
    },
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  features: {
    interactionsDebugger: true
  }
};
