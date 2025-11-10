import TestExclude from 'test-exclude';
import { defaultExclude, defaultExtensions } from './constants';
import { AddonOptionsWebpack } from './types';
import { getNycConfig } from './nyc-config';

export async function createTestExclude(
  opts: AddonOptionsWebpack['istanbul'] = {}
): Promise<{ shouldInstrument(filename: string): boolean }> {
  const { nycrcPath, include, exclude, extension } = opts;
  const cwd = opts.cwd ?? process.cwd();

  const nycConfig = await getNycConfig({
    cwd,
    nycrcPath,
  });

  return new TestExclude({
    cwd,
    include: include ?? nycConfig.include,
    exclude: exclude ?? nycConfig.exclude ?? defaultExclude,
    extension: extension ?? nycConfig.extension ?? defaultExtensions,
    excludeNodeModules: true,
  });
}
