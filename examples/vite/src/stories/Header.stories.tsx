import type { StoryFn, Meta } from '@storybook/react';

import { Header } from './Header';
import { expect } from '@storybook/test';

export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Jane Doe',
  },
};
LoggedIn.play = async () => {
  const coverage = (globalThis as any).__coverage__;
  await expect(Object.keys(coverage).find((cvg) => cvg.endsWith('Header.tsx'))).toBeTruthy();
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
