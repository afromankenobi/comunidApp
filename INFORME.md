# Informe Técnico - ComunidApp
## Taller 4 - Examen Final - Programación Híbrida

---

## 1. Introducción

Este documento describe la implementación de ComunidApp, una aplicación móvil híbrida desarrollada con Ionic y Angular para la comunidad "Peor es Nada". La aplicación permite a los usuarios crear y compartir avisos comunitarios sobre temas de interés común como mascotas perdidas, documentos encontrados o situaciones de seguridad.

El desarrollo se realizó siguiendo los requerimientos especificados en el documento del taller, implementando todas las funcionalidades solicitadas.

---

## 2. Configuración del Proyecto

### 2.1 Tecnologías Utilizadas

- **Framework**: Ionic 8.0.0
- **Frontend**: Angular 20.0.0
- **Capacitor**: 7.4.4 para acceso a funcionalidades nativas
- **Plugins**:
  - @capacitor/camera: Para captura de fotografías
  - @capacitor/preferences: Para persistencia local de datos

### 2.2 Estructura del Proyecto

El proyecto fue organizado en la siguiente estructura de carpetas:

```
src/app/
├── models/              # Interfaces y modelos de datos
├── services/            # Servicios para lógica de negocio
├── pipes/               # Pipes personalizados
├── components/          # Componentes reutilizables
└── pages/               # Páginas de la aplicación
```

Esta organización divide la complejidad del proyecto en módulos independientes y reutilizables.

---

## 3. Implementación de Funcionalidades

### 3.1 Modelo de Datos

Se creó la interfaz `Publicacion` que define la estructura de cada aviso:

```typescript
export interface Publicacion {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  foto?: string;
}
```

El modelo incluye todos los campos necesarios: identificador único, título, descripción, fecha automática y fotografía opcional.

### 3.2 Servicios

#### 3.2.1 Storage Service

Este servicio encapsula las operaciones con Capacitor Preferences, proporcionando métodos para guardar, recuperar y eliminar datos del almacenamiento local del dispositivo.

Métodos implementados:
- `setItem()`: Guarda un valor en el almacenamiento
- `getItem()`: Recupera un valor del almacenamiento
- `removeItem()`: Elimina un valor específico
- `clear()`: Limpia todo el almacenamiento

#### 3.2.2 Publicaciones Service

Servicio principal que maneja la lógica de negocio de las publicaciones. Utiliza RxJS BehaviorSubject para mantener una lista reactiva de publicaciones que se actualiza automáticamente cuando hay cambios.

Funcionalidades:
- Carga inicial de publicaciones desde el almacenamiento
- Agregar nuevas publicaciones con ID y fecha automáticos
- Eliminar publicaciones existentes
- Sincronización con el almacenamiento local

### 3.3 Componentes

#### 3.3.1 PublicacionItemComponent

Componente reutilizable que muestra una publicación individual. Implementa comunicación bidireccional:

- **@Input**: Recibe el objeto `publicacion` desde el componente padre
- **@Output**: Emite evento `eliminar` cuando el usuario presiona el botón de eliminar

Este componente encapsula la lógica de presentación de cada item, mostrando la foto (si existe), título, descripción y fecha formateada.

#### 3.3.2 ConfirmDeleteModalComponent

Modal de confirmación que se presenta antes de eliminar una publicación. Recibe el título de la publicación mediante @Input y retorna la decisión del usuario a través del ModalController.

### 3.4 Páginas

#### 3.4.1 Página de Lista de Publicaciones

Pantalla principal que muestra todas las publicaciones creadas. Implementa:

- Lista dinámica con directiva `*ngFor` para iterar sobre las publicaciones
- Directiva `*ngIf` para mostrar mensaje cuando no hay publicaciones
- Botón flotante (FAB) para navegar a la creación de nuevas publicaciones
- Gestión del ciclo de vida con `ionViewWillEnter()` para recargar datos al volver a la página

Componentes Ionic utilizados:
- `ion-list`: Contenedor de la lista
- `ion-item`: Items individuales (dentro del componente hijo)
- `ion-fab` y `ion-fab-button`: Botón flotante
- `ion-button`: Botones de acción

#### 3.4.2 Página de Nueva Publicación

Formulario reactivo para crear nuevas publicaciones. Características:

- Validación de campos con Angular Reactive Forms
- Mensajes de error específicos para cada validación
- Vista previa de la fotografía capturada
- Botón de captura de foto integrado

Componentes Ionic utilizados:
- `ion-input`: Campo de título
- `ion-textarea`: Campo de descripción
- `ion-button`: Botones de acción y captura
- `ion-img`: Vista previa de la foto

### 3.5 Validación de Formularios

El formulario implementa validaciones en todos los campos usando Angular Reactive Forms:

#### Validaciones Implementadas

1. **Título**:
   - Campo obligatorio (`required`)
   - Mínimo 5 caracteres (`minLength: 5`)

2. **Descripción**:
   - Campo obligatorio (`required`)
   - Mínimo 20 caracteres (`minLength: 20`)

Los mensajes de validación se muestran dinámicamente cuando el campo es inválido y ha sido modificado o tocado por el usuario. Cada tipo de error muestra un mensaje específico que indica el problema.

El botón de guardar se deshabilita automáticamente cuando el formulario es inválido, evitando envíos con datos incorrectos.

### 3.6 Pipe Personalizado

Se implementó el pipe `FormatoFechaPipe` para presentar las fechas de manera legible en español:

**Entrada**: `Date` o `string`
**Salida**: "24 de noviembre de 2025, 20:45"

El pipe transforma objetos Date en texto formateado que incluye el día, mes (en texto), año, hora y minutos. Se aplica en la visualización de cada publicación usando la sintaxis `{{ fecha | formatoFecha }}`.

### 3.7 Persistencia de Datos

La persistencia se implementó usando Capacitor Preferences, que almacena datos localmente en el dispositivo.

**Proceso**:
1. Al iniciar la app, el servicio carga las publicaciones guardadas
2. Al agregar una publicación, se guarda inmediatamente en Preferences
3. Al eliminar una publicación, se actualiza el almacenamiento
4. Los datos persisten entre sesiones de la aplicación

Las fechas se serializan como strings en JSON y se convierten de vuelta a objetos Date al cargar, manteniendo su funcionalidad.

### 3.8 Captura de Fotografía

La captura de fotos se implementó usando el plugin @capacitor/camera:

**Configuración**:
- `quality: 90`: Calidad de imagen alta
- `resultType: DataUrl`: Retorna la imagen como base64
- `source: Camera`: Usa la cámara del dispositivo

La fotografía capturada se muestra en una vista previa antes de guardar la publicación. La imagen se almacena como string base64 junto con los demás datos de la publicación.

### 3.9 Navegación y Rutas

El enrutamiento fue configurado con dos rutas principales:

- `/publicaciones-lista`: Pantalla principal (ruta por defecto)
- `/nueva-publicacion`: Formulario de creación

La navegación se realiza usando el Router de Angular, permitiendo navegación programática desde los componentes.

---

## 4. Aspectos Técnicos Destacados

### 4.1 Arquitectura de Componentes

El proyecto utiliza 4 componentes independientes:
1. PublicacionesListaPage (página)
2. NuevaPublicacionPage (página)
3. PublicacionItemComponent (componente hijo)
4. ConfirmDeleteModalComponent (componente modal)

Todos los componentes son standalone, aprovechando las características modernas de Angular.

### 4.2 Comunicación entre Componentes

La comunicación padre-hijo se implementó usando:

- **@Input**: Para pasar datos del padre al hijo
- **@Output con EventEmitter**: Para emitir eventos del hijo al padre

Este patrón permite que el componente hijo sea reutilizable y desacoplado de la lógica del padre.

### 4.3 Gestión de Estado

Se usa un BehaviorSubject en el servicio de publicaciones para mantener el estado reactivo. Esto permite que múltiples componentes se suscriban a los cambios y se actualicen automáticamente.

### 4.4 Manejo de Eventos

Los eventos de clic se manejan mediante:
- Event binding: `(click)="metodo()"`
- Propagación de eventos desde componentes hijos
- Presentación de modales para confirmaciones

---

## 5. Decisiones de Diseño

### 5.1 Diseño Visual

Se optó por un diseño limpio con:
- Fondo claro (#f5f5f5) para mejor legibilidad
- Tarjetas blancas con sombras suaves
- Bordes redondeados en todos los elementos
- Separación clara entre items

El modo oscuro fue desactivado intencionalmente para mantener una apariencia consistente y amigable.

### 5.2 Experiencia de Usuario

- Estado vacío con mensaje motivador
- Vista previa de foto antes de guardar
- Confirmación antes de eliminar (modal)
- Mensajes de validación claros
- Botones deshabilitados cuando no son accionables

### 5.3 Nomenclatura

Se utilizaron nombres descriptivos en todo el código:
- `publicacionesService` en lugar de `ps`
- `confirmarEliminar()` en lugar de `delete()`
- `fotoCapturada` en lugar de `img`

Los nombres comunican la intención del código sin necesidad de comentarios adicionales.

---

## 6. Pruebas y Verificación

### 6.1 Compilación

El proyecto compila sin errores:

```bash
npm run build
# ✔ Building... completed successfully
```

### 6.2 Funcionalidades Probadas

- Creación de publicaciones con y sin foto
- Validación de formularios con valores inválidos
- Eliminación de publicaciones con confirmación
- Persistencia entre recargas de la aplicación
- Navegación entre pantallas
- Formateo de fechas

### 6.3 Navegadores Compatibles

La aplicación fue probada en navegador web (Chrome). Para dispositivos móviles, se requiere agregar las plataformas iOS o Android con Capacitor.

---

## 7. Limitaciones y Consideraciones

### 7.1 Cámara en Navegador Web

El plugin de cámara funciona en navegadores web pero solicita permisos de la cámara web. En dispositivos móviles nativos, usa la cámara del dispositivo directamente.

### 7.2 Almacenamiento

Capacitor Preferences en web usa localStorage. Los datos persisten en el navegador pero se pierden si se limpian los datos del navegador.

### 7.3 Tamaño de Imágenes

Las imágenes se guardan como base64, lo que aumenta el tamaño de almacenamiento. Para producción, sería recomendable comprimir las imágenes o usar un servidor externo.

---

## 8. Conclusiones

Se desarrolló una aplicación funcional que cumple con todos los requisitos especificados. La aplicación permite a los usuarios de la comunidad "Peor es Nada" compartir avisos relevantes de manera organizada.

La implementación demuestra el uso de:
- Arquitectura modular con servicios y componentes
- Comunicación entre componentes usando decoradores de Angular
- Persistencia local de datos
- Integración con funcionalidades nativas mediante Capacitor
- Validación de formularios reactivos
- Directivas estructurales de Angular
- Pipes personalizados
- Componentes de Ionic para UI móvil

El código mantiene nombres descriptivos, está organizado en módulos claros, y sigue las convenciones de Angular e Ionic para facilitar su mantenimiento.

---

## 9. Archivos Entregables

1. **Informe**: Este documento (PDF o Word)
2. **Código fuente**: Proyecto completo en carpeta `comunidApp/`

### Estructura de archivos principales:

```
comunidApp/
├── src/
│   ├── app/
│   │   ├── models/publicacion.model.ts
│   │   ├── services/
│   │   │   ├── storage.ts
│   │   │   └── publicaciones.ts
│   │   ├── pipes/formato-fecha-pipe.ts
│   │   ├── components/
│   │   │   ├── publicacion-item/
│   │   │   └── confirm-delete-modal/
│   │   └── pages/
│   │       ├── publicaciones-lista/
│   │       └── nueva-publicacion/
│   └── global.scss (estilos globales)
├── package.json
└── capacitor.config.ts
```

---

**Fecha de elaboración**: Noviembre 2025
**Asignatura**: Programación Híbrida
**Actividad**: Taller 4 - Examen Final
