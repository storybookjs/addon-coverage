import type { IstanbulPluginOptions as IstanbulOptionsVite } from "vite-plugin-istanbul";
import type { FileCoverage } from "istanbul-lib-coverage";

interface IstanbulOptionsBabel {
  cwd?: string;
  include?: string[];
  exclude?: string[];
  extension?: string[];
  excludeNodeModules?: boolean;
  ignoreClassMethods?: string[];
  useInlineSourceMaps?: boolean;
  inputSourceMap?: object;
  nycrcPath?: string;
  onCover?: (fileName: string, fileCoverage: FileCoverage) => unknown;
  fileName?: string;
}

export interface AddonOptionsBabel {
  istanbul?: IstanbulOptionsBabel;
}

export interface AddonOptionsVite {
  istanbul?: IstanbulOptionsVite;
}
