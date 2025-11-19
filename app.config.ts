import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'eva2-app',
  slug: 'eva2-app',
  plugins: ['expo-router'],
});