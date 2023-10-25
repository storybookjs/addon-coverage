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

interface IstanbulOptionsSWC {
  coverageVariable?: string;
  compact?: boolean;
  reportLogic?: boolean;
  ignoreClassMethods?: Array<string>;
  inputSourceMap?: Record<string, any>;
  instrumentLog: {
    level: "trace" | "warn" | "error" | "info";
    enableTrace: boolean;
  };
}

interface IstanbulOptionsWebpack {
  coverageVariable?: string;
  preserveComments?: boolean;
  compact?: boolean;
  produceSourceMap?: boolean;
  ignoreClassMethods: [];
  debug?: boolean;
}

export interface AddonOptionsBabel {
  istanbul?: IstanbulOptionsBabel;
}

export interface AddonOptionsVite {
  istanbul?: IstanbulOptionsVite;
}

export type AddonOptionsWebpack = {
  useWebpackConfig?: boolean;
  useSwcConfig?: boolean;
  useSwcPlugin: true;
  istanbul?: {
    include?: string[];
    exclude?: string[];
    extension?: RegExp;
  } & IstanbulOptionsSWC;
} | {
  useWebpackConfig?: boolean;
  useSwcConfig?: boolean;
  useSwcPlugin: false;
  istanbul?: {
    include?: string[];
    exclude?: string[];
    extension?: RegExp;
  } & IstanbulOptionsWebpack;
};
