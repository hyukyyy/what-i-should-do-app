module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|react-redux)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'], // setupFiles: ['./node_modules/@testing-library/jest-native/extend-expect'],
};
