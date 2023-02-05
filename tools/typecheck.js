const path = require("path");
const { createLogger } = require("./_lib/logger");

const logger = createLogger("tools/typecheck");

/**
 *
 * @param {string} dir
 * @param {string} tsConfig
 * @returns {string}
 */
function getTypeCheckCmd(dir, tsConfig = "tsconfig.json") {
  const cmd = `tsc --noEmit --project ${path.join(dir, tsConfig)}`;
  logger.info(`Running: ${cmd}`);
  return cmd;
}

module.exports = { getTypeCheckCmd };
