export const decorators = [(StoryFn) => {
  console.log(globalThis.__coverage__)
  return StoryFn()
}]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}