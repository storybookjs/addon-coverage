import type { IstanbulPluginOptions as AddonOptionsVite } from "vite-plugin-istanbul";
import type { FileCoverage } from 'istanbul-lib-coverage';
export interface AddonOptionsBabel {
  cwd?: string;
  include?: string[];
  exclude?: string[];
  extension?: string[];
  excludeNodeModules?: boolean;
  coverageVariable?: string;
  coverageGlobalScopeFunc?: boolean,
  ignoreClassMethods?: string[]
  useInlineSourceMaps?: boolean;
  inputSourceMap?: object;
  nycrcPath?: string;
  onCover?: (fileName: string, fileCoverage: FileCoverage) => unknown;
  fileName?: string;
}

export interface AddonOptions {
  istanbul: AddonOptionsBabel | AddonOptionsVite;
}
