import type { Options } from "@storybook/types";
import { defaultExclude, defaultExtensions } from "./constants";
import type { AddonOptionsVite, AddonOptionsWebpack } from "./types";
import { createTestExclude } from "./webpack5-exclude";
import { getNycConfig } from "./nyc-config";
import {
  InstrumenterOptions,
  createInstrumenter,
} from "istanbul-lib-instrument";

export const viteFinal = async (
  viteConfig: Record<string, any>,
  options: Options & AddonOptionsVite
) => {
  const viteIstanbulPlugin = (await import("vite-plugin-istanbul")).default;
  const istanbul = (viteIstanbulPlugin ??
    viteIstanbulPlugin.default) as typeof viteIstanbulPlugin.default;

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

const defaultOptions: Partial<InstrumenterOptions> = {
  preserveComments: true,
  produceSourceMap: true,
  autoWrap: true,
  esModules: true,
  compact: false,
};

export const webpackFinal = async (
  webpackConfig: Record<string, any>,
  options: Options & AddonOptionsWebpack
) => {
  webpackConfig.module.rules ||= [];
  const nycConfig = await getNycConfig(options.istanbul);
  const extensions =
    options.istanbul?.extension ?? nycConfig.extension ?? defaultExtensions;

  console.log("[addon-coverage] Adding istanbul loader to Webpack config");

  const testExclude = await createTestExclude(options.istanbul);

  let instrumenterOptions = Object.assign(defaultOptions, options.istanbul);
  let instrumenter = createInstrumenter(instrumenterOptions);

  webpackConfig.module.rules.unshift({
    test: new RegExp(extensions?.join("|").replace(/\./g, "\\.")),
    loader: require.resolve("./loader/webpack5-istanbul-loader"),
    enforce: "post",
    options: {
      ...(options.istanbul ?? {}),
      instrumenter,
    },
    include: (modulePath: string) => testExclude.shouldInstrument(modulePath),
  });

  return webpackConfig;
};
