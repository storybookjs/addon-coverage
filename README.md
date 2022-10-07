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
  addons: ['@storybook/addon-coverage'],
};
```

### Configuring the addon

This addon instruments your code by using [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) if your project uses Babel or [vite-plugin-istanbul](https://github.com/iFaxity/vite-plugin-istanbul) if your project uses Vite. It provides some default configuration, but if you want to add yours, you can do so by setting the options in your `.storybook/main.js`:

```js
module.exports = {
  addons: [
    { 
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          include: ["**/stories/**"]
        }
      }  
    }
  ],
};
```

The available options are as follows:

| Option name | Description                                                                              | Type            | Default                                                                          |
| ----------- | ---------------------------------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------- |
| `cwd`       | Set the working directory                                                                | `String`        | `process.cwd()`                                                                         |
| `include`   | See [here](https://github.com/istanbuljs/nyc#selecting-files-for-coverage) for more info | `Array<String>` | `['**']`                                                                         |
| `exclude`   | See [here](https://github.com/istanbuljs/nyc#selecting-files-for-coverage) for more info | `Array<String>` | [list](https://github.com/storybookjs/addon-coverage/blob/main/src/constants.js) |
| `extension` | List of extensions that nyc should attempt to handle in addition to `.js`                | `Array<String>` | `['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.vue', '.svelte]`               |

### Development scripts

- `yarn start` runs babel in watch mode
- `yarn build` build and package your addon code

To run the examples, choose one of the projects in the `examples` directory then run:
- `yarn` to install dependencies and link the addon locally
- `yarn storybook` to run Storybook
- `yarn test-storybook --coverage` to test coverage report generation

### License

[MIT](https://github.com/storybookjs/addon-coverage/blob/main/LICENSE)
