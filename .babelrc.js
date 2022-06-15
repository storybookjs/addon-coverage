module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  ignore: ["./src/typings.d.ts"],
  env: {
    esm: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
          },
        ],
      ],
    },
  },
};
