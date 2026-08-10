import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['App.tsx!', 'index.js!'],
  project: ['src/**/*.{ts,tsx}', 'design-language/**/*.ts'],
  ignoreDependencies: ['expo-system-ui', 'expo-updates'],
  ignoreExportsUsedInFile: true,
};

export default config;
