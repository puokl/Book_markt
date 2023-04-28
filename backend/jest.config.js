/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true, // to indicate each test during the run
  forceExit: true,
  clearMocks: true, // to clear the mock after each test is carried out
  resetMocks: true,
  restoreMocks: true,
};
