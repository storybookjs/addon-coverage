import { defineConfig, type Options } from 'tsup';
import { globalPackages as globalManagerPackages } from 'storybook/internal/manager/globals';
import { globalPackages as globalPreviewPackages } from 'storybook/internal/preview/globals';

// The current browsers supported by Storybook v7
const BROWSER_TARGET: Options['target'] = ['chrome100', 'safari15', 'firefox91'];
const NODE_TARGET: Options['target'] = ['node18'];

export default defineConfig({
  entry: ['./src/preset.ts', './src/types.ts', './src/index.ts', './src/loader/webpack5-istanbul-loader.ts'],
  dts: {
    resolve: true,
  },
  clean: true,
  format: ['esm'],
  target: [...BROWSER_TARGET, ...NODE_TARGET],
  platform: 'node',
  external: [...globalManagerPackages, ...globalPreviewPackages, './loader/webpack5-istanbul-loader', 'webpack'],
});
