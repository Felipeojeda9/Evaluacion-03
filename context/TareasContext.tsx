import { createContext, useContext, useState, ReactNode } from 'react';

type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUri?: string;
  ubicacion?: {
    latitud: number;
    longitud: number;
  };
};

type TareasContextType = {
  tareas: Tarea[];
  agregarTarea: (tarea: Tarea) => void;
};

const TareasContext = createContext<TareasContextType | undefined>(undefined);

export const TareasProvider = ({ children }: { children: ReactNode }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const agregarTarea = (tarea: Tarea) => {
    setTareas((prev) => [...prev, tarea]);
  };

  return (
    <TareasContext.Provider value={{ tareas, agregarTarea }}>
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