import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTareas } from '../context/TareasContext';

export default function MapaScreen() {
  const { tareas } = useTareas();

  const tareasConUbicacion = tareas.filter((t) => t.ubicacion);

  if (tareasConUbicacion.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.texto}>No hay tareas con ubicación</Text>
      </View>
    );
  }

  const primeraUbicacion = tareasConUbicacion[0].ubicacion!;

  return (
    <MapView
      style={styles.mapa}
      initialRegion={{
        latitude: primeraUbicacion.latitud,
        longitude: primeraUbicacion.longitud,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {tareasConUbicacion.map((tarea) => (
        <Marker
          key={tarea.id}
          coordinate={{
            latitude: tarea.ubicacion!.latitud,
            longitude: tarea.ubicacion!.longitud,
          }}
          title={tarea.titulo}
          description={tarea.descripcion}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapa: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 16,
    color: '#555',
  },
});