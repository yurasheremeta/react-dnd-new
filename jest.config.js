const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    preset: 'ts-jest',
    globals: {
        "ts-jest": {
          "tsConfig": "tsconfig.json",
          "module": "commonjs",
          "jsx": "react"
        },
       
      },
      moduleFileExtensions: [
        "ts",
        "js",
        "json",
        "tsx",
        "jsx"
      ],
      moduleDirectories: [
        "node_modules",
        "src"
      ],
      transform: {
        // "^.+\\.jsx$": "babel-jest",
        // ".(ts|tsx)": "ts-jest"
        ...tsjPreset.transform,
      },
      testMatch : null,
      testRegex:
        "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
      testEnvironment: "node",
      collectCoverage: true,
      collectCoverageFrom: [
        "**/*.{tsx,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/coverage/**",
      ],
      snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFiles:[
        "<rootDir>/test/setupTests.ts"
      ]
    
  };