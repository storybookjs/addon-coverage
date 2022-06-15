import React from 'react';

import { Header } from './Header';
import source from "!raw-loader!./Header";

export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    coverage: {
      source,
      filePath: '/Users/yannbraga/open-source/addon-coverage/stories/Header.js'
    }
  },
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Jane Doe',
  },
};

export const LoggedOut = Template.bind({});
