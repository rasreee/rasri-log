import type { Console } from "node:console";

export type Logger = Console;
export type PrintMode =
  | "debug"
  | "error"
  | "group"
  | "groupEnd"
  | "info"
  | "log"
  | "warn";

export type LoggerOptions = {
  disableAutoWrapPrefix?: boolean;
  colorize?: Colorize;
  shouldPrint?: ShouldPrint;
  shouldShowTime?: ShouldShowTime;
  timeFormat?: TimeFormat;
};

export type Colorize = (mode: PrintMode, prefixes: string[]) => string[];
export type ShouldPrint = (mode: PrintMode) => boolean;
export type ShouldShowTime = () => boolean;
export type TimeFormat = () => string;
