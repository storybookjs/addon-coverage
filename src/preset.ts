import type { TransformOptions } from "@babel/core";
import type { Options } from "@storybook/core-common";
import { defaultExclude, defaultExtensions } from "./constants";
import type { AddonOptions } from "./types";

export const babel = async (
  babelConfig: TransformOptions,
  options: Options & AddonOptions
) => {
  babelConfig.plugins ||= [];
  babelConfig.plugins.push([
    "istanbul",
    {
      ...options.istanbul,
      include: options.istanbul?.include || [],
      exclude: [
        options.configDir + "/**",
        ...defaultExclude,
        ...(options.istanbul?.exclude || []),
      ],
      extension: options.istanbul?.extension || defaultExtensions,
    },
  ]);

  return babelConfig;
};
