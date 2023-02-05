import type { Colorize, PrintMode, ShouldPrint, TimeFormat } from "./types";

/**
 * By default, displays the time as a Date ISO string.
 */
export const timeFormatFallback: TimeFormat = () => new Date().toLocaleString();

/**
 * By default, show time unless SIMPLE_LOGGER_SHOULD_SHOW_TIME has been explicitly set to "false".
 */
export const shouldShowTimeFallback = (): boolean => {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.SIMPLE_LOGGER_SHOULD_SHOW_TIME !== "false"
  );
};

/**
 * Colorize output.
 *
 * Only colorize on the server, not on the browser
 * (keep native behavior, to avoid messing with colors and complicated browser API which is different for each browser).
 *
 * @param mode
 * @param prefixes
 */
export const colorizeFallback: Colorize = (
  mode: Omit<PrintMode, "groupEnd">,
  prefixes: string[]
): any[] => {
  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const chalk = require("chalk"); // Require chalk on the server only, should not be included in the browser bundle
    const orange = chalk.hex("#FFA500");

    switch (mode) {
      case "debug":
        return prefixes.map((prefix: string) => chalk.yellow(prefix));
      case "error":
        return prefixes.map((prefix: string) => chalk.red(prefix));
      case "group":
        return prefixes.map((prefix: string) => chalk.bgGray(prefix));
      case "info":
        return prefixes.map((prefix: string) => chalk.blue(prefix));
      case "log":
        return prefixes.map((prefix: string) => chalk.grey(prefix));
      case "warn":
        return prefixes.map((prefix: string) => orange(prefix));
    }
  }

  return prefixes;
};

/**
 * By default, printing is only enabled in non-production environments.
 *
 * This behavior can be customized by defining a UNLY_SIMPLE_LOGGER_ENV which will be matched against "production".
 * This is useful when dealing with multi stages (dev, staging, production) and you want to enable logs on all stages but not for production.
 */
export const shouldPrintFallback: ShouldPrint = (): boolean => {
  if (process.env.UNLY_SIMPLE_LOGGER_ENV) {
    return process.env.UNLY_SIMPLE_LOGGER_ENV !== "production";
  }

  return process.env.NODE_ENV !== "production";
};
