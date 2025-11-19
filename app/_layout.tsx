import { Tabs } from 'expo-router';
import { TareasProvider } from '../context/TareasContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <TareasProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#f9f9f9',
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            paddingTop: 6,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            height: 60 + insets.bottom,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

            if (route.name === 'index') iconName = 'home';
            else if (route.name === 'crear-tarea') iconName = 'add-circle';
            else if (route.name === 'tareas') iconName = 'list';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
        <Tabs.Screen name="crear-tarea" options={{ title: 'Crear Tarea' }} />
        <Tabs.Screen name="tareas" options={{ title: 'Tareas' }} />
      </Tabs>
    </TareasProvider>
  );
}