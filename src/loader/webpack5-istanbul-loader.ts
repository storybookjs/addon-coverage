import { Instrumenter, InstrumenterOptions } from "istanbul-lib-instrument";
import { fromSource, fromMapFileSource } from "convert-source-map";

// @ts-expect-error no types
import * as espree from "espree";
import fs from "fs";
import path from "path";
import { LoaderContext } from "webpack";

import { AddonOptionsWebpack } from "../types";

export type Options = Partial<InstrumenterOptions> &
  AddonOptionsWebpack & {
    instrumenter: Instrumenter;
  };

type RawSourceMap = {
  version: number;
  sources: string[];
  mappings: string;
  file?: string;
  sourceRoot?: string;
  sourcesContent?: string[];
  names?: string[];
};

function sanitizeSourceMap(rawSourceMap: RawSourceMap | string): RawSourceMap {
  return rawSourceMap === "string" ? JSON.parse(rawSourceMap) : rawSourceMap;
}

export default function (
  this: LoaderContext<Options>,
  source: string,
  sourceMap?: RawSourceMap
) {
  let map = sourceMap
    ? sanitizeSourceMap(sourceMap)
    : getInlineSourceMap.call(this, source);
  const options = this.getOptions();
  const callback = this.async();

  if (!map) {
    callback(null, source, sourceMap);
    return;
  }

  // Instrument the code
  const instrumenter = options.instrumenter;

  const code = instrumenter.instrumentSync(source, this.resourcePath, map);

  const lastSourceMap = instrumenter.lastSourceMap();

  callback(null, code, lastSourceMap as any);
}

/**
 * If the source code has an inline base64-encoded source map,
 * then this function decodes it, parses it, and returns it.
 */
function getInlineSourceMap(
  this: LoaderContext<Options>,
  source: string
): RawSourceMap | undefined {
  try {
    // Check for an inline source map
    const inlineSourceMap =
      fromSource(source) ||
      fromMapFileSource(source, function (filename) {
        return fs.readFileSync(
          path.resolve(path.dirname(this.resourcePath), filename),
          "utf-8"
        );
      });

    if (inlineSourceMap) {
      // Use the inline source map
      return inlineSourceMap.sourcemap as RawSourceMap;
    }
  } catch (e) {
    // Exception is thrown by fromMapFileSource when there is no source map file
    if (
      e instanceof Error &&
      e.message.includes(
        "An error occurred while trying to read the map file at"
      )
    ) {
      this.emitWarning(e);
    } else {
      throw e;
    }
  }
}
