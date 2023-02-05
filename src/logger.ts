import noop from "./_lib/noop";
import {
  colorizeFallback,
  shouldPrintFallback,
  shouldShowTimeFallback,
  timeFormatFallback,
} from "./defaults";
import type { Logger, LoggerOptions } from "./types";

/**
 * Creates a logger object containing the same "print" API as the console object.
 *
 * Compatible with server and browser. (universal)
 *
 * @param label
 * @param options
 */
export const createLogger = (
  label?: string,
  options?: LoggerOptions
): Logger => {
  const {
    shouldPrint = shouldPrintFallback,
    disableAutoWrapPrefix = false,
    shouldShowTime = shouldShowTimeFallback,
    timeFormat = timeFormatFallback,
    colorize = colorizeFallback,
  } = options || {};

  const _prefix: string | undefined =
    disableAutoWrapPrefix || !label?.length ? label : `[${label}]`;

  const prefixes: string[] = []; // Array of prefixes

  if (shouldShowTime()) {
    prefixes.push(timeFormat());
  }

  if (_prefix) {
    prefixes.push(_prefix);
  }

  return {
    ...console,
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
