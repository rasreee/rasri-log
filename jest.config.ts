import type { Config } from "jest";
import { getCachePath } from "./tools/cache";

function fromRoot(dir: string) {
  return `<rootDir>/${dir}`;
}

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const jestConfig: Config = {
  passWithNoTests: true,
  cache: true,
  cacheDirectory: getCachePath("jest"),
  collectCoverageFrom: ["**/*.{js,ts}"],
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["cjs", "mjs", "js", "ts", "json"],
  modulePathIgnorePatterns: [
    fromRoot(".cache"),
    fromRoot("dist"),
    fromRoot("tools"),
  ],
  testEnvironment: "node",
  testMatch: [fromRoot("**/?(*.)spec.+(js|ts)")],
  transform: {
    "^.+\\.(ts|js)?$": [
      "ts-jest",
      { tsconfig: fromRoot("tsconfig.spec.json") },
    ],
  },
};

export default jestConfig;
