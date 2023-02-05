function createLogger(name) {
  function makeLogFn(logFunction, emojiPrefix) {
    return (msg, ...restArgs) => {
      return logFunction.bind(
        null,
        `\n${emojiPrefix} [${name}] ${msg}:`,
        ...restArgs
      );
    };
  }

  return {
    info: makeLogFn(console.info, "💬"),
    error: makeLogFn(console.error, "❌"),
    warn: makeLogFn(console.warn, "🟠"),
    success: makeLogFn(console.info, "✅"),
  };
}

module.exports = {
  createLogger,
};
