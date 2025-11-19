import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTareas } from '../../context/TareasContext';

export default function DetalleTareaScreen() {
  const { id } = useLocalSearchParams();
  const { tareas } = useTareas();

  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Tarea no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tarea.titulo}</Text>
      <Text style={styles.descripcion}>{tarea.descripcion}</Text>
      {tarea.imagenUri && (
        <Image source={{ uri: tarea.imagenUri }} style={styles.imagen} />
      )}
      {tarea.ubicacion && (
        <Text style={styles.ubicacion}>
          Ubicación: {tarea.ubicacion.latitud.toFixed(5)}, {tarea.ubicacion.longitud.toFixed(5)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 16,
  },
  imagen: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  ubicacion: {
    fontSize: 14,
    color: '#555',
  },
});