import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTareas } from '../../context/TareasContext';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../useTheme';

export default function MapaScreen() {
  const { tareas } = useTareas();
  const { user } = useAuth();
  const { theme } = useTheme();

  const tareasConUbicacion = tareas.filter(
    (t) => t.ubicacion && (!user || t.userId === user.id)
  );

  if (tareasConUbicacion.length === 0) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <View style={styles.center}>
          <Text style={[styles.texto, { color: theme.textSecondary }]}>
            No hay tareas con ubicación
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const primeraUbicacion = tareasConUbicacion[0].ubicacion!;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
