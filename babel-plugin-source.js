module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration: {
        enter({ node }) {
          // set default.parameters.coverage
          /**
           * {
           *   coverage: {
           *     fileName: '',
           *     filePath: '',
           *     source: '' <- raw source
           *   }
           * }
           */
        },
      },
    },
  };
};