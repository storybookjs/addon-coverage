function config(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset/preview")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset/manager")];
}

const defaultIstanbulOptions = {
  cwd: __dirname,
  exclude: [
    "**/*.d.ts",
    "**/*{.,-}{spec,stories,types}.{js,jsx,ts,tsx}",
  ]
}

const babel = async (babelConfig, options) => {
  if (options.useExternalInstrumentation) {
    return babelConfig
  }

  babelConfig.plugins.push(
    [
      "istanbul",
      {
        ...defaultIstanbulOptions,
        ...options.istanbul,
      },
    ],
  )
  return babelConfig
};

module.exports = {
  managerEntries,
  config,
  babel
};
