const expoPreset = require('jest-expo/jest-preset');

const transformIgnoreNodeModules =
  '@gorhom|react-native-markdown-display|markdown-it|linkify-it|entities|uc\\.micro|css-to-react-native';
const transformIgnorePatterns = `${expoPreset.transformIgnorePatterns[0].slice(0, -1)}|${transformIgnoreNodeModules})`;

module.exports = {
  ...expoPreset,
  transformIgnorePatterns: [transformIgnorePatterns],
  setupFilesAfterEnv: ['<rootDir>/src/jest/setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
};
