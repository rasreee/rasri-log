const createLogger = require("../dist/index").default;

const logger = createLogger();
logger.log('Logger "log" test');

const loggerWithPrefix = createLogger("MyLogger");
loggerWithPrefix.debug('Logger "debug" test');
loggerWithPrefix.error('Logger "error" test');
loggerWithPrefix.group('Logger "group" test');
loggerWithPrefix.groupEnd();
loggerWithPrefix.info('Logger "info" test');
loggerWithPrefix.log('Logger "log" test');
loggerWithPrefix.warn('Logger "warn" test');
