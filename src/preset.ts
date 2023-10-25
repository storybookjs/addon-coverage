import type { TransformOptions } from "@babel/core";
import type { Options } from "@storybook/core-common";
import {
  defaultExclude,
  defaultExcludeRegexes,
  defaultExtensions,
} from "./constants";
import type {
  AddonOptionsBabel,
  AddonOptionsVite,
  AddonOptionsWebpack,
} from "./types";

export const viteFinal = async (
  viteConfig: Record<string, any>,
  options: Options & AddonOptionsVite
) => {
  const istanbul = require("vite-plugin-istanbul");

  console.log("[addon-coverage] Adding istanbul plugin to Vite config");
  viteConfig.build = viteConfig.build || {};
  viteConfig.build.sourcemap = true;

  viteConfig.plugins ||= [];
  viteConfig.plugins.push(
    istanbul({
      forceBuildInstrument: options.configType === "PRODUCTION",
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
  options: Options & AddonOptionsBabel
) => {
  console.log("[addon-coverage] Adding istanbul plugin to Babel config");
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
      coverageVariable: "__coverage__",
    },
  ]);

  return babelConfig;
};

export const swc = async (
  swcConfig: Record<string, any>,
) => {
  swcConfig.parseMap = true;

  return swcConfig;
};

export const webpackFinal = async (
  webpackConfig: Record<string, any>,
  options: Options & AddonOptionsWebpack
) => {
  webpackConfig.module.rules ||= [];
  const extensions = options.istanbul?.extension || /\.(mjs|cjs|tsx?|jsx?)$/;

  console.log("[addon-coverage] Adding istanbul loader to Webpack config");

  webpackConfig.module.rules.push({
    test: extensions,
    loader: "@jsdevtools/coverage-istanbul-loader",
    enforce: "post",
    options: options.istanbul || {},
    include: (modulePath: string) => {
      if (options.istanbul?.include) {
        const includeRegexes = options.istanbul.include.map(
          (pattern) => new RegExp(pattern)
        );
        return includeRegexes.some((pattern) => pattern.test(modulePath));
      } else {
        return true;
      }
    },
    exclude: (modulePath: string) => {
      const excludeRegexes = defaultExcludeRegexes;
      if (options.istanbul?.exclude) {
        excludeRegexes.push(
          ...options.istanbul.exclude.map((pattern) => new RegExp(pattern))
        );
      }

      return excludeRegexes.some((pattern) => pattern.test(modulePath));
    },
  });

  return webpackConfig;
};
