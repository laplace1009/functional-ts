module.exports = {
    preset: 'ts-jest/presets/default-esm',
    globals: {
        'ts-jest': {
            useESM: true,
        }
    },
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: [
        "**/__tests__/**/*.(ts|tsx)",
        "**/?(*.)+(spec|test).(ts|tsx)"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/lib/__tests__/index.spec.d.ts"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)(\\.js)$': '$1',
    },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "\\.d\\.ts$"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts"
    ]
};
