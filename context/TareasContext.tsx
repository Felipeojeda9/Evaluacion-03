import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUri?: string;
  ubicacion?: {
    latitud: number;
    longitud: number;
  };
  userId: string;
};

type TareasContextType = {
  tareas: Tarea[];
  agregarTarea: (tarea: Omit<Tarea, 'userId'>) => Promise<void>;
  eliminarTarea: (id: string) => Promise<void>;
};

const TareasContext = createContext<TareasContextType | undefined>(undefined);

const TAREAS_KEY = '@tareas';

export const TareasProvider = ({ children }: { children: ReactNode }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadTareas = async () => {
      try {
        const raw = await AsyncStorage.getItem(TAREAS_KEY);
        if (raw) {
          const saved: Tarea[] = JSON.parse(raw);
          setTareas(saved);
        }
      } catch (e) {
        console.log('Error cargando tareas', e);
      }
    };
    loadTareas();
  }, []);

  const guardarEnStorage = async (nuevas: Tarea[]) => {
    setTareas(nuevas);
    await AsyncStorage.setItem(TAREAS_KEY, JSON.stringify(nuevas));
  };

  const agregarTarea = async (tareaSinUsuario: Omit<Tarea, 'userId'>) => {
    if (!user) return;
    const nueva: Tarea = { ...tareaSinUsuario, userId: user.id };
    const nuevas = [...tareas, nueva];
    await guardarEnStorage(nuevas);
  };

  const eliminarTarea = async (id: string) => {
    const nuevas = tareas.filter((t) => t.id !== id);
    await guardarEnStorage(nuevas);
  };

  return (
    <TareasContext.Provider value={{ tareas, agregarTarea, eliminarTarea }}>
      {children}
    </TareasContext.Provider>
  );
};

export const useTareas = () => {
  const context = useContext(TareasContext);
  if (!context) {
    throw new Error('useTareas debe usarse dentro de un TareasProvider');
  }
  return context;
};
