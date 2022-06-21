export interface IstanbulOptions {
  cwd: string;
  include: string[];
  exclude: string[];
  extension: string[];
}

export interface AddonOptions {
  istanbul: IstanbulOptions;
}
