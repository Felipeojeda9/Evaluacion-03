import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import { TareasProvider } from '../context/TareasContext';

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <AuthProvider>
      <TareasProvider>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="detalle-tarea/[id]" />
        </Stack>
      </TareasProvider>
    </AuthProvider>
  );
}

