module.exports = {
    preset: 'ts-jest/presets/default-esm',
    globals: {
        'ts-jest': {
            useESM:true,
        }
    },
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/?(*.)+(spec|test).(ts|tsx)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)(\\.js)$': '$1',
    },
};
