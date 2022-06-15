import { PreviewWeb } from "@storybook/preview-web";
declare module "global";

export declare global {
  var __STORYBOOK_PREVIEW__: PreviewWeb<null>;
  var __coverage__: Record<string, CoverageItem>;
}
