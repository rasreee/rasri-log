const { getEslintFixCmd } = require("./eslint");
const { toFilePattern } = require("./file-pattern");
const { getPrettierFixCmd } = require("./prettier");
const { getTypeCheckCmd } = require("./typecheck");

module.exports = {
  [toFilePattern(["cjs", "mjs", "js", "ts"])]: (files) => [
    getEslintFixCmd(__dirname, files),
    getTypeCheckCmd(__dirname, "tsconfig.json"),
  ],
  [toFilePattern(["json", "md", "yml", "yaml"])]: (files) =>
    getPrettierFixCmd(__dirname, files),
};
