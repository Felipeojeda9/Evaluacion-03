📘 README.md — Proyecto de Tareas con Cámara, GPS y Mapa
# 📱 App de Tareas con Cámara, GPS y Mapa

Esta aplicación móvil permite crear tareas con título, descripción, foto tomada desde la cámara y ubicación GPS. Las tareas se visualizan en una lista y también en un mapa interactivo. Desarrollada con **Expo**, **React Native**, **TypeScript** y **Expo Router**.

---

## 🚀 Funcionalidades

- Crear tareas con:
  - Título y descripción
  - Foto desde la cámara
  - Ubicación GPS automática
- Ver tareas en una lista con imagen y coordenadas
- Ver tareas en un mapa con marcadores
- Navegación por pestañas (Inicio, Crear Tarea, Tareas)
- Detalle individual de cada tarea

---

## 📦 Tecnologías utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://expo.github.io/router/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [Expo Vector Icons](https://docs.expo.dev/guides/icons/)

---

## 🛠️ Instalación y ejecución

### 1. Instalar Expo CLI (si no lo tienes)

npm install -g expo-cli

## 2. Clonar el repositorio
git clone https://github.com/<tu-usuario>/<nombre-del-repo>.git
cd <nombre-del-repo>


## 3. Instalar dependencias
npm install


## 4. Instalar paquetes específicos usados en el proyecto
npx expo install expo-camera
npx expo install expo-location
npx expo install react-native-maps
npx expo install @expo/vector-icons
npx expo install react-native-safe-area-context
npm install react-native-uuid


## 5. Ejecutar la app
npx expo start



## 🧠 Consideraciones
- La app solicita permisos de cámara y ubicación al crear tareas.
- Las tareas se almacenan en memoria (no persistente).
- El mapa solo muestra tareas que tienen coordenadas GPS válidas.

## 📌 Autores

