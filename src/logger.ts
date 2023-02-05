import noop from "./_lib/noop";
import {
  colorizeFallback,
  shouldPrintFallback,
  shouldShowTimeFallback,
  timeFormatFallback,
} from "./defaults";
import type { SimpleLogger, SimpleLoggerOptions } from "./types";

/**
 * Creates a logger object containing the same "print" API as the console object.
 *
 * Compatible with server and browser. (universal)
 *
 * @param options
 */
export const createLogger = (options?: SimpleLoggerOptions): SimpleLogger => {
  const {
    prefix,
    shouldPrint = shouldPrintFallback,
    disableAutoWrapPrefix = false,
    shouldShowTime = shouldShowTimeFallback,
    timeFormat = timeFormatFallback,
    colorize = colorizeFallback,
  } = options || {};
  const _prefix: string | undefined =
    disableAutoWrapPrefix || !prefix?.length ? prefix : `[${prefix}]`;
  const prefixes: string[] = []; // Contains an array of prefixes (tags, time, etc.)

  if (shouldShowTime()) {
    prefixes.push(timeFormat());
  }

  if (_prefix) {
    prefixes.push(_prefix);
  }

  return {
    ...console, // Provides the same API as the native "console" object, while overwriting a few specific methods below
    debug: shouldPrint("debug")
      ? console.debug.bind(console, ...colorize("debug", prefixes))
      : noop,
    error: shouldPrint("error")
      ? console.error.bind(console, ...colorize("error", prefixes))
      : noop,
    group: shouldPrint("group")
      ? console.group.bind(console, ...colorize("group", prefixes))
      : noop,
    groupEnd: shouldPrint("groupEnd") ? console.groupEnd.bind(console) : noop,
    info: shouldPrint("info")
      ? console.info.bind(console, ...colorize("info", prefixes))
      : noop,
    log: shouldPrint("log")
      ? console.log.bind(console, ...colorize("log", prefixes))
      : noop,
    warn: shouldPrint("warn")
      ? console.warn.bind(console, ...colorize("warn", prefixes))
      : noop,
  };
};
