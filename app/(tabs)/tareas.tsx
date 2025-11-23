import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTareas, Tarea } from '../../context/TareasContext';
import { useAuth } from '../../context/AuthContext';
import TareItem from '../../components/TareItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useTheme } from '../useTheme';

export default function TareasScreen() {
  const router = useRouter();

  const { tareas, eliminarTarea } = useTareas();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const handleDelete = (id: string) => {
    eliminarTarea(id);
  };

  useEffect(() => {
    if (!user) {
      router.replace('../index');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const tareasUsuario = tareas.filter((t) => t.userId === user.id);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const renderItem = ({ item }: { item: Tarea }) => (
    <TareItem
      tarea={item}
      onPress={() => router.push(`/detalle-tarea/${item.id}`)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Text style={[styles.titulo, { color: theme.text }]}>
            Tareas de {user.nombre}
          </Text>

          <TouchableOpacity
            style={[styles.logoutBtn, { borderColor: theme.danger }]}
            onPress={handleLogout}
          >
            <Text style={[styles.logoutText, { color: theme.danger }]}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>

        {tareasUsuario.length === 0 ? (
          <Text style={[styles.vacio, { color: theme.textSecondary }]}>
            No tienes tareas registradas todavía.
          </Text>
        ) : (
          <FlatList
            data={tareasUsuario}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{
              gap: 16,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // se sobreescribe con theme.background
  },

  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  logoutText: {
    fontWeight: '600',
  },
  vacio: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

