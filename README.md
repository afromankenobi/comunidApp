# ComunidApp

Aplicación móvil híbrida para la comunidad "Peor es Nada" que permite crear y compartir avisos comunitarios.

## Requisitos

- Node.js (v18 o superior)
- npm o yarn

## Instalación

```bash
# Instalar dependencias
npm install
```

## Ejecutar en desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# O también
ionic serve
```

La aplicación se abrirá automáticamente en `http://localhost:4200`

## Compilar para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `www/`

## Agregar plataformas móviles

Para ejecutar en dispositivos móviles:

```bash
# iOS
ionic cap add ios
ionic cap sync
ionic cap open ios

# Android
ionic cap add android
ionic cap sync
ionic cap open android
```

## Estructura del proyecto

```
src/app/
├── models/              # Modelos de datos
├── services/            # Servicios (Storage, Publicaciones)
├── pipes/               # Pipe de formato de fecha
├── components/          # Componentes reutilizables
└── pages/               # Páginas de la aplicación
```

## Funcionalidades

- Crear avisos comunitarios con título, descripción y foto
- Listar todos los avisos creados
- Eliminar avisos con confirmación
- Persistencia local con Capacitor Preferences
- Captura de fotos con cámara del dispositivo
- Validación de formularios

## Tecnologías

- Ionic 8.0
- Angular 20.0
- Capacitor 7.4
- TypeScript
