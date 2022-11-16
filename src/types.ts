import type { IstanbulPluginOptions } from "vite-plugin-istanbul";

export interface IstanbulOptions extends IstanbulPluginOptions {
  cwd?: string;
  include?: string[];
  exclude?: string[];
  extension?: string[];
}

export interface AddonOptions {
  istanbul: IstanbulOptions;
}
