import type { TransformOptions } from "@babel/core";
import type { Options } from "@storybook/core-common";
import { defaultExclude, defaultExtensions } from "./constants";
import type { AddonOptions } from "./types";

export const viteFinal = async (
  viteConfig: Record<string, any>,
  options: Options & AddonOptions
) => {
  const istanbul = require("vite-plugin-istanbul");
  console.log("Adding istanbul plugin to vite config");
  viteConfig.plugins ||= [];
  viteConfig.plugins.push(
    istanbul({
      ...options.istanbul,
      include: Array.from(options.istanbul?.include || []),
      exclude: [
        options.configDir + "/**",
        ...defaultExclude,
        ...Array.from(options.istanbul?.exclude || []),
      ],
      extension: options.istanbul?.extension || defaultExtensions,
    })
  );

  return viteConfig;
};

export const babel = async (
  babelConfig: TransformOptions,
  options: Options & AddonOptions
) => {
  console.log("Adding istanbul plugin to babel config");
  babelConfig.plugins ||= [];
  babelConfig.plugins.push([
    "istanbul",
    {
      ...options.istanbul,
      include: Array.from(options.istanbul?.include || []),
      exclude: [
        options.configDir + "/**",
        ...defaultExclude,
        ...Array.from(options.istanbul?.exclude || []),
      ],
      extension: options.istanbul?.extension || defaultExtensions,
    },
  ]);

  return babelConfig;
};
