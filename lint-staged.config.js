const { getEslintFixCmd } = require("./tools/eslint");
const { toFilePattern } = require("./tools/file-pattern");
const { getPrettierFixCmd } = require("./tools/prettier");
const { getTypeCheckCmd } = require("./tools/typecheck");

module.exports = {
  [toFilePattern(["cjs", "mjs", "js", "ts"])]: (files) => [
    getEslintFixCmd(__dirname, files),
    getTypeCheckCmd(__dirname, "tsconfig.spec.json"),
  ],
  [toFilePattern(["json", "md", "yml", "yaml"])]: (files) =>
    getPrettierFixCmd(__dirname, files),
};
