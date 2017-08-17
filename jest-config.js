module.exports = {
    globals: {
        __DEV__: true
    },
    automock: false,
    unmockedModulePathPatterns: [
        '<rootDir>/node_modules/react',
        '<rootDir>/node_modules/react-dom',
        '<rootDir>/node_modules/react-addons-test-utils',
        '<rootDir>/node_modules/fbjs',
        '<rootDir>/node_modules/numeral',
        '<rootDir>/node_modules/i18next',
    ],
    testPathIgnorePatterns: ['/node_modules/', 'fixture.js', '.history', '.localhistory', 'test-focus.jsx']
} 