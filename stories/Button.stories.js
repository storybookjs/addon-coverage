import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { Button } from "./Button";
import source from "!raw-loader!./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    coverage: {
      source,
      filePath: '/Users/yannbraga/open-source/addon-coverage/stories/Button.js'
    }
  },
};

const Template = (args) => {
  return <>
    <Button {...args} />
  </>
}

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};

export const LoadingAndSucceding = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  return <>
    {isLoading && <button name="stop-loading" onClick={() => setIsLoading(false)}>stop loading</button>}
    <Button label="Success!" loading={isLoading} />
  </>
}
LoadingAndSucceding.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const btn = await canvas.getByRole('button', { name: 'stop loading' })
  await userEvent.click(btn)
}