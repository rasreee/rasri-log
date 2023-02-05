const { getCachePath } = require("./cache");
const { createLogger } = require("./_lib/logger");
const quote = require("./_lib/shell-quote");

const logger = createLogger("./tools/prettier");

/**
 * Concatenate and escape a list of filenames that can be passed as args to prettier cli
 *
 * Prettier has an issue with special characters in filenames,
 * such as the ones uses for nextjs dynamic routes (ie: [id].tsx...)
 *
 * @link https://github.com/okonet/lint-staged/issues/676
 *
 * @param {string[]} filenames
 * @returns {string} Return concatenated and escaped filenames
 */
const concatFilesForPrettier = (filenames) => {
  const isWin = process.platform === "win32";
  return filenames
    .map((filename) => `"${isWin ? filename : quote([filename])}"`)
    .join(" ");
};

function getPrettierFixCmd(cwd, files = []) {
  const cmd = `prettier --write ${concatFilesForPrettier(
    files
  )} --cache --cache-location=${getCachePath("prettier")}`;
  logger.info(`Running: ${cmd}`);
  return cmd;
}

module.exports = {
  concatFilesForPrettier,
  getPrettierFixCmd,
};
