export const decorators = [
  (StoryFn) => {
    console.log(globalThis.__coverage__);
    return StoryFn();
  },
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
