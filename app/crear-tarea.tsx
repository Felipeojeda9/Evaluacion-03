import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTareas } from '../context/TareasContext';
import { useRouter } from 'expo-router';
import uuid from 'react-native-uuid';
import {
  CameraView,
  useCameraPermissions,
  CameraCapturedPicture,
} from 'expo-camera';
import * as Location from 'expo-location';

export default function CrearTareaScreen() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUri, setImagenUri] = useState<string | null>(null);
  const [ubicacion, setUbicacion] = useState<{ latitud: number; longitud: number } | null>(null);
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);
  const camaraRef = useRef<CameraView>(null);
  const { agregarTarea } = useTareas();
  const router = useRouter();

  const [permisoCamara, solicitarPermisoCamara] = useCameraPermissions();

  const tomarFoto = async () => {
    if (camaraRef.current) {
      const foto: CameraCapturedPicture = await camaraRef.current.takePictureAsync();
      setImagenUri(foto.uri);
      setMostrarCamara(false);
    }
  };

  const obtenerUbicacion = async (): Promise<{ latitud: number; longitud: number } | null> => {
    setCargandoUbicacion(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener la ubicación');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      return {
        latitud: location.coords.latitude,
        longitud: location.coords.longitude,
      };
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
      return null;
    } finally {
      setCargandoUbicacion(false);
    }
  };

  const handleCrear = async () => {
    if (!titulo.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    let ubicacionFinal = ubicacion;

    if (!ubicacionFinal) {
      ubicacionFinal = await obtenerUbicacion();
      if (!ubicacionFinal) return;
    }

    agregarTarea({
      id: String(uuid.v4()),
      titulo,
      descripcion,
      imagenUri: imagenUri ?? undefined,
      ubicacion: ubicacionFinal,
    });

    setTitulo('');
    setDescripcion('');
    setImagenUri(null);
    setUbicacion(null);
    router.push('/tareas');
  };

  if (mostrarCamara) {
    if (!permisoCamara?.granted) {
      return (
        <View style={styles.container}>
          <Text>Se necesita permiso para usar la cámara</Text>
          <Button title="Solicitar permiso" onPress={solicitarPermisoCamara} />
        </View>
      );
    }

    return (
      <CameraView style={{ flex: 1 }} ref={camaraRef} facing="back">
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <Button title="Tomar foto" onPress={tomarFoto} />
        </View>
      </CameraView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escribe la descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      {imagenUri && (
        <Image source={{ uri: imagenUri }} style={{ width: '100%', height: 200, marginBottom: 10 }} />
      )}
      <Button title="Abrir cámara" onPress={() => setMostrarCamara(true)} />
      <Button title="Crear tarea" onPress={handleCrear} />
      {cargandoUbicacion && <ActivityIndicator style={{ marginTop: 10 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});