import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useTheme } from './useTheme';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [nombre, setNombre] = useState('');
  const [cargandoLogin, setCargandoLogin] = useState(false);


  const backgroundImage = isDark
    ? require('../assets/bg-night.jpg')
    : require('../assets/bg-day.jpg');

  useEffect(() => {
    if (!loading && user) {
      router.replace('/tareas');
    }
  }, [loading, user]);

  if (loading) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.cargandoContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </ImageBackground>
    );
  }

  if (user) {
    return null;
  }

  const handleLogin = async () => {
    if (!nombre.trim()) return;

    setCargandoLogin(true);
    await login(nombre.trim());
    setCargandoLogin(false);

    router.replace('/tareas');
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.container, { backgroundColor: theme.card }]}>
            <Text style={[styles.titulo, { color: theme.text }]}>
              Iniciar Sesión
            </Text>

            <Text style={[styles.label, { color: theme.text }]}>
              Nombre de usuario
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  color: theme.text,
                  backgroundColor: theme.background,
                },
              ]}
              placeholder="Ej: Tu nombre"
              placeholderTextColor={theme.textSecondary}
              value={nombre}
              onChangeText={setNombre}
            />

            <TouchableOpacity
              style={[styles.boton, { backgroundColor: theme.primary }]}
              onPress={handleLogin}
            >
              {cargandoLogin ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.botonTexto}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cargandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    borderRadius: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  boton: {
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
