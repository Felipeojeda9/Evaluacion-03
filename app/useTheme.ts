import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

    const theme = isDark ? darkTheme : lightTheme;

  return { theme, isDark };
}