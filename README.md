# Storybook Addon Coverage

Tools to support code coverage in Storybook and the [Storybook test runner](https://github.com/storybookjs/test-runner). It supports Storybook projects that use **Babel** or **Vite**.

### Installation

Install this addon by adding the `@storybook/addon-coverage` dependency:

```sh
yarn add -D @storybook/addon-coverage
```

And by registering it in your `.storybook/main.js`:

```js
module.exports = {
  addons: ["@storybook/addon-coverage"],
};
```

### Configuring the addon

This addon instruments your code by using [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) if your project uses Babel or [vite-plugin-istanbul](https://github.com/iFaxity/vite-plugin-istanbul) if your project uses Vite. It provides some default configuration, but if you want to add yours, you can do so by setting the options in your `.storybook/main.js`:

```js
module.exports = {
  addons: [
    {
      name: "@storybook/addon-coverage",
      options: {
        istanbul: {
          include: ["**/stories/**"],
        },
      },
    },
  ],
};
```

**The available options if your project uses Babel are as follows:**

| Option name           | Description                                                                              | Type                                                        | Default                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `cwd`                 | Set the working directory                                                                | `String`                                                    | `process.cwd()`                                                                  |
| `include`             | See [here](https://github.com/istanbuljs/nyc#selecting-files-for-coverage) for more info | `Array<String>`                                             | `['**']`                                                                         |
| `exclude`             | See [here](https://github.com/istanbuljs/nyc#selecting-files-for-coverage) for more info | `Array<String>`                                             | [list](https://github.com/storybookjs/addon-coverage/blob/main/src/constants.ts) |
| `extension`           | List of extensions that nyc should attempt to handle in addition to `.js`                | `Array<String>`                                             | `['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.vue', '.svelte]`               |
| `excludeNodeModules`  | Whether or not to exclude all node_module folders (i.e. **/node_modules/**) by default   | `boolean`                                                   | `true`                                                                           |
| `coverageVariable`    | Variable to store coverage                                                               | `string`                                                    | `__coverage__`                                                                   |
| `coverageGlobalScope` | Scope to store the coverage variable                                                     | `string`                                                    | `this`                                                                           |
| `ignoreClassMethods`  | Class method names to ignore for coverage`                                               | `Array<String>`                                             | `[]`                                                                             |
| `useInlineSourceMaps` | Variable to pass sourcemap explicitly                                                    | `object`                                                    | `-`                                                                              |
| `inputSourceMap`      | Scope to store the coverage variable                                                     | `string`                                                    | `-`                                                                              |
| `nycrcPath`           | Path to nyc config file                                                                  | `string`                                                    | `-`                                                                              |
| `onCover`             | Hook used to track coverage for all files                                                | `(fileName: string, fileCoverage: FileCoverage) => unknown` | `-`                                                                              |
| `fileName`            | File name to use in onCover hook                                                         | `string`                                                    | `-`                                                                              |

**The available options if your project uses Vite are as follows:**

| Option name             | Description                                                                                                                                                                                                                                                                                                 | Type                        | Default                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| `cwd`                   | Set the working directory                                                                                                                                                                                                                                                                                   | `String`                    | `process.cwd()`                                                                  |
| `include`               | See [here](https://github.com/istanbuljs/nyc#selecting-files-for-coverage) for more info                                                                                                                                                                                                                    | `Array<String> `or` string` | `['**']`                                                                         |
| `exclude`               | See [here](https://github.com/istanbuljs/nyc#selecting-files-for-coverage) for more info                                                                                                                                                                                                                    | `Array<String> `or` string` | [list](https://github.com/storybookjs/addon-coverage/blob/main/src/constants.ts) |
| `extension`             | List of extensions that nyc should attempt to handle in addition to `.js`                                                                                                                                                                                                                                   | `Array<String> `or` string` | `['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.vue', '.svelte]`               |
| `requireEnv `           | Optional boolean to require the environment variable (defaults to VITE_COVERAGE) to equal true in order to instrument the code. Otherwise it will instrument even if env variable is not set. However if requireEnv is not set the instrumentation will stop if the environment variable is equal to false. | `-`                         | `true`                                                                           |
| `cypress `              | Optional boolean to change the environment variable to CYPRESS_COVERAGE instead of VITE_COVERAGE. For ease of use with `@cypress/code-coverage` coverage                                                                                                                                                    | `boolean`                   | `-`                                                                              |
| `checkProd `            | Optional boolean to enforce the plugin to skip instrumentation for production environments. Looks at Vite's isProduction key from the ResolvedConfig.                                                                                                                                                       | `boolean`                   | `-`                                                                              |
| `forceBuildInstrument ` | Optional boolean to enforce the plugin to add instrumentation in build mode.                                                                                                                                                                                                                                | `boolean`                   | `false`                                                                          |
| `nycrcPath `            | Path to specific nyc config to use instead of automatically searching for a nycconfig. This parameter is just passed down to @istanbuljs/load-nyc-config.                                                                                                                                                   | `string`                    | `-`                                                                              |

### Development scripts

- `yarn start` runs babel in watch mode
- `yarn build` build and package your addon code

To run the examples, choose one of the projects in the `examples` directory then run:

- `yarn` to install dependencies and link the addon locally
- `yarn storybook` to run Storybook
- `yarn test-storybook --coverage` to test coverage report generation

### License

[MIT](https://github.com/storybookjs/addon-coverage/blob/main/LICENSE)
