import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../useTheme';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Bienvenido</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        To Do List
      </Text>

      <TouchableOpacity
        style={[styles.trollButton, { backgroundColor: theme.danger }]}
        onPress={() =>
          router.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
      >
        <Text style={styles.trollText}>NO PRESIONAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  trollButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    marginTop: 12,
  },
  trollText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});