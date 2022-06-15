import React from 'react';
import { within, userEvent } from '@storybook/testing-library';

import { Page } from './Page';
import source from "!raw-loader!./Page";

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    coverage: {
      source,
      filePath: '/Users/yannbraga/open-source/addon-coverage/stories/Page.js'
    }
  },
};

const Template = (args) => <Page {...args} />;

export const Default = Template.bind({});

export const LoggedIn = Template.bind({});
LoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const loginButton = await canvas.getByRole('button', { name: /Log in/i });
  await userEvent.click(loginButton);
};

export const LoginLogout = Template.bind({});
LoginLogout.play = async (context) => {
  await LoggedIn.play(context)
  const { canvasElement } = context
  const canvas = within(canvasElement);
  const logoutButton = await canvas.getByRole('button', { name: /Log out/i });
  await userEvent.click(logoutButton);
};

export const LoginLogoutCreateAccount = Template.bind({});
LoginLogoutCreateAccount.play = async (context) => {
  await LoginLogout.play(context)
  const { canvasElement } = context
  const canvas = within(canvasElement);
  const signupButton = await canvas.getByRole('button', { name: /Sign up/i });
  await userEvent.click(signupButton);
};
