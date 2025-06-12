import type { StoryFn, Meta } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { Page } from "./Page";

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Page>;

const Template: StoryFn<typeof Page> = (args) => <Page {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
LoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const loginButton = await canvas.getByRole("button", { name: /Log in/i });
  await userEvent.click(loginButton);

  const coverage = (globalThis as any).__coverage__;
  await expect(
    Object.keys(coverage).find((cvg) => cvg.endsWith("Page.tsx"))
  ).toBeTruthy();
};
