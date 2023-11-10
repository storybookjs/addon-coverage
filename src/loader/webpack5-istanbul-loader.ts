import { fromSource, fromMapFileSource } from "convert-source-map";
import {
  createInstrumenter,
  InstrumenterOptions,
} from "istanbul-lib-instrument";
// @ts-expect-error no types
import mergeSourceMap from "merge-source-map";
import { LoaderContext } from "webpack";
import fs from "fs";
import path from "path";
import { AddonOptionsWebpack } from "../types";

export type Options = Partial<InstrumenterOptions> & AddonOptionsWebpack;

type RawSourceMap = {
  version: number;
  sources: string[];
  mappings: string;
  file?: string;
  sourceRoot?: string;
  sourcesContent?: string[];
  names?: string[];
};

export const defaultOptions: Partial<InstrumenterOptions> = {
  preserveComments: true,
  produceSourceMap: true,
  autoWrap: true,
  esModules: true,
  compact: false,
};

export default function (
  this: LoaderContext<Options>,
  source: string,
  sourceMap?: RawSourceMap
) {
  let map = sourceMap;
  let options = Object.assign(defaultOptions, this.getOptions());

  // If there's no external sourceMap file, then check for an inline sourceMap
  if (!map) {
    map = sourceMap = getInlineSourceMap.call(this, source);
  }

  // Instrument the code
  let instrumenter = createInstrumenter(options);
  instrumenter.instrument(
    source,
    this.resourcePath,
    (error, instrumentedSource) => {
      let instrumentedSourceMap = instrumenter.lastSourceMap();

      if (sourceMap && instrumentedSourceMap) {
        // Re-map the source map to the original source code
        instrumentedSourceMap = mergeSourceMap(
          sourceMap,
          instrumentedSourceMap
        );
      }

      this.callback(
        error,
        instrumentedSource,
        instrumentedSourceMap as any as RawSourceMap
      );
    },
    sourceMap as any
  );
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
