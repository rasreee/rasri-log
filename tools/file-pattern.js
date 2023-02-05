/**
 *
 * @param {string[]} fileExtensions
 * @returns string
 */
function toFilePattern(fileExtensions) {
  return `*.{${fileExtensions}}`;
}

module.exports = {
  toFilePattern,
};
