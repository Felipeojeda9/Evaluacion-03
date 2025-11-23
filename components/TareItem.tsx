import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Tarea } from '../context/TareasContext';

type Props = {
  tarea: Tarea;
  onPress?: () => void;
  onDelete?: () => void;
};

export default function TareItem({ tarea, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {tarea.imagenUri && (
        <Image source={{ uri: tarea.imagenUri }} style={styles.thumb} />
      )}

      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={1}>
          {tarea.titulo}
        </Text>

        {tarea.descripcion ? (
          <Text style={styles.descripcion} numberOfLines={2}>
            {tarea.descripcion}
          </Text>
        ) : null}

        {tarea.ubicacion && (
          <Text style={styles.coords}>
            {tarea.ubicacion.latitud.toFixed(4)}, {tarea.ubicacion.longitud.toFixed(4)}
          </Text>
        )}
      </View>

      {onDelete && (
        <TouchableOpacity style={styles.trash} onPress={onDelete}>
          <Text style={styles.trashText}>🗑️</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    gap: 8,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
  },
  coords: {
    marginTop: 4,
    fontSize: 11,
    color: '#888',
  },
trash: {
    padding: 8,
  },
  trashText: {
    fontSize: 18,
  },
});