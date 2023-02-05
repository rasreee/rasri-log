// @ts-check

const path = require("path");

const { createLogger } = require("./_lib/logger");

const logger = createLogger("tools/cache");

const ROOT_DIR = path.resolve(__dirname, "..");
const CACHE_DIR_NAME = ".cache";

function sanitize(name) {
  return name.replace("/", ".").replace(/[^a-z0-9.@_-]+/gi, "-");
}

/**
 * @param {string} name
 */
function getCachePath(name) {
  const cacheDir = path.resolve(ROOT_DIR, CACHE_DIR_NAME);
  logger.info("cacheDir: ", cacheDir);
  return `${cacheDir}/${sanitize(name)}`;
}

module.exports = {
  getCachePath,
};
