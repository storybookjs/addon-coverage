const commonExtensions = ['.js', '.mjs', '.cjs', '.ts', '.cts', '.mts'];
export const defaultExtensions = [...commonExtensions, '.tsx', '.jsx', '.vue', '.svelte'];
const testFileExtensions = defaultExtensions.map((extension) => extension.slice(1)).join(',');

const configFileExtensions = commonExtensions.map((extension) => extension.slice(1)).join(',');

export const defaultExclude = [
  '**/node_modules/**',
  '.storybook/**',
  'coverage/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  '**/*.mock.*',
  'test{,s}/**',
  `test{,-*}.{${testFileExtensions}}`,
  `**/*{.,-}{spec,story,stories,types}.{${testFileExtensions}}`,
  '**/__tests__/**',
  '**/*-entry.js',

  /* Exclude common development tool configuration files */
  `**/{ava,babel,nyc}.config.{${configFileExtensions}}`,
  `**/{jest,vitest}.config.{${configFileExtensions}}`,
  `**/{karma,rollup,webpack,vite}.config.{${configFileExtensions}}`,
  `**/.{eslint,mocha}rc.{${configFileExtensions}}`,
];
