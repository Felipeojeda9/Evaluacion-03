import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  nombre: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (nombre: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = '@session_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (raw) {
          const savedUser: User = JSON.parse(raw);
          setUser(savedUser);
        }
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (nombre: string) => {
    const newUser: User = {
      id: nombre.toLowerCase().replace(/\s+/g, '_'),
      nombre,
    };
    setUser(newUser);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
