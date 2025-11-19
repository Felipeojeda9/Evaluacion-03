import { View, Text, FlatList, StyleSheet, Image, Button, Pressable } from 'react-native';
import { useTareas } from '../context/TareasContext';
import { useRouter } from 'expo-router';

export default function TareasScreen() {
  const { tareas } = useTareas();
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <Pressable onPress={() => router.push(`/detalle-tarea/${item.id}`)}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        {item.imagenUri && (
          <Image source={{ uri: item.imagenUri }} style={styles.imagen} />
        )}
        {item.ubicacion && (
          <Text style={styles.ubicacion}>
            Ubicación: {item.ubicacion.latitud.toFixed(5)}, {item.ubicacion.longitud.toFixed(5)}
          </Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Button title="Ver mapa de tareas" onPress={() => router.push('/mapa')} />
      {tareas.length === 0 ? (
        <Text style={styles.vacio}>No hay tareas registradas</Text>
      ) : (
        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16, paddingTop: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 8,
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 8,
  },
  ubicacion: {
    fontSize: 12,
    color: '#555',
  },
  vacio: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});