<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/61b9b07f5eab634d5743/maintainability)](https://codeclimate.com/github/rasreee/rasri-log/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/61b9b07f5eab634d5743/test_coverage)](https://codeclimate.com/github/rasreee/rasri-log/test_coverage)

# Simple logger

> Simple universal and extra-light (1kB) logger for node/browser, with prefix,
> time and colours.

This simple utility [is <1kB](https://bundlephobia.com/result?p=@unly/logger)
and is optimised to disable all logging in production, display log time, line of
origin, prefix and sane colors on the server console.

Also, it is tree-shacked and has **the same API** as the `console` native
object.

> We use it with Next.js and Vercel, and we don't need the server logs on
> production because we have Sentry for that, and disabling them reduces our
> cost.

## Usage

```ts
import createLogger from "@unly/logger";

const logger = createLogger({
  prefix: "My lib",
  shouldPrint: () => process.env.NODE_ENV !== "production", // Only print in non-production env (default behavior)
});
```

> Make sure to check our [advanced examples](#advanced-examples) below!

### Example color output (server console)

![image](https://user-images.githubusercontent.com/3807458/117548250-3e016980-b034-11eb-94fb-8eb72016c558.png)

> This is an example of the default color behaviour (see
> `scripts/show-colors.js`).

### Recommended usage (pro tips)

We recommend adapting:

- The `prefix` option, using the filename, the class name, the module name, etc.
  to help locate the origin of the message.
- The `shouldPrint` option to your needs. By default, it won't print anything in
  production environment.
- The `colorize` option, if you want to customize the colors used on the server.
  See [`colorizeFallback`](./blob/main/src/logger.ts) for inspiration.

## Installation

`yarn add @unly/logger`

or

`npm install @unly/logger`

### Peer dependencies

You'll also need to install those peer dependencies:

- `yarn add chalk`

> We decided to allow you to decide what version of chalk you want to use for
> greater flexibility.

## Options

Here are a few options to adapt the lib to your own needs.

```ts
export type LoggerOptions = {
  prefix?: string;
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
```

### Default options

```
prefix: None
disableAutoWrapPrefix: `false`
colorize: Colorize for server console only, see implementation
shouldPrint: Prints if NODE_ENV !== 'production'
shouldShowTime: Enabled
timeFormat: Using ISO string
```

## Advanced configuration

You can define the following environment variables:

- `UNLY_SIMPLE_LOGGER_ENV`: Will be used instead of `NODE_ENV`, to configure the
  default behavior of `shouldPrint`.
  - E.g: If set to `APP_STAGE`, then will compare `APP_STAGE` with `production`.
    If `APP_STAGE = 'staging'` (or `development`), then `shouldPrint` will print
    by default. If `APP_STAGE = 'production'`, then `shouldPrint` will not print
    by default. If a custom `shouldPrint` is provided, then it will ignore
    `UNLY_SIMPLE_LOGGER_ENV` as it won't rely on the default `shouldPrint`
    implementation.
- `SIMPLE_LOGGER_SHOULD_SHOW_TIME`: Will be used to configure whether to show
  the time by default.
  - E.g: If set to `false`, then will not show the time.

## Advanced examples

> Those advanced examples are taken from actual implementation in
> production-grade applications.

### Application-wide logger

If you want to define your config only once and reuse it everywhere across your
app, you can write a proxy, see below:

#### **`logger.ts`**

```ts
import createLogger, { Logger } from "@unly/logger";

/**
 * Custom logger proxy.
 *
 * Customize the @unly/logger library by providing app-wide default behavior.
 *
 * @param fileLabel
 */
export const createLogger = ({ fileLabel }: { fileLabel: string }): Logger => {
  return createLogger({
    prefix: fileLabel,
    shouldPrint: (mode) => {
      return process.env.NEXT_PUBLIC_APP_STAGE !== "production";
    },
  });
};
```

#### **`someFile.ts`**

```ts
import { createLogger } from "../logger";

const fileLabel = "someFile";
const logger = createLogger({
  fileLabel,
});

logger.warn(`Oops, a warning!`, { x: 1 });
```

### Silent all logs during tests (Jest)

Similar to the previous example, the `createLogger` can be used to change the
behaviors for tests.

In the below example, the `NODE_ENV` equals `test` during tests
([when running `yarn test`](https://github.com/rasreee/next-right-now/blob/v2-mst-aptd-at-lcz-sty/package.json#L67))
and it makes it easy to change the behavior to use `console` instead of the
`logger` in such case. Combined with
[other configuration](https://github.com/rasreee/next-right-now/blob/v2-mst-aptd-at-lcz-sty/jest.setup.js#L21-L29),
it allows to silent all logs when using either `console` or `logger` during
tests.

#### **`logger.ts`**

```ts
/**
 * Custom logger proxy.
 *
 * Customize the @unly/logger library by providing app-wide default behavior.
 *
 * @param fileLabel
 */
export const createLogger = ({ fileLabel }: { fileLabel: string }): Logger => {
  // Mute logger during tests, to avoid cluttering the console
  if (process.env.NODE_ENV === "test") {
    return global.muteConsole();
  }

  return createLogger({
    prefix: fileLabel,
    shouldPrint: (mode) => {
      return process.env.NEXT_PUBLIC_APP_STAGE !== "production";
    },
  });
};
```

---

# Contributing

We gladly accept PRs, but please open an issue first, so we can discuss it
beforehand.

---

# Changelog

> No changelog for now. WIP. Thinking of using
> https://github.com/semantic-release/semantic-release.

---

# Releases versioning

We follow Semantic Versioning. (`major.minor.patch`)

---

# License

[MIT](./LICENSE)

---

# Vulnerability disclosure

[See our policy](https://github.com/rasreee/Unly).

---

# Contributors and maintainers

This project is being authored by:

- [Unly] Ambroise Dhenain ([Vadorequest](https://github.com/vadorequest))
  **(active)**

---

# **[ABOUT UNLY]** <a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" height="40" align="right" alt="Unly logo" title="Unly logo" /></a>

> [Unly](https://unly.org) is a socially responsible company, fighting
> inequality and facilitating access to higher education. Unly is committed to
> making education more inclusive, through responsible funding for students.

We provide technological solutions to help students find the necessary funding
for their studies.

We proudly participate in many TechForGood initiatives. To support and learn
more about our actions to make education accessible, visit :

- https://twitter.com/rasreee
- https://www.facebook.com/rasreee/
- https://www.linkedin.com/company/unly
- [Interested to work with us?](https://jobs.zenploy.io/unly/about)

Tech tips and tricks from our CTO on our
[Medium page](https://medium.com/unly-org/tech/home)!
